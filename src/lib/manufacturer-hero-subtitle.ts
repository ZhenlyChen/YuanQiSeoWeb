import type { ManufacturerCatalogCategory, SeoMeta } from '@/types/seo-intelligence'

const DEFAULT_FALLBACK = 'Manufacturer intelligence hub'

export type ManufacturerHeroSubtitleInput = {
  /** Worker-resolved final subtitle (highest priority when API provides it). */
  heroSubtitle?: string
  meta: Pick<SeoMeta, 'h1SecondLine'>
  expertiseAreas?: string[]
  catalogCategories: Pick<ManufacturerCatalogCategory, 'label'>[]
}

/** Matches manufacturer hub enrichment Worker merge order. */
export function resolveManufacturerHeroSubtitle(input: ManufacturerHeroSubtitleInput): string {
  const workerSubtitle = input.heroSubtitle?.trim()
  if (workerSubtitle) return workerSubtitle

  const metaSubtitle = input.meta.h1SecondLine?.trim()
  if (metaSubtitle) return metaSubtitle

  const fromExpertise = input.expertiseAreas
    ?.map((area) => area.trim())
    .filter(Boolean)
    .slice(0, 3)
  if (fromExpertise && fromExpertise.length > 0) {
    return fromExpertise.join(', ')
  }

  const fromCatalog = input.catalogCategories
    .map((category) => category.label.trim())
    .filter(Boolean)
    .slice(0, 3)
  if (fromCatalog.length > 0) {
    return fromCatalog.join(', ')
  }

  return DEFAULT_FALLBACK
}
