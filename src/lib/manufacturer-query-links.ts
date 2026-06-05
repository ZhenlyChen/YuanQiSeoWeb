import { seoChatDeepLinkUrl } from '@/lib/tool-urls'
import type { ManufacturerQueryItem } from '@/types/seo-intelligence'

export function resolveManufacturerQueryHref(
  slug: string,
  item: ManufacturerQueryItem,
  campaign = 'manufacturer_query',
): string {
  if (item.answerHref?.trim()) {
    return item.answerHref.trim()
  }

  const query = item.chatQuery?.trim() || item.question.trim()
  const base = seoChatDeepLinkUrl(slug, campaign)
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}q=${encodeURIComponent(query)}`
}
