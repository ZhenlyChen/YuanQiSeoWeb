/**
 * Legacy marketing L1 slugs ? primary DigiKey taxonomy slug (SanitizeSlug of first TaxonomyL1 label).
 * Used for 301 redirects after switching the category directory to native DigiKey L1.
 */
export const MARKETING_CATEGORY_L1_REDIRECTS: Record<string, string> = {
  mcu: 'integrated-circuits-ics',
  'power-management': 'power-supplies-board-mount',
  connectors: 'connectors-interconnects',
  'power-discrete': 'discrete-semiconductor-products',
  'mems-sensors': 'sensors-transducers',
  'analog-power': 'integrated-circuits-ics',
  'data-converters': 'integrated-circuits-ics',
  'rf-wireless': 'rf-and-wireless',
  automotive: 'industrial-automation-and-controls',
  connectivity: 'connectors-interconnects',
  memory: 'memory-cards-modules',
  passives: 'capacitors',
  'fpga-logic': 'integrated-circuits-ics',
}

export function marketingCategoryRedirectPath(l1Slug: string, l2Slug?: string): string | null {
  const targetL1 = MARKETING_CATEGORY_L1_REDIRECTS[l1Slug]
  if (!targetL1) return null
  if (l2Slug) return `/categories/${targetL1}/${l2Slug}`
  return `/categories/${targetL1}`
}
