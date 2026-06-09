import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getMockCategoryDirectoryPage } from '@/data/mock/category'
import type { AppLocale } from '@/i18n/routing'
import { normalizeCategoryDirectoryItems } from '@/lib/category-directory-normalize'
import { categoryDirectorySeoMeta } from '@/lib/seo-meta'
import { fetchCategoryDirectory } from '@/lib/seo-api'
import { SEO_SITE_ORIGIN } from '@/lib/site'
import type { CategoryDirectoryPage } from '@/types/seo-intelligence'

function useMockCategoryDirectory(): boolean {
  return process.env.USE_MOCK_CATEGORY_DIRECTORY === 'true'
}

async function fetchCategoryDirectoryPage(locale?: AppLocale): Promise<CategoryDirectoryPage> {
  const meta = await categoryDirectorySeoMeta()

  if (useMockCategoryDirectory()) {
    const page = getMockCategoryDirectoryPage()
    return { ...page, meta }
  }

  const apiPage = await fetchCategoryDirectory({ locale })
  if (!apiPage?.items?.length) {
    notFound()
  }

  const items = normalizeCategoryDirectoryItems(apiPage.items)

  return {
    pageType: 'category_directory',
    meta,
    items,
    totalInDatabase: apiPage.totalInDatabase || items.reduce((sum, item) => sum + item.partCount, 0),
  }
}

export async function buildCategoryDirectoryProps(params?: { locale?: AppLocale }) {
  const locale = params?.locale ?? 'en'
  const t = await getTranslations('categories')
  const page = await fetchCategoryDirectoryPage(locale)

  return {
    page,
    pageTitle: t('directory.allCategories'),
    breadcrumbs: [{ label: t('directory.categories') }],
    itemList: {
      name: t('directory.itemListName'),
      items: page.items.slice(0, 50).map((item) => ({
        name: item.name,
        url: `${SEO_SITE_ORIGIN}${item.href}`,
      })),
    },
  }
}

export async function requireCategoryDirectoryPage(locale?: AppLocale): Promise<CategoryDirectoryPage> {
  const page = await fetchCategoryDirectoryPage(locale)
  if (!page.items.length) notFound()
  return page
}
