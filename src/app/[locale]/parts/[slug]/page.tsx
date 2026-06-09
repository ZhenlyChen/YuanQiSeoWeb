import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ComponentIntelligenceView } from '@/components/seo/component-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockComponentPage } from '@/data/mock'
import { isMockComponentSlug } from '@/lib/mock-seo-pages'
import {
  mapPublicSeoPageToComponentPage,
  productJsonLdFromPublicPage,
} from '@/lib/map-public-seo-page'
import { parseAppLocale } from '@/lib/page-locale'
import { fetchSeoPage } from '@/lib/seo-api'
import { buildPageMetadata, buildPageMetadataFromApi } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams

  if (isMockComponentSlug(slug)) {
    const page = getMockComponentPage(slug)
    if (page) return buildPageMetadata(page.meta, locale)
  }

  const page = await fetchSeoPage(slug, {
    locale,
    previewToken: sp.preview,
  })
  if (!page) {
    return { title: 'Part not found | PartGenie', robots: { index: false, follow: false } }
  }

  return buildPageMetadataFromApi({
    title: page.title,
    description: page.description,
    canonicalPath: page.canonicalPath || `/parts/${slug}`,
    slug,
    robots: page.robots,
    ogImage: page.ogImage,
    locale,
  })
}

export default async function PartPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams
  const t = await getTranslations('common')

  if (isMockComponentSlug(slug)) {
    const mockPage = getMockComponentPage(slug)
    if (!mockPage) notFound()
    return (
      <SeoPageShell
        breadcrumbs={mockPage.breadcrumbs}
        faq={mockPage.faq}
        locale={locale}
        includeFaqJsonLd={false}
        product={{
          name: mockPage.mpn,
          mpn: mockPage.mpn,
          brandName: mockPage.manufacturer,
          description: mockPage.meta.description,
          canonicalPath: mockPage.meta.canonicalPath,
        }}
        pageContext={{ slug: mockPage.slug, mpn: mockPage.mpn, kind: 'part' }}
      >
        <ComponentIntelligenceView page={mockPage} substitutesEmptyMessage={t('substitutesEmpty')} />
      </SeoPageShell>
    )
  }

  const apiPage = await fetchSeoPage(slug, {
    locale,
    previewToken: sp.preview,
  })
  if (!apiPage) notFound()

  const page = mapPublicSeoPageToComponentPage(apiPage, locale)

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      locale={locale}
      includeFaqJsonLd={false}
      product={productJsonLdFromPublicPage(apiPage)}
      showPreviewBanner={Boolean(sp.preview)}
      pageContext={{ slug: page.slug, mpn: page.mpn, kind: 'part' }}
    >
      <ComponentIntelligenceView page={page} substitutesEmptyMessage={t('substitutesEmpty')} />
    </SeoPageShell>
  )
}
