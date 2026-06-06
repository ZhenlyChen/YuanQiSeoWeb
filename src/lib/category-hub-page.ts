import { notFound } from 'next/navigation'
import { getMockCategoryHubPage } from '@/data/mock/category'
import { getL1Category, getL2Category } from '@/lib/category-taxonomy'
import type { AppLocale } from '@/i18n/routing'
import { categoryHubSeoMeta } from '@/lib/seo-meta'
import { fetchCategoryHub } from '@/lib/seo-api'
import { SEO_SITE_ORIGIN } from '@/lib/site'
import type { CategoryHubPage } from '@/types/seo-intelligence'

function useMockCategoryHub(): boolean {
  return process.env.USE_MOCK_CATEGORY_HUB !== 'false'
}

async function fetchCategoryHubPage(
  l1Slug: string,
  l2Slug?: string,
  locale?: AppLocale,
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

  const apiPage = await fetchCategoryHub({ l1Slug, l2Slug, locale })
  if (!apiPage) {
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

  return {
    ...apiPage,
    meta: await categoryHubSeoMeta({
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
}) {
  const l1 = getL1Category(params.l1Slug)
  if (!l1) notFound()

  if (params.l2Slug && !getL2Category(params.l1Slug, params.l2Slug)) {
    notFound()
  }

  const page = await fetchCategoryHubPage(params.l1Slug, params.l2Slug, params.locale)
  if (!page) notFound()

  const itemListItems = page.mostSearchedParts.slice(0, 12).map((item) => ({
    name: item.mpn,
    url: `${SEO_SITE_ORIGIN}${item.href}`,
  }))

  return {
    page,
    itemList:
      itemListItems.length > 0
        ? {
            name: `${page.name} components`,
            items: itemListItems,
          }
        : undefined,
  }
}
