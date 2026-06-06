import type { ApplicationTagInput } from '@/lib/application-tags'

export type DecisionLabel = 'exact' | 'pin-compatible' | 'functional' | 'partial'
export type ReplacementDifficulty = 'low' | 'medium' | 'high'
export type SourcingRisk = 'low' | 'medium' | 'high'

export type SeoMeta = {
  title: string
  description: string
  h1: string
  /** Optional second line for hero H1 display (full title still uses h1 + this for meta alt). */
  h1SecondLine?: string
  canonicalPath: string
  keywords: string[]
}

/** Hero subtitle: Manufacturer • Category • Package */
export type PageSubtitle = {
  manufacturer: string
  manufacturerHref?: string
  category: string
  categoryHref?: string
  package?: string
}

export type BreadcrumbItem = { label: string; href?: string }

export type AiVerdict = {
  bestFor: string[]
  avoidIf: string[]
  checkBeforeUse: string[]
  replacementDifficulty: ReplacementDifficulty
  sourcingRisk: SourcingRisk
}

export type DecisionMatrixRow = {
  question: string
  recommendation: string
}

export type FaqItem = { question: string; answer: string }

/** Real-user query chip on manufacturer hubs — links to /answers/* or app chat. */
export type ManufacturerQueryItem = {
  question: string
  answerHref?: string
  chatQuery?: string
}

export type KeySpec = { label: string; value: string }

export type CompatibilityFactorStatus = 'match' | 'partial' | 'mismatch'

export type AlternativeCompatibility = {
  package: CompatibilityFactorStatus
  pinout: CompatibilityFactorStatus
  voltage: CompatibilityFactorStatus
  temperature: CompatibilityFactorStatus
  interface: CompatibilityFactorStatus
  lifecycle: CompatibilityFactorStatus
  application: CompatibilityFactorStatus
}

export type AlternativeItem = {
  mpn: string
  manufacturer: string
  matchType: DecisionLabel
  reason: string
  riskLevel?: ReplacementDifficulty
  href: string
  compareHref?: string
  compatibility?: AlternativeCompatibility
}

export type CompareLink = {
  label: string
  href: string
}

export type EntityLink = { label: string; href: string }

/** Row for manufacturer "most searched parts" — Part + category from PartGenie intelligence. */
export type TopSearchedPartItem = {
  mpn: string
  href: string
  category: string
  imageUrl?: string
  manufacturer?: string
  keySpecs?: string
  commonUse?: string
  /** Relative search interest 0–100 (sort order). */
  interest: number
  changePercent?: number
}

/** Sidebar manufacturer row — logo/monogram + optional subtitle (Perplexity-style peek list). */
export type ManufacturerPeekLink = {
  label: string
  href: string
  slug?: string
  logoUrl?: string
  /** Short line under name, e.g. "GD32 · MCU". */
  subtitle?: string
  /** Monogram fallback when logo is missing. */
  shortName?: string
}

export type CommonPitfall = { title: string; detail: string }

export type ApplicationBlock = {
  goodFit: ApplicationTagInput[]
  notRecommended: string[]
}

export type BomSourcingNotes = {
  lifecycle: string
  supplyRisk: string
  replacementReadiness: string
  bullets: string[]
}

export type ComponentIdentityFields = {
  codeNorm: string
  codeYuanqi: string
  manufacturerNorm: string
  identityKey: string
  codeOther?: string[]
}

export type ComponentSourceQuality = {
  datasheetStatus: 'matched' | 'crawled' | 'missing' | 'downloaded' | 'failed'
  datasheetTextQuality: 'good' | 'partial' | 'ocr' | 'poor' | 'unavailable'
  enrichmentVersion: string
  usedSources: string[]
  requiresHumanReview: boolean
}

export type ComponentComplianceFields = {
  rohs?: string
  reach?: string
  msl?: string
  eccn?: string
  htsus?: string
}

export type ComponentMechanicalFields = {
  pinCount?: number
  pinPitchMm?: number
  pinType?: string
  lengthMm?: number
  widthMm?: number
  heightMm?: number
}

export type ComponentMediaFields = {
  datasheetUrls: string[]
  /** Display size for datasheet file row (bytes). */
  datasheetSizeBytes?: number
  productUrls?: string[]
  imgUrls?: string[]
}

export type ComponentSourcingSnapshot = {
  vendorCount: number
  stockStatus: string
  minUnitPrice?: number
  priceCurrency?: string
  packagingOptions?: string[]
}

export type ComponentSubstituteSummary = {
  dropInCount: number
  functionalCount: number
  alternateCount: number
  requiresValidation: boolean
}

