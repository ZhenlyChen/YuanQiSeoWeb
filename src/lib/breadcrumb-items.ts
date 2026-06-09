import type { BreadcrumbItem } from '@/types/seo-intelligence'

const DEFAULT_BREADCRUMB_HREFS: Record<string, string> = {
  Manufacturers: '/manufacturers',
  Categories: '/categories',
}

function readHref(item: Record<string, unknown>): string | undefined {
  for (const key of ['href', 'url', 'link'] as const) {
    const value = item[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }
  return undefined
}

export function normalizeBreadcrumbItems(
  items: Array<BreadcrumbItem | Record<string, unknown>>,
): BreadcrumbItem[] {
  return items
    .map((item) => {
      const label = typeof item.label === 'string' ? item.label.trim() : ''
      if (!label) return null

      const raw = item as Record<string, unknown>
      const href = readHref(raw) ?? DEFAULT_BREADCRUMB_HREFS[label]

      return href ? { label, href } : { label }
    })
    .filter((item): item is BreadcrumbItem => item !== null)
}
