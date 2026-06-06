import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { getMockManufacturerDirectoryPage } from '@/data/mock/manufacturer-directory'
import { buildDirectoryCategoryProps } from '@/lib/manufacturer-directory-page'
import { parseAppLocale } from '@/lib/page-locale'
import { fetchManufacturerDirectory } from '@/lib/seo-api'
import { buildPageMetadata, manufacturerDirectoryCategorySeoMeta } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; l1: string }>
  searchParams: Promise<{ sort?: string }>
}

async function resolveCategoryLabel(l1: string, locale: string): Promise<string | undefined> {
  if (process.env.USE_MOCK_MANUFACTURER_DIRECTORY === 'true') {
    return getMockManufacturerDirectoryPage().categoryFacets.find((facet) => facet.slug === l1)?.label
  }
  const apiPage = await fetchManufacturerDirectory({ categoryL1: l1, pageSize: 1, locale })
  if (apiPage) {
    return apiPage.categoryFacets.find((facet) => facet.slug === l1)?.label
  }
  return getMockManufacturerDirectoryPage().categoryFacets.find((facet) => facet.slug === l1)?.label
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const label = await resolveCategoryLabel(l1, locale)
  if (!label) {
    return { title: 'Category not found | PartGenie' }
  }
  return buildPageMetadata(
    await manufacturerDirectoryCategorySeoMeta({
      categoryLabel: label,
      slug: l1,
    }),
    locale,
  )
}

export default async function ManufacturersCategoryPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const { sort: sortParam } = await searchParams
  const { page, activeFacet, pageTitle, breadcrumbs, itemList, sort } =
    await buildDirectoryCategoryProps(l1, { sort: sortParam, locale })

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
