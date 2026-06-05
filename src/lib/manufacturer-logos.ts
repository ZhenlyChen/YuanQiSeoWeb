/** CDN base for manufacturer logo filenames stored in PG (matches YuanQiWeb ManufacturerLogo). */
const MANUFACTURER_CDN_BASE =
  process.env.NEXT_PUBLIC_CDN_BASE_URL?.replace(/\/$/, '') ||
  'https://web-static.partgenie.cn'

/** Local mock assets until manufacturer pages load logoUrl from the API. */
const LOCAL_LOGO_BY_SLUG: Record<string, string> = {
  stmicroelectronics: '/manufacturers/stmicroelectronics.svg',
}

export function resolveManufacturerLogo(slug: string, logoUrl?: string): string | undefined {
  const fromApi = logoUrl?.trim()
  if (fromApi) {
    if (/^https?:\/\//i.test(fromApi)) {
      return fromApi
    }
    const filename = fromApi.replace(/^\/+/, '')
    return `${MANUFACTURER_CDN_BASE}/manufacturer/${filename}`
  }

  const key = slug.trim().toLowerCase()
  return LOCAL_LOGO_BY_SLUG[key]
}
