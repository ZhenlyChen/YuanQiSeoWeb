import { slugFromEntityKey } from '@/lib/manufacturer-most-searched-fallback'
import type { CategoryHubPage, CategoryPopularPartRow, TopSearchedPartItem } from '@/types/seo-intelligence'

/** Below this count we backfill from ES catalog samples on SSR. */
export const MIN_CATEGORY_HOT_PARTS = 3

const MAX_CATEGORY_HOT_PARTS = 12

type PopularPartRowInput = CategoryPopularPartRow & { href?: string }

export function resolvePopularPartHref(row: PopularPartRowInput): string {
  const href = row.partHref?.trim() || row.href?.trim()
  if (href) return href
  const mpn = row.mpn?.trim()
  if (mpn) return `/parts/${slugFromEntityKey(mpn, '')}`
  return '#'
}

function normalizeTopSearchedHref(item: TopSearchedPartItem): string {
  return item.href?.trim() || (item.mpn?.trim() ? `/parts/${slugFromEntityKey(item.mpn, '')}` : '#')
}

export function countCategoryHotParts(page: CategoryHubPage): number {
  const mpns = new Set<string>()
  for (const row of page.popularParts ?? []) {
    const mpn = row.mpn?.trim().toLowerCase()
    if (mpn) mpns.add(mpn)
  }
  for (const part of page.mostSearchedParts ?? []) {
    const mpn = part.mpn?.trim().toLowerCase()
    if (mpn) mpns.add(mpn)
  }
  return mpns.size
}

function mapPopularRowToTopSearched(row: CategoryPopularPartRow, index: number): TopSearchedPartItem {
  return {
    mpn: row.mpn,
    href: resolvePopularPartHref(row),
    category: row.category,
    manufacturer: row.manufacturer,
    keySpecs: row.keySpecs,
    commonUse: row.commonUse,
    interest: Math.max(10, 100 - index * 6),
  }
}

/**
 * Merges published popular parts (intelligence pages) with catalog fallbacks.
 * popularParts alone may be sparse when few part pages are published in a category.
 */
export function resolveCategoryHotParts(page: CategoryHubPage): TopSearchedPartItem[] {
  const seen = new Set<string>()
  const out: TopSearchedPartItem[] = []

  const add = (item: TopSearchedPartItem) => {
    const key = item.mpn.trim().toLowerCase()
    if (!key || seen.has(key) || out.length >= MAX_CATEGORY_HOT_PARTS) return
    seen.add(key)
    out.push({
      ...item,
      href: normalizeTopSearchedHref(item),
      interest: item.interest ?? Math.max(10, 100 - out.length * 6),
    })
  }

  for (const [index, row] of page.popularParts.entries()) {
    add(mapPopularRowToTopSearched(row, index))
  }

  for (const item of page.mostSearchedParts) {
    add(item)
  }

  return out
}
