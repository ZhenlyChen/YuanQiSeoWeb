import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlternativeIntelligenceView } from '@/components/seo/alternative-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAlternativePage } from '@/data/mock'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ mpn: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mpn } = await params
  const page = getMockAlternativePage(mpn)
  if (!page) return { title: 'Alternatives not found | PartGenie' }
  return buildPageMetadata(page.meta)
}

export default async function AlternativePage({ params }: PageProps) {
  const { mpn } = await params
  const page = getMockAlternativePage(mpn)
  if (!page) notFound()

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      pageContext={{ slug: page.slug, mpn: page.mpn, kind: 'alternative' }}
    >
      <AlternativeIntelligenceView page={page} />
    </SeoPageShell>
  )
}
