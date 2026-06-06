'use client'

import type { CSSProperties } from 'react'
import { useLocale } from 'next-intl'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { cn } from '@/lib/cn'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'
import {
  manufacturerCatalogAppUrl,
  manufacturerCatalogSignInUrl,
} from '@/lib/tool-urls'
import type { ManufacturerCatalogCategory } from '@/types/seo-intelligence'

const MAX_VISIBLE = 10
const FREE_VISIBLE = 3

function formatPartCount(count: number, locale: string): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`
  }
  return count.toLocaleString(locale === 'de' ? 'de-DE' : 'en-US')
}

function catalogCategoryHref(
  slug: string,
  manufacturerId: string,
  category: ManufacturerCatalogCategory,
  loggedIn: boolean,
): string {
  const options = {
    categoryL1: category.categoryL1,
    categoryL2: category.categoryL2,
  }
  return loggedIn
    ? manufacturerCatalogAppUrl(slug, manufacturerId, options)
    : manufacturerCatalogSignInUrl(slug, manufacturerId, options)
}

function CatalogTableHead() {
  return (
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
  )
}

function CatalogCategoryRow({
  category,
  href,
  interactive = true,
}: {
  category: ManufacturerCatalogCategory
  href: string
  interactive?: boolean
}) {
  const locale = useLocale()

  return (
    <tr className={cn('seo-mfg-catalog__row', interactive && 'seo-mfg-catalog__row--interactive')}>
      <td className="seo-mfg-catalog__category">
        {interactive ? (
          <a href={href} className="seo-mfg-catalog__category-link">
            {category.label}
          </a>
        ) : (
          category.label
        )}
      </td>
      <td className="seo-mfg-catalog__count">{formatPartCount(category.partCount, locale)}</td>
    </tr>
  )
}

function CatalogCategoryRows({
  categories,
  resolveHref,
  interactive = true,
}: {
  categories: ManufacturerCatalogCategory[]
  resolveHref: (category: ManufacturerCatalogCategory) => string
  interactive?: boolean
}) {
  return (
    <>
      {categories.map((category) => (
        <CatalogCategoryRow
          key={category.label}
          category={category}
          href={resolveHref(category)}
          interactive={interactive}
        />
      ))}
    </>
  )
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
  const showGated = !isReady || !isLoggedIn

  if (categories.length === 0) {
    return null
  }

  const visible = categories.slice(0, MAX_VISIBLE)
  const preview = visible.slice(0, FREE_VISIBLE)
  const locked = visible.slice(FREE_VISIBLE)
  const catalogSignInHref = manufacturerCatalogSignInUrl(slug, manufacturerId)
  const resolveHref = (category: ManufacturerCatalogCategory) =>
    catalogCategoryHref(slug, manufacturerId, category, isReady && isLoggedIn)

  const gatedWrapStyle = {
    ['--seo-mfg-catalog-locked-rows' as string]: String(Math.max(locked.length, 1)),
  } satisfies CSSProperties

  return (
    <section className="seo-section seo-mfg-catalog">
      <div className="seo-mfg-catalog__card">
        <header className="seo-mfg-catalog__head">
          <h2 className="seo-mfg-catalog__title">Product catalog</h2>
        </header>

        {showGated && locked.length > 0 ? (
          <div
            className="seo-mfg-catalog-gated-wrap seo-mfg-catalog-gated-wrap--active"
            style={gatedWrapStyle}
          >
            <table className="seo-mfg-catalog__table">
              <CatalogTableHead />
              <tbody>
                <CatalogCategoryRows categories={preview} resolveHref={resolveHref} />
              </tbody>
            </table>
            <div className="seo-mfg-catalog-blurred" aria-hidden="true">
              <table className="seo-mfg-catalog__table">
                <CatalogTableHead />
                <tbody>
                  <CatalogCategoryRows
                    categories={locked}
                    resolveHref={resolveHref}
                    interactive={false}
                  />
                </tbody>
              </table>
            </div>
            <AlternativesGateModal
              alternativesCount={locked.length}
              ctaHref={catalogSignInHref}
              title={SEO_PUBLIC_BOUNDARY.catalogGateTitle}
              description={SEO_PUBLIC_BOUNDARY.catalogGateDescription}
              ctaLabel={SEO_PUBLIC_BOUNDARY.catalogGateCta}
            />
          </div>
        ) : (
          <table className="seo-mfg-catalog__table">
            <CatalogTableHead />
            <tbody>
              <CatalogCategoryRows categories={visible} resolveHref={resolveHref} />
            </tbody>
          </table>
        )}

      </div>
    </section>
  )
}
