import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CompetitorCompareView } from '@/components/seo/competitor-compare-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getCompetitorComparePage } from '@/data/competitor-comparisons'
import { parseAppLocale } from '@/lib/page-locale'
import { SEO_DEFERRED, withDeferredRobots } from '@/lib/seo-indexing-policy'
import { resolvePublicSeoMetadata } from '@/lib/resolve-seo-page-meta'

export async function competitorCompareMetadata(input: {
  localeParam: string
  slug: string
}): Promise<Metadata> {
  const locale = parseAppLocale(input.localeParam)
  const page = getCompetitorComparePage(input.slug)

  if (!page) {
    return {
      title: 'Compare page not found | PartGenie',
      robots: { index: false, follow: false },
    }
  }

  const metadata = await resolvePublicSeoMetadata({
    slug: page.slug,
    locale,
    pageType: 'compare',
    fallbackMeta: page.meta,
    notFoundTitle: 'Compare page not found | PartGenie',
  })

  if (SEO_DEFERRED.competitorCompare) {
    return withDeferredRobots(metadata)
  }

  return metadata
}

export async function CompetitorCompareRoute({
  localeParam,
  slug,
}: {
  localeParam: string
  slug: string
}) {
  const locale = parseAppLocale(localeParam)
  const page = getCompetitorComparePage(slug)

  if (!page) notFound()

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      hideFloatingCta
      locale={locale}
      pageContext={{
        slug: page.slug,
        mpn: `PartGenie vs ${page.competitor.shortName}`,
        kind: 'compare',
      }}
    >
      <CompetitorCompareView page={page} />
    </SeoPageShell>
  )
}
