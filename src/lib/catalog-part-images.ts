import { buildPartImageUrlMap } from '@/lib/part-images'
import { fetchComponentListItems } from '@/lib/seo-api'
import type { TopSearchedPartItem } from '@/types/seo-intelligence'

function firstNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

export function partsNeedImageHydration(parts: TopSearchedPartItem[]): boolean {
  return parts.some((part) => part.mpn.trim() && !part.imageUrl?.trim())
}

export function patchMostSearchedPartImages(
  parts: TopSearchedPartItem[],
  imagesByMpn: Map<string, string>,
): TopSearchedPartItem[] {
  if (!imagesByMpn.size) return parts

  return parts.map((part) => {
    const key = part.mpn.trim().toLowerCase()
    const imageUrl = imagesByMpn.get(key)
    if (!imageUrl || imageUrl === part.imageUrl) return part
    return { ...part, imageUrl }
  })
}

export async function hydrateMostSearchedPartImages(
  parts: TopSearchedPartItem[],
  options: { manufacturerId?: string },
): Promise<TopSearchedPartItem[]> {
  if (!partsNeedImageHydration(parts)) return parts

  const queries = parts
    .filter((part) => part.mpn.trim() && !part.imageUrl?.trim())
    .map((part) => ({
      code: part.mpn,
      manufacturerId: options.manufacturerId,
      manufacturerNameEn: part.manufacturer,
    }))
  if (!queries.length) return parts

  const items = await fetchComponentListItems(queries)
  const imagesByMpn = buildPartImageUrlMap(items, (item) => firstNonEmpty(item.code, item.mpn))
  return patchMostSearchedPartImages(parts, imagesByMpn)
}
