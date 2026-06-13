import type { AppLocale } from '@/i18n/routing'
import {
  containsCJK,
  formatCategoryLabel,
  prefersLatinCategoryLabels,
} from '@/lib/category-display'
import {
  resolveTaxonomyL1,
  stripCatalogQuotes,
} from '@/lib/category-locale-label'
import type { ManufacturerCatalogCategory } from '@/types/seo-intelligence'

export { resolveTaxonomyL1, resolveSeoCategoryLabel, resolveSeoCategoryLabelFromItem } from '@/lib/category-locale-label'

export function normalizeManufacturerCatalogLabel(
  rawLabel: string,
  locale: AppLocale,
): { label: string; categoryL1: string; categoryL2: string } {
  const text = stripCatalogQuotes(rawLabel.trim())
  if (!text) return { label: '', categoryL1: '', categoryL2: '' }

  if (/[,|>/]/.test(text)) {
    const parts = text
      .split(/[,|>/]/)
      .map((part) => stripCatalogQuotes(part.trim()))
      .filter(Boolean)
    if (parts.length >= 2) {
      const categoryL1 = resolveTaxonomyL1(parts[0], locale)
      const label = formatCategoryLabel(text, { locale, fallback: categoryL1 })
        || formatCategoryLabel(`${categoryL1},${parts[1]}`, { locale, fallback: categoryL1 })
        || categoryL1
      const categoryL2 = prefersLatinCategoryLabels(locale) && containsCJK(parts[1])
        ? (formatCategoryLabel(`${categoryL1},${parts[1]}`, { locale }) || '')
        : parts[1]
      return {
        label,
        categoryL1,
        categoryL2: categoryL2 || '',
      }
    }
  }

  const categoryL1 = resolveTaxonomyL1(text, locale)
  return { label: categoryL1, categoryL1, categoryL2: '' }
}

function catalogMergeKey(row: Pick<ManufacturerCatalogCategory, 'label'>): string {
  return stripCatalogQuotes(row.label.trim()).toLowerCase().replace(/\s+/g, ' ')
}

export function rollupManufacturerCatalogCategories(
  rows: ManufacturerCatalogCategory[],
  locale: AppLocale,
  limit = 12,
): ManufacturerCatalogCategory[] {
  const merged = new Map<string, ManufacturerCatalogCategory>()

  for (const row of rows) {
    const rawLabel = row.categoryL2
      ? `${row.categoryL1?.trim() || ''},${row.categoryL2.trim()}`.replace(/^,/, '')
      : row.categoryL1?.trim() || row.label.trim()
    const normalized = normalizeManufacturerCatalogLabel(rawLabel, locale)
    if (!normalized.label) continue

    const nextRow: ManufacturerCatalogCategory = {
      label: normalized.label,
      partCount: row.partCount,
      categoryL1: normalized.categoryL1 || undefined,
      categoryL2: normalized.categoryL2 || undefined,
    }
    const key = catalogMergeKey(nextRow)
    const existing = merged.get(key)
    if (existing) {
      existing.partCount += nextRow.partCount
      continue
    }
    merged.set(key, nextRow)
  }

  return [...merged.values()]
    .sort((left, right) => right.partCount - left.partCount)
    .slice(0, limit)
}
