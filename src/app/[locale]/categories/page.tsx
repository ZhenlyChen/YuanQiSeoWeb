import type { Metadata } from 'next'
import { CategoryDirectoryView } from '@/components/seo/category-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildCategoryDirectoryProps } from '@/lib/category-directory-page'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = parseAppLocale(localeParam)
  const { page } = await buildCategoryDirectoryProps({ locale })
  return buildPageMetadata(page.meta, locale)
}

export default async function CategoriesDirectoryPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = parseAppLocale(localeParam)
  const { page, breadcrumbs, itemList } = await buildCategoryDirectoryProps({ locale })

  return (
    <SeoPageShell
      breadcrumbs={breadcrumbs}
      hideBreadcrumbs
      itemList={itemList}
      locale={locale}
      pageContext={{ slug: 'category-directory', kind: 'category' }}
    >
      <CategoryDirectoryView items={page.items} totalInDatabase={page.totalInDatabase} />
    </SeoPageShell>
  )
}