export type ComponentIntelligencePage = {
  pageType: 'component'
  slug: string
  mpn: string
  manufacturer: string
  manufacturerSlug: string
  category: string
  categoryLabel: string
  categorySlug: string
  package: string
  /** Keyword chips under the part title in Overview (e.g. package, core, use-case). */
  overviewTags?: string[]
  subtitle: PageSubtitle
  meta: SeoMeta
  breadcrumbs: BreadcrumbItem[]
  shortAnswer: string
  aiVerdict: AiVerdict
  keySpecs: KeySpec[]
  applications: ApplicationBlock
  designConsiderations: string[]
  commonPitfalls: CommonPitfall[]
  alternatives: AlternativeItem[]
  compareLinks: CompareLink[]
  bomSourcing: BomSourcingNotes
  decisionMatrix: DecisionMatrixRow[]
  faq: FaqItem[]
  relatedAnswers: EntityLink[]
  relatedCategory: EntityLink
  relatedManufacturer: EntityLink
  identity: ComponentIdentityFields
  sourceQuality: ComponentSourceQuality
  compliance?: ComponentComplianceFields
  mechanical?: ComponentMechanicalFields
  media: ComponentMediaFields
  sourcingSnapshot?: ComponentSourcingSnapshot
  substituteSummary?: ComponentSubstituteSummary
}

export type ReplacementVerdict = {
  canReplaceDirectly: boolean
  bestReplacementType: string
  mainRisk: string
  summary: string
}

export type CompatibilityRow = {
  factor: string
  original: string
  topAlternative: string
  notes?: string
}

export type RiskAnalysisItem = {
  category: string
  level: ReplacementDifficulty
  detail: string
}

export type FeatureCompareRow = {
  feature: string
  original: string
  alt1: string
  alt2: string
  alt3: string
}

export type ApplicationFitRow = {
  scenario: string
  guidance: string
}

export type AlternativeIntelligencePage = {
  pageType: 'alternative'
  slug: string
  mpn: string
  manufacturer: string
  category: string
  subtitle: PageSubtitle
  overviewTags?: string[]
  meta: SeoMeta
  breadcrumbs: BreadcrumbItem[]
  shortAnswer: string
  replacementVerdict: ReplacementVerdict
  alternatives: AlternativeItem[]
  compatibilityMatrix: CompatibilityRow[]
  riskAnalysis: RiskAnalysisItem[]
  featureComparison: FeatureCompareRow[]
  featureComparisonHeaders: { original: string; alt1: string; alt2: string; alt3: string }
  applicationFit: ApplicationFitRow[]
  regionalNotes: string[]
  compareLinks: CompareLink[]
  faq: FaqItem[]
  originalPartHref: string
  categoryLink: EntityLink
}

export type ComparePartSummary = {
  mpn: string
  manufacturer: string
  slug: string
}

export type SpecCompareRow = {
  spec: string
  partA: string
  partB: string
  winner?: 'a' | 'b' | 'tie' | 'context'
}

export type CompareIntelligencePage = {
  pageType: 'compare'
  slug: string
  partA: ComparePartSummary
  partB: ComparePartSummary
  meta: SeoMeta
  dropInReplacement: boolean
  dropInWarning: string
  breadcrumbs: BreadcrumbItem[]
  shortAnswer: string
  chooseAIf: string[]
  chooseBIf: string[]
  doNotReplaceIf: string[]
  specComparison: SpecCompareRow[]
  pinPackageNotes: string[]
  applicationFit: { application: string; better: 'a' | 'b' | 'either'; reason: string }[]
  designTradeoffs: string[]
  sourcingNotes: string[]
  alternativesToBoth: AlternativeItem[]
  relatedQueries: EntityLink[]
  faq: FaqItem[]
}

/** Category row for manufacturer catalog preview (merged families + catalog). */
export type ManufacturerCatalogCategory = {
  label: string
  partCount: number
  /** Raw L1 segment for app brand drawer deep link (`categoryL1` query param). */
  categoryL1?: string
  /** Raw L2 segment for app brand drawer deep link (`categoryL2` query param). */
  categoryL2?: string
}

export type SupplyChainInsightGroup = {
  title: string
  summary: string
  notes: string[]
  icon: 'lifecycle' | 'alertCircle' | 'globe'
}

export type ManufacturerIntelligencePage = {
  pageType: 'manufacturer'
  slug: string
  name: string
  shortName?: string
  /** Backend manufacturer ID — opens brand drawer in app via intent=brand deep link. */
  manufacturerId?: string
  representativeMpn?: string
  logoUrl?: string
  meta: SeoMeta
  breadcrumbs: BreadcrumbItem[]
  shortAnswer: string
  summary: string
  catalogCategories: ManufacturerCatalogCategory[]
  mostSearchedParts: TopSearchedPartItem[]
  popularAlternatives: EntityLink[]
  comparableManufacturers: ManufacturerPeekLink[]
  supplyInsights: SupplyChainInsightGroup[]
  queryIntelligence?: ManufacturerQueryItem[]
  faq: FaqItem[]
}

