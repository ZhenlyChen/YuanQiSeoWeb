import type { ComponentSectionNavItem } from '@/lib/component-section-nav-items'

export function buildManufacturerSectionNavItems(): ComponentSectionNavItem[] {
  return [
    { id: 'overview', label: 'Overview' },
    { id: 'parts', label: 'Representative parts' },
    { id: 'catalog', label: 'Product catalog' },
    { id: 'supply', label: 'Supply chain' },
    { id: 'resources', label: 'FAQ' },
  ]
}
