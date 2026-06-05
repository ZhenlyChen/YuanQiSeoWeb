import {
  alternativeFinderUrl,
  bomAnalyzerUrl,
  datasheetAiUrl,
  openPartUrl,
} from '@/lib/tool-urls'
export type ComponentToolCtaLink = {
  href: string
  /** Full label for inline CTA rows (e.g. ToolCtaStrip). */
  label: string
  /** Short label for sidebar tool grid cards. */
  shortLabel: string
  icon: 'chip' | 'list' | 'hash02' | 'file06'
}

export function buildComponentToolCtaLinks(slug: string, mpn: string): ComponentToolCtaLink[] {
  return [
    {
      href: openPartUrl(slug, mpn),
      label: 'AI component finder',
      shortLabel: 'AI component finder',
      icon: 'chip',
    },
    {
      href: alternativeFinderUrl(slug, mpn),
      label: 'AI alternative finder',
      shortLabel: 'AI alternative finder',
      icon: 'list',
    },
    {
      href: bomAnalyzerUrl(slug, mpn),
      label: `Analyze ${mpn} in your BOM`,
      shortLabel: 'BOM analyzer',
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
