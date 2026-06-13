import type { AppLocale } from '@/i18n/routing'
import {
  rollupManufacturerCatalogCategories,
} from '@/lib/manufacturer-catalog-labels'
import { prefersLatinCategoryLabels } from '@/lib/category-display'
import { resolveSeoCategoryLabel } from '@/lib/category-locale-label'
import {
  fetchManufacturerProductCategories,
  type ManufacturerProductCategory,
} from '@/lib/seo-api'
import type {
  ManufacturerCatalogCategory,
  ManufacturerIntelligencePage,
} from '@/types/seo-intelligence'

const CATALOG_CATEGORY_LIMIT = 12

function hasCatalogCategories(categories: ManufacturerCatalogCategory[] | undefined): boolean {
  return Boolean(categories?.some((category) => category.label.trim()))
}

export function mapManufacturerCategoryTreeToCatalogCategories(
  categories: ManufacturerProductCategory[],
  options?: { limit?: number; locale?: AppLocale },
): ManufacturerCatalogCategory[] {
  const limit = options?.limit ?? CATALOG_CATEGORY_LIMIT
  const locale = options?.locale ?? 'en'
  const rows: ManufacturerCatalogCategory[] = []

  for (const l1 of categories) {
    const l1Name = l1.name?.trim()
    if (!l1Name) continue

    const children = Array.isArray(l1.children) ? l1.children : []
    if (children.length > 0) {
      for (const child of children) {
        const categoryL2 = child.name?.trim()
        if (!categoryL2) continue
        rows.push({
          label: categoryL2,
          partCount: child.count ?? 0,
          categoryL1: l1Name,
          categoryL2,
        })
      }
      continue
    }

    rows.push({
      label: l1Name,
      partCount: l1.count ?? 0,
      categoryL1: l1Name,
    })
  }

  return rollupManufacturerCatalogCategories(rows, locale, limit)
}

function finalizeCatalogCategories(
  categories: ManufacturerCatalogCategory[],
  locale: AppLocale,
): ManufacturerCatalogCategory[] {
  if (!categories.length) return categories
  if (!prefersLatinCategoryLabels(locale)) return categories.slice(0, CATALOG_CATEGORY_LIMIT)
  return rollupManufacturerCatalogCategories(categories, locale, CATALOG_CATEGORY_LIMIT)
}

/**
 * Backfills empty catalog rows and normalizes en/de labels to taxonomy English.
 * Re-fetches ES category tree when possible so zh L1 buckets merge with English rows.
 */
export async function enrichManufacturerCatalogCategories(
  page: ManufacturerIntelligencePage,
  locale: AppLocale,
  options?: { previewToken?: string },
): Promise<ManufacturerIntelligencePage> {
  const manufacturerId = page.manufacturerId?.trim()
  let catalogCategories = page.catalogCategories ?? []

  if (manufacturerId) {
    try {
      const categories = await fetchManufacturerProductCategories(manufacturerId, {
        previewToken: options?.previewToken,
      })
      if (categories.length > 0) {
        const fromEs = mapManufacturerCategoryTreeToCatalogCategories(categories, { locale })
        if (fromEs.length > 0) {
          catalogCategories = fromEs
        }
      }
    } catch (error) {
      console.error('[enrichManufacturerCatalogCategories]', { slug: page.slug, locale, error })
    }
  }

  if (!hasCatalogCategories(catalogCategories)) return page

  catalogCategories = finalizeCatalogCategories(catalogCategories, locale)
  if (!catalogCategories.length) return page

  return { ...page, catalogCategories }
}

export function catalogCategoryDisplayLabel(
  category: ManufacturerCatalogCategory,
  locale: AppLocale,
): string {
  const raw = category.categoryL2
    ? `${category.categoryL1 || ''},${category.categoryL2}`
    : category.categoryL1 || category.label
  return resolveSeoCategoryLabel(raw, locale, category.label)
}
