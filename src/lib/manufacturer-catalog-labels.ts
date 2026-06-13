import type { AppLocale } from '@/i18n/routing'
import {
  containsCJK,
  formatCategoryLabel,
  prefersLatinCategoryLabels,
} from '@/lib/category-display'
import {
  resolveTaxonomyL1,
  resolveSeoCategoryLabel,
  resolveZhCategoryDisplayLabel,
  stripCatalogQuotes,
} from '@/lib/category-locale-label'
import type { ManufacturerCatalogCategory } from '@/types/seo-intelligence'

export { resolveTaxonomyL1, resolveSeoCategoryLabel, resolveSeoCategoryLabelFromItem } from '@/lib/category-locale-label'

function resolveCatalogL2(rawL2: string, categoryL1: string, locale: AppLocale): string {
  const text = stripCatalogQuotes(rawL2.trim())
  if (!text) return ''

  if (!prefersLatinCategoryLabels(locale) || !containsCJK(text)) {
    return text
  }

  const fromAlias = resolveZhCategoryDisplayLabel(text, locale)
  if (fromAlias && !containsCJK(fromAlias)) {
    return fromAlias
  }

  const fromPath = formatCategoryLabel(
    categoryL1 ? `${categoryL1},${text}` : text,
    { locale, fallback: categoryL1 },
  )
  if (fromPath && !containsCJK(fromPath)) {
    return fromPath
  }

  return fromAlias || text
}

/** Prefer structured categoryL1/categoryL2 from ES tree over comma-joined path parsing. */
export function normalizeManufacturerCatalogRow(
  row: Pick<ManufacturerCatalogCategory, 'label' | 'categoryL1' | 'categoryL2'>,
  locale: AppLocale,
): { label: string; categoryL1: string; categoryL2: string } {
  const rawL1 = row.categoryL1?.trim() || ''
  const rawL2 = row.categoryL2?.trim() || ''

  if (rawL1 || rawL2) {
    const categoryL1 = rawL1 ? resolveTaxonomyL1(rawL1, locale) : ''
    const categoryL2 = rawL2 ? resolveCatalogL2(rawL2, categoryL1, locale) : ''
    const label = categoryL2
      || categoryL1
      || resolveSeoCategoryLabel(row.label, locale, row.label)
    return { label, categoryL1, categoryL2 }
  }

  return normalizeManufacturerCatalogLabel(row.label.trim(), locale)
}

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
      const rawL2 = parts[parts.length - 1] ?? parts[1]
      const categoryL2 = resolveCatalogL2(rawL2, categoryL1, locale)
      const label = categoryL2
        || formatCategoryLabel(text, { locale, fallback: categoryL1 })
        || categoryL1
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
    const normalized = normalizeManufacturerCatalogRow(row, locale)
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
