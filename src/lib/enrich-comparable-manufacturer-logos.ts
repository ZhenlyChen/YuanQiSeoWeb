import type { AppLocale } from '@/i18n/routing'
import { fetchSeoPage } from '@/lib/seo-api'
import type { ManufacturerIntelligencePage, ManufacturerPeekLink } from '@/types/seo-intelligence'

function slugFromComparableItem(item: ManufacturerPeekLink): string {
  const fromSlug = item.slug?.trim().toLowerCase()
  if (fromSlug) return fromSlug
  const match = item.href.match(/\/manufacturers\/([^/?#]+)/)
  return match?.[1]?.trim().toLowerCase() ?? ''
}

async function logoUrlForPeerSlug(slug: string, locale: AppLocale): Promise<string | undefined> {
  const peerPage = await fetchSeoPage(slug, { locale })
  const logoUrl = peerPage?.hubPage?.logoUrl?.trim()
  return logoUrl || undefined
}

/** Backfill peer logoUrl for legacy hub rows imported before Pipeline C wrote comparable logos. */
export async function enrichComparableManufacturerLogos(
  page: ManufacturerIntelligencePage,
  locale: AppLocale,
): Promise<ManufacturerIntelligencePage> {
  const items = page.comparableManufacturers
  if (!items?.length) return page
  if (items.every((item) => item.logoUrl?.trim())) return page

  const comparableManufacturers = await Promise.all(
    items.map(async (item) => {
      if (item.logoUrl?.trim()) return item
      const slug = slugFromComparableItem(item)
      if (!slug) return item
      const logoUrl = await logoUrlForPeerSlug(slug, locale)
      return logoUrl ? { ...item, logoUrl } : item
    }),
  )

  return { ...page, comparableManufacturers }
}
