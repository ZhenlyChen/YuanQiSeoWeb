import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import {
  buildDirectoryCategoryProps,
} from '@/lib/manufacturer-directory-page'
import { fetchManufacturerDirectory } from '@/lib/seo-api'
import { buildPageMetadata, manufacturerDirectoryCategorySeoMeta } from '@/lib/seo-meta'
import { getMockManufacturerDirectoryPage } from '@/data/mock/manufacturer-directory'

type PageProps = {
  params: Promise<{ l1: string }>
  searchParams: Promise<{ sort?: string }>
}

async function resolveCategoryLabel(l1: string): Promise<string | undefined> {
  if (process.env.USE_MOCK_MANUFACTURER_DIRECTORY === 'true') {
    return getMockManufacturerDirectoryPage().categoryFacets.find((facet) => facet.slug === l1)?.label
  }
  const apiPage = await fetchManufacturerDirectory({ categoryL1: l1, pageSize: 1 })
  if (apiPage) {
    return apiPage.categoryFacets.find((facet) => facet.slug === l1)?.label
  }
  return getMockManufacturerDirectoryPage().categoryFacets.find((facet) => facet.slug === l1)?.label
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { l1 } = await params
  const label = await resolveCategoryLabel(l1)
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

export default async function ManufacturersCategoryPage({ params, searchParams }: PageProps) {
  const { l1 } = await params
  const { sort: sortParam } = await searchParams
  const { page, activeFacet, pageTitle, breadcrumbs, itemList, sort } =
    await buildDirectoryCategoryProps(l1, { sort: sortParam })

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
      />
    </SeoPageShell>
  )
}
