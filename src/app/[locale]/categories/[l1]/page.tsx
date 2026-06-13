import type { Metadata } from 'next'
import { CategoryIntelligenceView } from '@/components/seo/category-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildCategoryHubProps } from '@/lib/category-hub-page'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata, resolvePreviewRobots } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; l1: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams
  const { page } = await buildCategoryHubProps({ l1Slug: l1, locale, previewToken: sp.preview })
  return buildPageMetadata(
    { ...page.meta, robots: resolvePreviewRobots(sp.preview, page.meta.robots) },
    locale,
  )
}

export default async function CategoryL1HubPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams
  const { page, itemList } = await buildCategoryHubProps({
    l1Slug: l1,
    locale,
    previewToken: sp.preview,
  })

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      hideBreadcrumbs
      faq={page.faq}
      itemList={itemList}
      locale={locale}
      pageContext={{ slug: page.slug, kind: 'category' }}
    >
      <CategoryIntelligenceView page={page} />
    </SeoPageShell>
  )
}
