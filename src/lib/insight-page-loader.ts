import type { AppLocale } from '@/i18n/routing'
import { permanentRedirect } from 'next/navigation'
import {
  fetchDiscoverItemBySlug,
  resolveDiscoverInsightSlug,
  type PublicDiscoverItemDetail,
} from '@/lib/discover-api'
import { localizePath } from '@/lib/localized-path'

export async function loadPublishedInsight(
  slug: string,
  locale: AppLocale,
  previewToken?: string,
): Promise<{ item: PublicDiscoverItemDetail; canonicalSlug: string } | null> {
  const resolved = await resolveDiscoverInsightSlug(slug, { previewToken })
  if (!resolved) return null
  if (resolved.kind === 'redirect' && resolved.slug) {
    permanentRedirect(localizePath(`/insights/${resolved.slug}`, locale))
  }
  if (resolved.kind === 'item' && resolved.item) {
    return {
      item: resolved.item,
      canonicalSlug: resolved.item.insightSlug?.trim() || slug,
    }
  }
  return null
}

export async function loadInsightForMetadata(
  slug: string,
  previewToken?: string,
): Promise<PublicDiscoverItemDetail | null> {
  if (previewToken) {
    return fetchDiscoverItemBySlug(slug, { previewToken })
  }
  const resolved = await resolveDiscoverInsightSlug(slug)
  if (!resolved || resolved.kind !== 'item' || !resolved.item) {
    return null
  }
  return resolved.item
}
