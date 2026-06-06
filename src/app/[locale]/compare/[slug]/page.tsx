import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CompareIntelligenceView } from '@/components/seo/compare-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockComparePage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockComparePage(slug)
  if (!page) return { title: 'Compare page not found | PartGenie' }
  return buildPageMetadata(page.meta, locale)
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params
  const page = getMockComparePage(slug)
  if (!page) notFound()

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
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
