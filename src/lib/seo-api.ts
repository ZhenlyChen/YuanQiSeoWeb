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

export type ManufacturerDirectoryApiPage = {
  pageType: 'manufacturer_directory'
  items: import('@/types/seo-intelligence').ManufacturerDirectoryItem[]
  categoryFacets: import('@/types/seo-intelligence').ManufacturerDirectoryFacet[]
  totalInDatabase: number
  total: number
  page: number
  pageSize: number
}

export type CategoryDirectoryApiPage = {
  pageType: 'category_directory'
  items: Array<
    Omit<import('@/types/seo-intelligence').CategoryDirectoryItem, 'partCount'> & {
      partCount: number
    }
  >
  totalInDatabase: number
}

export type CategoryHubApiPage = import('@/types/seo-intelligence').CategoryHubPage

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

export async function fetchManufacturerDirectory(params?: {
  locale?: string
  categoryL1?: string
  letter?: string
  sort?: 'popular' | 'name'
  page?: number
  pageSize?: number
}): Promise<ManufacturerDirectoryApiPage | null> {
  const search = new URLSearchParams()
  search.set('locale', params?.locale || 'en')
  if (params?.categoryL1) search.set('categoryL1', params.categoryL1)
  if (params?.letter) search.set('letter', params.letter)
  if (params?.sort) search.set('sort', params.sort)
  if (params?.page) search.set('page', String(params.page))
  if (params?.pageSize) search.set('pageSize', String(params.pageSize))

  try {
    const res = await fetch(`${apiBase()}seo/manufacturers/directory?${search.toString()}`, {
      // Directory facets/counts change with ES enrichment; avoid stale empty sidebar cache.
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<ManufacturerDirectoryApiPage>
    if (json.code !== 200 || !json.data) return null
    return json.data
  } catch {
    return null
  }
}

export async function fetchCategoryDirectory(params?: {
  locale?: string
}): Promise<CategoryDirectoryApiPage | null> {
  const search = new URLSearchParams()
  search.set('locale', params?.locale || 'en')

  try {
    const res = await fetch(`${apiBase()}seo/categories/directory?${search.toString()}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<CategoryDirectoryApiPage>
    if (json.code !== 200 || !json.data) return null
    return json.data
  } catch {
    return null
  }
}

export async function fetchCategoryHub(params: {
  l1Slug: string
  l2Slug?: string
  locale?: string
}): Promise<CategoryHubApiPage | null> {
  const search = new URLSearchParams()
  search.set('locale', params.locale || 'en')
  const path = params.l2Slug
    ? `seo/categories/${encodeURIComponent(params.l1Slug)}/${encodeURIComponent(params.l2Slug)}?${search.toString()}`
    : `seo/categories/${encodeURIComponent(params.l1Slug)}?${search.toString()}`

  try {
    const res = await fetch(`${apiBase()}${path}`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<CategoryHubApiPage>
    if (json.code !== 200 || !json.data) return null
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
