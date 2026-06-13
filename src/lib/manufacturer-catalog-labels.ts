import type { AppLocale } from '@/i18n/routing'
import zhL1Aliases from '@/data/category-l1-zh-aliases.json'
import {
  containsCJK,
  formatCategoryLabel,
  prefersLatinCategoryLabels,
} from '@/lib/category-display'
import type { ManufacturerCatalogCategory } from '@/types/seo-intelligence'

const ZH_L1_SHORT_ALIASES: Record<string, string> = {
  '\u7535\u963b': 'Resistors',
  '\u7535\u5bb9': 'Capacitors',
  '\u4f20\u611f\u5668': 'Sensors, Transducers',
  '\u8fde\u63a5\u5668': 'Connectors, Interconnects',
  '\u7535\u611f': 'Inductors, Coils, Chokes',
  '\u534a\u5bfc\u4f53': 'Semiconductors',
}

function normKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function stripCatalogQuotes(value: string): string {
  return value.replace(/^['"\[\s]+|['"\]\s]+$/g, '').trim()
}

let zhL1Index: Map<string, string> | null = null

function getZhL1Index(): Map<string, string> {
  if (zhL1Index) return zhL1Index

  zhL1Index = new Map<string, string>()
  for (const [zh, en] of Object.entries(zhL1Aliases)) {
    const canonical = en.trim()
    if (!zh.trim() || !canonical) continue
    zhL1Index.set(normKey(zh), canonical)
    const first = zh.split(/[,??]/)[0]?.trim()
    if (first) zhL1Index.set(normKey(first), canonical)
  }
  for (const [zh, en] of Object.entries(ZH_L1_SHORT_ALIASES)) {
    zhL1Index.set(normKey(zh), en)
  }
  return zhL1Index
}

export function resolveTaxonomyL1(raw: string, locale: AppLocale): string {
  const text = stripCatalogQuotes(raw.trim())
  if (!text) return ''
  if (!prefersLatinCategoryLabels(locale)) return text
  if (!containsCJK(text)) return text

  const index = getZhL1Index()
  const direct = index.get(normKey(text))
  if (direct) return direct

  const firstSegment = text.split(/[,??|>/]/)[0]?.trim() ?? ''
  if (firstSegment) {
    const resolved = index.get(normKey(firstSegment))
    if (resolved) return resolved
  }

  return text
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

function catalogMergeKey(row: Pick<ManufacturerCatalogCategory, 'categoryL1' | 'categoryL2' | 'label'>): string {
  const l1 = row.categoryL1?.trim() || row.label.trim()
  const l2 = row.categoryL2?.trim() || ''
  return `${l1.toLowerCase()}||${l2.toLowerCase()}`
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

export function normalizeManufacturerCatalogCategoryRow(
  row: ManufacturerCatalogCategory,
  locale: AppLocale,
): ManufacturerCatalogCategory {
  const rolled = rollupManufacturerCatalogCategories([row], locale, 1)
  return rolled[0] ?? row
}

export function formatManufacturerCatalogCategoryLabel(
  label: string,
  locale: AppLocale,
): string {
  const normalized = normalizeManufacturerCatalogLabel(label, locale)
  return normalized.label || stripCatalogQuotes(label)
}
