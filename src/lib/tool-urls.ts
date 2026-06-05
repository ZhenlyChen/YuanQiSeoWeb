function resolvePublicOrigin(
  envKey: 'NEXT_PUBLIC_APP_ORIGIN' | 'NEXT_PUBLIC_MARKETING_ORIGIN',
  devDefault: string,
  productionDefault: string,
): string {
  const configured = process.env[envKey]?.trim()
  if (configured) {
    return configured.replace(/\/$/, '')
  }
  if (process.env.NODE_ENV === 'development') {
    return devDefault
  }
  return productionDefault
}

export const APP_ORIGIN = resolvePublicOrigin(
  'NEXT_PUBLIC_APP_ORIGIN',
  'http://localhost:3000',
  'https://app.partgenie.ai',
)
export const MARKETING_ORIGIN = resolvePublicOrigin(
  'NEXT_PUBLIC_MARKETING_ORIGIN',
  'http://localhost:3002',
  'https://www.partgenie.ai',
)
export const HELP_CENTER_ORIGIN = 'https://help.partgenie.ai/en-US'

/** Public marketing tool landings (Webflow). */
export const MARKETING_TOOL_PAGES = {
  componentFinder: `${MARKETING_ORIGIN}/ai-component-finder`,
  alternativeFinder: `${MARKETING_ORIGIN}/alternative-finder`,
  datasheetAi: `${MARKETING_ORIGIN}/datasheet-ai`,
  bomAnalyzer: `${MARKETING_ORIGIN}/ai-bom-analyzer`,
} as const

export const MARKETING_PAGES = {
  pricing: `${MARKETING_ORIGIN}/pricing`,
  bookDemo: `${MARKETING_ORIGIN}/book-demo`,
  bookDemoCalendar: 'https://calendar.app.google/Tj6yCShFzurxdYUK8',
} as const

export const HELP_CENTER_PAGES = {
  home: HELP_CENTER_ORIGIN,
  changelog: `${HELP_CENTER_ORIGIN}/changelog`,
  aiQueryWriting: `${HELP_CENTER_ORIGIN}/ai-query-writing`,
  fuzzyToPrecise: `${HELP_CENTER_ORIGIN}/fuzzy-to-precise`,
  searchOptimization: `${HELP_CENTER_ORIGIN}/search-optimization`,
  effectiveBomManagement: `${HELP_CENTER_ORIGIN}/effective-bom-management`,
} as const

const MARKETING_TOOL_PATH_BY_CAMPAIGN = {
  component_finder: '/ai-component-finder',
  alternative_finder: '/alternative-finder',
  datasheet_ai: '/datasheet-ai',
  bom_analyzer: '/ai-bom-analyzer',
} as const

const APP_TOOL_PATH_BY_CAMPAIGN = {
  component_finder: '/app/chat',
  alternative_finder: '/app/chat',
  datasheet_ai: '/app/chat',
  bom_analyzer: '/app/chat',
} as const

function withUtm(
  origin: string,
  path: string,
  slug: string,
  campaign: string,
  extra: Record<string, string> = {},
): string {
  const params = new URLSearchParams({
    utm_source: 'seo',
    utm_medium: 'pseo',
    utm_campaign: campaign,
    utm_content: slug,
    ...extra,
  })
  return `${origin}${path}?${params.toString()}`
}

function marketingToolUrl(
  campaign: keyof typeof MARKETING_TOOL_PATH_BY_CAMPAIGN,
  slug: string,
  extra: Record<string, string> = {},
): string {
  return withUtm(
    MARKETING_ORIGIN,
    MARKETING_TOOL_PATH_BY_CAMPAIGN[campaign],
    slug,
    campaign,
    { ref_part: slug, ...extra },
  )
}

