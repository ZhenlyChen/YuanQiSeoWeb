import type { AppLocale } from '@/i18n/routing'
import { formatCategoryLabel, formatCategoryLabelForDisplay } from '@/lib/category-display'
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
  const categoryRaw = firstNonEmpty(item.category_str, item.category)
  return formatCategoryLabel(categoryRaw || item.category, { locale }) || 'Component'
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
 * SSR fallback when hub content_json has empty mostSearchedParts but ES has products.
 * Data source: GET component/manufacturer/products (code.keyword asc) - same semantic as
 * import-time ES representative_part_context, not PG manufacturer_mpn_demand_score.
 */
export async function enrichManufacturerMostSearchedParts(
  page: ManufacturerIntelligencePage,
  locale: AppLocale,
  options?: { previewToken?: string },
): Promise<ManufacturerIntelligencePage> {
  if (hasMostSearchedParts(page.mostSearchedParts)) return page

  const manufacturerId = page.manufacturerId?.trim()
  if (!manufacturerId) return page

  try {
    const items = await fetchManufacturerProductItems(manufacturerId, {
      pageSize: MOST_SEARCHED_PARTS_LIMIT,
      previewToken: options?.previewToken,
    })
    const mostSearchedParts = mapManufacturerProductItemsToMostSearchedParts(items, {
      manufacturerName: page.name,
      manufacturerId,
      locale,
    })
    if (!mostSearchedParts.length) return page

    return { ...page, mostSearchedParts }
  } catch (error) {
    console.error('[enrichManufacturerMostSearchedParts]', { slug: page.slug, locale, error })
    return page
  }
}
