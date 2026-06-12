import type { AppLocale } from '@/i18n/routing'
import { getL1Categories } from '@/lib/category-taxonomy'
import { localizePath } from '@/lib/localized-path'
import type { PublicSitemapEntry } from '@/lib/seo-api'
import { SEO_SITE_ORIGIN } from '@/lib/site'

const MANUFACTURER_LETTERS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0-9',
]

export function localizedSitemapUrl(path: string, locale: AppLocale): string {
  return `${SEO_SITE_ORIGIN}${localizePath(path, locale)}`
}

export function buildStaticHubPaths(): string[] {
  const paths = new Set<string>(['/categories', '/manufacturers', '/insights'])

  for (const l1 of getL1Categories()) {
    if (!l1.published) continue
    paths.add(`/manufacturers/category/${l1.slug}`)
  }

  for (const letter of MANUFACTURER_LETTERS) {
    paths.add(`/manufacturers/letter/${letter}`)
  }

  return [...paths].sort()
}

export function filterSitemapEntries(
  entries: PublicSitemapEntry[],
  filter: { locale?: AppLocale; pageTypes?: string[]; excludePageTypes?: string[] },
): PublicSitemapEntry[] {
  return entries.filter((entry) => {
    if (filter.locale && entry.locale !== filter.locale) return false
    if (filter.pageTypes?.length && !filter.pageTypes.includes(entry.pageType)) return false
    if (filter.excludePageTypes?.includes(entry.pageType)) return false
    return true
  })
}

export function hubSitemapEntries(locales: AppLocale[] = ['en', 'de']): { url: string; lastModified?: Date }[] {
  const paths = buildStaticHubPaths()
  const rows: { url: string; lastModified?: Date }[] = []

  for (const locale of locales) {
    for (const path of paths) {
      rows.push({ url: localizedSitemapUrl(path, locale) })
    }
  }

  return rows
}

export function partSitemapEntries(
  entries: PublicSitemapEntry[],
  locale: AppLocale,
): { url: string; lastModified?: Date }[] {
  return filterSitemapEntries(entries, {
    locale,
    pageTypes: ['part', 'manufacturer', 'category', 'alternative'],
  }).map((entry) => ({
    url: localizedSitemapUrl(entry.canonicalPath, locale),
  }))
}
