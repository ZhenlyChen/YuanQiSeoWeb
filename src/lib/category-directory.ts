import {
  directoryLetterForCategory,
  getL1Categories,
  type CategoryL1Definition,
} from '@/lib/category-taxonomy'
import type { CategoryDirectoryItem } from '@/types/seo-intelligence'

export function buildCategoryDirectoryItems(
  categories: CategoryL1Definition[] = getL1Categories(),
): CategoryDirectoryItem[] {
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description,
    letter: directoryLetterForCategory(category.name),
    href: `/categories/${category.slug}`,
    iconId: category.iconId,
    iconUrl: category.iconUrl,
    subcategoryCount: category.l2.length,
    partCount: category.partCount,
    published: category.published,
    sortRank: category.sortRank,
  }))
}

export function groupCategoriesByLetter(
  items: CategoryDirectoryItem[],
): { letter: string; items: CategoryDirectoryItem[] }[] {
  const groups = new Map<string, CategoryDirectoryItem[]>()
  for (const item of items) {
    const letter = item.letter || '#'
    const bucket = groups.get(letter) ?? []
    bucket.push(item)
    groups.set(letter, bucket)
  }

  const letters = [...groups.keys()].sort((a, b) => {
    if (a === '#') return 1
    if (b === '#') return -1
    return a.localeCompare(b)
  })

  return letters.map((letter) => ({
    letter,
    items: (groups.get(letter) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
  }))
}

export function getCategoryDirectoryHeroMarqueeItems(items: CategoryDirectoryItem[]): CategoryDirectoryItem[] {
  return [...items]
    .filter((item) => item.published)
    .sort((a, b) => (a.sortRank ?? 999) - (b.sortRank ?? 999))
    .slice(0, 12)
}
