import type { ComponentSectionNavItem } from '@/lib/component-section-nav-items'
import type { CategoryHubPage } from '@/types/seo-intelligence'

export function buildCategorySectionNavItems(
  page: Pick<CategoryHubPage, 'subcategories' | 'manufacturers'>,
): ComponentSectionNavItem[] {
  const items: ComponentSectionNavItem[] = [
    { id: 'overview', label: 'Quick answer' },
    { id: 'choose', label: 'How to choose' },
  ]

  if (page.subcategories.length > 0) {
    items.push({ id: 'subcategories', label: 'Subcategories' })
  }

  items.push({ id: 'parts', label: 'Popular parts' }, { id: 'risks', label: 'Design risks' })

  if (page.manufacturers.length > 0) {
    items.push({ id: 'manufacturers', label: 'Manufacturers' })
  }

  items.push({ id: 'faq', label: 'FAQ' })

  return items
}
