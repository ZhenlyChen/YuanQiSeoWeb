'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SeoSelect } from '@/components/ui/seo-select'

function FilterPillDismissIcon() {
  return (
    <span className="seo-mfg-dir-toolbar__pill-dismiss" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M9 3L3 9M3 3l6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

type ActiveFilter = {
  key: string
  label: string
  href: string
}

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
  const t = useTranslations('directory')
  const sortOptions = useMemo(
    () => [
      { value: 'popular' as const, label: t('sortPopular') },
      { value: 'name' as const, label: t('sortName') },
    ],
    [t],
  )

  return (
    <div className="seo-mfg-dir-toolbar">
      <div className="seo-mfg-dir-toolbar__top">
        <h2 className="seo-mfg-dir-toolbar__title">{title}</h2>
        <SeoSelect
          className="seo-mfg-dir-toolbar__sort"
          value={sort}
          options={sortOptions}
          onChange={onSortChange}
          ariaLabel={t('sortLabel')}
        />
      </div>
      {activeFilters.length > 0 ? (
        <div className="seo-mfg-dir-toolbar__filters">
          {activeFilters.map((filter) => (
            <Link key={filter.key} href={filter.href} className="seo-mfg-dir-toolbar__pill">
              {filter.label}
              <FilterPillDismissIcon />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
