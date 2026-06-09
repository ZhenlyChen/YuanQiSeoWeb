import type { AppLocale } from '@/i18n/routing'
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
  options?: { limit?: number },
): ManufacturerCatalogCategory[] {
  const limit = options?.limit ?? CATALOG_CATEGORY_LIMIT
  const rows: ManufacturerCatalogCategory[] = []

  for (const l1 of categories) {
    const categoryL1 = l1.name?.trim()
    if (!categoryL1) continue

    const children = Array.isArray(l1.children) ? l1.children : []
    if (children.length > 0) {
      for (const child of children) {
        const categoryL2 = child.name?.trim()
        if (!categoryL2) continue
        rows.push({
          label: categoryL2,
          partCount: child.count ?? 0,
          categoryL1,
          categoryL2,
        })
      }
      continue
    }

    rows.push({
      label: categoryL1,
      partCount: l1.count ?? 0,
      categoryL1,
    })
  }

  return rows
    .sort((left, right) => right.partCount - left.partCount)
    .slice(0, limit)
}

/** SSR fallback when hub content_json has empty catalogCategories but ES has products. */
export async function enrichManufacturerCatalogCategories(
  page: ManufacturerIntelligencePage,
  locale: AppLocale,
  options?: { previewToken?: string },
): Promise<ManufacturerIntelligencePage> {
  if (hasCatalogCategories(page.catalogCategories)) return page

  const manufacturerId = page.manufacturerId?.trim()
  if (!manufacturerId) return page

  try {
    const categories = await fetchManufacturerProductCategories(manufacturerId, {
      previewToken: options?.previewToken,
    })
    const catalogCategories = mapManufacturerCategoryTreeToCatalogCategories(categories)
    if (!catalogCategories.length) return page

    return { ...page, catalogCategories }
  } catch (error) {
    console.error('[enrichManufacturerCatalogCategories]', { slug: page.slug, locale, error })
    return page
  }
}
