import type { PublicDiscoverFeedItem } from '@/lib/discover-api'

export type DiscoverFeedLayoutBlock<T> =
  | { type: 'solo'; variant: 'text-first' | 'image-first'; item: T }
  | { type: 'grid'; items: T[] }

const GRID_SIZE = 3

export function isDiscoverFeaturedItem(item: PublicDiscoverFeedItem): boolean {
  return item.cardType === 'featured' || Boolean(item.industry?.featured)
}

/** Rhythm groups: solo (text|image) ? 3-col grid ? solo (image|text), repeat. Featured fill solo slots first. */
export function buildDiscoverFeedLayout<T>(
  items: T[],
  isFeatured: (item: T) => boolean,
): DiscoverFeedLayoutBlock<T>[][] {
  const featuredQ = items.filter(isFeatured)
  const regularQ = items.filter((item) => !isFeatured(item))

  const takeSolo = (): T | undefined => featuredQ.shift() ?? regularQ.shift()
  const takeGrid = (): T | undefined => regularQ.shift() ?? featuredQ.shift()

  const groups: DiscoverFeedLayoutBlock<T>[][] = []

  while (featuredQ.length > 0 || regularQ.length > 0) {
    const soloFirst = takeSolo()
    if (!soloFirst) break

    const group: DiscoverFeedLayoutBlock<T>[] = [
      { type: 'solo', variant: 'text-first', item: soloFirst },
    ]

    const gridItems: T[] = []
    for (let i = 0; i < GRID_SIZE; i += 1) {
      const next = takeGrid()
      if (next) gridItems.push(next)
    }
    if (gridItems.length > 0) {
      group.push({ type: 'grid', items: gridItems })
    }

    const soloSecond = takeSolo()
    if (soloSecond) {
      group.push({ type: 'solo', variant: 'image-first', item: soloSecond })
    }

    groups.push(group)
  }

  return groups
}

export function feedItemKey(item: PublicDiscoverFeedItem): string {
  if (item.industry) return `industry-${item.industry.id}`
  if (item.community) return `community-${item.community.articleId}`
  return `feed-${item.cardType}`
}
