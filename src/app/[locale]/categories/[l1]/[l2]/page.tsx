import type { Metadata } from 'next'
import { CategoryIntelligenceView } from '@/components/seo/category-intelligence-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildCategoryHubProps } from '@/lib/category-hub-page'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; l1: string; l2: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, l1, l2 } = await params
  const locale = parseAppLocale(localeParam)
  const { page } = await buildCategoryHubProps({ l1Slug: l1, l2Slug: l2, locale })
  return buildPageMetadata(page.meta, locale)
}

export default async function CategoryL2HubPage({ params }: PageProps) {
  const { locale: localeParam, l1, l2 } = await params
  const locale = parseAppLocale(localeParam)
  const { page, itemList } = await buildCategoryHubProps({ l1Slug: l1, l2Slug: l2, locale })

  return (
    <SeoPageShell
      breadcrumbs={page.breadcrumbs}
      hideBreadcrumbs
      faq={page.faq}
      itemList={itemList}
      pageContext={{ slug: `${page.l1Slug}-${page.l2Slug ?? page.slug}`, kind: 'category' }}
    >
      <CategoryIntelligenceView page={page} />
    </SeoPageShell>
  )
}
