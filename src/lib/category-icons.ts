const CATEGORY_ICON_CDN_BASE = 'https://web-static.partgenie.ai/category-icons'

export function categoryIconPath(slug: string): string | undefined {
  const normalized = slug.trim()
  if (!normalized) return undefined
  return `${CATEGORY_ICON_CDN_BASE}/${normalized}.webp`
}

export function subcategoryIconPath(l1Slug: string, l2Slug: string): string | undefined {
  const parent = l1Slug.trim()
  const child = l2Slug.trim()
  if (!parent || !child) return undefined
  return categoryIconPath(`${parent}-${child}`)
}

/** Normalize API/static paths to CDN webp (colleague-uploaded assets use .webp on web-static). */
function toCategoryIconCdnUrl(iconUrl: string): string | undefined {
  const absoluteOnCdn = iconUrl.match(
    /^https:\/\/web-static\.partgenie\.ai\/category-icons\/([^/?#]+)\.(png|webp|jpe?g)$/i,
  )
  if (absoluteOnCdn) {
    return categoryIconPath(absoluteOnCdn[1])
  }
  if (/^https?:\/\//i.test(iconUrl)) {
    return iconUrl
  }
  const relative = iconUrl.match(/^\/category-icons\/([^/?#]+)\.(png|webp|jpe?g)$/i)
  if (relative) {
    return categoryIconPath(relative[1])
  }
  return undefined
}

export function resolveCategoryIconUrl(slug: string, iconUrl?: string): string | undefined {
  const fromApi = iconUrl?.trim()
  if (fromApi) {
    const cdnUrl = toCategoryIconCdnUrl(fromApi)
    if (cdnUrl) return cdnUrl
  }
  return categoryIconPath(slug)
}
