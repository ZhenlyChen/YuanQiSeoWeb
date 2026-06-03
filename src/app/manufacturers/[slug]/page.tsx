import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ManufacturerIntelligenceView } from '@/components/seo/manufacturer-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockManufacturerPage } from '@/data/mock'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getMockManufacturerPage(slug)
  if (!page) return { title: 'Manufacturer not found | PartGenie' }
  return buildPageMetadata(page.meta)
}

export default async function ManufacturerPage({ params }: PageProps) {
  const { slug } = await params
  const page = getMockManufacturerPage(slug)
  if (!page) notFound()

  return (
    <SeoPageShell breadcrumbs={page.breadcrumbs} faq={page.faq}>
      <ManufacturerIntelligenceView page={page} />
    </SeoPageShell>
  )
}
