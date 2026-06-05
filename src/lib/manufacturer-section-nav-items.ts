import type { ComponentSectionNavItem } from '@/lib/component-section-nav-items'

export function buildManufacturerSectionNavItems(): ComponentSectionNavItem[] {
  return [
    { id: 'overview', label: 'Overview' },
    { id: 'parts', label: 'Parts' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'supply', label: 'Supply' },
    { id: 'resources', label: 'FAQ' },
  ]
}
