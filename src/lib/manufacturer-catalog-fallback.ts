import type { AppLocale } from '@/i18n/routing'
import {
  normalizeManufacturerCatalogLabel,
  rollupManufacturerCatalogCategories,
} from '@/lib/manufacturer-catalog-labels'
import { prefersLatinCategoryLabels } from '@/lib/category-display'
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

function normalizeStoredCatalogCategories(
  categories: ManufacturerCatalogCategory[],
  locale: AppLocale,
): ManufacturerCatalogCategory[] {
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
  const shouldNormalize = prefersLatinCategoryLabels(locale)

  if (manufacturerId) {
    try {
      const categories = await fetchManufacturerProductCategories(manufacturerId, {
        previewToken: options?.previewToken,
      })
      const catalogCategories = mapManufacturerCategoryTreeToCatalogCategories(categories, { locale })
      if (catalogCategories.length) {
        return { ...page, catalogCategories }
      }
    } catch (error) {
      console.error('[enrichManufacturerCatalogCategories]', { slug: page.slug, locale, error })
    }
  }

  if (!hasCatalogCategories(page.catalogCategories)) return page
  if (!shouldNormalize) return page

  const catalogCategories = normalizeStoredCatalogCategories(page.catalogCategories, locale)
  return catalogCategories.length ? { ...page, catalogCategories } : page
}

export function catalogCategoryDisplayLabel(
  category: ManufacturerCatalogCategory,
  locale: AppLocale,
): string {
  const normalized = normalizeManufacturerCatalogLabel(
    category.categoryL2
      ? `${category.categoryL1 || ''},${category.categoryL2}`
      : category.categoryL1 || category.label,
    locale,
  )
  return normalized.label || category.label
}
