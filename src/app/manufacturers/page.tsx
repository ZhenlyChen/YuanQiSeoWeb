import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildDirectoryIndexProps } from '@/lib/manufacturer-directory-page'
import { buildPageMetadata } from '@/lib/seo-meta'

export async function generateMetadata(): Promise<Metadata> {
  const { page } = buildDirectoryIndexProps()
  return buildPageMetadata(page.meta)
}

export default function ManufacturersDirectoryPage() {
  const { page, activeFacet, pageTitle, breadcrumbs, itemList } = buildDirectoryIndexProps()

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
      />
    </SeoPageShell>
  )
}
