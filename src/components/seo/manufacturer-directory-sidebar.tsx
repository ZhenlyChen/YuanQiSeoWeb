'use client'

import Link from 'next/link'
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
  return (
    <aside className="seo-mfg-dir-sidebar" aria-label="Directory filters">
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
              <span>All categories</span>
              <span className="seo-mfg-dir-sidebar__count">{totalCount}</span>
            </Link>
          </li>
          {categoryFacets.map((facet) => (
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
