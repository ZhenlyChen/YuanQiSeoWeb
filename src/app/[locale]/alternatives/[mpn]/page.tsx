import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlternativeIntelligenceView } from '@/components/seo/alternative-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAlternativePage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { resolvePublicSeoMetadata } from '@/lib/resolve-seo-page-meta'

type PageProps = {
  params: Promise<{ locale: string; mpn: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, mpn } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockAlternativePage(mpn)
  return resolvePublicSeoMetadata({
    slug: mpn,
    locale,
    pageType: 'alternative',
    fallbackMeta: page?.meta ?? null,
    notFoundTitle: 'Alternatives not found | PartGenie',
  })
}

export default async function AlternativePage({ params }: PageProps) {
  const { locale: localeParam, mpn } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockAlternativePage(mpn)
  if (!page) notFound()

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      locale={locale}
      pageContext={{ slug: page.slug, mpn: page.mpn, kind: 'alternative' }}
    >
      <AlternativeIntelligenceView page={page} />
    </SeoPageShell>
  )
}
