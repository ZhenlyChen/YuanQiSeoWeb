import { notFound } from 'next/navigation'
import { getMockCategoryHubPage } from '@/data/mock/category'
import type { AppLocale } from '@/i18n/routing'
import { enrichCategoryHubSubcategories } from '@/lib/category-hub-subcategories'
import { enrichCategoryMostSearchedParts } from '@/lib/category-most-searched-fallback'
import { useMockCategoryHub } from '@/lib/mock-seo-pages'
import { categoryHubSeoMeta } from '@/lib/seo-meta'
import { fetchCategoryHub } from '@/lib/seo-api'
import { buildHubItemListFromParts } from '@/lib/hub-item-list-from-parts'
import type { CategoryHubPage } from '@/types/seo-intelligence'

async function fetchCategoryHubPage(
  l1Slug: string,
  l2Slug?: string,
  locale?: AppLocale,
  previewToken?: string,
): Promise<CategoryHubPage | null> {
  if (useMockCategoryHub()) {
    const page = getMockCategoryHubPage(l1Slug, l2Slug)
    if (!page) return null
    return {
      ...page,
      meta: await categoryHubSeoMeta({
        name: page.name,
        l1Slug: page.l1Slug,
        l2Slug: page.l2Slug,
      }),
    }
  }

  const apiPage = await fetchCategoryHub({ l1Slug, l2Slug, locale, previewToken })
  if (!apiPage) {
    return null
  }

  const canonicalPath = l2Slug
    ? `/categories/${l1Slug}/${l2Slug}`
    : `/categories/${l1Slug}`
  const seoTitle = typeof (apiPage as { seoTitle?: unknown }).seoTitle === 'string'
    ? String((apiPage as { seoTitle?: string }).seoTitle)
    : ''
  const seoDescription = typeof (apiPage as { seoDescription?: unknown }).seoDescription === 'string'
    ? String((apiPage as { seoDescription?: string }).seoDescription)
    : ''
  const robots = typeof (apiPage as { robots?: unknown }).robots === 'string'
    ? String((apiPage as { robots?: string }).robots)
    : undefined

  return {
    ...apiPage,
    meta: seoTitle
      ? {
          title: seoTitle,
          description: seoDescription || (await categoryHubSeoMeta({
            name: apiPage.name,
            l1Slug: apiPage.l1Slug,
            l2Slug: apiPage.l2Slug,
          })).description,
          h1: apiPage.name,
          canonicalPath,
          keywords: [],
          robots,
        }
      : await categoryHubSeoMeta({
          name: apiPage.name,
          l1Slug: apiPage.l1Slug,
          l2Slug: apiPage.l2Slug,
        }),
  }
}

export async function buildCategoryHubProps(params: {
  l1Slug: string
  l2Slug?: string
  locale?: AppLocale
  previewToken?: string
}) {
  let page = await fetchCategoryHubPage(
    params.l1Slug,
    params.l2Slug,
    params.locale,
    params.previewToken,
  )
  if (!page) notFound()

  if (!params.l2Slug) {
    page = await enrichCategoryHubSubcategories(page, params.locale)
  }

  page = await enrichCategoryMostSearchedParts(page, params.locale ?? 'en')

  return {
    page,
    itemList: buildHubItemListFromParts(page.name, page.mostSearchedParts),
  }
}
