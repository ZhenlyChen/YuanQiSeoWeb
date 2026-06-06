'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import type { ManufacturerDirectoryFacet } from '@/types/seo-intelligence'

export function ManufacturerDirectorySidebar({
  categoryFacets,
  activeCategoryL1,
  totalCount,
}: {
  categoryFacets: ManufacturerDirectoryFacet[]
  activeCategoryL1?: string
  totalCount: number
}) {
  const t = useTranslations('directory')

  return (
    <aside className="seo-mfg-dir-sidebar" aria-label={t('filtersLabel')}>
      <div className="seo-mfg-dir-sidebar__section" id="categories">
        <ul className="seo-mfg-dir-sidebar__category-list">
          <li>
            <Link
              href="/manufacturers"
              className={cn(
                'seo-mfg-dir-sidebar__category-link',
                !activeCategoryL1 && 'seo-mfg-dir-sidebar__category-link--active',
              )}
            >
              <span>{t('allCategories')}</span>
              <span className="seo-mfg-dir-sidebar__count">{totalCount}</span>
            </Link>
          </li>
          {categoryFacets.map((facet) => (
            // Category labels come from API taxonomy (English until backend locale mapping ships).
            <li key={facet.slug}>
              <Link
                href={`/manufacturers/category/${facet.slug}`}
                className={cn(
                  'seo-mfg-dir-sidebar__category-link',
                  activeCategoryL1 === facet.slug && 'seo-mfg-dir-sidebar__category-link--active',
                )}
              >
                <span>{facet.label}</span>
                <span className="seo-mfg-dir-sidebar__count">{facet.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
