import { WEBAPP_DEFAULT_COMPONENT_IMAGE } from '@/lib/site'

function normalizeImageUrl(value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed
  }
  return undefined
}

/** Default part placeholder — matches YuanQiWeb component cards / drawer. */
export function partImageForMpn(_mpn: string): string {
  return WEBAPP_DEFAULT_COMPONENT_IMAGE
}

/** Read img_urls from an ES component / catalog hit (string or string[]). */
export function readEsImageUrls(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
      .map((item) => item.trim())
  }
  if (typeof raw === 'string' && raw.trim()) {
    return raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

/** First catalog image URL from ES, or undefined when only the default placeholder applies. */
export function partImageUrlFromEsItem(item: Record<string, unknown>): string | undefined {
  const resolved = resolvePartImageUrl('', readEsImageUrls(item.img_urls))
  return resolved === WEBAPP_DEFAULT_COMPONENT_IMAGE ? undefined : resolved
}

export function buildPartImageUrlMap(
  items: Array<Record<string, unknown>>,
  keyForItem: (item: Record<string, unknown>) => string,
): Map<string, string> {
  const map = new Map<string, string>()
  for (const item of items) {
    const key = keyForItem(item).trim().toLowerCase()
    const url = partImageUrlFromEsItem(item)
    if (key && url) map.set(key, url)
  }
  return map
}

/** Prefer catalog product image URLs from ES; fall back to webapp default component image. */
export function resolvePartImageUrl(_mpn: string, imgUrls?: string[]): string {
  for (const raw of imgUrls ?? []) {
    const url = normalizeImageUrl(raw)
    if (url) return url
  }
  return WEBAPP_DEFAULT_COMPONENT_IMAGE
}
