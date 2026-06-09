import { getMockCategoryDirectoryPage } from '@/data/mock/category/directory'
import { buildCategoryPopularPartsFallback } from '@/data/mock/category/popular-parts-fallback'
import { mockCategoryHubConnectors } from '@/data/mock/category/hubs/connectors'
import { mockCategoryHubDcDcConverters } from '@/data/mock/category/hubs/l2/dc-dc-converters'
import { mockCategoryHubMcu } from '@/data/mock/category/hubs/mcu'
import { mockCategoryHubPowerManagement } from '@/data/mock/category/hubs/power-management'
import { categoryHubSeoMetaSync } from '@/data/mock/category/shared'
import {
  buildSubcategoryCards,
  categoryFinderPath,
  categoryHubPath,
  getL1Category,
  getL2Categories,
  getL2Category,
} from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES } from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

export { getMockCategoryDirectoryPage } from '@/data/mock/category/directory'

const FULL_L1_HUBS: Record<string, CategoryHubPage> = {
  'power-management': mockCategoryHubPowerManagement,
  mcu: mockCategoryHubMcu,
  connectors: mockCategoryHubConnectors,
}

const FULL_L2_HUBS: Record<string, CategoryHubPage> = {
  'power-management/dc-dc-converters': mockCategoryHubDcDcConverters,
}

