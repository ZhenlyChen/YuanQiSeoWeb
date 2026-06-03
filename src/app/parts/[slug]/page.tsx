import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComponentIntelligenceView } from '@/components/seo/component-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockComponentPage } from '@/data/mock'
import { fetchSeoPage } from '@/lib/seo-api'
import { buildPageMetadata } from '@/lib/seo-meta'
import { isMockComponentSlug } from '@/lib/mock-registry'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string; locale?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const sp = await searchParams

  if (isMockComponentSlug(slug)) {
    const page = getMockComponentPage(slug)
    if (page) return buildPageMetadata(page.meta)
  }

  const page = await fetchSeoPage(slug, {
    locale: sp.locale,
    previewToken: sp.preview,
  })
  if (!page) {
    return { title: 'Part not found | PartGenie' }
  }
  return {
    title: { absolute: page.title },
    description: page.description,
    robots: page.robots,
    alternates: { canonical: `https://partgenie.ai${page.canonicalPath}` },
  }
}

export default async function PartPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sp = await searchParams

  if (isMockComponentSlug(slug)) {
    const mockPage = getMockComponentPage(slug)
    if (!mockPage) notFound()
    return (
      <SeoPageShell breadcrumbs={mockPage.breadcrumbs} faq={mockPage.faq}>
        <ComponentIntelligenceView page={mockPage} />
      </SeoPageShell>
    )
  }

  const page = await fetchSeoPage(slug, {
    locale: sp.locale,
    previewToken: sp.preview,
  })
  if (!page) notFound()

  const code = String(page.component?.code ?? slug)
  const summary = String(page.component?.summary ?? page.description ?? '')

  return (
    <SeoPageShell
      breadcrumbs={[{ label: 'Components' }, { label: code }]}
      showPreviewBanner={Boolean(sp.preview)}
    >
      <article className="seo-card seo-hero">
        <h1 className="seo-page-header__h1">{code} Component Intelligence</h1>
        {summary ? <p className="seo-section__lead">{summary}</p> : null}
        <p className="seo-section__lead" style={{ marginTop: 'var(--pg-space-4)' }}>
          Full template available on design-preview slug{' '}
          <a href="/parts/stm32f103c8t6">STM32F103C8T6</a>.
        </p>
      </article>
    </SeoPageShell>
  )
}
