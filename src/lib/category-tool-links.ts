import { getL1Category } from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES, categorySearchActionUrl } from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

export function buildCategoryToolGrid(page: CategoryHubPage) {
  return [
    {
      label: 'AI component finder',
      href: MARKETING_TOOL_PAGES.componentFinder,
      icon: 'chip' as const,
    },
    {
      label: 'AI alternative finder',
      href: MARKETING_TOOL_PAGES.alternativeFinder,
      icon: 'list' as const,
    },
    {
      label: 'BOM analyzer',
      href: MARKETING_TOOL_PAGES.bomAnalyzer,
      icon: 'hash02' as const,
    },
    {
      label: 'Datasheet AI',
      href: MARKETING_TOOL_PAGES.datasheetAi,
      icon: 'file06' as const,
    },
  ]
}

export function buildCategoryHeroSearchAction(categoryName: string): string {
  return categorySearchActionUrl(categoryName)
}

export function buildCategoryPrimaryCtaHref(page: CategoryHubPage): string {
  const l1 = getL1Category(page.l1Slug)
  const label = page.level === 'l2' ? page.name : l1?.name ?? page.name
  return categorySearchActionUrl(label)
}
