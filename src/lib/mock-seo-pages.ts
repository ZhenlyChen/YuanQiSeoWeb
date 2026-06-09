import {
  MOCK_ALTERNATIVE_SLUGS,
  MOCK_COMPARE_SLUGS,
  MOCK_COMPONENT_SLUGS,
  MOCK_MANUFACTURER_SLUGS,
} from '@/lib/mock-registry'

export function useMockManufacturerPages(): boolean {
  return process.env.USE_MOCK_MANUFACTURER_PAGES === 'true'
}

export function useMockCategoryHub(): boolean {
  return process.env.USE_MOCK_CATEGORY_HUB === 'true'
}

export function isMockManufacturerSlug(slug: string): boolean {
  if (!useMockManufacturerPages()) return false
  return MOCK_MANUFACTURER_SLUGS.has(slug.toLowerCase())
}

export function isMockComponentSlug(slug: string): boolean {
  if (process.env.USE_MOCK_COMPONENT_PAGES !== 'true') return false
  return MOCK_COMPONENT_SLUGS.has(slug.toLowerCase())
}

export function isMockAlternativeSlug(mpn: string): boolean {
  if (process.env.USE_MOCK_ALTERNATIVE_PAGES !== 'true') return false
  return MOCK_ALTERNATIVE_SLUGS.has(mpn.toLowerCase())
}

export function isMockCompareSlug(slug: string): boolean {
  if (process.env.USE_MOCK_COMPARE_PAGES !== 'true') return false
  return MOCK_COMPARE_SLUGS.has(slug.toLowerCase())
}
