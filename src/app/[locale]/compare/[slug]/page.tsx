import type { Metadata } from 'next'
import { CompetitorCompareView } from '@/components/seo/competitor-compare-view'
import { CompareIntelligenceView } from '@/components/seo/compare-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getCompetitorComparePage } from '@/data/competitor-comparisons'
import { getMockComparePage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { SEO_DEFERRED, withDeferredRobots } from '@/lib/seo-indexing-policy'
import { seoNotFound } from '@/lib/seo-not-found'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const competitorPage = getCompetitorComparePage(slug)
  const mockPage = getMockComparePage(slug)
  const fallbackMeta = competitorPage?.meta ?? mockPage?.meta ?? null

  if (!fallbackMeta) {
    return { title: 'Compare page not found | PartGenie', robots: { index: false, follow: false } }
  }

  const metadata = buildPageMetadata(fallbackMeta, locale)

  if (SEO_DEFERRED.mpnCompare || (competitorPage && SEO_DEFERRED.competitorCompare)) {
    return withDeferredRobots(metadata)
  }

  return metadata
}

export default async function ComparePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const competitorPage = getCompetitorComparePage(slug)
  if (competitorPage) {
    return (
      <SeoPageShell
        breadcrumbs={competitorPage.breadcrumbs}
        faq={competitorPage.faq}
        hideFloatingCta
        locale={locale}
        pageContext={{
          slug: competitorPage.slug,
          mpn: `PartGenie vs ${competitorPage.competitor.shortName}`,
          kind: 'compare',
        }}
      >
        <CompetitorCompareView page={competitorPage} />
      </SeoPageShell>
    )
  }

  const page = getMockComparePage(slug)
  if (!page) {
    seoNotFound({
      kind: 'compare',
      reason: 'not_found',
      slug,
      locale,
      path: `/compare/${slug}`,
    })
  }

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      locale={locale}
      pageContext={{
        slug: page.slug,
        mpn: `${page.partA.mpn} vs ${page.partB.mpn}`,
        kind: 'compare',
      }}
    >
      <CompareIntelligenceView page={page} />
    </SeoPageShell>
  )
}
