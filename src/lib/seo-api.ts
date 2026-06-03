export type PublicSeoPage = {
  pageType: string
  slug: string
  canonicalPath: string
  locale: string
  title: string
  description: string
  ogImage: string
  robots: string
  status: string
  component: Record<string, unknown>
  quality: {
    completeCore: boolean
    completeDocs: boolean
    completeMedia: boolean
    completeParams: boolean
    completeDesc: boolean
  }
}

type ApiResponse<T> = { code: number; data: T; msg: string }

function apiBase(): string {
  return (
    process.env.YUANQI_API_BASE?.replace(/\/?$/, '/') ||
    'http://127.0.0.1:8080/api/v1/'
  )
}

export async function fetchSeoPage(
  slug: string,
  options?: { locale?: string; previewToken?: string },
): Promise<PublicSeoPage | null> {
  const locale = options?.locale || 'en'
  const base = apiBase()
  const path = options?.previewToken
    ? `seo/pages/${encodeURIComponent(slug)}/preview?locale=${locale}&token=${encodeURIComponent(options.previewToken)}`
    : `seo/pages/${encodeURIComponent(slug)}?locale=${locale}`

  try {
    const res = await fetch(`${base}${path}`, {
      cache: options?.previewToken ? 'no-store' : undefined,
      next: options?.previewToken ? undefined : { revalidate: 86400 },
    })
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<PublicSeoPage>
    if (json.code !== 200) return null
    return json.data
  } catch {
    return null
  }
}

export function utmForSlug(slug: string): string {
  const params = new URLSearchParams({
    utm_source: 'seo',
    utm_medium: 'pseo',
    utm_campaign: 'part_page',
    utm_content: slug,
  })
  return params.toString()
}

export function appCtaUrl(slug: string): string {
  return `https://app.partgenie.ai/?${utmForSlug(slug)}`
}
