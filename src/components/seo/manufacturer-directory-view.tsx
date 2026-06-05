'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ManufacturerDirectoryAzBar } from '@/components/seo/manufacturer-directory-az-bar'
import { ManufacturerDirectoryHero } from '@/components/seo/manufacturer-directory-hero'
import { ManufacturerDirectoryList } from '@/components/seo/manufacturer-directory-list'
import { ManufacturerDirectoryPagination } from '@/components/seo/manufacturer-directory-pagination'
import { ManufacturerDirectorySidebar } from '@/components/seo/manufacturer-directory-sidebar'
import { ManufacturerDirectoryToolbar } from '@/components/seo/manufacturer-directory-toolbar'
import { getDirectoryHeroMarqueeItems } from '@/lib/manufacturer-directory'
import type {
  ManufacturerDirectoryActiveFacet,
  ManufacturerDirectoryFacet,
  ManufacturerDirectoryItem,
} from '@/types/seo-intelligence'

export function ManufacturerDirectoryView({
  items,
  categoryFacets,
  totalInDatabase,
  activeFacet,
  pageTitle,
  sort,
  pagination,
}: {
  items: ManufacturerDirectoryItem[]
  categoryFacets: ManufacturerDirectoryFacet[]
  totalInDatabase: number
  activeFacet: ManufacturerDirectoryActiveFacet
  pageTitle: string
  sort: 'popular' | 'name'
  pagination?: {
    page: number
    pageSize: number
    total: number
  }
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const marqueeItems = getDirectoryHeroMarqueeItems(items)

  const activeFilters = (() => {
    const filters: { key: string; label: string; href: string }[] = []
    if (activeFacet.categoryL1 && activeFacet.categoryLabel) {
      filters.push({
        key: 'category',
        label: activeFacet.categoryLabel,
        href: '/manufacturers',
      })
    }
    if (activeFacet.letter) {
      const display =
        activeFacet.letter === '0-9' || activeFacet.letter === '#'
          ? '0–9'
          : activeFacet.letter.toUpperCase()
      const clearHref = activeFacet.categoryL1
        ? `/manufacturers/category/${activeFacet.categoryL1}`
        : '/manufacturers'
      filters.push({
        key: 'letter',
        label: `Letter ${display}`,
        href: clearHref,
      })
    }
    return filters
  })()

  function buildHref(next: { sort?: 'popular' | 'name'; page?: number }) {
    const params = new URLSearchParams(searchParams.toString())
    const nextSort = next.sort ?? sort
    if (nextSort === 'popular') params.delete('sort')
    else params.set('sort', nextSort)

    if (pagination) {
      const nextPage = next.page ?? pagination.page
      if (nextPage <= 1) params.delete('page')
      else params.set('page', String(nextPage))
    }

    const query = params.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  return (
    <div className="seo-mfg-dir-page">
      <ManufacturerDirectoryHero totalInDatabase={totalInDatabase} marqueeItems={marqueeItems} />
      <div className="seo-mfg-dir-layout">
        <ManufacturerDirectorySidebar
          categoryFacets={categoryFacets}
          activeCategoryL1={activeFacet.categoryL1}
          totalCount={pagination?.total ?? items.length}
        />
        <div className="seo-mfg-dir-main">
          <ManufacturerDirectoryToolbar
            title={pageTitle}
            activeFilters={activeFilters}
            sort={sort}
            onSortChange={(value) => router.push(buildHref({ sort: value, page: 1 }))}
          />
          <ManufacturerDirectoryList items={items} />
          {pagination ? (
            <ManufacturerDirectoryPagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              buildPageHref={(page) => buildHref({ page })}
            />
          ) : null}
        </div>
      </div>
      <ManufacturerDirectoryAzBar
        activeLetter={activeFacet.letter}
        categoryL1={activeFacet.categoryL1}
      />
    </div>
  )
}
