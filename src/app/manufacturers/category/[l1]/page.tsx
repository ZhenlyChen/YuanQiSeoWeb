import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildDirectoryCategoryProps } from '@/lib/manufacturer-directory-page'
import { getCategoryFacetLabel } from '@/data/mock/manufacturer-directory'
import { buildPageMetadata, manufacturerDirectoryCategorySeoMeta } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ l1: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { l1 } = await params
  const label = getCategoryFacetLabel(l1)
  if (!label) {
    return { title: 'Category not found | PartGenie' }
  }
  return buildPageMetadata(
    manufacturerDirectoryCategorySeoMeta({
      categoryLabel: label,
      slug: l1,
    }),
  )
}

export default async function ManufacturersCategoryPage({ params }: PageProps) {
  const { l1 } = await params
  const { page, activeFacet, pageTitle, breadcrumbs, itemList } = buildDirectoryCategoryProps(l1)

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
