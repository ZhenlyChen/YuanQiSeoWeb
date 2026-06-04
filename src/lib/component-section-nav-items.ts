export type ComponentSectionNavItem = {
  id: string
  label: string
  badge?: number
  href?: string
}

export function buildComponentSectionNavItems({
  alternativesCount,
  compareHref,
  hasApplications = true,
}: {
  alternativesCount: number
  compareHref?: string
  hasApplications?: boolean
}): ComponentSectionNavItem[] {
  const items: ComponentSectionNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
  ]
  if (hasApplications) {
    items.push({ id: 'applications', label: 'Applications' })
  }
  items.push({
    id: 'alternatives',
    label: 'Alternatives',
    badge: alternativesCount > 0 ? alternativesCount : undefined,
  })
  if (compareHref) {
    items.push({ id: 'compare', label: 'Compare', href: compareHref })
  }
  items.push({ id: 'design', label: 'Design' }, { id: 'resources', label: 'Resources' })
  return items
}
