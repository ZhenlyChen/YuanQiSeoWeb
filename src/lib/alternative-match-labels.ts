import type { DecisionLabel } from '@/types/seo-intelligence'

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
