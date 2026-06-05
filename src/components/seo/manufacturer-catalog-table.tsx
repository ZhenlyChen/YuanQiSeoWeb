'use client'

import { cn } from '@/lib/cn'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import {
  manufacturerCatalogAppUrl,
  manufacturerCatalogSignInUrl,
} from '@/lib/tool-urls'
import type { ManufacturerCatalogCategory } from '@/types/seo-intelligence'

function formatPartCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  }
  return count.toLocaleString('en-US')
}

export function ManufacturerCatalogTable({
  slug,
  manufacturerId,
  categories,
}: {
  slug: string
  manufacturerId: string
  categories: ManufacturerCatalogCategory[]
}) {
  const { isLoggedIn, isReady } = useSeoNavUser()
  const catalogHref =
    isReady && isLoggedIn
      ? manufacturerCatalogAppUrl(slug, manufacturerId)
      : manufacturerCatalogSignInUrl(slug, manufacturerId)

  if (categories.length === 0) {
    return null
  }

  const preview = categories.slice(0, 6)

  return (
    <section className="seo-section seo-mfg-catalog">
      <div className="seo-mfg-catalog__card">
        <header className="seo-mfg-catalog__head">
          <h2 className="seo-mfg-catalog__title">Product catalog</h2>
        </header>

        <table className="seo-mfg-catalog__table">
          <thead>
            <tr>
              <th className="seo-mfg-catalog__th seo-mfg-catalog__th--category" scope="col">
                Category
              </th>
              <th className="seo-mfg-catalog__th seo-mfg-catalog__th--count" scope="col">
                Parts
              </th>
            </tr>
          </thead>
          <tbody>
            {preview.map((category) => (
              <tr key={category.label} className="seo-mfg-catalog__row">
                <td className="seo-mfg-catalog__category">{category.label}</td>
                <td className="seo-mfg-catalog__count">{formatPartCount(category.partCount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="seo-mfg-catalog__footer">
          <a
            href={catalogHref}
            className={cn(
              'ui-button',
              'ui-button--primary',
              'ui-button--sm',
              'seo-mfg-catalog__cta',
              !isReady && 'seo-mfg-catalog__cta--pending',
            )}
            aria-busy={!isReady}
          >
            Browse full catalog in PartGenie
          </a>
        </footer>
      </div>
    </section>
  )
}
