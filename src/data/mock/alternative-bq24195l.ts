import type { AlternativeIntelligencePage } from '@/types/seo-intelligence'
import { alternativeSeoMeta } from '@/lib/seo-meta'

const MPN = 'BQ24195L'
const SLUG = 'bq24195l'

export const mockAlternativeBq24195l: AlternativeIntelligencePage = {
  pageType: 'alternative',
  slug: SLUG,
  mpn: MPN,
  manufacturer: 'Texas Instruments',
  category: 'Li-Ion Battery Charger IC',
  meta: alternativeSeoMeta({
    mpn: MPN,
    manufacturer: 'Texas Instruments',
    category: 'battery charger IC',
    slug: SLUG,
  }),
  subtitle: {
    manufacturer: 'Texas Instruments',
    category: 'Li-Ion Battery Charger IC',
    package: 'VQFN-24',
  },
  overviewTags: [
    'Package: VQFN-24',
    'Texas Instruments',
    'Li-Ion charger',
    'Switch-mode',
    'I2C programmable',
    'Power-path',
    'Battery charging',
  ],
  breadcrumbs: [
    { label: MPN, href: '/parts/bq24195l' },
    { label: 'Alternatives' },
  ],
  shortAnswer:
    'The best alternative to BQ24195L depends on whether you need an exact replacement, pin-compatible option, or functional substitute. For existing PCB designs, prioritize package and pinout compatibility; for redesigns, compare charge profile, power-path behavior, thermal limits, and sourcing availability.',
  replacementVerdict: {
    canReplaceDirectly: false,
    bestReplacementType: 'Functional alternative with charge-profile verification',
    mainRisk: 'Charge algorithm, JEITA paths, and I2C register map differ across vendors',
    summary:
      'Treat BQ24195L substitution as a power-path design review, not a simple MPN swap.',
  },
  alternatives: [
    {
      mpn: 'BQ24196',
      manufacturer: 'Texas Instruments',
      matchType: 'functional',
      reason: 'Same family evolution; verify register defaults and OTG behavior.',
      riskLevel: 'low',
      href: '/alternatives/bq24195l',
      compareHref: '/compare/bq24195l-vs-bq24196',
      compatibility: {
        package: 'partial',
        pinout: 'partial',
        voltage: 'match',
        temperature: 'match',
        interface: 'match',
        lifecycle: 'match',
        application: 'match',
      },
    },
    {
      mpn: 'MP2617',
      manufacturer: 'MPS',
      matchType: 'functional',
      reason: 'Integrated switch-mode charger; different pinout — layout redesign.',
      riskLevel: 'high',
      href: '/alternatives/bq24195l',
      compatibility: {
        package: 'mismatch',
        pinout: 'mismatch',
        voltage: 'partial',
        temperature: 'match',
        interface: 'partial',
        lifecycle: 'match',
        application: 'match',
      },
    },
    {
      mpn: 'ISL9238',
      manufacturer: 'Renesas',
      matchType: 'partial',
      reason: 'Narrow-voltage buck-boost charger for flexible battery rails.',
      riskLevel: 'medium',
      href: '/alternatives/bq24195l',
    },
    {
      mpn: 'CN3791',
      manufacturer: 'Consonance',
      matchType: 'functional',
      reason: 'Regional sourcing option; validate charge profile and protection.',
      riskLevel: 'medium',
      href: '/alternatives/bq24195l',
    },
  ],
  compatibilityMatrix: [
    {
      factor: 'Package',
      original: 'VQFN-24',
      topAlternative: 'VQFN-24 (BQ24196) / QFN variants',
      notes: 'Footprint edits likely for non-TI options',
    },
    {
      factor: 'Pinout',
      original: 'I2C programmable charger',
      topAlternative: 'Partial overlap in TI family only',
    },
    {
      factor: 'Voltage / current',
      original: '5 V input, multi-A charge',
      topAlternative: 'Match input rating and battery chemistry',
    },
    {
      factor: 'Interface',
      original: 'I2C',
      topAlternative: 'Re-map registers in firmware',
    },
    {
      factor: 'Lifecycle',
      original: 'Active',
      topAlternative: 'Check distributor line cards',
    },
  ],
  riskAnalysis: [
    {
      category: 'Electrical risk',
      level: 'high',
      detail: 'Charge current regulation, OTG boost, and fault thresholds must be re-characterized.',
    },
    {
      category: 'Package risk',
      level: 'medium',
      detail: 'Thermal pad and QFN stencil changes affect reflow yield.',
    },
    {
      category: 'Firmware risk',
      level: 'high',
      detail: 'Fuel gauge and charger register sequences are not portable across vendors.',
    },
    {
      category: 'Sourcing risk',
      level: 'medium',
      detail: 'Authorized TI stock is stable; regional alternates need qualification lots.',
    },
  ],
  featureComparisonHeaders: {
    original: 'BQ24195L',
    alt1: 'BQ24196',
    alt2: 'MP2617',
    alt3: 'ISL9238',
  },
  featureComparison: [
    {
      feature: 'Topology',
      original: 'Switch-mode charger',
      alt1: 'Switch-mode charger',
      alt2: 'Switch-mode charger',
      alt3: 'Buck-boost charger',
    },
    {
      feature: 'Programmability',
      original: 'I2C',
      alt1: 'I2C',
      alt2: 'I2C / straps',
      alt3: 'I2C',
    },
    {
      feature: 'OTG / boost',
      original: 'Supported',
      alt1: 'Verify revision',
      alt2: 'Product dependent',
      alt3: 'Supported',
    },
  ],
  applicationFit: [
    {
      scenario: 'Existing PCB',
      guidance: 'Prioritize TI family upgrades with minimal pin changes; re-run charge bring-up.',
    },
    {
      scenario: 'New design',
      guidance: 'Compare efficiency, BOM cost, and thermal pad requirements across vendors.',
    },
    {
      scenario: 'Supply shortage backup',
      guidance: 'Qualify one regional functional alternate with identical battery chemistry limits.',
    },
  ],
  regionalNotes: [
    'Line-card alternative may be available through franchised distributors for TI parts.',
    'China-local candidates such as CN3791 should go through small-lot validation before mass BOM swap.',
    'Full ranked alternative list and inventory context are available inside PartGenie.',
  ],
  compareLinks: [
    { label: 'Compare BQ24195L vs BQ24196', href: '/compare/bq24195l-vs-bq24196' },
  ],
  faq: [
    {
      question: 'What is the best alternative to BQ24195L?',
      answer:
        'For minimal risk, start with TI family successors like BQ24196 after register and charge-profile review. Redesigns can evaluate MPS or Renesas chargers with full layout validation.',
    },
    {
      question: 'Is there a pin-compatible replacement for BQ24195L?',
      answer:
        'True pin-compatible options are limited; most substitutes require footprint and firmware changes.',
    },
    {
      question: 'What risks should I check before replacing BQ24195L?',
      answer:
        'Review charge profile, thermal limits, OTG behavior, I2C map, and battery safety thresholds before approving substitution.',
    },
  ],
  originalPartHref: '/parts/bq24195l',
  categoryLink: {
    label: 'Battery charger IC alternatives in PartGenie',
    href: '/categories/battery-charger/finder',
  },
}
