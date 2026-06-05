'use client'

import { useMemo, useState } from 'react'
import { ManufacturerDirectoryAzBar } from '@/components/seo/manufacturer-directory-az-bar'
import { ManufacturerDirectoryHero } from '@/components/seo/manufacturer-directory-hero'
import { ManufacturerDirectoryList } from '@/components/seo/manufacturer-directory-list'
import { ManufacturerDirectorySidebar } from '@/components/seo/manufacturer-directory-sidebar'
import { ManufacturerDirectoryToolbar } from '@/components/seo/manufacturer-directory-toolbar'
import {
  filterDirectoryItems,
  getDirectoryHeroMarqueeItems,
  sortDirectoryItems,
} from '@/lib/manufacturer-directory'
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
}: {
  items: ManufacturerDirectoryItem[]
  categoryFacets: ManufacturerDirectoryFacet[]
  totalInDatabase: number
  activeFacet: ManufacturerDirectoryActiveFacet
  pageTitle: string
}) {
  const [sort, setSort] = useState<'popular' | 'name'>('popular')
  const marqueeItems = useMemo(() => getDirectoryHeroMarqueeItems(items), [items])

  const filteredItems = useMemo(() => {
    const byFacet = filterDirectoryItems(items, {
      categoryL1: activeFacet.categoryL1,
      letter: activeFacet.letter,
    })
    return sortDirectoryItems(byFacet, sort)
  }, [items, activeFacet.categoryL1, activeFacet.letter, sort])

  const activeFilters = useMemo(() => {
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
  }, [activeFacet])

  return (
    <div className="seo-mfg-dir-page">
      <ManufacturerDirectoryHero totalInDatabase={totalInDatabase} marqueeItems={marqueeItems} />
      <div className="seo-mfg-dir-layout">
        <ManufacturerDirectorySidebar
          categoryFacets={categoryFacets}
          activeCategoryL1={activeFacet.categoryL1}
          totalCount={items.length}
        />
        <div className="seo-mfg-dir-main">
          <ManufacturerDirectoryToolbar
            title={pageTitle}
            activeFilters={activeFilters}
            sort={sort}
            onSortChange={setSort}
          />
          <ManufacturerDirectoryList items={filteredItems} />
        </div>
      </div>
      <ManufacturerDirectoryAzBar
        activeLetter={activeFacet.letter}
        categoryL1={activeFacet.categoryL1}
      />
    </div>
  )
}
