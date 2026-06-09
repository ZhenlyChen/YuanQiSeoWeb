const CATEGORY_ICON_BASE = '/category-icons'

export function categoryIconPath(slug: string): string | undefined {
  const normalized = slug.trim()
  if (!normalized) return undefined
  return `${CATEGORY_ICON_BASE}/${normalized}.png`
}

export function subcategoryIconPath(l1Slug: string, l2Slug: string): string | undefined {
  const parent = l1Slug.trim()
  const child = l2Slug.trim()
  if (!parent || !child) return undefined
  return categoryIconPath(`${parent}-${child}`)
}

export function resolveCategoryIconUrl(slug: string, iconUrl?: string): string | undefined {
  const fromApi = iconUrl?.trim()
  if (fromApi) return fromApi
  return categoryIconPath(slug)
}