import type { Metadata } from 'next'
import { ManufacturerDirectoryView } from '@/components/seo/manufacturer-directory-view'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { buildDirectoryLetterProps } from '@/lib/manufacturer-directory-page'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata, manufacturerDirectoryLetterSeoMeta } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; letter: string }>
  searchParams: Promise<{ category?: string; sort?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, letter } = await params
  const locale = parseAppLocale(localeParam)
  return buildPageMetadata(await manufacturerDirectoryLetterSeoMeta({ letter }), locale)
}

export default async function ManufacturersLetterPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, letter } = await params
  const locale = parseAppLocale(localeParam)
  const { category, sort: sortParam } = await searchParams
  const categoryL1 = category?.trim() || undefined
  const { page, activeFacet, pageTitle, breadcrumbs, itemList, sort } =
    await buildDirectoryLetterProps(letter, categoryL1, { sort: sortParam, locale })

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
