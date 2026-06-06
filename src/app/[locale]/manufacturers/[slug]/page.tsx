import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ManufacturerHeroBanner } from '@/components/seo/manufacturer-hero-banner'
import { ManufacturerQueryCarousel } from '@/components/seo/manufacturer-query-carousel'
import { ManufacturerIntelligenceView } from '@/components/seo/manufacturer-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockManufacturerPage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockManufacturerPage(slug)
  if (!page) return { title: 'Manufacturer not found | PartGenie' }
  return buildPageMetadata(page.meta, locale)
}

export default async function ManufacturerPage({ params }: PageProps) {
  const { slug } = await params
  const page = getMockManufacturerPage(slug)
  if (!page) notFound()

  const heroSubtitle =
    page.catalogCategories.length > 0
      ? page.catalogCategories
          .slice(0, 3)
          .map((category) => category.label)
          .join(', ')
      : 'Manufacturer intelligence hub'

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      hideBreadcrumbs
      pageContext={{ slug: page.slug, manufacturer: page.name, kind: 'manufacturer' }}
      banner={
        <div className="seo-mfg-hero-zone">
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
