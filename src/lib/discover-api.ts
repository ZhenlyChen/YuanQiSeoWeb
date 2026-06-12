import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/lib/localized-path'
import { SEO_SITE_ORIGIN } from '@/lib/site'

const apiBase = () =>
  process.env.YUANQI_API_BASE?.replace(/\/?$/, '/') ||
  process.env.NEXT_PUBLIC_YUANQI_API_BASE?.replace(/\/?$/, '/') ||
  'http://127.0.0.1:8080/api/v1/'

type ApiResponse<T> = { code: number; data: T; msg: string }

export type PublicDiscoverFeedItem = {
  cardType: string
  publishedAt: string
  industry?: {
    id: number
    headline: string
    summary: string
    categoryLabel: string
    coverImageUrl?: string
    sourceName?: string
    sourceUrl?: string
    insightSlug?: string
    featured?: boolean
  }
  community?: {
    articleId: number
    title: string
    summary: string
    tags?: string[]
    visitCount: number
  }
}

export type PublicDiscoverFeed = {
  items: PublicDiscoverFeedItem[]
  nextCursor: string
  hasMore: boolean
}

export type PublicDiscoverTrending = {
  groups: Array<{
    key: string
    title: string
    items: Array<{
      label: string
      subLabel?: string
      changePercent?: number
      entityType?: string
      entityKey?: string
      manufacturerId?: string
      mpn?: string
      logoUrl?: string
      imageUrl?: string
      tags?: string[]
    }>
  }>
}

export type PublicDiscoverItemDetail = {
  id: number
  headline: string
  summary: string
  bodyHtml?: string
  categoryLabel: string
  coverImageUrl?: string
  sourceName?: string
  sourceUrl?: string
  insightSlug?: string
  relatedComponents?: Array<{ mpn: string; manufacturerId?: string }>
  publishedAt: string
}

async function getJson<T>(path: string, options?: { cache?: RequestCache; revalidate?: number }): Promise<T | null> {
  try {
    const init: RequestInit & { next?: { revalidate: number } } = {}
    if (options?.cache) {
      init.cache = options.cache
    } else if (options?.revalidate !== undefined) {
      init.next = { revalidate: options.revalidate }
    } else {
      init.next = { revalidate: 300 }
    }
    const res = await fetch(`${apiBase()}${path}`, init)
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<T>
    if (json.code !== 200) return null
    return json.data
  } catch {
    return null
  }
}

export function fetchDiscoverFeed(
  cursor?: string,
  categoryLabel?: string,
  options?: { cache?: RequestCache; revalidate?: number },
) {
  const q = new URLSearchParams()
  q.set('pageSize', '12')
  if (cursor) q.set('cursor', cursor)
  if (categoryLabel) q.set('categoryLabel', categoryLabel)
  return getJson<PublicDiscoverFeed>(`discover/feed?${q}`, options)
}

export function fetchDiscoverCategories(options?: { cache?: RequestCache; revalidate?: number }) {
  return getJson<{ labels: string[] }>('discover/categories', options)
}

export function fetchDiscoverTrending() {
  return getJson<PublicDiscoverTrending>('discover/trending')
}

export function fetchDiscoverItemBySlug(slug: string, options?: { previewToken?: string }) {
  if (options?.previewToken) {
    return getJson<PublicDiscoverItemDetail>(
      `discover/items/by-slug/${encodeURIComponent(slug)}/preview?token=${encodeURIComponent(options.previewToken)}`,
      { cache: 'no-store' },
    )
  }
  return getJson<PublicDiscoverItemDetail>(`discover/items/by-slug/${encodeURIComponent(slug)}`)
}

export async function fetchInsightSlugs(maxPages = 5): Promise<string[]> {
  const slugs = new Set<string>()
  let cursor: string | undefined
  for (let page = 0; page < maxPages; page += 1) {
    const feed = await fetchDiscoverFeed(cursor)
    if (!feed?.items?.length) break
    for (const item of feed.items) {
      const slug = item.industry?.insightSlug?.trim()
      if (slug) slugs.add(slug)
    }
    if (!feed.hasMore || !feed.nextCursor) break
    cursor = feed.nextCursor
  }
  return [...slugs]
}

export function insightSitemapEntries(
  locales: AppLocale[],
  slugs: string[],
): { url: string }[] {
  const rows: { url: string }[] = []
  for (const locale of locales) {
    for (const slug of slugs) {
      rows.push({ url: `${SEO_SITE_ORIGIN}${localizePath(`/insights/${slug}`, locale)}` })
    }
  }
  return rows
}
