import type { ComponentToolCtaLink } from '@/lib/component-tool-cta-links'
import type { ManufacturerIntelligencePage } from '@/types/seo-intelligence'
import {
  alternativeFinderUrl,
  bomAnalyzerUrl,
  datasheetAiUrl,
  seoChatDeepLinkUrl,
} from '@/lib/tool-urls'

export type ManufacturerRelatedTool = {
  label: string
  href: string
  icon: ComponentToolCtaLink['icon']
}

function manufacturerBrandLabel(page: ManufacturerIntelligencePage): string {
  return page.shortName?.trim() || page.name.trim()
}

function representativeMpn(page: ManufacturerIntelligencePage): string | undefined {
  if (page.representativeMpn?.trim()) {
    return page.representativeMpn.trim()
  }

  const firstCatalog = page.mostSearchedParts[0]?.mpn?.trim()
  return firstCatalog || undefined
}

function chatQueryUrl(slug: string, query: string, campaign: string): string {
  const base = seoChatDeepLinkUrl(slug, campaign)
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}q=${encodeURIComponent(query)}`
}

export function buildManufacturerRelatedTools(page: ManufacturerIntelligencePage): ManufacturerRelatedTool[] {
  const brand = manufacturerBrandLabel(page)
  const sampleMpn = representativeMpn(page)

  const tools: ManufacturerRelatedTool[] = [
    {
      label: `Find ${brand} alternatives`,
      href: alternativeFinderUrl(page.slug),
      icon: 'list',
    },
    {
      label: `Compare ${brand} parts`,
      href: chatQueryUrl(page.slug, `Compare ${brand} parts`, 'manufacturer_compare'),
      icon: 'chip',
    },
    {
      label: 'Datasheet AI',
      href: sampleMpn
        ? datasheetAiUrl(sampleMpn, page.slug)
        : chatQueryUrl(page.slug, `Ask Datasheet AI about ${brand} parts`, 'manufacturer_datasheet'),
      icon: 'file06',
    },
    {
      label: 'BOM analyzer',
      href: bomAnalyzerUrl(page.slug),
      icon: 'hash02',
    },
  ]

  return tools
}
