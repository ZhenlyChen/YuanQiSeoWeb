import type { AppLocale } from '@/i18n/routing'
import { resolveSeoCategoryLabel } from '@/lib/category-locale-label'
import type { ManufacturerCatalogCategory, SeoMeta } from '@/types/seo-intelligence'

const DEFAULT_FALLBACK = 'Manufacturer intelligence hub'

export type ManufacturerHeroSubtitleInput = {
  /** Worker-resolved final subtitle (highest priority when API provides it). */
  heroSubtitle?: string
  meta: Pick<SeoMeta, 'h1SecondLine'>
  expertiseAreas?: string[]
  catalogCategories: Pick<ManufacturerCatalogCategory, 'label' | 'categoryL1' | 'categoryL2'>[]
  locale?: AppLocale
}

function catalogCategoryLabel(
  category: Pick<ManufacturerCatalogCategory, 'label' | 'categoryL1' | 'categoryL2'>,
  locale?: AppLocale,
): string {
  const raw = category.categoryL2
    ? `${category.categoryL1 || ''},${category.categoryL2}`
    : category.categoryL1 || category.label
  return resolveSeoCategoryLabel(raw, locale, category.label)
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
    .map((category) => catalogCategoryLabel(category, input.locale))
    .filter(Boolean)
    .slice(0, 3)
  if (fromCatalog.length > 0) {
    return fromCatalog.join(', ')
  }

  return DEFAULT_FALLBACK
}
