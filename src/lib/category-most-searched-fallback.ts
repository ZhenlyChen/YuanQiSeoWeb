import type { AppLocale } from '@/i18n/routing'
import { formatCategoryLabel } from '@/lib/category-display'
import { MIN_CATEGORY_HOT_PARTS, countCategoryHotParts } from '@/lib/category-hot-parts'
import { slugFromEntityKey } from '@/lib/manufacturer-most-searched-fallback'
import { fetchCategoryProductItems } from '@/lib/seo-api'
import type { CategoryHubPage, TopSearchedPartItem } from '@/types/seo-intelligence'

const MOST_SEARCHED_PARTS_LIMIT = 12
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

function resolveCategoryLabel(item: Record<string, unknown>): string {
  const categoryRaw = firstNonEmpty(item.category_str, item.category)
  return formatCategoryLabel(categoryRaw || item.category) || 'Component'
}

export function mapCategoryProductItemsToMostSearchedParts(
  items: Array<Record<string, unknown>>,
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
      category: resolveCategoryLabel(item),
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
 * SSR fallback when category hub has empty popular/most-searched parts but ES has catalog samples.
 * Data source: GET component/category/products (code.keyword asc) - catalog samples, not PG demand scores.
 */
export async function enrichCategoryMostSearchedParts(
  page: CategoryHubPage,
  locale: AppLocale,
): Promise<CategoryHubPage> {
  if (countCategoryHotParts(page) >= MIN_CATEGORY_HOT_PARTS) return page

  const { categoryL1, categoryL2 } = resolveCategoryTaxonomyLabels(page)
  if (!categoryL1) return page

  try {
    const items = await fetchCategoryProductItems({
      categoryL1,
      categoryL2,
      pageSize: MOST_SEARCHED_PARTS_LIMIT,
      locale,
    })
    const catalogParts = mapCategoryProductItemsToMostSearchedParts(items)
    if (!catalogParts.length) return page

    const seen = new Set<string>()
    for (const row of page.popularParts) {
      const mpn = row.mpn?.trim().toLowerCase()
      if (mpn) seen.add(mpn)
    }
    for (const part of page.mostSearchedParts) {
      const mpn = part.mpn?.trim().toLowerCase()
      if (mpn) seen.add(mpn)
    }
    const merged = [
      ...page.mostSearchedParts,
      ...catalogParts.filter((part) => !seen.has(part.mpn.trim().toLowerCase())),
    ].slice(0, MOST_SEARCHED_PARTS_LIMIT)

    return { ...page, mostSearchedParts: merged }
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
