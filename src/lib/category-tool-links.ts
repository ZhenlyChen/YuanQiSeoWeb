import { getL1Category } from '@/lib/category-taxonomy'
import {
  alternativeFinderUrl,
  bomAnalyzerUrl,
  categorySearchActionUrl,
  datasheetAiUrl,
  partFinderUrl,
} from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

export function buildCategoryToolGrid(page: CategoryHubPage) {
  const slug = page.slug
  return [
    {
      label: 'AI component finder',
      href: partFinderUrl(slug),
      icon: 'chip' as const,
    },
    {
      label: 'AI alternative finder',
      href: alternativeFinderUrl(slug),
      icon: 'list' as const,
    },
    {
      label: 'BOM analyzer',
      href: bomAnalyzerUrl(slug),
      icon: 'hash02' as const,
    },
    {
      label: 'Datasheet AI',
      href: datasheetAiUrl(slug, slug),
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
