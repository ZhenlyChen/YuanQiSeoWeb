import type { AppLocale } from '@/i18n/routing'
import { prefersLatinCategoryLabels } from '@/lib/category-display'
import {
  patchSeoCategoryLabels,
  resolveSeoCategoryLabelFromItem,
} from '@/lib/category-locale-label'
import { fetchManufacturerProductItems } from '@/lib/seo-api'
import type {
  ManufacturerIntelligencePage,
  TopSearchedPartItem,
} from '@/types/seo-intelligence'

const MOST_SEARCHED_PARTS_LIMIT = 10
const KEY_SPECS_MAX_LEN = 160

function hasMostSearchedParts(parts: TopSearchedPartItem[] | undefined): boolean {
  return Boolean(parts?.some((part) => part.mpn.trim()))
}

function sanitizeSlugPart(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/** Matches import_part_pages.slug_from_entity_key for part hrefs. */
export function slugFromEntityKey(code: string, manufacturerId: string): string {
  let slug = sanitizeSlugPart(code)
  if (manufacturerId) {
    const mfgSlug = sanitizeSlugPart(manufacturerId)
    slug = slug ? `${slug}-${mfgSlug}` : mfgSlug
  }
  return slug || 'part'
}

function firstNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function resolveCategoryLabel(item: Record<string, unknown>, locale?: AppLocale): string {
  return resolveSeoCategoryLabelFromItem(item, locale, 'Component')
}

function buildCatalogLabelMap(
  items: Array<Record<string, unknown>>,
  locale: AppLocale,
): Map<string, string> {
  const labels = new Map<string, string>()
  for (const item of items) {
    const mpn = firstNonEmpty(item.code, item.mpn).toLowerCase()
    if (!mpn) continue
    labels.set(mpn, resolveCategoryLabel(item, locale))
  }
  return labels
}

function patchMostSearchedPartCategories(
  parts: TopSearchedPartItem[],
  locale: AppLocale,
  labelsByMpn: Map<string, string>,
): TopSearchedPartItem[] {
  return patchSeoCategoryLabels(
    parts,
    locale,
    labelsByMpn,
    (part) => part.mpn,
  )
}

function readManufacturerInfo(item: Record<string, unknown>): Record<string, unknown> | null {
  const info = item.manufacturer_info
  return info && typeof info === 'object' && !Array.isArray(info)
    ? (info as Record<string, unknown>)
    : null
}

/**
 * Maps ES product hits to mostSearchedParts rows.
 * v1 runtime fallback uses catalog samples (code sort), not PG demand scores.
 */
export function mapManufacturerProductItemsToMostSearchedParts(
  items: Array<Record<string, unknown>>,
  options: { manufacturerName: string; manufacturerId: string; locale?: AppLocale },
): TopSearchedPartItem[] {
  const { manufacturerName, manufacturerId, locale } = options
  const out: TopSearchedPartItem[] = []

  for (const [idx, item] of items.slice(0, MOST_SEARCHED_PARTS_LIMIT).entries()) {
    const mpn = firstNonEmpty(item.code, item.mpn)
    if (!mpn) continue

    const info = readManufacturerInfo(item)
    const partManufacturerId = firstNonEmpty(
      info?.manufacturer_id,
      item.manufacturer_id,
      item.manufacturerId,
      manufacturerId,
    )
    const summary = firstNonEmpty(item.summary)
    const interest = Math.max(10, 100 - idx * 12)

    out.push({
      mpn,
      href: `/parts/${slugFromEntityKey(mpn, partManufacturerId)}`,
      category: resolveCategoryLabel(item, locale),
      manufacturer: manufacturerName,
      keySpecs: summary ? summary.slice(0, KEY_SPECS_MAX_LEN) : undefined,
      interest,
    })
  }

  return out
}

/**
 * Backfills empty representative parts and normalizes en/de category labels from ES catalog.
 */
export async function enrichManufacturerMostSearchedParts(
  page: ManufacturerIntelligencePage,
  locale: AppLocale,
  options?: { previewToken?: string },
): Promise<ManufacturerIntelligencePage> {
  const manufacturerId = page.manufacturerId?.trim()
  const needsBackfill = !hasMostSearchedParts(page.mostSearchedParts)
  const needsLabelPatch = prefersLatinCategoryLabels(locale)
  if (!needsBackfill && !needsLabelPatch) return page
  if (!manufacturerId) return page

  try {
    const items = await fetchManufacturerProductItems(manufacturerId, {
      pageSize: needsLabelPatch ? 50 : MOST_SEARCHED_PARTS_LIMIT,
      previewToken: options?.previewToken,
    })
    const labelsByMpn = buildCatalogLabelMap(items, locale)

    let mostSearchedParts = page.mostSearchedParts
    if (needsLabelPatch && mostSearchedParts.length > 0) {
      mostSearchedParts = patchMostSearchedPartCategories(mostSearchedParts, locale, labelsByMpn)
    }

    if (needsBackfill) {
      const catalogParts = mapManufacturerProductItemsToMostSearchedParts(items, {
        manufacturerName: page.name,
        manufacturerId,
        locale,
      })
      if (catalogParts.length > 0) {
        mostSearchedParts = catalogParts
      }
    }

    if (!mostSearchedParts.length) return page
    return { ...page, mostSearchedParts }
  } catch (error) {
    console.error('[enrichManufacturerMostSearchedParts]', { slug: page.slug, locale, error })
    return page
  }
}
