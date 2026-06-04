import {
  alternativeFinderUrl,
  bomAnalyzerUrl,
  datasheetAiUrl,
  openPartUrl,
} from '@/lib/tool-urls'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'

export type ComponentToolCtaLink = {
  href: string
  /** Full label for inline CTA rows (e.g. ToolCtaStrip). */
  label: string
  /** Short label for sidebar tool grid cards. */
  shortLabel: string
  badge?: string
  icon: 'stars02' | 'list' | 'hash02' | 'file06'
}

export function buildComponentToolCtaLinks(
  slug: string,
  mpn: string,
  alternativesCount = 0,
): ComponentToolCtaLink[] {
  return [
    {
      href: openPartUrl(slug),
      label: SEO_PUBLIC_BOUNDARY.primaryCta(mpn),
      shortLabel: 'Analyze in PartGenie',
      icon: 'stars02',
    },
    {
      href: alternativeFinderUrl(slug),
      label: 'Find alternatives',
      shortLabel: 'Find alternatives',
      badge: alternativesCount > 0 ? `${alternativesCount} options` : undefined,
      icon: 'list',
    },
    {
      href: bomAnalyzerUrl(slug),
      label: `Analyze ${mpn} in your BOM`,
      shortLabel: 'BOM analyze',
      icon: 'hash02',
    },
    {
      href: datasheetAiUrl(mpn, slug),
      label: `Ask Datasheet AI about ${mpn}`,
      shortLabel: 'Datasheet AI',
      icon: 'file06',
    },
  ]
}
