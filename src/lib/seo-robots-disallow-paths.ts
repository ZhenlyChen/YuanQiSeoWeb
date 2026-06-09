import { routing } from '@/i18n/routing'

/** Dev / preview paths disallowed in robots.txt (en default locale has no prefix). */
export function seoRobotsDisallowPaths(): string[] {
  const paths = ['/dev/', '/dev/seo-previews']

  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue
    paths.push(`/${locale}/dev/`, `/${locale}/dev/seo-previews`)
  }

  return paths
}
