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
  content: PublicPageContent
  links: PublicPageLinks
  hubPage?: import('@/types/seo-intelligence').ManufacturerIntelligencePage
}

export type PublicPageContent = {
  degraded: boolean
  shortAnswer?: Record<string, unknown>
  shortAnswerText?: string
  qaBlocks?: Array<Record<string, unknown>>
  substitutes?: Array<Record<string, unknown>>
  aiVerdict?: Record<string, unknown>
  keySpecs?: Array<{ label: string; value: string }>
  applications?: {
    goodFit?: Array<string | { label: string; icon?: string }>
    notRecommended?: string[]
  }
  designConsiderations?: string[]
  commonPitfalls?: Array<{ title?: string; detail?: string }>
  bomSourcing?: {
    lifecycle?: string
    supplyRisk?: string
    replacementReadiness?: string
    bullets?: string[]
  }
  overviewTags?: string[]
  signals?: Record<string, unknown>
  riskAnalysis?: Array<{ category?: string; level?: string; detail?: string }>
  applicationFit?: Array<{ scenario?: string; guidance?: string }>
  regionalNotes?: string[]
  heroSummary?: string
  aiReplacementInsight?: Record<string, unknown>
  replacementVerdict?: Record<string, unknown>
  compatibilityMatrix?: Array<Record<string, unknown>>
  featureComparison?: Array<Record<string, unknown>>
  featureComparisonHeaders?: Record<string, string>
  compareLinks?: Array<{ label: string; href: string }>
}

export type PublicPageLinks = {
  breadcrumbs?: Array<{ label: string; href?: string }>
  manufacturer?: { label: string; href: string }
  category?: { label: string; href: string }
  sameCategoryParts?: Array<{ label: string; href: string; mpn?: string }>
  sameManufacturerParts?: Array<{ label: string; href: string; mpn?: string }>
  compare?: Array<{ label: string; href: string }>
  answers?: Array<{ label: string; href: string }>
}

export type PublicSitemapEntry = {
  canonicalPath: string
  locale: string
  pageType: string
}

export type PublicSitemapPaths = {
  paths: string[]
  entries: PublicSitemapEntry[]
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
      iconUrl?: string
    }
  >
  totalInDatabase: number
}

export type CategoryHubApiPage = import('@/types/seo-intelligence').CategoryHubPage

export type ManufacturerProductCategoryChild = {
  name: string
  count: number
}

export type ManufacturerProductCategory = {
  name: string
  count: number
  children: ManufacturerProductCategoryChild[]
}

export type ManufacturerProductsApiResponse = {
  items: Array<Record<string, unknown>>
  total: number
  page: number
  pageSize: number
  categories: ManufacturerProductCategory[]
}

type ApiResponse<T> = { code: number; data: T; msg: string }

function apiBase(): string {
  return (
    process.env.YUANQI_API_BASE?.replace(/\/?$/, '/') ||
    process.env.NEXT_PUBLIC_YUANQI_API_BASE?.replace(/\/?$/, '/') ||
    'http://127.0.0.1:8080/api/v1/'
  )
}

export type SeoPageAvailability = {
  exists: boolean
  published: boolean
  status?: string
  pageType?: string
  slug: string
  locale: string
  entityKey?: string
}

export async function fetchSeoPageAvailability(
  slug: string,
  locale?: string,
): Promise<SeoPageAvailability | null> {
  const search = new URLSearchParams()
  search.set('locale', locale || 'en')

  try {
    const res = await fetch(
      `${apiBase()}seo/pages/${encodeURIComponent(slug)}/availability?${search.toString()}`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<SeoPageAvailability>
    if (json.code !== 200 || !json.data) return null
    return json.data
  } catch {
    return null
  }
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
    const data = json.data
    if (!data) return null
    return {
      ...data,
      content: data.content ?? { degraded: true, substitutes: [] },
      links: data.links ?? {},
    }
  } catch {
    return null
  }
}

export async function fetchSitemapPaths(): Promise<PublicSitemapPaths> {
  try {
    const res = await fetch(`${apiBase()}seo/sitemap-paths`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      return { paths: [], entries: [] }
    }
    const json = (await res.json()) as ApiResponse<PublicSitemapPaths>
    if (json.code !== 200 || !json.data) {
      return { paths: [], entries: [] }
    }
    return {
      paths: json.data.paths ?? [],
      entries: json.data.entries ?? [],
    }
  } catch {
    return { paths: [], entries: [] }
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
      // Category counts come from ES + DigiKey taxonomy; avoid stale directory cache.
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<CategoryDirectoryApiPage>
    if (json.code !== 200 || !json.data) return null
    return json.data
  } catch {
    return null
  }
}

