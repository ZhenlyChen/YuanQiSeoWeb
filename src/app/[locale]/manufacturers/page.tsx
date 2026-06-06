import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildDirectoryIndexProps } from '@/lib/manufacturer-directory-page'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ sort?: string; page?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = parseAppLocale(localeParam)
  const query = await searchParams
  const pageNum = Math.max(1, Number.parseInt(query.page ?? '1', 10) || 1)
  const { page } = await buildDirectoryIndexProps({ locale, page: pageNum })
  const metadata = buildPageMetadata(page.meta, locale)

  if (pageNum > 1) {
    metadata.title = {
      absolute: `${page.meta.title} — Page ${pageNum}`,
    }
  }

  return metadata
}

export default async function ManufacturersDirectoryPage({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params
  const locale = parseAppLocale(localeParam)
  const query = await searchParams
  const pageNum = Math.max(1, Number.parseInt(query.page ?? '1', 10) || 1)
  const { page, activeFacet, pageTitle, breadcrumbs, itemList, sort } =
    await buildDirectoryIndexProps({
      sort: query.sort,
      page: pageNum,
      locale,
    })

  return (
    <SeoPageShell
      breadcrumbs={breadcrumbs}
      hideBreadcrumbs
      itemList={itemList}
      pageContext={{ slug: 'manufacturer-directory', kind: 'manufacturer' }}
    >
      <ManufacturerDirectoryView
        items={page.items}
        categoryFacets={page.categoryFacets}
        totalInDatabase={page.totalInDatabase}
        activeFacet={activeFacet}
        pageTitle={pageTitle}
        sort={sort}
        pagination={
          page.total && page.page && page.pageSize
            ? {
                page: page.page,
                pageSize: page.pageSize,
                total: page.total,
              }
            : undefined
        }
      />
    </SeoPageShell>
  )
}
