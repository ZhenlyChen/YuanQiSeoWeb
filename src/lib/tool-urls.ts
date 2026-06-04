const APP_ORIGIN = 'https://app.partgenie.ai'

function withUtm(path: string, slug: string, campaign: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({
    utm_source: 'seo',
    utm_medium: 'pseo',
    utm_campaign: campaign,
    utm_content: slug,
    ...extra,
  })
  return `${APP_ORIGIN}${path}?${params.toString()}`
}

export function partFinderUrl(slug: string): string {
  return withUtm('/', slug, 'part_finder', { ref_part: slug })
}

export function alternativeFinderUrl(slug: string): string {
  return withUtm('/', slug, 'alternative_finder', { ref_part: slug })
}

export function bomAnalyzerUrl(slug: string): string {
  return withUtm('/', slug, 'bom_analyzer', { ref_part: slug })
}

export function datasheetAiUrl(mpn: string, slug?: string): string {
  const partSlug = slug ?? mpn.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return withUtm('/', partSlug, 'datasheet_ai', { ref_part: partSlug, mpn })
}

export function rfqUrl(slug: string): string {
  return withUtm('/', slug, 'rfq', { ref_part: slug })
}

export function openPartUrl(slug: string): string {
  return withUtm('/', slug, 'part_page', { ref_part: slug })
}

export function signInUrl(slug: string): string {
  return withUtm('/login', slug, 'sign_in', { ref_part: slug })
}

export function signUpUrl(slug: string): string {
  return withUtm('/signup', slug, 'get_started', { ref_part: slug })
}