function appToolUrl(
  campaign: keyof typeof APP_TOOL_PATH_BY_CAMPAIGN,
  slug: string,
  extra: Record<string, string> = {},
): string {
  return withUtm(APP_ORIGIN, APP_TOOL_PATH_BY_CAMPAIGN[campaign], slug, campaign, {
    ref_part: slug,
    ...extra,
  })
}

export function partFinderUrl(slug: string): string {
  return marketingToolUrl('component_finder', slug)
}

/**
 * Base URL for SEO → app chat deep links (Webflow pattern).
 * Pair with a GET form field `q`; app route `/app/chat` reads `q`, `login`, and UTM.
 */
export function seoChatDeepLinkUrl(slug: string, campaign = 'floating_chat'): string {
  return withUtm(APP_ORIGIN, '/app/chat', slug, campaign, { ref_part: slug })
}

/** AI component finder — marketing landing (upload / Try PartGenie → app chat). */
export function openPartUrl(slug: string, mpn?: string): string {
  return marketingToolUrl('component_finder', slug, mpn ? { mpn } : {})
}

export function alternativeFinderUrl(slug: string, mpn?: string): string {
  return marketingToolUrl('alternative_finder', slug, mpn ? { mpn } : {})
}

export function bomAnalyzerUrl(slug: string, mpn?: string): string {
  return marketingToolUrl('bom_analyzer', slug, mpn ? { mpn } : {})
}

export function datasheetAiUrl(mpn: string, slug?: string): string {
  const partSlug = slug ?? mpn.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return marketingToolUrl('datasheet_ai', partSlug, { mpn, ref_part: partSlug })
}

/** Direct app entry (e.g. app.partgenie.ai/ai-component-finder redirects). */
export function appComponentFinderUrl(slug: string, mpn?: string): string {
  const extra: Record<string, string> = {}
  if (mpn) {
    extra.mpn = mpn
    extra.q = mpn
  }
  return appToolUrl('component_finder', slug, extra)
}

export function appAlternativeFinderUrl(slug: string, mpn: string): string {
  return appToolUrl('alternative_finder', slug, {
    mpn,
    q: `Find alternatives for ${mpn}`,
  })
}

export function appDatasheetAiUrl(slug: string, mpn?: string): string {
  const extra: Record<string, string> = { login: 'true' }
  if (mpn) extra.mpn = mpn
  return appToolUrl('datasheet_ai', slug, extra)
}

export function appBomAnalyzerUrl(slug: string, mpn?: string): string {
  const extra: Record<string, string> = { login: 'true' }
  if (mpn) extra.mpn = mpn
  return appToolUrl('bom_analyzer', slug, extra)
}

export function rfqUrl(slug: string, mpn?: string): string {
  if (mpn) {
    return sourcingHelpSignInUrl(slug, mpn)
  }
  return withUtm(APP_ORIGIN, '/', slug, 'rfq', { ref_part: slug })
}

/** SEO sidebar: logged-out users land in app login, then sourcing RFQ dialog. */
export function sourcingHelpSignInUrl(slug: string, mpn: string): string {
  return withUtm(APP_ORIGIN, '/app/chat', slug, 'rfq', {
    ref_part: slug,
    login: 'true',
    intent: 'sourcing',
    mpn,
  })
}

/** SEO sidebar: logged-in users open sourcing RFQ dialog in app. */
export function sourcingHelpAppUrl(slug: string, mpn: string): string {
  return withUtm(APP_ORIGIN, '/app/chat', slug, 'rfq', {
    ref_part: slug,
    sourcing: 'true',
    mpn,
  })
}

export function signInUrl(slug: string): string {
  return withUtm(APP_ORIGIN, '/app/chat', slug, 'sign_in', { ref_part: slug, login: 'true' })
}

/** Opens app chat with login modal (app has no /signup route). */
export function signUpUrl(slug: string): string {
  return withUtm(APP_ORIGIN, '/app/chat', slug, 'get_started', { ref_part: slug, login: 'true' })
}

export function dashboardUrl(): string {
  return `${APP_ORIGIN}/app/chat`
}