export type ManufacturerDirectoryCategoryRef = {
  slug: string
  label: string
}

export type ManufacturerDirectoryItem = {
  slug: string
  name: string
  shortName?: string
  aliases?: string[]
  logoUrl?: string
  manufacturerId?: string
  subtitle?: string
  knownFor?: string
  popularPaths?: string
  peekSummary?: string
  primaryCategoryL1: ManufacturerDirectoryCategoryRef[]
  letter: string
  href: string
  published: boolean
  sortRank?: number
}

export type ManufacturerDirectoryFacet = {
  slug: string
  label: string
  count: number
}

export type ManufacturerDirectoryPage = {
  pageType: 'manufacturer_directory'
  meta: SeoMeta
  items: ManufacturerDirectoryItem[]
  categoryFacets: ManufacturerDirectoryFacet[]
  totalInDatabase: number
  total?: number
  page?: number
  pageSize?: number
}

export type ManufacturerDirectoryViewMode = 'browse' | 'letter'

export type ManufacturerDirectoryActiveFacet = {
  tab: 'all' | 'category' | 'letter'
  categoryL1?: string
  categoryLabel?: string
  letter?: string
}

export type RecommendedPart = {
  mpn: string
  manufacturer: string
  why: string
  href: string
}

export type SuggestedBomLine = { mpn: string; role: string; notes?: string }

export type QueryAnswerPage = {
  pageType: 'answer'
  slug: string
  useCase: string
  category: string
  meta: SeoMeta
  breadcrumbs: BreadcrumbItem[]
  shortAnswer: string
  directAnswer: string
  recommendedComponents: RecommendedPart[]
  selectionCriteria: string[]
  tradeoffs: { title: string; detail: string }[]
  suggestedBom: SuggestedBomLine[]
  alternatives: EntityLink[]
  whenToAvoid: string[]
  relatedComponents: EntityLink[]
  categoryFinderLink: EntityLink
  faq: FaqItem[]
}

export type CategoryIconId =
  | 'mcu'
  | 'power-management'
  | 'power-discrete'
  | 'mems-sensors'
  | 'data-converters'
  | 'rf-wireless'
  | 'automotive'
  | 'connectivity'
  | 'memory'
  | 'passives'
  | 'connectors'
  | 'fpga-logic'

export type CategoryDirectoryItem = {
  slug: string
  name: string
  description: string
  letter: string
  href: string
  iconId: CategoryIconId
  subcategoryCount: number
  partCount: number
  published: boolean
  sortRank?: number
}

export type CategoryDirectoryPage = {
  pageType: 'category_directory'
  meta: SeoMeta
  items: CategoryDirectoryItem[]
  totalInDatabase: number
}

export type CategoryChoiceCard = {
  title: string
  detail: string
}

export type CategorySubcategoryCard = {
  name: string
  slug: string
  description: string
  href: string
  iconId: CategoryIconId
}

export type CategoryPopularPartRow = {
  mpn: string
  manufacturer: string
  category: string
  keySpecs: string
  commonUse: string
  partHref: string
  alternativeHref?: string
  compareHref?: string
  chatQuery?: string
}

export type CategoryRiskCard = {
  title: string
  detail: string
}

export type CategoryManufacturerCard = {
  name: string
  slug: string
  knownFor: string
  popularFamilies: string
  href: string
}

export type CategoryQueryChip = {
  label: string
  chatQuery?: string
  href?: string
}

export type CategoryHubPage = {
  pageType: 'category'
  level: 'l1' | 'l2'
  slug: string
  l1Slug: string
  l2Slug?: string
  name: string
  parentSlug?: string
  parentName?: string
  meta: SeoMeta
  breadcrumbs: BreadcrumbItem[]
  heroSubheading: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  searchPlaceholder: string
  queryChips: CategoryQueryChip[]
  quickAnswer: string
  howToChooseIntro: string
  howToChooseCards: CategoryChoiceCard[]
  subcategoriesSectionTitle: string
  subcategoriesIntro: string
  subcategories: CategorySubcategoryCard[]
  popularPartsIntro: string
  popularParts: CategoryPopularPartRow[]
  popularPartsCatalogCta: string
  alternativeIntro: string
  alternativeLinks: EntityLink[]
  alternativeCtaLabel: string
  designRisksIntro: string
  designRisks: CategoryRiskCard[]
  designRiskCtaLabel: string
  sourcingIntro: string
  sourcingBullets: string[]
  sourcingCtaLabel: string
  manufacturersIntro: string
  manufacturers: CategoryManufacturerCard[]
  intelligenceCtaTitle: string
  intelligenceCtaCopy: string
  intelligenceCtaButtons: EntityLink[]
  faq: FaqItem[]
  internalLinks: EntityLink[]
  mostSearchedParts: TopSearchedPartItem[]
  sidebarRelatedLinks: EntityLink[]
  degraded?: boolean
}
