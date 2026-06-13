'use client'

import { useLocale } from 'next-intl'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import type { AppLocale } from '@/i18n/routing'
import { catalogCategoryDisplayLabel } from '@/lib/manufacturer-catalog-fallback'
import { cn } from '@/lib/cn'
import { SEO_PUBLIC_BOUNDARY, buildGeneralGateStats } from '@/lib/seo-copy'
import {
  manufacturerCatalogAppUrl,
  manufacturerCatalogSignInUrl,
} from '@/lib/tool-urls'
import type { ManufacturerCatalogCategory } from '@/types/seo-intelligence'

const MAX_VISIBLE = 10
const FREE_VISIBLE = 3
const LOCKED_SLOT_COUNT = MAX_VISIBLE - FREE_VISIBLE

function placeholderCategory(index: number): ManufacturerCatalogCategory {
  return {
    label: `__placeholder_${index}`,
    partCount: 0,
  }
}

function isPlaceholderCategory(category: ManufacturerCatalogCategory): boolean {
  return category.label.startsWith('__placeholder_')
}

function padCategories(categories: ManufacturerCatalogCategory[], target: number): ManufacturerCatalogCategory[] {
  const out = categories.slice(0, target)
  while (out.length < target) {
    out.push(placeholderCategory(out.length))
  }
  return out
}

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
  locale,
}: {
  category: ManufacturerCatalogCategory
  href: string
  interactive?: boolean
  locale: AppLocale
}) {
  const placeholder = isPlaceholderCategory(category)
  const label = catalogCategoryDisplayLabel(category, locale)

  return (
    <tr
      className={cn(
        'seo-mfg-catalog__row',
        interactive && !placeholder && 'seo-mfg-catalog__row--interactive',
        placeholder && 'seo-mfg-catalog__row--placeholder',
      )}
    >
      <td className="seo-mfg-catalog__category">
        {placeholder ? (
          '\u00a0'
        ) : interactive ? (
          <a href={href} className="seo-mfg-catalog__category-link">
            {label}
          </a>
        ) : (
          label
        )}
      </td>
      <td className="seo-mfg-catalog__count">{placeholder ? '\u00a0' : formatPartCount(category.partCount, locale)}</td>
    </tr>
  )
}

function CatalogCategoryRows({
  categories,
  resolveHref,
  interactive = true,
  locale,
}: {
  categories: ManufacturerCatalogCategory[]
  resolveHref: (category: ManufacturerCatalogCategory) => string
  interactive?: boolean
  locale: AppLocale
}) {
  return (
    <>
      {categories.map((category) => (
        <CatalogCategoryRow
          key={`${category.label}-${category.partCount}-${category.categoryL1 ?? ''}-${category.categoryL2 ?? ''}`}
          category={category}
          href={resolveHref(category)}
          interactive={interactive}
          locale={locale}
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
  const locale = useLocale() as AppLocale
  const { isLoggedIn, isReady } = useSeoNavUser()
  const showGated = !isReady || !isLoggedIn
  const isEmpty = categories.length === 0

  const visible = isEmpty ? [] : categories.slice(0, MAX_VISIBLE)
  const preview = isEmpty ? padCategories([], FREE_VISIBLE) : visible.slice(0, FREE_VISIBLE)
  const locked = isEmpty
    ? padCategories([], LOCKED_SLOT_COUNT)
    : padCategories(visible.slice(FREE_VISIBLE), LOCKED_SLOT_COUNT)
  const useGatedLayout = isEmpty || showGated
  const hiddenCategoryCount = isEmpty ? 1 : Math.max(visible.length - FREE_VISIBLE, 1)
  const catalogSignInHref = manufacturerCatalogSignInUrl(slug, manufacturerId)
  const resolveHref = (category: ManufacturerCatalogCategory) =>
    catalogCategoryHref(slug, manufacturerId, category, isReady && isLoggedIn)

  return (
    <section className="seo-section seo-mfg-catalog">
      <div className="seo-mfg-catalog__card">
        <header className="seo-mfg-catalog__head">
          <h2 className="seo-mfg-catalog__title">Product catalog</h2>
        </header>

        {useGatedLayout ? (
          <div className="seo-mfg-catalog-gated-wrap seo-mfg-catalog-gated-wrap--active">
            <table className="seo-mfg-catalog__table">
              <CatalogTableHead />
              <tbody>
                <CatalogCategoryRows categories={preview} resolveHref={resolveHref} locale={locale} />
              </tbody>
            </table>
            <div className="seo-mfg-catalog-gated-locked">
              <div className="seo-mfg-catalog-blurred" aria-hidden="true">
                <table className="seo-mfg-catalog__table">
                  <tbody>
                    <CatalogCategoryRows
                      categories={locked}
                      resolveHref={resolveHref}
                      interactive={false}
                      locale={locale}
                    />
                  </tbody>
                </table>
              </div>
              <AlternativesGateModal
                alternativesCount={hiddenCategoryCount}
                stats={buildGeneralGateStats()}
                ctaHref={catalogSignInHref}
                title={SEO_PUBLIC_BOUNDARY.catalogGateTitle}
                description={SEO_PUBLIC_BOUNDARY.catalogGateDescription}
                ctaLabel={SEO_PUBLIC_BOUNDARY.catalogGateCta}
              />
            </div>
          </div>
        ) : (
          <table className="seo-mfg-catalog__table">
            <CatalogTableHead />
            <tbody>
              <CatalogCategoryRows
                categories={padCategories(visible, MAX_VISIBLE)}
                resolveHref={resolveHref}
                locale={locale}
              />
            </tbody>
          </table>
        )}

      </div>
    </section>
  )
}
