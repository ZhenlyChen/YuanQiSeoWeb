import type { Metadata } from 'next'
import { ManufacturerHeroBanner } from '@/components/seo/manufacturer-hero-banner'
import { ManufacturerQueryCarousel } from '@/components/seo/manufacturer-query-carousel'
import { ManufacturerIntelligenceView } from '@/components/seo/manufacturer-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockManufacturerPage } from '@/data/mock'
import { mapPublicSeoPageToManufacturerPage } from '@/lib/map-public-seo-page'
import { enrichComparableManufacturerLogos } from '@/lib/enrich-comparable-manufacturer-logos'
import { enrichManufacturerCatalogCategories } from '@/lib/manufacturer-catalog-fallback'
import { enrichManufacturerMostSearchedParts } from '@/lib/manufacturer-most-searched-fallback'
import { isMockManufacturerSlug } from '@/lib/mock-seo-pages'
import { parseAppLocale } from '@/lib/page-locale'
import { rejectUnavailableSeoPage } from '@/lib/resolve-seo-unavailable'
import { seoNotFound } from '@/lib/seo-not-found'
import { resolveManufacturerHeroSubtitle } from '@/lib/manufacturer-hero-subtitle'
import { fetchSeoPage } from '@/lib/seo-api'
import { buildHubItemListFromParts } from '@/lib/hub-item-list-from-parts'
import { buildPageMetadata, buildPageMetadataFromApi } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams

  if (isMockManufacturerSlug(slug)) {
    const page = getMockManufacturerPage(slug)
    if (page) return buildPageMetadata(page.meta, locale)
  }

  const apiPage = await fetchSeoPage(slug, {
    locale,
    previewToken: sp.preview,
  })
  if (!apiPage) {
    return { title: 'Manufacturer not found | PartGenie', robots: { index: false, follow: false } }
  }

  return buildPageMetadataFromApi({
    title: apiPage.title,
    description: apiPage.description,
    canonicalPath: apiPage.canonicalPath || `/manufacturers/${slug}`,
    slug,
    robots: apiPage.robots,
    ogImage: apiPage.ogImage,
    locale,
  })
}

export default async function ManufacturerPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams

  if (isMockManufacturerSlug(slug) && !sp.preview) {
    const mockPage = getMockManufacturerPage(slug)
    if (!mockPage) {
      seoNotFound({
        kind: 'manufacturer',
        reason: 'not_found',
        slug,
        locale,
        path: `/manufacturers/${slug}`,
      })
    }
    const heroSubtitle = resolveManufacturerHeroSubtitle(mockPage)
    const itemList = buildHubItemListFromParts(mockPage.name, mockPage.mostSearchedParts)
    return (
      <SeoPageShell
        breadcrumbs={mockPage.breadcrumbs}
        faq={mockPage.faq}
        hideBreadcrumbs
        itemList={itemList}
        locale={locale}
        pageContext={{ slug: mockPage.slug, manufacturer: mockPage.name, kind: 'manufacturer' }}
        banner={
          <div className="seo-mfg-hero-zone seo-dot-grid-bg">
            <ManufacturerHeroBanner
              slug={mockPage.slug}
              name={mockPage.name}
              title={mockPage.meta.h1}
              subtitle={heroSubtitle}
              logoUrl={mockPage.logoUrl}
              breadcrumbs={mockPage.breadcrumbs}
            />
            <ManufacturerQueryCarousel page={mockPage} />
          </div>
        }
      >
        <ManufacturerIntelligenceView page={mockPage} />
      </SeoPageShell>
    )
  }

  const apiPage = await fetchSeoPage(slug, {
    locale,
    previewToken: sp.preview,
  })
  if (apiPage?.hubPage) {
    const mappedPage = mapPublicSeoPageToManufacturerPage(apiPage, locale)
    const pageWithCatalog = await enrichManufacturerCatalogCategories(mappedPage, locale, {
      previewToken: sp.preview,
    })
    const pageWithParts = await enrichManufacturerMostSearchedParts(pageWithCatalog, locale, {
      previewToken: sp.preview,
    })
    const page = await enrichComparableManufacturerLogos(pageWithParts, locale)
    const heroSubtitle = resolveManufacturerHeroSubtitle(page)
    const itemList = buildHubItemListFromParts(page.name, page.mostSearchedParts)

    return (
      <SeoPageShell
        breadcrumbs={page.breadcrumbs}
        faq={page.faq}
        hideBreadcrumbs
        itemList={itemList}
        locale={locale}
        showPreviewBanner={Boolean(sp.preview)}
        pageContext={{ slug: page.slug, manufacturer: page.name, kind: 'manufacturer' }}
        banner={
          <div className="seo-mfg-hero-zone seo-dot-grid-bg">
            <ManufacturerHeroBanner
              slug={page.slug}
              name={page.name}
              title={page.meta.h1}
              subtitle={heroSubtitle}
              logoUrl={page.logoUrl}
              breadcrumbs={page.breadcrumbs}
            />
            <ManufacturerQueryCarousel page={page} />
          </div>
        }
      >
        <ManufacturerIntelligenceView page={page} />
      </SeoPageShell>
    )
  }

  await rejectUnavailableSeoPage({
    slug,
    locale,
    kind: 'manufacturer',
    expectedPageType: 'manufacturer',
    path: `/manufacturers/${slug}`,
  })
}
