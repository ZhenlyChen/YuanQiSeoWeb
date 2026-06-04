export const SEO_PUBLIC_BOUNDARY = {
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
