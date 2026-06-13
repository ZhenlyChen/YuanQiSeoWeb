import type { AppLocale } from '@/i18n/routing'

export type FormatCategoryLabelOptions = {
  locale?: AppLocale
  /** Used when the label is already a CJK fragment with no Latin path left to parse. */
  fallback?: string
}

const CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf]/u

export function containsCJK(text: string): boolean {
  return CJK_RE.test(text)
}

export function prefersLatinCategoryLabels(locale?: AppLocale): boolean {
  return locale === 'en' || locale === 'de'
}

function stripCategoryToken(value: string) {
  return value.replace(/^['"\[\s]+|['"\]\s]+$/g, '').trim()
}

function parseCategoryPath(raw: string): string[] {
  const text = raw.trim()
  if (!text) return []

  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text.replace(/'/g, '"'))
      if (Array.isArray(parsed)) {
        return parsed.map((item) => stripCategoryToken(String(item))).filter(Boolean)
      }
    } catch {
      // fall through
    }

    const close = text.indexOf(']')
    if (close > 0) {
      const inner = text.slice(1, close)
      const segments = inner.match(/'([^']*)'|"([^"]*)"|([^,]+)/g)
      if (segments?.length) {
        return segments
          .map((segment) => {
            const match = segment.match(/^'([^']*)'$|^"([^"]*)"$|^([^,]+)$/)
            return stripCategoryToken(match?.[1] ?? match?.[2] ?? match?.[3] ?? segment)
          })
          .filter(Boolean)
      }
    }
  }

  return text
    .replace(/\u3001/g, ',')
    .replace(/\uFF1B/g, ',')
    .replace(/;/g, ',')
    .replace(/>/g, ',')
    .replace(/\uFF0C/g, ',')
    .split(',')
    .map(stripCategoryToken)
    .filter(Boolean)
}

function pickLatinSegment(parts: string[]): string {
  for (let index = parts.length - 2; index >= 0; index -= 1) {
    const segment = parts[index]?.trim()
    if (segment && !containsCJK(segment)) return segment
  }
  return ''
}

function pickDefaultSegment(parts: string[]): string {
  if (parts.length >= 3) return parts[2]
  if (parts.length === 2) return parts[1]
  return parts[0] ?? ''
}

/** Human-readable category label from ES category / category_str. */
export function formatCategoryLabel(raw?: unknown, options?: FormatCategoryLabelOptions): string {
  let text = ''
  if (typeof raw === 'string') {
    text = raw.trim()
  } else if (Array.isArray(raw)) {
    text = raw.map((item) => String(item).trim()).filter(Boolean).join(', ')
  } else if (raw != null) {
    text = String(raw).trim()
  }
  if (!text) return options?.fallback?.trim() || ''

  const parts = parseCategoryPath(text)
  if (!parts.length) return options?.fallback?.trim() || ''

  const label = pickDefaultSegment(parts)
  if (prefersLatinCategoryLabels(options?.locale) && containsCJK(label)) {
    const latin = pickLatinSegment(parts)
    if (latin) return latin
    return options?.fallback?.trim() || label
  }
  return label
}

/** Display helper when API may have already truncated category to a single label. */
export function formatCategoryLabelForDisplay(
  label: string | undefined,
  options?: FormatCategoryLabelOptions,
): string {
  const trimmed = label?.trim() ?? ''
  if (!trimmed) return options?.fallback?.trim() || ''

  if (trimmed.includes(',') || trimmed.startsWith('[')) {
    return formatCategoryLabel(trimmed, options) || options?.fallback?.trim() || trimmed
  }

  if (prefersLatinCategoryLabels(options?.locale) && containsCJK(trimmed)) {
    return options?.fallback?.trim() || trimmed
  }

  return trimmed
}
