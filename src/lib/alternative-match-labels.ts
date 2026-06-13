import type { AlternativeItem, DecisionLabel } from '@/types/seo-intelligence'

/** Display labels for alternative match badges (SEO / English). */
export function alternativeMatchLabel(matchType: DecisionLabel): string {
  switch (matchType) {
    case 'exact':
      return 'Perfect match'
    case 'pin-compatible':
      return 'Pin-to-Pin'
    case 'functional':
      return 'Functional match'
    case 'partial':
      return 'Partial match'
    default:
      return matchType
  }
}

export function alternativeMatchBadgeLabel(alt: AlternativeItem): string {
  if (
    alt.publishTier === 'internal_only' ||
    alt.pdfCheckStatus === 'pending' ||
    alt.pdfCheckStatus === 'partial'
  ) {
    return 'Needs validation'
  }
  return alt.matchLabel || alt.displayLabel || alternativeMatchLabel(alt.matchType)
}
