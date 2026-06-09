export type AlternativesGateStat = {
  value: string
  label: string
}

const GATE_STATS_TAIL: AlternativesGateStat[] = [
  { value: '22M+', label: 'Electronics components in PartGenie' },
  { value: '7700+', label: 'Manufacturers covered in the database' },
]

export function buildAlternativesGateStats(alternativesCount: number): AlternativesGateStat[] {
  const ranked = alternativesCount > 0 ? `${alternativesCount}+` : '12+'
  return [{ value: ranked, label: 'Ranked alternatives for this part' }, ...GATE_STATS_TAIL]
}

export function buildCategoryTopPartsGateStats(hiddenPartsCount: number): AlternativesGateStat[] {
  const moreParts = hiddenPartsCount > 0 ? `${hiddenPartsCount}+` : '10+'
  return [{ value: moreParts, label: 'Trending parts in this category' }, ...GATE_STATS_TAIL]
}

/** First stat for gated tables outside the alternatives shortlist (catalog, representative parts, etc.). */
export function buildGeneralGateStats(): AlternativesGateStat[] {
  return [{ value: '100%', label: 'Verified specs and datasheets' }, ...GATE_STATS_TAIL]
}

export const SEO_PUBLIC_BOUNDARY = {
  gateModalTitle: 'Unlock the full alternative shortlist',
  gateModalDescription:
    'Create a free account to see pin-compatible paths, risk scores, and sourcing notes.',
  gateModalCta: 'Start now for free',
  /** @deprecated Use gateModal* copy on AlternativesGateModal */
  gateTitle: (mpn: string) => `See ranked alternatives for ${mpn}`,
  gateDescription:
    'Create a free account to unlock match ranking, firmware validation notes, and BOM-ready compare views.',
  gateBullets: [
    'Pin-compatible matches with replacement risk scores',
    'Lifecycle and sourcing alerts for your BOM',
    'One-click compare and datasheet verification',
  ],
  gateCta: 'Create free account',
  topPartsGateTitle: 'See the full trending parts list',
  topPartsGateDescription:
    'Sign in to unlock live search trends beyond the top 3 ranked parts.',
  topPartsGateCta: 'Start now for free',
  catalogGateTitle: 'Browse the full manufacturer catalog',
  catalogGateDescription:
    'Sign in to unlock all product categories, filters, and rankings in PartGenie.',
  catalogGateCta: 'Start now for free',
  manufacturerRepresentativePartsTitle: 'Representative parts',
  manufacturerRepresentativePartsGateTitle: 'See the full representative parts list',
  manufacturerRepresentativePartsGateDescription:
    'Sign in to browse the complete manufacturer catalog with filters and rankings in PartGenie.',
  specsFooter: (mpn: string) =>
    `Full datasheet fields, test conditions, and source confidence for ${mpn} are available in PartGenie after sign-in.`,
  specsFooterCta: 'View full analysis',
  nextStepsTitle: 'Next steps in PartGenie',
  primaryCta: (mpn: string) => `Analyze ${mpn} in PartGenie`,
} as const
