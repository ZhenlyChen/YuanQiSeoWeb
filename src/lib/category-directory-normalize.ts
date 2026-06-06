import { directoryLetterForName } from '@/lib/manufacturer-directory'
import { getL1Categories } from '@/lib/category-taxonomy'
import type { CategoryDirectoryItem } from '@/types/seo-intelligence'
import type { CategoryDirectoryApiPage } from '@/lib/seo-api'

const taxonomyBySlug = new Map(getL1Categories().map((category) => [category.slug, category]))

export function normalizeCategoryDirectoryItems(
  items: CategoryDirectoryApiPage['items'],
): CategoryDirectoryItem[] {
  return items.map((item) => {
    const taxonomy = taxonomyBySlug.get(item.slug)
    const href =
      item.href && item.href.startsWith('/') ? item.href : `/categories/${item.slug}`

    return {
      slug: item.slug,
      name: item.name || taxonomy?.name || item.slug,
      description: item.description || taxonomy?.description || '',
      letter: item.letter || directoryLetterForName(item.name || taxonomy?.name || item.slug),
      href,
      iconId: item.iconId || taxonomy?.iconId || 'passives',
      subcategoryCount: item.subcategoryCount || taxonomy?.l2.length || 0,
      partCount: Number(item.partCount) || taxonomy?.partCount || 0,
      published: item.published ?? taxonomy?.published ?? true,
      sortRank: item.sortRank ?? taxonomy?.sortRank,
    }
  })
}
