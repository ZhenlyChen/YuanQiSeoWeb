import { SEO_SITE_ORIGIN } from '@/lib/site'
import type { TopSearchedPartItem } from '@/types/seo-intelligence'

export function buildHubItemListFromParts(
  pageName: string,
  parts: TopSearchedPartItem[],
  limit = 12,
): { name: string; items: { name: string; url: string }[] } | undefined {
  const items = parts.slice(0, limit).map((item) => ({
    name: item.mpn,
    url: `${SEO_SITE_ORIGIN}${item.href}`,
  }))

  if (items.length === 0) return undefined

  return {
    name: `${pageName} components`,
    items,
  }
}
