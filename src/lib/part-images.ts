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

/** Prefer catalog product image URLs from ES; fall back to webapp default component image. */
export function resolvePartImageUrl(_mpn: string, imgUrls?: string[]): string {
  for (const raw of imgUrls ?? []) {
    const url = normalizeImageUrl(raw)
    if (url) return url
  }
  return WEBAPP_DEFAULT_COMPONENT_IMAGE
}
