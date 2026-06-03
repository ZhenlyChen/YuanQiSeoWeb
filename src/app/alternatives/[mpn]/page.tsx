import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlternativeIntelligenceView } from '@/components/seo/alternative-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAlternativePage } from '@/data/mock'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ mpn: string }>
  searchParams: Promise<{ view?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mpn } = await params
  const page = getMockAlternativePage(mpn)
  if (!page) return { title: 'Alternatives not found | PartGenie' }
  return buildPageMetadata(page.meta)
}

export default async function AlternativePage({ params, searchParams }: PageProps) {
  const { mpn } = await params
  const sp = await searchParams
  const page = getMockAlternativePage(mpn)
  if (!page) notFound()

  const view = sp.view === 'graph' ? 'graph' : 'list'

  return (
    <SeoPageShell breadcrumbs={page.breadcrumbs} faq={page.faq}>
      <AlternativeIntelligenceView page={page} view={view} />
    </SeoPageShell>
  )
}
