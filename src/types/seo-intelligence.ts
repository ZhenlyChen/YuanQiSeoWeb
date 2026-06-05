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

export type ManufacturerIntelligencePage = {
  pageType: 'manufacturer'
  slug: string
  name: string
  meta: SeoMeta
  breadcrumbs: BreadcrumbItem[]
  shortAnswer: string
  summary: string
  popularFamilies: { name: string; description: string }[]
  mostSearchedParts: EntityLink[]
  popularAlternatives: EntityLink[]
  comparableManufacturers: EntityLink[]
  categoryBreakdown: EntityLink[]
  supplyNotes: string[]
  curatedCatalog: EntityLink[]
  faq: FaqItem[]
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
