import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CompetitorCompareView } from '@/components/seo/competitor-compare-view'
import { CompareIntelligenceView } from '@/components/seo/compare-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getCompetitorComparePage } from '@/data/competitor-comparisons'
import { getMockComparePage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { resolvePublicSeoMetadata } from '@/lib/resolve-seo-page-meta'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const competitorPage = getCompetitorComparePage(slug)
  if (competitorPage) {
    return resolvePublicSeoMetadata({
      slug: competitorPage.slug,
      locale,
      pageType: 'compare',
      fallbackMeta: competitorPage.meta,
      notFoundTitle: 'Compare page not found | PartGenie',
    })
  }
  const page = getMockComparePage(slug)
  return resolvePublicSeoMetadata({
    slug,
    locale,
    pageType: 'compare',
    fallbackMeta: page?.meta ?? null,
    notFoundTitle: 'Compare page not found | PartGenie',
  })
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
  if (!page) notFound()

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
