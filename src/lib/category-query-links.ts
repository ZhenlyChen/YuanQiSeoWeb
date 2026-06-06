import { seoChatDeepLinkUrl } from '@/lib/tool-urls'
import type { CategoryQueryChip } from '@/types/seo-intelligence'

export function resolveCategoryQueryHref(
  slug: string,
  item: CategoryQueryChip,
  campaign = 'category_query',
): string {
  if (item.href?.trim()) {
    return item.href.trim()
  }

  const query = item.chatQuery?.trim() || item.label.trim()
  const base = seoChatDeepLinkUrl(slug, campaign)
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}q=${encodeURIComponent(query)}`
}
