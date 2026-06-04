export type AlternativesGateStat = {
  value: string
  label: string
}

export function buildAlternativesGateStats(alternativesCount: number): AlternativesGateStat[] {
  const ranked =
    alternativesCount > 0 ? `${alternativesCount}+` : '12+'
  return [
    { value: ranked, label: 'Ranked alternatives for this part' },
    { value: '22M+', label: 'Electronics components in PartGenie' },
    { value: '7700+', label: 'Manufacturers covered in the database' },
  ]
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
  specsFooter: (mpn: string) =>
    `Full datasheet fields, test conditions, and source confidence for ${mpn} are available in PartGenie after sign-in.`,
  specsFooterCta: 'View full analysis',
  nextStepsTitle: 'Next steps in PartGenie',
  primaryCta: (mpn: string) => `Analyze ${mpn} in PartGenie`,
} as const
