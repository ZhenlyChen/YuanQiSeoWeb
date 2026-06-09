import type { Metadata } from 'next'

/**
 * Central switches for pages that are reachable but not indexed yet.
 * Set a flag to `false` when launching that page type (sitemap + robots + JSON-LD).
 */
export const SEO_DEFERRED = {
  competitorCompare: true,
  mpnCompare: true,
  queryAnswer: true,
  categoryFinder: true,
} as const

export const DEFERRED_ROBOTS = 'noindex,nofollow' as const

export const deferredRobotsField: NonNullable<Metadata['robots']> = {
  index: false,
  follow: false,
}

/** Force noindex on metadata while preserving title, description, and alternates. */
export function withDeferredRobots(metadata: Metadata): Metadata {
  return { ...metadata, robots: deferredRobotsField }
}

// TODO: enable FAQPage/Article JSON-LD when SEO_DEFERRED.queryAnswer is false and fetchSeoPage is wired.
