/** Local mock assets until manufacturer pages load logoUrl from the API. */
const LOCAL_LOGO_BY_SLUG: Record<string, string> = {
  stmicroelectronics: '/manufacturers/stmicroelectronics.svg',
}

export function resolveManufacturerLogo(slug: string, logoUrl?: string): string | undefined {
  const fromApi = logoUrl?.trim()
  if (fromApi) {
    return fromApi
  }

  const key = slug.trim().toLowerCase()
  return LOCAL_LOGO_BY_SLUG[key]
}
