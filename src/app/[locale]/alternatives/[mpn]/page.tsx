import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlternativeIntelligenceView } from '@/components/seo/alternative-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAlternativePage } from '@/data/mock'
import { mapPublicSeoPageToAlternativePage } from '@/lib/map-public-seo-page'
import { parseAppLocale } from '@/lib/page-locale'
import { resolvePublicSeoMetadata } from '@/lib/resolve-seo-page-meta'
import { fetchSeoPage } from '@/lib/seo-api'
import { buildPageMetadataFromApi } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; mpn: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: localeParam, mpn } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams

  const apiPage = await fetchSeoPage(mpn, { locale, previewToken: sp.preview })
  if (apiPage && apiPage.pageType === 'alternative') {
    return buildPageMetadataFromApi({
      title: apiPage.title,
      description: apiPage.description,
      canonicalPath: apiPage.canonicalPath || `/alternatives/${mpn}`,
      slug: mpn,
      robots: apiPage.robots,
      ogImage: apiPage.ogImage,
      locale,
    })
  }

  const page = getMockAlternativePage(mpn)
  return resolvePublicSeoMetadata({
    slug: mpn,
    locale,
    pageType: 'alternative',
    fallbackMeta: page?.meta ?? null,
    notFoundTitle: 'Alternatives not found | PartGenie',
  })
}

export default async function AlternativePage({ params, searchParams }: PageProps) {
  const { locale: localeParam, mpn } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams

  const apiPage = await fetchSeoPage(mpn, { locale, previewToken: sp.preview })
  if (apiPage && apiPage.pageType === 'alternative') {
    const page = mapPublicSeoPageToAlternativePage(apiPage, locale)
    return (
      <SeoPageShell
        breadcrumbs={page.breadcrumbs}
        faq={page.faq}
        locale={locale}
        showPreviewBanner={Boolean(sp.preview)}
        pageContext={{ slug: page.slug, mpn: page.mpn, kind: 'alternative' }}
      >
        <AlternativeIntelligenceView page={page} />
      </SeoPageShell>
    )
  }

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
