import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildDirectoryIndexProps } from '@/lib/manufacturer-directory-page'
import { buildPageMetadata } from '@/lib/seo-meta'

type PageProps = {
  searchParams: Promise<{ sort?: string; page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await buildDirectoryIndexProps()
  return buildPageMetadata(page.meta)
}

export default async function ManufacturersDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const pageNum = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1)
  const { page, activeFacet, pageTitle, breadcrumbs, itemList, sort } =
    await buildDirectoryIndexProps({
      sort: params.sort,
      page: pageNum,
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
