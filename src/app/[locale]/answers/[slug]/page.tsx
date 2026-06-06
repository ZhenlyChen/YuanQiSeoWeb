import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QueryAnswerView } from '@/components/seo/query-answer-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAnswerPage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { resolvePublicSeoMetadata } from '@/lib/resolve-seo-page-meta'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockAnswerPage(slug)
  return resolvePublicSeoMetadata({
    slug,
    locale,
    pageType: 'query_answer',
    fallbackMeta: page?.meta ?? null,
    notFoundTitle: 'Answer not found | PartGenie',
  })
}

export default async function AnswerPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockAnswerPage(slug)
  if (!page) notFound()

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      faq={page.faq}
      locale={locale}
      pageContext={{ slug: page.slug, kind: 'answer' }}
    >
      <QueryAnswerView page={page} />
    </SeoPageShell>
  )
}
