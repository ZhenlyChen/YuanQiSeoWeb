import type { AppLocale } from '@/i18n/routing'
import zhL1Aliases from '@/data/category-l1-zh-aliases.json'
import {
  containsCJK,
  formatCategoryLabel,
  formatCategoryLabelForDisplay,
  prefersLatinCategoryLabels,
} from '@/lib/category-display'

const ZH_L1_SHORT_ALIASES: Record<string, string> = {
  '\u7535\u963b': 'Resistors',
  '\u7535\u5bb9': 'Capacitors',
  '\u4f20\u611f\u5668': 'Sensors, Transducers',
  '\u8fde\u63a5\u5668': 'Connectors, Interconnects',
  '\u7535\u611f': 'Inductors, Coils, Chokes',
  '\u534a\u5bfc\u4f53': 'Semiconductors',
  '\u5c04\u9891\u82af\u7247/\u5929\u7ebf': 'RF/IF and RFID',
}

function normKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function stripCatalogQuotes(value: string): string {
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

/** Map zh DigiKey L1 bucket keys to canonical English taxonomy labels. */
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

function readCategoryRaw(raw?: unknown): string {
  if (typeof raw === 'string') return raw.trim()
  if (Array.isArray(raw)) {
    return raw.map((item) => String(item).trim()).filter(Boolean).join(', ')
  }
  if (raw != null) return String(raw).trim()
  return ''
}

/**
 * Single entry point for en/de category display labels from ES category / category_str
 * or pre-truncated content_json values.
 */
export function resolveSeoCategoryLabel(
  raw: unknown,
  locale?: AppLocale,
  fallback = '',
): string {
  const text = readCategoryRaw(raw)
  if (!text) return fallback.trim() || 'Component'

  const fromPath = formatCategoryLabel(text, { locale, fallback })
  if (fromPath && (!locale || !prefersLatinCategoryLabels(locale) || !containsCJK(fromPath))) {
    return fromPath
  }

  const resolvedL1 = locale ? resolveTaxonomyL1(text, locale) : text
  if (resolvedL1 && resolvedL1 !== text && !containsCJK(resolvedL1)) {
    return resolvedL1
  }

  return (
    formatCategoryLabelForDisplay(fromPath || text, { locale, fallback })
    || fallback.trim()
    || 'Component'
  )
}

export function resolveSeoCategoryLabelFromItem(
  item: Record<string, unknown>,
  locale?: AppLocale,
  fallback = '',
): string {
  const categoryRaw = readCategoryRaw(item.category_str) || readCategoryRaw(item.category)
  return resolveSeoCategoryLabel(categoryRaw || item.category, locale, fallback || 'Component')
}

export function patchSeoCategoryLabels<T extends { category?: string }>(
  rows: T[],
  locale: AppLocale,
  labelsByKey: Map<string, string>,
  keyForRow: (row: T) => string,
  fallback = '',
): T[] {
  if (!prefersLatinCategoryLabels(locale)) return rows

  return rows.map((row) => {
    const key = keyForRow(row).trim().toLowerCase()
    const category = labelsByKey.get(key)
      || resolveSeoCategoryLabel(row.category, locale, fallback)
      || row.category
    return category === row.category ? row : { ...row, category }
  })
}
