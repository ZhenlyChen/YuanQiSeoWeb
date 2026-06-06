import { categoryHubSeoMetaSync } from '@/data/mock/category/shared'
import { buildSubcategoryCards, categoryFinderPath, getL1Category } from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES } from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

const L1 = 'power-management' as const

export const mockCategoryHubPowerManagement: CategoryHubPage = {
  pageType: 'category',
  level: 'l1',
  slug: L1,
  l1Slug: L1,
  name: 'Power Management',
  meta: categoryHubSeoMetaSync({ name: 'Power Management', l1Slug: L1 }),
  breadcrumbs: [{ label: 'Categories', href: '/categories' }, { label: 'Power Management' }],
  heroSubheading:
    'Explore power management components by specifications, applications, alternatives, and sourcing risk. PartGenie helps engineers find parts, compare tradeoffs, and review replacement options before design or procurement decisions.',
  primaryCtaLabel: 'Find Power Management Components',
  secondaryCtaLabel: 'Find Alternatives',
  searchPlaceholder: 'Describe what you need, enter a part number, or paste a BOM row',
  queryChips: [
    { label: 'Find a 3V to 5V boost converter', chatQuery: 'Find a 3V to 5V boost converter' },
    { label: 'TPS5430 pin-compatible replacement', chatQuery: 'Pin-compatible replacement for TPS5430' },
    { label: 'Low-Iq LDO for wearable PMIC rail', chatQuery: 'Low quiescent LDO for wearable PMIC' },
    { label: 'Buck converter for 12V to 3.3V', chatQuery: '12V to 3.3V buck converter selection' },
    { label: 'Battery charger with I2C control', chatQuery: 'I2C battery charger for single-cell Li-ion' },
  ],
  quickAnswer:
    'Power management components regulate, convert, monitor, and protect voltage rails across embedded, industrial, and consumer designs. Engineers compare efficiency, transient response, quiescent current, package size, and control interfaces when selecting regulators and PMICs. Alternatives and sourcing risk matter because pin-compatible swaps are rare without datasheet review, and lifecycle gaps can block production builds.',
  howToChooseIntro:
    'Start by narrowing the electrical, mechanical, and application requirements. The right component is usually the one that fits the design constraints with the lowest replacement, sourcing, and qualification risk.',
  howToChooseCards: [
    { title: 'Electrical Requirements', detail: 'Match input range, output voltage/current, ripple, and transient load steps before comparing part numbers.' },
    { title: 'Package and Footprint', detail: 'Confirm thermal pad, pin pitch, and height constraints early to avoid PCB respins.' },
    { title: 'Interface and Control', detail: 'Review enable, PGOOD, I2C/SMBus, and sequencing needs for PMIC and multi-rail designs.' },
    { title: 'Application Fit', detail: 'Automotive, industrial, and battery-powered products impose different margin and noise requirements.' },
    { title: 'Lifecycle and Availability', detail: 'Prefer parts with stable lifecycle status and a credible second-source path before mass production.' },
    { title: 'Replacement Risk', detail: 'Document whether a swap is exact, pin-compatible, or functional before approving a BOM change.' },
  ],
  subcategoriesSectionTitle: 'Explore Power Management Subcategories',
  subcategoriesIntro:
    'Browse common subcategories to find parts, compare specifications, and discover alternative components.',
  subcategories: buildSubcategoryCards(L1),
  popularPartsIntro:
    'These parts are commonly searched, compared, or used as starting points for design and replacement workflows.',
  popularParts: [
    {
      mpn: 'TPS5430',
      manufacturer: 'Texas Instruments',
      category: 'DC-DC Buck',
      keySpecs: '3–6 V in · 3 A · 500 kHz',
      commonUse: 'Point-of-load buck for industrial control boards',
      partHref: '/parts/tps5430',
      alternativeHref: '/alternatives/tps5430',
      chatQuery: 'Review TPS5430 replacement options',
    },
    {
      mpn: 'MP1584EN',
      manufacturer: 'Monolithic Power Systems',
      category: 'DC-DC Buck',
      keySpecs: '4.5–28 V in · 3 A · SOT-23-6',
      commonUse: 'Compact buck for adapter-powered designs',
      partHref: '/parts/mp1584en',
      alternativeHref: '/alternatives/mp1584en',
    },
    {
      mpn: 'BQ24195',
      manufacturer: 'Texas Instruments',
      category: 'Battery Charger',
      keySpecs: 'I2C · 4.5 A · Power path',
      commonUse: 'Single-cell charging in portable products',
      partHref: '/parts/bq24195',
      alternativeHref: '/alternatives/bq24195l',
    },
    {
      mpn: 'AMS1117-3.3',
      manufacturer: 'Advanced Monolithic Systems',
      category: 'LDO',
      keySpecs: '1 A · SOT-223 · fixed 3.3 V',
      commonUse: 'Low-cost post-regulation for MCU rails',
      partHref: '/parts/ams1117-3-3',
      alternativeHref: '/alternatives/ams1117-3-3',
    },
  ],
  popularPartsCatalogCta: 'Search Full Power Management Catalog in PartGenie',
  alternativeIntro:
    'Many engineers and sourcing teams reach this category when they need a replacement, second source, or functionally similar part. PartGenie separates exact, pin-compatible, functional, and partial alternatives so teams can review risk before making a change.',
  alternativeLinks: [
    { label: 'Alternatives to TPS5430', href: '/alternatives/tps5430' },
    { label: 'BQ24195 replacement guide', href: '/alternatives/bq24195l' },
    { label: 'Compare TPS54331 vs MP1584EN', href: '/compare/tps54331-vs-mp1584en' },
    { label: 'Find pin-compatible buck converter alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Low-Iq LDO alternatives for wearable rails', href: '/answers/best-ldo-for-wearable-device' },
    { label: 'Review PMIC sequencing risks in BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
  ],
  alternativeCtaLabel: 'Find Alternatives with AI',
  designRisksIntro:
    'Components in this category may look similar in a catalog table but still require datasheet review before replacement or production use.',
  designRisks: [
    { title: 'Package and Footprint Risk', detail: 'Thermal pad size and pin order differ across vendors even when current ratings look equivalent.' },
    { title: 'Electrical Rating Risk', detail: 'Input abs max, soft-start, and current limit behavior may not transfer between functional alternates.' },
    { title: 'Control and Firmware Risk', detail: 'I2C register maps and PGOOD timing differ across PMIC families and can break bring-up scripts.' },
    { title: 'Thermal Risk', detail: 'Efficiency curves and θJA assumptions change replacement margin on compact boards.' },
    { title: 'Lifecycle Risk', detail: 'Mature LDO and charger families may be NRND while catalog listings still appear active.' },
    { title: 'Qualification Risk', detail: 'Automotive or medical builds need documented validation even for pin-compatible swaps.' },
  ],
  designRiskCtaLabel: 'Ask Datasheet AI to Review a Part',
  sourcingIntro:
    'For sourcing and procurement teams, category selection is not only about technical fit. BOM health also depends on manufacturer coverage, lifecycle status, availability, second-source options, and whether the part can be replaced without major engineering work.',
  sourcingBullets: [
    'Identify single-source PMIC and charger lines before production lock',
    'Check lifecycle and availability risk on mature buck controllers',
    'Find authorized or franchised-line alternatives for constrained parts',
    'Detect rails that need datasheet review before approving a swap',
    'Build replacement shortlists before procurement escalations',
    'Review BOM rows with the PartGenie BOM assistant',
  ],
  sourcingCtaLabel: 'Analyze a BOM',
  manufacturersIntro:
    'Explore manufacturers commonly associated with this component category, including comparable brands and alternative sourcing paths.',
  manufacturers: [
    {
      name: 'Texas Instruments',
      slug: 'texas-instruments',
      knownFor: 'TPS buck controllers and BQ charger portfolio',
      popularFamilies: 'TPS, BQ, TPS7 LDO families',
      href: '/manufacturers/texas-instruments',
    },
    {
      name: 'Analog Devices',
      slug: 'analog-devices',
      knownFor: 'High-reliability power and monitoring ICs',
      popularFamilies: 'LTM modules, LTC regulators',
      href: '/manufacturers/analog-devices',
    },
    {
      name: 'Monolithic Power Systems',
      slug: 'monolithic-power-systems',
      knownFor: 'Compact buck and PMIC solutions',
      popularFamilies: 'MP15xx, MP23xx',
      href: '/manufacturers/monolithic-power-systems',
    },
    {
      name: 'STMicroelectronics',
      slug: 'stmicroelectronics',
      knownFor: 'Automotive and industrial power ICs',
      popularFamilies: 'L79/L78, STPMIC',
      href: '/manufacturers/stmicroelectronics',
    },
  ],
  intelligenceCtaTitle: 'Find the Right Power Management Component Faster',
  intelligenceCtaCopy:
    'PartGenie turns part numbers, BOM rows, datasheets, and plain-language requirements into structured component recommendations. Search by specs, discover alternatives, compare tradeoffs, and review sourcing risk in one workflow.',
  intelligenceCtaButtons: [
    { label: 'Find Components', href: MARKETING_TOOL_PAGES.componentFinder },
    { label: 'Find Alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Analyze BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
    { label: 'Chat with Datasheet', href: MARKETING_TOOL_PAGES.datasheetAi },
  ],
  faq: [
    {
      question: 'What is a power management component?',
      answer:
        'Power management ICs regulate, convert, monitor, and protect voltage rails. They include buck/boost converters, LDOs, battery chargers, and PMICs used across embedded and industrial designs.',
    },
    {
      question: 'How do I choose the right power management component?',
      answer:
        'Define input/output requirements, package constraints, control interfaces, and thermal margin first. Then compare lifecycle status and replacement risk before selecting a part number.',
    },
    {
      question: 'Can PartGenie find alternatives in this category?',
      answer:
        'Yes. PartGenie surfaces exact, pin-compatible, functional, and partial alternatives with decision labels so teams can review replacement risk before changing a BOM row.',
    },
    {
      question: 'Can I search by specs instead of a part number?',
      answer:
        'Yes. Describe rails, current, package, or application constraints in plain language and PartGenie maps them to candidate parts in this category.',
    },
    {
      question: 'Do I need to verify alternatives with datasheets?',
      answer:
        'Always. Catalog tables rarely capture sequencing, compensation, and abs-max differences that determine whether a swap is production-safe.',
    },
    {
      question: 'Can this help with BOM review?',
      answer:
        'Yes. Use the BOM assistant to flag single-source rails, lifecycle risk, and parts that need datasheet review before procurement approval.',
    },
  ],
  internalLinks: [
    { label: 'Browse all component categories', href: '/categories' },
    { label: 'Explore DC-DC converter intelligence', href: '/categories/power-management/dc-dc-converters' },
    { label: 'Find alternatives to TPS5430', href: '/alternatives/tps5430' },
    { label: 'View STM32 power companion selection guide', href: '/answers/best-mcu-for-wearable-device' },
    { label: 'Explore Texas Instruments manufacturer intelligence', href: '/manufacturers/texas-instruments' },
    { label: 'Analyze this category in BOM Analyzer', href: MARKETING_TOOL_PAGES.bomAnalyzer },
  ],
  mostSearchedParts: [
    { mpn: 'TPS5430', href: '/parts/tps5430', category: 'DC-DC Buck', interest: 96 },
    { mpn: 'MP1584EN', href: '/parts/mp1584en', category: 'DC-DC Buck', interest: 88 },
    { mpn: 'BQ24195', href: '/parts/bq24195', category: 'Battery Charger', interest: 82 },
    { mpn: 'AMS1117-3.3', href: '/parts/ams1117-3-3', category: 'LDO', interest: 74 },
  ],
  sidebarRelatedLinks: [
    { label: 'Power Management Finder', href: categoryFinderPath(L1) },
    { label: 'DC-DC Converters hub', href: '/categories/power-management/dc-dc-converters' },
    { label: 'Battery charger alternatives', href: '/alternatives/bq24195l' },
    { label: 'Manufacturers in Power Management', href: '/manufacturers/category/analog-power' },
  ],
}

export function getPowerManagementHub(): CategoryHubPage {
  const category = getL1Category(L1)
  if (!category) return mockCategoryHubPowerManagement
  return mockCategoryHubPowerManagement
}
