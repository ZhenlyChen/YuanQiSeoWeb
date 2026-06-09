import { resolveCategoryIconUrl, subcategoryIconPath } from '@/lib/category-icons'
import { fetchCategorySubcategories } from '@/lib/seo-api'
import type { AppLocale } from '@/i18n/routing'
import type { CategoryHubPage, CategoryIconId, CategorySubcategoryCard } from '@/types/seo-intelligence'

export type CategorySubcategoriesApiPage = {
  l1Slug: string
  l1Name: string
  items: Array<{
    slug: string
    name: string
    description: string
    href: string
    iconId: string
    iconUrl?: string
  }>
}

export function normalizeCategorySubcategoryItems(
  l1Slug: string,
  items: CategorySubcategoriesApiPage['items'],
): CategorySubcategoryCard[] {
  return items.map((item) => ({
    slug: item.slug,
    name: item.name,
    description: item.description,
    href: item.href.startsWith('/') ? item.href : `/categories/${l1Slug}/${item.slug}`,
    iconId: (item.iconId || 'passives') as CategoryIconId,
    iconUrl: resolveCategoryIconUrl(
      `${l1Slug}-${item.slug}`,
      item.iconUrl || subcategoryIconPath(l1Slug, item.slug),
    ),
  }))
}

const TEMPLATE_SUBCATEGORY_DESCRIPTION =
  /Browse .+ components, subcategories, and selection intelligence\./i

function hasEnrichedSubcategoryCopy(page: CategoryHubPage): boolean {
  if (page.subcategories.length === 0) {
    return false
  }
  return page.subcategories.some((item) => {
    const description = item.description.trim()
    return description.length > 0 && !TEMPLATE_SUBCATEGORY_DESCRIPTION.test(description)
  })
}

export async function enrichCategoryHubSubcategories(
  page: CategoryHubPage,
  locale?: AppLocale,
): Promise<CategoryHubPage> {
  if (page.level !== 'l1') {
    return page
  }

  if (hasEnrichedSubcategoryCopy(page)) {
    return page
  }

  const apiPage = await fetchCategorySubcategories(page.l1Slug, { locale })
  if (!apiPage?.items?.length) {
    return page
  }

  const subcategories = normalizeCategorySubcategoryItems(page.l1Slug, apiPage.items)
  return {
    ...page,
    subcategoriesSectionTitle: `Explore ${apiPage.l1Name} Subcategories`,
    subcategoriesIntro:
      'Browse DigiKey subcategories to compare specifications and discover related intelligence pages.',
    subcategories,
  }
}
