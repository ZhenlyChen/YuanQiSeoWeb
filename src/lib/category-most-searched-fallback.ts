import type { AppLocale } from '@/i18n/routing'
import {
  formatCategoryLabel,
  formatCategoryLabelForDisplay,
  prefersLatinCategoryLabels,
} from '@/lib/category-display'
import { MIN_CATEGORY_HOT_PARTS, countCategoryHotParts } from '@/lib/category-hot-parts'
import { slugFromEntityKey } from '@/lib/manufacturer-most-searched-fallback'
import { fetchCategoryProductItems } from '@/lib/seo-api'
import type {
  CategoryHubPage,
  CategoryPopularPartRow,
  TopSearchedPartItem,
} from '@/types/seo-intelligence'

const MOST_SEARCHED_PARTS_LIMIT = 12
const CATALOG_FETCH_SIZE = 50
const KEY_SPECS_MAX_LEN = 160

function firstNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function readManufacturerInfo(item: Record<string, unknown>): Record<string, unknown> | null {
  const info = item.manufacturer_info
  return info && typeof info === 'object' && !Array.isArray(info)
    ? (info as Record<string, unknown>)
    : null
}

function resolveManufacturerName(item: Record<string, unknown>): string {
  const info = readManufacturerInfo(item)
  return firstNonEmpty(
    info?.standard_name_en,
    info?.name_en,
    info?.name,
    item.manufacturer,
    item.manufacturer_name,
  )
}

export function resolveCategoryLabelFromCatalogItem(
  item: Record<string, unknown>,
  locale: AppLocale,
  fallback = '',
): string {
  const categoryRaw = firstNonEmpty(item.category_str, item.category)
  return (
    formatCategoryLabel(categoryRaw || item.category, { locale, fallback })
    || formatCategoryLabelForDisplay(firstNonEmpty(item.category), { locale, fallback })
    || fallback
    || 'Component'
  )
}

function categoryHubCategoryFallback(page: CategoryHubPage): string {
  return page.name.trim()
}

function buildCatalogCategoryLabels(
  items: Array<Record<string, unknown>>,
  locale: AppLocale,
  fallback: string,
): Map<string, string> {
  const labels = new Map<string, string>()
  for (const item of items) {
    const mpn = firstNonEmpty(item.code, item.mpn).toLowerCase()
    if (!mpn) continue
    const label = resolveCategoryLabelFromCatalogItem(item, locale, fallback)
    if (label) labels.set(mpn, label)
  }
  return labels
}

function patchPopularPartCategory(
  row: CategoryPopularPartRow,
  locale: AppLocale,
  labels: Map<string, string>,
  fallback: string,
): CategoryPopularPartRow {
  const mpnKey = row.mpn.trim().toLowerCase()
  const category = labels.get(mpnKey)
    || formatCategoryLabelForDisplay(row.category, { locale, fallback })
    || row.category
  return category === row.category ? row : { ...row, category }
}

function patchMostSearchedPartCategory(
  part: TopSearchedPartItem,
  locale: AppLocale,
  labels: Map<string, string>,
  fallback: string,
): TopSearchedPartItem {
  const mpnKey = part.mpn.trim().toLowerCase()
  const category = labels.get(mpnKey)
    || formatCategoryLabelForDisplay(part.category, { locale, fallback })
    || part.category
  return category === part.category ? part : { ...part, category }
}

export function mapCategoryProductItemsToMostSearchedParts(
  items: Array<Record<string, unknown>>,
  locale: AppLocale,
  fallback = '',
): TopSearchedPartItem[] {
  const out: TopSearchedPartItem[] = []

  for (const [idx, item] of items.slice(0, MOST_SEARCHED_PARTS_LIMIT).entries()) {
    const mpn = firstNonEmpty(item.code, item.mpn)
    if (!mpn) continue

    const info = readManufacturerInfo(item)
    const manufacturerId = firstNonEmpty(info?.manufacturer_id, item.manufacturer_id, item.manufacturerId)
    const summary = firstNonEmpty(item.summary, item.description, item.detailed_description)
    const interest = Math.max(10, 100 - idx * 8)

    out.push({
      mpn,
      href: `/parts/${slugFromEntityKey(mpn, manufacturerId)}`,
      category: resolveCategoryLabelFromCatalogItem(item, locale, fallback),
      manufacturer: resolveManufacturerName(item),
      keySpecs: summary ? summary.slice(0, KEY_SPECS_MAX_LEN) : undefined,
      interest,
    })
  }

  return out
}

function resolveCategoryTaxonomyLabels(page: CategoryHubPage): { categoryL1: string; categoryL2: string } {
  if (page.level === 'l2') {
    return {
      categoryL1: page.parentName?.trim() || '',
      categoryL2: page.name.trim(),
    }
  }
  return { categoryL1: page.name.trim(), categoryL2: '' }
}

/**
 * Backfills sparse hot parts and normalizes category labels from ES catalog paths.
 * On en/de locales, rewrites CJK L3 aliases to the nearest Latin taxonomy segment.
 */
export async function enrichCategoryMostSearchedParts(
  page: CategoryHubPage,
  locale: AppLocale,
): Promise<CategoryHubPage> {
  const { categoryL1, categoryL2 } = resolveCategoryTaxonomyLabels(page)
  if (!categoryL1) return page

  const needsBackfill = countCategoryHotParts(page) < MIN_CATEGORY_HOT_PARTS
  const needsLabelPatch = prefersLatinCategoryLabels(locale)
  if (!needsBackfill && !needsLabelPatch) return page

  try {
    const items = await fetchCategoryProductItems({
      categoryL1,
      categoryL2,
      pageSize: needsLabelPatch ? CATALOG_FETCH_SIZE : MOST_SEARCHED_PARTS_LIMIT,
      locale,
    })
    const fallback = categoryHubCategoryFallback(page)
    const labels = buildCatalogCategoryLabels(items, locale, fallback)

    let nextPage = page
    if (needsLabelPatch && labels.size > 0) {
      nextPage = {
        ...nextPage,
        popularParts: nextPage.popularParts.map((row) =>
          patchPopularPartCategory(row, locale, labels, fallback),
        ),
        mostSearchedParts: nextPage.mostSearchedParts.map((part) =>
          patchMostSearchedPartCategory(part, locale, labels, fallback),
        ),
      }
    }

    if (!needsBackfill) return nextPage

    const catalogParts = mapCategoryProductItemsToMostSearchedParts(items, locale, fallback)
    if (!catalogParts.length) return nextPage

    const seen = new Set<string>()
    for (const row of nextPage.popularParts) {
      const mpn = row.mpn?.trim().toLowerCase()
      if (mpn) seen.add(mpn)
    }
    for (const part of nextPage.mostSearchedParts) {
      const mpn = part.mpn?.trim().toLowerCase()
      if (mpn) seen.add(mpn)
    }
    const merged = [
      ...nextPage.mostSearchedParts,
      ...catalogParts.filter((part) => !seen.has(part.mpn.trim().toLowerCase())),
    ].slice(0, MOST_SEARCHED_PARTS_LIMIT)

    return { ...nextPage, mostSearchedParts: merged }
  } catch (error) {
    console.error('[enrichCategoryMostSearchedParts]', {
      slug: page.slug,
      l1Slug: page.l1Slug,
      l2Slug: page.l2Slug,
      locale,
      error,
    })
    return page
  }
}
