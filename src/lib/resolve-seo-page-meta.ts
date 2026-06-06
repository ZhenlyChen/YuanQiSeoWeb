import type { Metadata } from 'next'
import type { AppLocale } from '@/i18n/routing'
import { fetchSeoPage } from '@/lib/seo-api'
import { buildPageMetadata, buildPageMetadataFromApi } from '@/lib/seo-meta'
import type { SeoMeta } from '@/types/seo-intelligence'

export async function resolvePublicSeoMetadata(input: {
  slug: string
  locale: AppLocale
  pageType?: string
  fallbackMeta?: SeoMeta | null
  notFoundTitle?: string
}): Promise<Metadata> {
  const apiPage = await fetchSeoPage(input.slug, { locale: input.locale })
  if (apiPage && (!input.pageType || apiPage.pageType === input.pageType)) {
    return buildPageMetadataFromApi({
      title: apiPage.title,
      description: apiPage.description,
      canonicalPath: apiPage.canonicalPath,
      slug: apiPage.slug,
      robots: apiPage.robots,
      locale: input.locale,
    })
  }
  if (input.fallbackMeta) {
    return buildPageMetadata(input.fallbackMeta, input.locale)
  }
  return {
    title: input.notFoundTitle ?? 'Page not found | PartGenie',
    robots: { index: false, follow: false },
  }
}
