import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QueryAnswerView } from '@/components/seo/query-answer-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAnswerPage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockAnswerPage(slug)
  if (!page) return { title: 'Answer not found | PartGenie' }
  return buildPageMetadata(page.meta, locale)
}

export default async function AnswerPage({ params }: PageProps) {
  const { slug } = await params
  const page = getMockAnswerPage(slug)
  if (!page) notFound()

  return (
    <SeoPageShell breadcrumbs={page.breadcrumbs} faq={page.faq}>
      <QueryAnswerView page={page} />
    </SeoPageShell>
  )
}