export async function fetchCategorySubcategories(
  l1Slug: string,
  params?: { locale?: string },
): Promise<import('@/lib/category-hub-subcategories').CategorySubcategoriesApiPage | null> {
  const search = new URLSearchParams()
  search.set('locale', params?.locale || 'en')

  try {
    const res = await fetch(
      `${apiBase()}seo/categories/${encodeURIComponent(l1Slug)}/subcategories?${search.toString()}`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<
      import('@/lib/category-hub-subcategories').CategorySubcategoriesApiPage
    >
    if (json.code !== 200 || !json.data) return null
    return json.data
  } catch {
    return null
  }
}

async function fetchManufacturerProductsResponse(
  manufacturerId: string,
  options?: { pageSize?: number; previewToken?: string },
): Promise<ManufacturerProductsApiResponse | null> {
  const id = manufacturerId.trim()
  if (!id) return null

  const search = new URLSearchParams({
    manufacturerId: id,
    page: '1',
    pageSize: String(options?.pageSize ?? 1),
  })

  try {
    const res = await fetch(`${apiBase()}component/manufacturer/products?${search.toString()}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = (await res.json()) as ApiResponse<ManufacturerProductsApiResponse>
    if (json.code !== 200 || !json.data) return null
    return json.data
  } catch (error) {
    console.error('[fetchManufacturerProductsResponse]', error)
    return null
  }
}

export async function fetchManufacturerProductCategories(
  manufacturerId: string,
  options?: { previewToken?: string },
): Promise<ManufacturerProductCategory[]> {
  const data = await fetchManufacturerProductsResponse(manufacturerId, {
    pageSize: 1,
    previewToken: options?.previewToken,
  })
  return data?.categories ?? []
}

/** ES catalog sample parts (code sort), same source as import-time ES fallback. */
export async function fetchManufacturerProductItems(
  manufacturerId: string,
  options?: { pageSize?: number; previewToken?: string },
): Promise<Array<Record<string, unknown>>> {
  const data = await fetchManufacturerProductsResponse(manufacturerId, {
    pageSize: options?.pageSize ?? 10,
    previewToken: options?.previewToken,
  })
  return data?.items ?? []
}

type CategoryProductsApiResponse = {
  items: Array<Record<string, unknown>>
  total: number
  page: number
  pageSize: number
}

/** ES catalog samples for a taxonomy category (category hub SSR fallback). */
export async function fetchCategoryProductItems(params: {
  categoryL1: string
  categoryL2?: string
  pageSize?: number
  locale?: string
}): Promise<Array<Record<string, unknown>>> {
  const categoryL1 = params.categoryL1.trim()
  if (!categoryL1) return []

  const search = new URLSearchParams({
    categoryL1,
    page: '1',
    pageSize: String(params.pageSize ?? 12),
  })
  const categoryL2 = params.categoryL2?.trim()
  if (categoryL2) search.set('categoryL2', categoryL2)
  if (params.locale) search.set('locale', params.locale)

  try {
    const res = await fetch(`${apiBase()}component/category/products?${search.toString()}`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return []
    const json = (await res.json()) as ApiResponse<CategoryProductsApiResponse>
    if (json.code !== 200 || !json.data) return []
    return json.data.items ?? []
  } catch (error) {
    console.error('[fetchCategoryProductItems]', error)
    return []
  }
}

export async function fetchCategoryHub(params: {
  l1Slug: string
  l2Slug?: string
  locale?: string
  previewToken?: string
}): Promise<CategoryHubApiPage | null> {
  const search = new URLSearchParams()
  search.set('locale', params.locale || 'en')
  if (params.previewToken) {
    search.set('token', params.previewToken)
  }
  const path = params.l2Slug
    ? `seo/categories/${encodeURIComponent(params.l1Slug)}/${encodeURIComponent(params.l2Slug)}?${search.toString()}`
    : `seo/categories/${encodeURIComponent(params.l1Slug)}?${search.toString()}`

  try {
    const res = await fetch(`${apiBase()}${path}`, {
      cache: params.previewToken ? 'no-store' : undefined,
      next: params.previewToken ? undefined : { revalidate: 86400 },
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
