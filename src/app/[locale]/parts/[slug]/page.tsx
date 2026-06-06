import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ComponentIntelligenceView } from '@/components/seo/component-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockComponentPage } from '@/data/mock'
import { isMockComponentSlug } from '@/lib/mock-registry'
import { parseAppLocale } from '@/lib/page-locale'
import { fetchSeoPage } from '@/lib/seo-api'
import { buildPageMetadata } from '@/lib/seo-meta'
import { localizePath } from '@/lib/localized-path'
import { SEO_SITE_ORIGIN } from '@/lib/site'

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
    const t = await getTranslations('shell')
    return { title: t('partNotFound') }
  }

  const canonicalPath = page.canonicalPath || `/parts/${slug}`
  return {
    title: { absolute: page.title },
    description: page.description,
    robots: page.robots,
    alternates: {
      canonical: `${SEO_SITE_ORIGIN}${localizePath(canonicalPath, locale)}`,
    },
  }
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
        pageContext={{ slug: mockPage.slug, mpn: mockPage.mpn, kind: 'part' }}
      >
        <ComponentIntelligenceView page={mockPage} />
      </SeoPageShell>
    )
  }

  const page = await fetchSeoPage(slug, {
    locale,
    previewToken: sp.preview,
  })
  if (!page) notFound()

  const code = String(page.component?.code ?? slug)
  const summary = String(page.component?.summary ?? page.description ?? '')

  return (
    <SeoPageShell
      breadcrumbs={[{ label: t('components') }, { label: code }]}
      showPreviewBanner={Boolean(sp.preview)}
    >
      <article className="seo-card seo-hero">
        <h1 className="seo-page-header__h1">
          <span className="seo-page-header__h1-line">{code} AI Analysis:</span>
          <br />
          <span className="seo-page-header__h1-line">Specs, Applications & Alternatives</span>
        </h1>
        {summary ? <p className="seo-section__lead">{summary}</p> : null}
        <p className="seo-section__lead" style={{ marginTop: 'var(--pg-space-4)' }}>
          Full template available on design-preview slug{' '}
          <a href="/parts/stm32f103c8t6">STM32F103C8T6</a>.
        </p>
      </article>
    </SeoPageShell>
  )
}
