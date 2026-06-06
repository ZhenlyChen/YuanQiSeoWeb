'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { ManufacturerDirectoryAzBar } from '@/components/seo/manufacturer-directory-az-bar'
import { ManufacturerDirectoryHero } from '@/components/seo/manufacturer-directory-hero'
import { ManufacturerDirectoryList } from '@/components/seo/manufacturer-directory-list'
import { ManufacturerDirectoryPagination } from '@/components/seo/manufacturer-directory-pagination'
import { ManufacturerDirectorySidebar } from '@/components/seo/manufacturer-directory-sidebar'
import { ManufacturerDirectoryToolbar } from '@/components/seo/manufacturer-directory-toolbar'
import { getDirectoryHeroMarqueeItems } from '@/lib/manufacturer-directory'
import { buildDirectoryQueryHref, type DirectoryQueryHref } from '@/lib/manufacturer-directory-href'
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
  const t = useTranslations('directory')
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
        label: t('letterFilter', { letter: display }),
        href: clearHref,
      })
    }
    return filters
  })()

  function buildHref(next: { sort?: 'popular' | 'name'; page?: number }): DirectoryQueryHref {
    return buildDirectoryQueryHref({
      pathname,
      searchParams,
      sort,
      next,
      pagination,
    })
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
