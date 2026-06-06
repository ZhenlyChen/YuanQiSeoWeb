import type { CategoryHubPage, TopSearchedPartItem } from '@/types/seo-intelligence'

/** Maps category hub popular rows (or fallback most-searched) into hot-parts table rows. */
export function resolveCategoryHotParts(page: CategoryHubPage): TopSearchedPartItem[] {
  if (page.popularParts.length > 0) {
    return page.popularParts.map((row, index) => ({
      mpn: row.mpn,
      href: row.partHref,
      category: row.category,
      manufacturer: row.manufacturer,
      keySpecs: row.keySpecs,
      commonUse: row.commonUse,
      interest: Math.max(10, 100 - index * 6),
    }))
  }

  return page.mostSearchedParts
}
