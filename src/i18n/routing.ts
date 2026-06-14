import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // hreflang lives in HTML via buildHreflangAlternates (SEO_SITE_ORIGIN); skip middleware Link header.
  alternateLinks: false,
})

export type AppLocale = (typeof routing.locales)[number]
