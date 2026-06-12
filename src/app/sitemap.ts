import type { MetadataRoute } from 'next'
import { fetchInsightSlugs, insightSitemapEntries } from '@/lib/discover-api'
import { hubSitemapEntries, partSitemapEntries } from '@/lib/sitemap-urls'
import { fetchSitemapPaths } from '@/lib/seo-api'

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }]
}

export default async function sitemap(props: { id: Promise<number | string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id)
  const now = new Date()

  if (id === 0) {
    const insightSlugs = await fetchInsightSlugs()
    const hubRows = hubSitemapEntries(['en', 'de']).map((entry) => ({
      url: entry.url,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
    const insightRows = insightSitemapEntries(['en', 'de'], insightSlugs).map((entry) => ({
      url: entry.url,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
    return [...hubRows, ...insightRows]
  }

  const { entries } = await fetchSitemapPaths()
  const locale = id === 1 ? 'en' : 'de'
  const rows = partSitemapEntries(entries, locale)

  return rows.map((entry) => ({
    url: entry.url,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: entry.url.includes('/parts/') ? 0.8 : 0.7,
  }))
}
