import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QueryAnswerView } from '@/components/seo/query-answer-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockAnswerPage } from '@/data/mock'
import { parseAppLocale } from '@/lib/page-locale'
import { SEO_DEFERRED, withDeferredRobots } from '@/lib/seo-indexing-policy'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

// TODO: enable FAQPage/Article JSON-LD when SEO_DEFERRED.queryAnswer is false and fetchSeoPage is wired.

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const page = getMockAnswerPage(slug)
  if (!page) {
    return { title: 'Answer not found | PartGenie', robots: { index: false, follow: false } }
  }

  const metadata = buildPageMetadata(page.meta, locale)

  if (SEO_DEFERRED.queryAnswer) {
    return withDeferredRobots(metadata)
  }

  return metadata
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
