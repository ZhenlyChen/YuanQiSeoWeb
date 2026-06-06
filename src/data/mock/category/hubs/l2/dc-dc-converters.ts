import { categoryHubSeoMetaSync } from '@/data/mock/category/shared'
import { buildSubcategoryCards, categoryFinderPath, getL1Category, getL2Category } from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES } from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

const L1 = 'power-management' as const
const L2 = 'dc-dc-converters' as const

export const mockCategoryHubDcDcConverters: CategoryHubPage = {
  pageType: 'category',
  level: 'l2',
  slug: L2,
  l1Slug: L1,
  l2Slug: L2,
  name: 'DC-DC Converters',
  parentSlug: L1,
  parentName: 'Power Management',
  meta: categoryHubSeoMetaSync({
    name: 'DC-DC Converters',
    l1Slug: L1,
    l2Slug: L2,
    parentName: 'Power Management',
  }),
  breadcrumbs: [
    { label: 'Categories', href: '/categories' },
    { label: 'Power Management', href: `/categories/${L1}` },
    { label: 'DC-DC Converters' },
  ],
  heroSubheading:
    'Explore DC-DC converter components by input range, output regulation, efficiency, and replacement risk. PartGenie helps engineers compare buck, boost, and buck-boost options before design or procurement decisions.',
  primaryCtaLabel: 'Find DC-DC Converter Components',
  secondaryCtaLabel: 'Find Alternatives',
  searchPlaceholder: 'Describe what you need, enter a part number, or paste a BOM row',
  queryChips: [
    { label: 'Find a 3V to 5V boost converter', chatQuery: 'Find a 3V to 5V boost converter' },
    { label: '600V MOSFET alternative', chatQuery: '600V MOSFET alternative for power stage' },
    { label: 'Pin-compatible replacement for TPS5430', chatQuery: 'Pin-compatible replacement for TPS5430' },
    { label: '12V to 3.3V buck 2A', chatQuery: '12V to 3.3V buck converter 2A' },
  ],
  quickAnswer:
    'DC-DC converters step voltage up or down with switched-mode regulation for point-of-load rails. Engineers compare topology, input range, output current, switching frequency, efficiency, and control mode when selecting buck, boost, or buck-boost parts. Alternatives and sourcing risk matter because compensation networks, soft-start, and current limit behavior rarely transfer without validation.',
  howToChooseIntro:
    'Start with rail requirements and thermal budget. The best DC-DC converter minimizes redesign work while meeting efficiency and transient response targets.',
  howToChooseCards: [
    { title: 'Electrical Requirements', detail: 'Define input range, output voltage/current, ripple, and load transient profile first.' },
    { title: 'Package and Footprint', detail: 'Confirm inductor placement, thermal pad, and height limits on compact boards.' },
    { title: 'Interface and Control', detail: 'Review enable, soft-start, sync, and PGOOD needs for multi-rail sequencing.' },
    { title: 'Application Fit', detail: 'Industrial and battery-powered rails impose different noise and efficiency priorities.' },
    { title: 'Lifecycle and Availability', detail: 'Prefer converters with stable lifecycle and documented cross references.' },
    { title: 'Replacement Risk', detail: 'Pin-compatible buck swaps still require loop stability and abs-max verification.' },
  ],
  subcategoriesSectionTitle: 'Related Power Management Categories',
  subcategoriesIntro:
    'Browse related categories within power management for adjacent rails and companion parts.',
  subcategories: buildSubcategoryCards(L1, L2),
  popularPartsIntro:
    'These DC-DC converters are commonly searched, compared, or used as starting points for replacement workflows.',
  popularParts: [
    {
      mpn: 'TPS5430',
      manufacturer: 'Texas Instruments',
      category: 'Buck',
      keySpecs: '3–6 V in · 3 A · 500 kHz',
      commonUse: 'Industrial 3.3 V / 5 V rails',
      partHref: '/parts/tps5430',
      alternativeHref: '/alternatives/tps5430',
    },
    {
      mpn: 'MP1584EN',
      manufacturer: 'Monolithic Power Systems',
      category: 'Buck',
      keySpecs: '4.5–28 V in · 3 A',
      commonUse: 'Adapter-powered buck designs',
      partHref: '/parts/mp1584en',
      alternativeHref: '/alternatives/mp1584en',
    },
    {
      mpn: 'LM2596S-5.0',
      manufacturer: 'Texas Instruments',
      category: 'Buck',
      keySpecs: '4–40 V in · 3 A · TO-263',
      commonUse: 'Legacy 5 V step-down designs',
      partHref: '/parts/lm2596s-5-0',
      alternativeHref: '/alternatives/lm2596s-5-0',
    },
  ],
  popularPartsCatalogCta: 'Search Full DC-DC Converter Catalog in PartGenie',
  alternativeIntro:
    'Engineers often search this subcategory for pin-compatible buck replacements and second-source paths on mature rails.',
  alternativeLinks: [
    { label: 'Alternatives to TPS5430', href: '/alternatives/tps5430' },
    { label: 'Compare TPS54331 vs MP1584EN', href: '/compare/tps54331-vs-mp1584en' },
    { label: 'Find pin-compatible buck converter alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Ask Datasheet AI about loop stability risks', href: MARKETING_TOOL_PAGES.datasheetAi },
  ],
  alternativeCtaLabel: 'Find Alternatives with AI',
  designRisksIntro:
    'DC-DC converters with similar ratings can differ in compensation, current limit, and thermal performance.',
  designRisks: [
    { title: 'Package and Footprint Risk', detail: 'Inductor value and layout assumptions differ across controller families.' },
    { title: 'Electrical Rating Risk', detail: 'Abs-max input and current limit behavior may not match on functional alternates.' },
    { title: 'Control and Firmware Risk', detail: 'PGOOD and enable timing affect multi-rail sequencing scripts.' },
    { title: 'Thermal Risk', detail: 'Efficiency differences change heat spread on small copper pours.' },
    { title: 'Lifecycle Risk', detail: 'Mature buck controllers may be NRND while still appearing in legacy BOMs.' },
    { title: 'Qualification Risk', detail: 'EMI and transient tests must be repeated after converter substitution.' },
  ],
  designRiskCtaLabel: 'Ask Datasheet AI to Review a Part',
  sourcingIntro:
    'DC-DC converter sourcing risk concentrates on single-source controllers and magnetics co-dependencies.',
  sourcingBullets: [
    'Identify sole-source buck controllers before production lock',
    'Check distributor stock on high-volume converter families',
    'Validate inductor availability when changing controller part numbers',
    'Build replacement shortlists for constrained rails',
    'Review BOM rows with magnetics and compensation dependencies',
  ],
  sourcingCtaLabel: 'Analyze a BOM',
  manufacturersIntro:
    'Explore manufacturers commonly associated with DC-DC converter portfolios.',
  manufacturers: [
    {
      name: 'Texas Instruments',
      slug: 'texas-instruments',
      knownFor: 'TPS buck and SIMPLE SWITCHER families',
      popularFamilies: 'TPS543x, LM25xx',
      href: '/manufacturers/texas-instruments',
    },
    {
      name: 'Monolithic Power Systems',
      slug: 'monolithic-power-systems',
      knownFor: 'Compact high-frequency bucks',
      popularFamilies: 'MP15xx',
      href: '/manufacturers/monolithic-power-systems',
    },
    {
      name: 'Analog Devices',
      slug: 'analog-devices',
      knownFor: 'High-reliability power modules',
      popularFamilies: 'LTM, LTC',
      href: '/manufacturers/analog-devices',
    },
  ],
  intelligenceCtaTitle: 'Find the Right DC-DC Converter Faster',
  intelligenceCtaCopy:
    'PartGenie maps rail requirements and part numbers to DC-DC candidates with alternatives, compare links, and sourcing context.',
  intelligenceCtaButtons: [
    { label: 'Find Components', href: MARKETING_TOOL_PAGES.componentFinder },
    { label: 'Find Alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Analyze BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
    { label: 'Chat with Datasheet', href: MARKETING_TOOL_PAGES.datasheetAi },
  ],
  faq: [
    {
      question: 'What is a DC-DC converter component?',
      answer:
        'DC-DC converters regulate output voltage from a DC input using switched-mode topologies such as buck, boost, or buck-boost.',
    },
    {
      question: 'How do I choose the right DC-DC converter?',
      answer:
        'Define topology, input/output range, current, efficiency, and control needs before comparing specific controllers.',
    },
    {
      question: 'Can PartGenie find alternatives in this subcategory?',
      answer:
        'Yes. PartGenie surfaces exact, pin-compatible, and functional DC-DC alternatives with visible replacement risk.',
    },
    {
      question: 'Can I search by specs instead of a part number?',
      answer:
        'Yes. Describe input, output, current, and package constraints to discover candidate converters.',
    },
    {
      question: 'Do I need to verify alternatives with datasheets?',
      answer:
        'Yes. Loop compensation, soft-start, and abs-max limits require datasheet review before approving swaps.',
    },
    {
      question: 'Can this help with BOM review?',
      answer:
        'Yes. The BOM assistant flags converter rows with lifecycle and magnetics dependency risk.',
    },
  ],
  internalLinks: [
    { label: 'Power Management category hub', href: `/categories/${L1}` },
    { label: 'Browse all categories', href: '/categories' },
    { label: 'Find alternatives to TPS5430', href: '/alternatives/tps5430' },
    { label: 'Explore Texas Instruments manufacturer intelligence', href: '/manufacturers/texas-instruments' },
    { label: 'Analyze DC-DC rails in BOM Analyzer', href: MARKETING_TOOL_PAGES.bomAnalyzer },
  ],
  mostSearchedParts: [
    { mpn: 'TPS5430', href: '/parts/tps5430', category: 'Buck', interest: 96 },
    { mpn: 'MP1584EN', href: '/parts/mp1584en', category: 'Buck', interest: 88 },
    { mpn: 'LM2596S-5.0', href: '/parts/lm2596s-5-0', category: 'Buck', interest: 70 },
  ],
  sidebarRelatedLinks: [
    { label: 'Power Management hub', href: `/categories/${L1}` },
    { label: 'LDO regulators subcategory', href: `/categories/${L1}/ldo-regulators` },
    { label: 'Alternatives to TPS5430', href: '/alternatives/tps5430' },
    { label: 'Power Management Finder', href: categoryFinderPath(L1) },
  ],
}

export function getDcDcConvertersHub(): CategoryHubPage | null {
  const l2 = getL2Category(L1, L2)
  if (!l2) return null
  return mockCategoryHubDcDcConverters
}
