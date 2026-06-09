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

/** Human-readable category label from ES category / category_str. */
export function formatCategoryLabel(raw?: unknown): string {
  let text = ''
  if (typeof raw === 'string') {
    text = raw.trim()
  } else if (Array.isArray(raw)) {
    text = raw.map((item) => String(item).trim()).filter(Boolean).join(', ')
  } else if (raw != null) {
    text = String(raw).trim()
  }
  if (!text) return ''

  const parts = parseCategoryPath(text)
  if (parts.length >= 3) return parts[2]
  if (parts.length === 2) return parts[1]
  return parts[0] ?? ''
}
