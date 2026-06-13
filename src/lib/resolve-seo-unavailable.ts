import type { AppLocale } from '@/i18n/routing'
import { fetchSeoPageAvailability } from '@/lib/seo-api'
import { seoNotFound, type SeoPageKind } from '@/lib/seo-not-found'

export async function rejectUnavailableSeoPage(params: {
  slug: string
  locale: AppLocale
  kind: SeoPageKind
  expectedPageType?: string
  path?: string
}): Promise<never> {
  const availability = await fetchSeoPageAvailability(params.slug, params.locale)

  if (availability?.exists) {
    if (
      params.expectedPageType &&
      availability.pageType &&
      availability.pageType !== params.expectedPageType
    ) {
      seoNotFound({
        kind: params.kind,
        reason: 'wrong_page_type',
        slug: params.slug,
        locale: params.locale,
        path: params.path,
        pageType: availability.pageType,
        status: availability.status,
        entityKey: availability.entityKey,
        expectedPageType: params.expectedPageType,
      })
    }

    if (!availability.published) {
      seoNotFound({
        kind: params.kind,
        reason: 'not_published',
        slug: params.slug,
        locale: params.locale,
        path: params.path,
        pageType: availability.pageType,
        status: availability.status,
        entityKey: availability.entityKey,
      })
    }
  }

  seoNotFound({
    kind: params.kind,
    reason: availability ? 'not_found' : 'api_error',
    slug: params.slug,
    locale: params.locale,
    path: params.path,
  })
}