function slugToDisplayName(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function buildDegradedCategoryHubPage(l1Slug: string, l2Slug?: string): CategoryHubPage | null {
  const l1 = getL1Category(l1Slug) ?? {
    slug: l1Slug,
    name: slugToDisplayName(l1Slug),
    description: `Browse ${slugToDisplayName(l1Slug)} components and selection intelligence.`,
    iconId: 'passives' as const,
    sortRank: 999,
    partCount: 0,
    published: true,
    l2: getL2Categories(l1Slug),
  }

  if (l2Slug) {
    const l2 = getL2Category(l1Slug, l2Slug) ?? {
      slug: l2Slug,
      name: slugToDisplayName(l2Slug),
      shortDescription: `Components in the ${slugToDisplayName(l2Slug)} subcategory.`,
    }

    return {
      pageType: 'category',
      level: 'l2',
      slug: l2Slug,
      l1Slug,
      l2Slug,
      name: l2.name,
      parentSlug: l1Slug,
      parentName: l1.name,
      meta: categoryHubSeoMetaSync({
        name: l2.name,
        l1Slug,
        l2Slug,
        parentName: l1.name,
      }),
      breadcrumbs: [
        { label: 'Categories', href: '/categories' },
        { label: l1.name, href: categoryHubPath(l1Slug) },
        { label: l2.name },
      ],
      heroSubheading: `Explore ${l2.name.toLowerCase()} within ${l1.name.toLowerCase()} — specifications, alternatives context, and sourcing considerations curated by PartGenie.`,
      primaryCtaLabel: `Find ${l2.name} Components`,
      secondaryCtaLabel: 'Find Alternatives',
      searchPlaceholder: 'Describe what you need, enter a part number, or paste a BOM row',
      queryChips: [
        { label: `Search ${l2.name} by specs`, chatQuery: `Find ${l2.name} for my design requirements` },
        { label: 'Find pin-compatible alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
      ],
      quickAnswer: `${l2.name} sits under ${l1.name} in the PartGenie taxonomy. ${l2.shortDescription} Engineers use this hub to compare selection factors, review replacement risk, and move into PartGenie tools for alternatives and BOM analysis.`,
      howToChooseIntro:
        'Start by narrowing electrical, mechanical, and application requirements before comparing part numbers in this subcategory.',
      howToChooseCards: [
        { title: 'Electrical Requirements', detail: 'Define voltage, current, interface, and performance margins for your rail or function.' },
        { title: 'Package and Footprint', detail: 'Confirm board space, height, and thermal constraints before selecting a package.' },
        { title: 'Application Fit', detail: 'Match industrial, automotive, or consumer constraints to category-appropriate parts.' },
        { title: 'Lifecycle and Availability', detail: 'Prefer parts with stable lifecycle status and credible second-source options.' },
        { title: 'Replacement Risk', detail: 'Document whether a swap is exact, pin-compatible, or functional before changing the BOM.' },
      ],
      subcategoriesSectionTitle: `Related ${l1.name} Categories`,
      subcategoriesIntro: 'Browse adjacent subcategories within the same parent category.',
      subcategories: buildSubcategoryCards(l1Slug, l2Slug),
      popularPartsIntro:
        'These parts are commonly searched, compared, or used as starting points for design and replacement workflows in this subcategory.',
      popularParts: buildCategoryPopularPartsFallback(l1Slug, l2.name),
      popularPartsCatalogCta: `Search ${l2.name} in PartGenie`,
      alternativeIntro:
        'Use PartGenie to explore replacement searches and compare tradeoffs before approving a BOM change in this subcategory.',
      alternativeLinks: [
        { label: 'Find alternatives with AI', href: MARKETING_TOOL_PAGES.alternativeFinder },
        { label: `Return to ${l1.name} hub`, href: categoryHubPath(l1Slug) },
      ],
      alternativeCtaLabel: 'Find Alternatives with AI',
      designRisksIntro: 'Review datasheet-dependent risks before substituting parts in this subcategory.',
      designRisks: [
        { title: 'Package and Footprint Risk', detail: 'Mechanical and thermal differences may invalidate drop-in assumptions.' },
        { title: 'Electrical Rating Risk', detail: 'Operating margins and abs-max limits require datasheet verification.' },
        { title: 'Lifecycle Risk', detail: 'Mature parts may be NRND while still appearing in legacy BOMs.' },
      ],
      designRiskCtaLabel: 'Ask Datasheet AI to Review a Part',
      sourcingIntro: 'Sourcing teams should review lifecycle, franchise coverage, and replacement readiness for this subcategory.',
      sourcingBullets: [
        'Identify single-source rows before production lock',
        'Check lifecycle and availability on constrained parts',
        'Build replacement shortlists before procurement escalations',
      ],
      sourcingCtaLabel: 'Analyze a BOM',
      manufacturersIntro: `Manufacturers commonly associated with ${l2.name} will be curated here.`,
      manufacturers: [],
      intelligenceCtaTitle: `Find the Right ${l2.name} Component Faster`,
      intelligenceCtaCopy:
        'PartGenie turns requirements, part numbers, and BOM rows into structured recommendations with alternatives and sourcing context.',
      intelligenceCtaButtons: [
        { label: 'Find Components', href: MARKETING_TOOL_PAGES.componentFinder },
        { label: 'Find Alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
        { label: 'Analyze BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
      ],
      faq: [
        {
          question: `What is a ${l2.name.toLowerCase()} component?`,
          answer: l2.shortDescription,
        },
        {
          question: `How do I choose the right ${l2.name.toLowerCase()} component?`,
          answer:
            'Define electrical, package, and application constraints first, then compare lifecycle and replacement risk before selecting a part number.',
        },
        {
          question: 'Can PartGenie find alternatives in this subcategory?',
          answer: 'Yes. PartGenie helps teams discover and compare alternatives with visible replacement risk labels.',
        },
      ],
      internalLinks: [
        { label: 'Browse all categories', href: '/categories' },
        { label: `${l1.name} hub`, href: categoryHubPath(l1Slug) },
        { label: `${l1.name} finder`, href: categoryFinderPath(l1Slug) },
      ],
      mostSearchedParts: [],
      sidebarRelatedLinks: [
        { label: `${l1.name} hub`, href: categoryHubPath(l1Slug) },
        { label: 'Category directory', href: '/categories' },
        { label: 'Find alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
      ],
      degraded: true,
    }
  }

  return {
    pageType: 'category',
    level: 'l1',
    slug: l1Slug,
    l1Slug,
    name: l1.name,
    meta: categoryHubSeoMetaSync({ name: l1.name, l1Slug }),
    breadcrumbs: [{ label: 'Categories', href: '/categories' }, { label: l1.name }],
    heroSubheading: `Explore ${l1.name.toLowerCase()} components by specifications, applications, alternatives, and sourcing risk with PartGenie component intelligence.`,
    primaryCtaLabel: `Find ${l1.name} Components`,
    secondaryCtaLabel: 'Find Alternatives',
    searchPlaceholder: 'Describe what you need, enter a part number, or paste a BOM row',
    queryChips: [
      { label: `Search ${l1.name} by specs`, chatQuery: `Find ${l1.name} components for my requirements` },
      { label: 'Find alternatives with AI', href: MARKETING_TOOL_PAGES.alternativeFinder },
    ],
    quickAnswer: `${l1.description} PartGenie organizes this category for selection guides, alternatives context, and BOM health review — not as a traditional catalog dump.`,
    howToChooseIntro:
      'Start by narrowing electrical, mechanical, and application requirements. The right component minimizes replacement and qualification risk.',
    howToChooseCards: [
      { title: 'Electrical Requirements', detail: 'Define operating points and interface needs before comparing MPNs.' },
      { title: 'Package and Footprint', detail: 'Confirm mechanical constraints and thermal paths on the PCB.' },
      { title: 'Application Fit', detail: 'Match the component family to your product environment and compliance needs.' },
      { title: 'Lifecycle and Availability', detail: 'Prefer parts with stable lifecycle and second-source options.' },
      { title: 'Replacement Risk', detail: 'Document match type before approving any BOM substitution.' },
    ],
    subcategoriesSectionTitle: `Explore ${l1.name} Subcategories`,
    subcategoriesIntro: 'Browse subcategories to compare specifications and discover related intelligence pages.',
    subcategories: buildSubcategoryCards(l1Slug),
    popularPartsIntro:
      'These parts are commonly searched, compared, or used as starting points for design and replacement workflows.',
    popularParts: buildCategoryPopularPartsFallback(l1Slug, l1.name),
    popularPartsCatalogCta: `Search Full ${l1.name} Catalog in PartGenie`,
    alternativeIntro:
      'Many teams reach this category when searching for replacements, second sources, or functionally similar parts.',
    alternativeLinks: [
      { label: 'Find alternatives with AI', href: MARKETING_TOOL_PAGES.alternativeFinder },
      { label: `${l1.name} finder`, href: categoryFinderPath(l1Slug) },
    ],
    alternativeCtaLabel: 'Find Alternatives with AI',
    designRisksIntro: 'Review design and sourcing risks before substituting parts in this category.',
    designRisks: [
      { title: 'Package and Footprint Risk', detail: 'Mechanical differences can invalidate drop-in replacement assumptions.' },
      { title: 'Electrical Rating Risk', detail: 'Abs-max and derating behavior require datasheet verification.' },
      { title: 'Lifecycle Risk', detail: 'NRND parts may remain in legacy BOMs without visible catalog warnings.' },
    ],
    designRiskCtaLabel: 'Ask Datasheet AI to Review a Part',
    sourcingIntro: 'BOM health in this category depends on lifecycle, franchise coverage, and replacement readiness.',
    sourcingBullets: [
      'Identify single-source rows before production lock',
      'Check lifecycle status on constrained parts',
      'Review BOM rows with PartGenie BOM assistant',
    ],
    sourcingCtaLabel: 'Analyze a BOM',
    manufacturersIntro: `Manufacturers commonly associated with ${l1.name} will be curated here.`,
    manufacturers: [],
    intelligenceCtaTitle: `Find the Right ${l1.name} Component Faster`,
    intelligenceCtaCopy:
      'PartGenie turns requirements, part numbers, and BOM rows into structured recommendations with alternatives and sourcing context.',
    intelligenceCtaButtons: [
      { label: 'Find Components', href: MARKETING_TOOL_PAGES.componentFinder },
      { label: 'Find Alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
      { label: 'Analyze BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
      { label: 'Chat with Datasheet', href: MARKETING_TOOL_PAGES.datasheetAi },
    ],
    faq: [
      {
        question: `What is a ${l1.name.toLowerCase()} component?`,
        answer: l1.description,
      },
      {
        question: `How do I choose the right ${l1.name.toLowerCase()} component?`,
        answer:
          'Define electrical, package, and application constraints first, then compare lifecycle and replacement risk before selecting a part number.',
      },
      {
        question: 'Can PartGenie find alternatives in this category?',
        answer: 'Yes. PartGenie helps teams discover alternatives with visible replacement risk labels.',
      },
    ],
    internalLinks: [
      { label: 'Browse all categories', href: '/categories' },
      { label: `${l1.name} finder`, href: categoryFinderPath(l1Slug) },
      { label: 'Find alternatives with AI', href: MARKETING_TOOL_PAGES.alternativeFinder },
    ],
    mostSearchedParts: [],
    sidebarRelatedLinks: [
      { label: 'Category directory', href: '/categories' },
      { label: `${l1.name} finder`, href: categoryFinderPath(l1Slug) },
      { label: 'Find alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    ],
    degraded: true,
  }
}

export function getMockCategoryHubPage(l1Slug: string, l2Slug?: string): CategoryHubPage | null {
  const key = l2Slug ? `${l1Slug}/${l2Slug}` : l1Slug

  if (l2Slug) {
    const fullL2 = FULL_L2_HUBS[key]
    if (fullL2) return fullL2
    return buildDegradedCategoryHubPage(l1Slug, l2Slug)
  }

  const fullL1 = FULL_L1_HUBS[l1Slug]
  if (fullL1) return fullL1
  return buildDegradedCategoryHubPage(l1Slug)
}
