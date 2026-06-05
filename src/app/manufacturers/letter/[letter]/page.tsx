import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildDirectoryLetterProps } from '@/lib/manufacturer-directory-page'
import { buildPageMetadata, manufacturerDirectoryLetterSeoMeta } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ letter: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { letter } = await params
  return buildPageMetadata(manufacturerDirectoryLetterSeoMeta({ letter }))
}

export default async function ManufacturersLetterPage({ params, searchParams }: PageProps) {
  const { letter } = await params
  const { category } = await searchParams
  const categoryL1 = category?.trim() || undefined
  const { page, activeFacet, pageTitle, breadcrumbs, itemList } =
    buildDirectoryLetterProps(letter, categoryL1)

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
