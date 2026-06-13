import { directoryLetterForName } from '@/lib/manufacturer-directory'
import { getL1Categories } from '@/lib/category-taxonomy'
import { resolveCategoryIconUrl } from '@/lib/category-icons'
import type { CategoryDirectoryApiPage } from '@/lib/seo-api'
import type { CategoryDirectoryItem, CategoryIconId } from '@/types/seo-intelligence'

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
      iconId: (item.iconId || taxonomy?.iconId || 'passives') as CategoryIconId,
      iconUrl: resolveCategoryIconUrl(item.slug, item.iconUrl || taxonomy?.iconUrl),
      subcategoryCount: item.subcategoryCount ?? 0,
      partCount: Number(item.partCount) || 0,
      published: item.published ?? false,
      sortRank: item.sortRank,
    }
  })
}
