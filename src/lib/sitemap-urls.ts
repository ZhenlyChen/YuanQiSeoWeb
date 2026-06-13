import type { AppLocale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { localizePath } from '@/lib/localized-path'
import { fetchManufacturerDirectory, type PublicSitemapEntry } from '@/lib/seo-api'
import { SEO_SITE_ORIGIN } from '@/lib/site'

const MANUFACTURER_LETTERS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0-9',
]

/** Facets that exist in API but are not useful SEO landing pages. */
const SITEMAP_EXCLUDED_CATEGORY_SLUGS = new Set(['uncategorized'])

export function localizedSitemapUrl(path: string, locale: AppLocale): string {
  return `${SEO_SITE_ORIGIN}${localizePath(path, locale)}`
}

function buildBaseHubPaths(): string[] {
  const paths = new Set<string>(['/categories', '/manufacturers', '/insights'])

  for (const letter of MANUFACTURER_LETTERS) {
    paths.add(`/manufacturers/letter/${letter}`)
  }

  return [...paths].sort()
}

async function fetchManufacturerCategoryHubPaths(locale: AppLocale = 'en'): Promise<string[]> {
  const apiPage = await fetchManufacturerDirectory({ locale, pageSize: 1 })
  if (!apiPage?.categoryFacets?.length) return []

  return apiPage.categoryFacets
    .filter((facet) => facet.slug && !SITEMAP_EXCLUDED_CATEGORY_SLUGS.has(facet.slug))
    .map((facet) => `/manufacturers/category/${facet.slug}`)
    .sort()
}

/** Hub index paths for sitemap/0 — category slugs from live API facets (not static taxonomy). */
export async function buildHubPaths(locale: AppLocale = 'en'): Promise<string[]> {
  const categoryPaths = await fetchManufacturerCategoryHubPaths(locale)
  return [...new Set([...buildBaseHubPaths(), ...categoryPaths])].sort()
}

/** Hub sitemap locales: always default (en); add de only when API has published de pages. */
export function resolveHubSitemapLocales(entries: PublicSitemapEntry[]): AppLocale[] {
  const publishedLocales = new Set(
    entries
      .map((entry) => entry.locale)
      .filter((locale): locale is AppLocale => routing.locales.includes(locale as AppLocale)),
  )

  const locales: AppLocale[] = [routing.defaultLocale]
  if (publishedLocales.has('de') && routing.defaultLocale !== 'de') {
    locales.push('de')
  }
  return locales
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

export async function hubSitemapEntries(
  locales: AppLocale[],
): Promise<{ url: string; lastModified?: Date }[]> {
  const paths = await buildHubPaths('en')
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
