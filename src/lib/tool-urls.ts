import { utmForSlug } from '@/lib/seo-api'

const APP_ORIGIN = 'https://app.partgenie.ai'

function withUtm(path: string, slug: string, campaign: string): string {
  const params = new URLSearchParams({
    utm_source: 'seo',
    utm_medium: 'pseo',
    utm_campaign: campaign,
    utm_content: slug,
  })
  return `${APP_ORIGIN}${path}?${params.toString()}`
}

export function partFinderUrl(slug: string): string {
  return withUtm('/', slug, 'part_finder')
}

export function alternativeFinderUrl(slug: string): string {
  return withUtm('/', slug, 'alternative_finder')
}

export function bomAnalyzerUrl(slug: string): string {
  return withUtm('/', slug, 'bom_analyzer')
}

export function datasheetAiUrl(mpn: string): string {
  const slug = mpn.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return withUtm('/', slug, 'datasheet_ai')
}

export function rfqUrl(slug: string): string {
  return withUtm('/', slug, 'rfq')
}

export function openPartUrl(slug: string): string {
  return withUtm('/', slug, 'part_page')
}
