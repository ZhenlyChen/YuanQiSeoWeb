import type {
  ManufacturerDirectoryCategoryRef,
  ManufacturerDirectoryFacet,
  ManufacturerDirectoryItem,
} from '@/types/seo-intelligence'

export type DirectoryFilter = {
  categoryL1?: string
  letter?: string
}

export const DIRECTORY_AZ_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export const DIRECTORY_AZ_NUMERIC = '0-9'

export function directoryLetterForName(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '#'
  const first = trimmed.charAt(0).toUpperCase()
  if (/[A-Z]/.test(first)) return first
  if (/[0-9]/.test(first)) return '#'
  return '#'
}

export function filterDirectoryItems(
  items: ManufacturerDirectoryItem[],
  filter: DirectoryFilter,
): ManufacturerDirectoryItem[] {
  return items.filter((item) => {
    if (filter.categoryL1) {
      const match = item.primaryCategoryL1.some((category) => category.slug === filter.categoryL1)
      if (!match) return false
    }
    if (filter.letter) {
      const normalized = filter.letter.toLowerCase()
      if (normalized === '0-9' || normalized === '#') {
        return item.letter === '#'
      }
      return item.letter.toLowerCase() === normalized
    }
    return true
  })
}

export function buildCategoryFacets(items: ManufacturerDirectoryItem[]): ManufacturerDirectoryFacet[] {
  const counts = new Map<string, ManufacturerDirectoryFacet>()
  for (const item of items) {
    for (const category of item.primaryCategoryL1) {
      const existing = counts.get(category.slug)
      if (existing) {
        existing.count += 1
      } else {
        counts.set(category.slug, { slug: category.slug, label: category.label, count: 1 })
      }
    }
  }
  return [...counts.values()].sort((a, b) => a.label.localeCompare(b.label))
}

export function groupDirectoryByLetter(
  items: ManufacturerDirectoryItem[],
): { letter: string; items: ManufacturerDirectoryItem[] }[] {
  const groups = new Map<string, ManufacturerDirectoryItem[]>()
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

export function sortDirectoryItems(
  items: ManufacturerDirectoryItem[],
  sort: 'popular' | 'name',
): ManufacturerDirectoryItem[] {
  const copy = [...items]
  if (sort === 'name') {
    return copy.sort((a, b) => a.name.localeCompare(b.name))
  }
  return copy.sort((a, b) => {
    const rankA = a.sortRank ?? 9999
    const rankB = b.sortRank ?? 9999
    if (rankA !== rankB) return rankA - rankB
    return a.name.localeCompare(b.name)
  })
}

/** Top manufacturers for directory hero marquee (query-carousel style). */
export function getDirectoryHeroMarqueeItems(
  items: ManufacturerDirectoryItem[],
  limit = 14,
): ManufacturerDirectoryItem[] {
  return sortDirectoryItems(items, 'popular').slice(0, limit)
}

export function matchesDirectoryLocalSearch(item: ManufacturerDirectoryItem, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true
  const haystack = [
    item.name,
    item.shortName,
    item.subtitle,
    ...(item.aliases ?? []),
    ...item.primaryCategoryL1.map((category) => category.label),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(normalized)
}

export function categoryRef(slug: string, label: string): ManufacturerDirectoryCategoryRef {
  return { slug, label }
}
