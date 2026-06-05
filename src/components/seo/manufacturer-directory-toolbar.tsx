'use client'

import Link from 'next/link'
import { SeoSelect } from '@/components/ui/seo-select'

type ActiveFilter = {
  key: string
  label: string
  href: string
}

const SORT_OPTIONS = [
  { value: 'popular' as const, label: 'Most popular' },
  { value: 'name' as const, label: 'Name A–Z' },
]

export function ManufacturerDirectoryToolbar({
  title,
  activeFilters,
  sort,
  onSortChange,
}: {
  title: string
  activeFilters: ActiveFilter[]
  sort: 'popular' | 'name'
  onSortChange: (value: 'popular' | 'name') => void
}) {
  return (
    <div className="seo-mfg-dir-toolbar">
      <div className="seo-mfg-dir-toolbar__top">
        <h2 className="seo-mfg-dir-toolbar__title">{title}</h2>
        <SeoSelect
          className="seo-mfg-dir-toolbar__sort"
          value={sort}
          options={SORT_OPTIONS}
          onChange={onSortChange}
          ariaLabel="Sort manufacturers"
        />
      </div>
      {activeFilters.length > 0 ? (
        <div className="seo-mfg-dir-toolbar__filters">
          {activeFilters.map((filter) => (
            <Link key={filter.key} href={filter.href} className="seo-mfg-dir-toolbar__pill">
              {filter.label}
              <span aria-hidden="true">×</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
