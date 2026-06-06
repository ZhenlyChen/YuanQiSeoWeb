import { routing, type AppLocale } from '@/i18n/routing'
import { SEO_SITE_ORIGIN } from '@/lib/site'

export function localizePath(path: string, locale: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === routing.defaultLocale) return normalized
  return `/${locale}${normalized}`
}

export function buildHreflangAlternates(canonicalPath: string): Record<string, string> {
  const normalized = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`
  return {
    en: `${SEO_SITE_ORIGIN}${normalized}`,
    de: `${SEO_SITE_ORIGIN}/de${normalized}`,
    'x-default': `${SEO_SITE_ORIGIN}${normalized}`,
  }
}

export function openGraphLocale(locale: AppLocale): string {
  return locale === 'de' ? 'de_DE' : 'en_US'
}

export function openGraphAlternateLocale(locale: AppLocale): string {
  return locale === 'de' ? 'en_US' : 'de_DE'
}
