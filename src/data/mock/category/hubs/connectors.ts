import { categoryHubSeoMetaSync } from '@/data/mock/category/shared'
import { buildSubcategoryCards, categoryFinderPath } from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES } from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

const L1 = 'connectors' as const

export const mockCategoryHubConnectors: CategoryHubPage = {
  pageType: 'category',
  level: 'l1',
  slug: L1,
  l1Slug: L1,
  name: 'Connectors',
  meta: categoryHubSeoMetaSync({ name: 'Connectors', l1Slug: L1 }),
  breadcrumbs: [{ label: 'Categories', href: '/categories' }, { label: 'Connectors' }],
  heroSubheading:
    'Explore connector components by specifications, applications, alternatives, and sourcing risk. PartGenie helps engineers find parts, compare tradeoffs, and review replacement options before design or procurement decisions.',
  primaryCtaLabel: 'Find Connector Components',
  secondaryCtaLabel: 'Find Alternatives',
  searchPlaceholder: 'Describe what you need, enter a part number, or paste a BOM row',
  queryChips: [
    { label: 'USB-C receptacle with 3A power', chatQuery: 'USB-C receptacle 3A power 24-pin' },
    { label: 'M12 circular connector for sensors', chatQuery: 'M12 circular connector sensor harness' },
    { label: 'Board-to-board connector 0.5mm pitch', chatQuery: 'Board to board connector 0.5mm pitch' },
    { label: 'Find second source for wire-to-board header', chatQuery: 'Wire to board header second source' },
  ],
  quickAnswer:
    'Connectors provide mechanical and electrical interfaces between boards, cables, and modules. Engineers compare pitch, mating cycles, current rating, IP rating, locking mechanism, and tooling when selecting interconnect. Alternatives and sourcing risk matter because mechanical fit and plating specs are easy to misread from catalog tables alone.',
  howToChooseIntro:
    'Start by narrowing the mechanical, environmental, and electrical requirements. The right connector is usually the one that fits the design constraints with the lowest replacement, sourcing, and qualification risk.',
  howToChooseCards: [
    { title: 'Electrical Requirements', detail: 'Match voltage, current, and signal integrity needs including shielding and grounding.' },
    { title: 'Package and Footprint', detail: 'Confirm mounting style, board keep-out, and mate height before PCB layout freeze.' },
    { title: 'Interface and Control', detail: 'Review keying, polarization, and mixed-signal pin assignments for harness designs.' },
    { title: 'Application Fit', detail: 'Industrial, medical, and outdoor products impose different sealing and vibration requirements.' },
    { title: 'Lifecycle and Availability', detail: 'Prefer connector series with stable tooling and documented cross-manufacturer equivalents.' },
    { title: 'Replacement Risk', detail: 'Mechanical interchange claims require mate compatibility and cable assembly validation.' },
  ],
  subcategoriesSectionTitle: 'Explore Connectors Subcategories',
  subcategoriesIntro:
    'Browse common subcategories to find parts, compare specifications, and discover alternative components.',
  subcategories: buildSubcategoryCards(L1),
  popularPartsIntro:
    'These parts are commonly searched, compared, or used as starting points for design and replacement workflows.',
  popularParts: [
    {
      mpn: 'USB4085-GF-A',
      manufacturer: 'GCT',
      category: 'USB-C Receptacle',
      keySpecs: '24-pin · mid-mount · 3 A',
      commonUse: 'Consumer device USB-C ports',
      partHref: '/parts/usb4085-gf-a',
      alternativeHref: '/alternatives/usb4085-gf-a',
    },
    {
      mpn: '43045-0212',
      manufacturer: 'Molex',
      category: 'Wire-to-Board',
      keySpecs: '2.54 mm · 2-circuit',
      commonUse: 'Internal harness connections',
      partHref: '/parts/43045-0212',
      alternativeHref: '/alternatives/43045-0212',
    },
  ],
  popularPartsCatalogCta: 'Search Full Connectors Catalog in PartGenie',
  alternativeIntro:
    'Teams often reach connector categories when a line is constrained, tooling changes, or a second source is required for harness builds.',
  alternativeLinks: [
    { label: 'Find pin-compatible wire-to-board alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Compare USB-C receptacle options', href: MARKETING_TOOL_PAGES.componentFinder },
    { label: 'Review connector rows in BOM Analyzer', href: MARKETING_TOOL_PAGES.bomAnalyzer },
  ],
  alternativeCtaLabel: 'Find Alternatives with AI',
  designRisksIntro:
    'Connectors that appear interchangeable may differ in plating, mate height, or retention force.',
  designRisks: [
    { title: 'Package and Footprint Risk', detail: 'Mounting tabs, shell dimensions, and keep-out zones differ across series.' },
    { title: 'Electrical Rating Risk', detail: 'Current and voltage derating depends on contact size and temperature rise.' },
    { title: 'Control and Firmware Risk', detail: 'USB-C and smart connector variants add CC and E-marker considerations.' },
    { title: 'Thermal Risk', detail: 'High-current contacts require adequate copper and airflow in dense assemblies.' },
    { title: 'Lifecycle Risk', detail: 'Tooling-specific connectors can become sole-source when molds are retired.' },
    { title: 'Qualification Risk', detail: 'Vibration and IP testing must be repeated when changing mate interfaces.' },
  ],
  designRiskCtaLabel: 'Ask Datasheet AI to Review a Part',
  sourcingIntro:
    'Connector BOM health depends on tooling availability, distributor franchise coverage, and validated second sources for harness builds.',
  sourcingBullets: [
    'Identify connector series locked to single-vendor tooling',
    'Check lead times on high-volume wire-to-board families',
    'Find franchised-line alternatives before line-down events',
    'Validate mate compatibility before approving procurement swaps',
    'Review BOM rows with assembly and test dependencies',
  ],
  sourcingCtaLabel: 'Analyze a BOM',
  manufacturersIntro:
    'Explore manufacturers commonly associated with connector categories and cross-reference paths.',
  manufacturers: [
    {
      name: 'Molex',
      slug: 'molex',
      knownFor: 'Wire-to-board and I/O connectors',
      popularFamilies: 'Micro-Fit, PicoBlade',
      href: '/manufacturers/molex',
    },
    {
      name: 'TE Connectivity',
      slug: 'te-connectivity',
      knownFor: 'Industrial and harsh-environment connectors',
      popularFamilies: 'AMP, DEUTSCH',
      href: '/manufacturers/te-connectivity',
    },
    {
      name: 'Hirose',
      slug: 'hirose',
      knownFor: 'Fine-pitch board-to-board connectors',
      popularFamilies: 'FH, DF',
      href: '/manufacturers/hirose',
    },
  ],
  intelligenceCtaTitle: 'Find the Right Connector Faster',
  intelligenceCtaCopy:
    'PartGenie turns part numbers, BOM rows, datasheets, and plain-language requirements into structured connector recommendations with alternatives and sourcing context.',
  intelligenceCtaButtons: [
    { label: 'Find Components', href: MARKETING_TOOL_PAGES.componentFinder },
    { label: 'Find Alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Analyze BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
    { label: 'Chat with Datasheet', href: MARKETING_TOOL_PAGES.datasheetAi },
  ],
  faq: [
    {
      question: 'What is a connector component?',
      answer:
        'Connectors join boards, cables, and modules with defined mechanical and electrical interfaces for product assembly and service.',
    },
    {
      question: 'How do I choose the right connector component?',
      answer:
        'Define pitch, current, environment, mating cycles, and mounting constraints before comparing part numbers.',
    },
    {
      question: 'Can PartGenie find alternatives in this category?',
      answer:
        'Yes. PartGenie surfaces functional and mechanical alternatives with visible replacement risk for harness and PCB designs.',
    },
    {
      question: 'Can I search by specs instead of a part number?',
      answer:
        'Yes. Describe pitch, pin count, mounting, or sealing requirements to discover candidate connectors.',
    },
    {
      question: 'Do I need to verify alternatives with datasheets?',
      answer:
        'Yes. Mechanical drawings and mate compatibility must be validated before approving connector substitutions.',
    },
    {
      question: 'Can this help with BOM review?',
      answer:
        'Yes. The BOM assistant helps flag sole-source connector series and tooling-dependent rows.',
    },
  ],
  internalLinks: [
    { label: 'Browse all component categories', href: '/categories' },
    { label: 'Explore circular connectors subcategory', href: '/categories/connectors/circular-connectors' },
    { label: 'Find connector alternatives with AI', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Analyze connector BOM rows', href: MARKETING_TOOL_PAGES.bomAnalyzer },
  ],
  mostSearchedParts: [
    { mpn: 'USB4085-GF-A', href: '/parts/usb4085-gf-a', category: 'USB-C', interest: 72 },
    { mpn: '43045-0212', href: '/parts/43045-0212', category: 'Wire-to-Board', interest: 65 },
  ],
  sidebarRelatedLinks: [
    { label: 'Connectors Finder', href: categoryFinderPath(L1) },
    { label: 'Circular connectors hub', href: '/categories/connectors/circular-connectors' },
    { label: 'Manufacturers in Connectors', href: '/manufacturers/category/connectors' },
  ],
}
