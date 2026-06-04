export type ComponentSectionNavItem = {
  id: string
  label: string
  badge?: number
  href?: string
}

export function buildComponentSectionNavItems({
  alternativesCount,
  hasApplications = true,
  hasDatasheet = true,
}: {
  alternativesCount: number
  hasApplications?: boolean
  hasDatasheet?: boolean
}): ComponentSectionNavItem[] {
  const items: ComponentSectionNavItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
  ]
  if (hasApplications) {
    items.push({ id: 'applications', label: 'Applications' })
  }
  if (hasDatasheet) {
    items.push({ id: 'datasheet', label: 'Datasheet' })
  }
  items.push({
    id: 'alternatives',
    label: 'Alternatives',
    badge: alternativesCount > 0 ? alternativesCount : undefined,
  })
  items.push({ id: 'design', label: 'Design' }, { id: 'resources', label: 'Resources' })
  return items
}
