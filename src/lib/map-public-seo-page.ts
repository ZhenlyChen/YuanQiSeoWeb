import type { AppLocale } from '@/i18n/routing'
import { normalizeBreadcrumbItems } from '@/lib/breadcrumb-items'
import { componentSeoMetaSync, alternativeSeoMetaSync } from '@/lib/seo-meta'
import { buildOverviewTagsFromEsComponent } from '@/lib/overview-tags-from-component'
import type { PublicSeoPage } from '@/lib/seo-api'
import type { ProductJsonLdInput } from '@/lib/json-ld'
import { resolvePartImageUrl } from '@/lib/part-images'
import type { ApplicationTagInput } from '@/lib/application-tags'
import type {
  AlternativeIntelligencePage,
  AlternativeItem,
  BreadcrumbItem,
  CommonPitfall,
  ComponentIntelligencePage,
  DecisionLabel,
  FaqItem,
  ReplacementDifficulty,
  ReplacementVerdict,
  RiskAnalysisItem,
} from '@/types/seo-intelligence'

function stringField(source: Record<string, unknown> | undefined, key: string): string {
  const value = source?.[key]
  return typeof value === 'string' ? value.trim() : ''
}

function manufacturerFromComponent(component: Record<string, unknown>): { name: string; slug: string } {
  const mfg = component.manufacturer_info
  if (mfg && typeof mfg === 'object' && !Array.isArray(mfg)) {
    const info = mfg as Record<string, unknown>
    const name = stringField(info, 'name_en') || stringField(info, 'name') || 'Manufacturer'
    const slug = stringField(info, 'slug') || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return { name, slug }
  }
  return { name: 'Manufacturer', slug: '' }
}

function mapQaBlocks(blocks?: Array<Record<string, unknown>>): FaqItem[] {
  if (!blocks?.length) return []
  return blocks
    .map((block) => ({
      question: stringField(block, 'question'),
      answer: stringField(block, 'answer'),
    }))
    .filter((item) => item.question && item.answer)
}

function mapBreadcrumbs(links: PublicSeoPage['links']): BreadcrumbItem[] {
  return normalizeBreadcrumbItems(links.breadcrumbs ?? [])
}

function mapApplications(raw: PublicSeoPage['content']['applications']): {
  goodFit: ApplicationTagInput[]
  notRecommended: string[]
} {
  const goodFit = Array.isArray(raw?.goodFit)
    ? raw.goodFit.filter((item): item is ApplicationTagInput => {
        if (typeof item === 'string') return Boolean(item.trim())
        return Boolean(item && typeof item === 'object' && typeof item.label === 'string' && item.label.trim())
      })
    : []
  const notRecommended = Array.isArray(raw?.notRecommended)
    ? raw.notRecommended.filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
    : []
  return { goodFit, notRecommended }
}

function mapCommonPitfalls(raw?: Array<{ title?: string; detail?: string }>): CommonPitfall[] {
  if (!raw?.length) return []
  return raw
    .map((item) => ({
      title: stringField(item as Record<string, unknown>, 'title'),
      detail: stringField(item as Record<string, unknown>, 'detail'),
    }))
    .filter((item) => item.title && item.detail)
}

function mapCompliance(component: Record<string, unknown>) {
  const rohs = stringField(component, 'rohs')
  const reach = stringField(component, 'reach')
  const msl = stringField(component, 'msl')
  const eccn = stringField(component, 'eccn')
  const htsus = stringField(component, 'htsus')
  if (!rohs && !reach && !msl && !eccn && !htsus) return undefined
  return { rohs: rohs || undefined, reach: reach || undefined, msl: msl || undefined, eccn: eccn || undefined, htsus: htsus || undefined }
}

function mapMechanical(component: Record<string, unknown>) {
  const pinCount = component.pin_count
  const pinPitchMm = component.pin_pitch_mm
  const pinType = stringField(component, 'pin_type')
  const lengthMm = component.length
  const widthMm = component.width
  const heightMm = component.height
  if (
    pinCount == null &&
    pinPitchMm == null &&
    !pinType &&
    lengthMm == null &&
    widthMm == null &&
    heightMm == null
  ) {
    return undefined
  }
  return {
    pinCount: typeof pinCount === 'number' ? pinCount : undefined,
    pinPitchMm: typeof pinPitchMm === 'number' ? pinPitchMm : undefined,
    pinType: pinType || undefined,
    lengthMm: typeof lengthMm === 'number' ? lengthMm : undefined,
    widthMm: typeof widthMm === 'number' ? widthMm : undefined,
    heightMm: typeof heightMm === 'number' ? heightMm : undefined,
  }
}

function mapSubstituteRows(raw?: Array<Record<string, unknown>>): AlternativeItem[] {
  if (!raw?.length) return []
  const items: AlternativeItem[] = []
  for (const row of raw) {
    const mpn = stringField(row, 'mpn') || stringField(row, 'candidate_code')
    if (!mpn) continue
    const manufacturer = stringField(row, 'manufacturer') || 'Manufacturer'
    const matchType = (stringField(row, 'matchType') || 'functional') as DecisionLabel
    const matchLabel = stringField(row, 'matchLabel') || undefined
    const displayLabel = stringField(row, 'displayLabel') || undefined
    const publishTier = stringField(row, 'publishTier') || undefined
    const pdfCheckStatus = stringField(row, 'pdfCheckStatus') || undefined
    const reason = stringField(row, 'reason') || stringField(row, 'displayLabel')
    const href = stringField(row, 'href') || `/parts/${mpn.toLowerCase()}`
    const compareHref = stringField(row, 'compareHref') || undefined
    const riskLevel = (stringField(row, 'riskLevel') || 'medium') as ReplacementDifficulty
    items.push({
      mpn,
      manufacturer,
      matchType,
      matchLabel,
      displayLabel,
      publishTier,
      pdfCheckStatus,
      reason,
      riskLevel,
      href,
      compareHref,
    })
  }
  return items
}

function countSubstituteTypes(items: AlternativeItem[]) {
  let dropInCount = 0
  let functionalCount = 0
  let alternateCount = 0
  for (const item of items) {
    if (item.matchType === 'pin-compatible' || item.matchType === 'exact') dropInCount += 1
    else if (item.matchType === 'functional') functionalCount += 1
    else alternateCount += 1
  }
  return { dropInCount, functionalCount, alternateCount }
}

function mapDatasheetUrls(component: Record<string, unknown>): string[] {
  const raw = component.datasheet_urls
  if (Array.isArray(raw)) {
    return raw.filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
  }
  const single = stringField(component, 'datasheet_urls')
  return single ? [single] : []
}

function mapImageUrls(component: Record<string, unknown>): string[] {
  const raw = component.img_urls
  if (Array.isArray(raw)) {
    return raw.filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
  }
  const single = stringField(component, 'img_urls')
  if (!single) return []
  return single
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function mapPublicSeoPageToComponentPage(
  apiPage: PublicSeoPage,
  locale: AppLocale,
): ComponentIntelligencePage {
  const component = apiPage.component ?? {}
  const code = stringField(component, 'code') || apiPage.slug
  const { name: manufacturer, slug: manufacturerSlug } = manufacturerFromComponent(component)
  const categoryLabel = stringField(component, 'category_str') || stringField(component, 'category') || 'Component'
  const categorySlug = apiPage.links.category?.href?.split('/').filter(Boolean)[1] ?? 'components'
  const packageName = stringField(component, 'package')
  const summary = apiPage.content.shortAnswerText || stringField(component, 'summary') || apiPage.description
  const qa = mapQaBlocks(apiPage.content.qaBlocks)
  const substituteItems = mapSubstituteRows(apiPage.content.substitutes)
  const substituteCounts = countSubstituteTypes(substituteItems)
  const meta = componentSeoMetaSync({
    mpn: code,
    manufacturer,
    category: categoryLabel,
    slug: apiPage.slug,
  })

  meta.title = apiPage.title || meta.title
  meta.description = apiPage.description || meta.description
  meta.canonicalPath = apiPage.canonicalPath || meta.canonicalPath
  if (apiPage.robots) {
    meta.robots = apiPage.robots
  }

  const aiVerdictRaw = apiPage.content.aiVerdict ?? {}
  const bestFor = Array.isArray(aiVerdictRaw.bestFor)
    ? aiVerdictRaw.bestFor.filter((item): item is string => typeof item === 'string')
    : [`Designs evaluating ${code}`]
  const avoidIf = Array.isArray(aiVerdictRaw.avoidIf)
    ? aiVerdictRaw.avoidIf.filter((item): item is string => typeof item === 'string')
    : ['You need verified substitute data before locking the BOM']
  const checkBeforeUse = Array.isArray(aiVerdictRaw.checkBeforeUse)
    ? aiVerdictRaw.checkBeforeUse.filter((item): item is string => typeof item === 'string')
    : ['Package', 'Key specs', 'Lifecycle', 'Authorized supply']
  const bomSourcingRaw = apiPage.content.bomSourcing ?? {}
  const bomBullets = Array.isArray(bomSourcingRaw.bullets)
    ? bomSourcingRaw.bullets.filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
    : []
  const lifecycleStatus = stringField(apiPage.content.signals as Record<string, unknown> | undefined, 'lifecycleStatus')
  const datasheetUrls = mapDatasheetUrls(component)
  const imgUrls = mapImageUrls(component)
  const enriched = !apiPage.content.degraded

  return {
    pageType: 'component',
    slug: apiPage.slug,
    mpn: code,
    manufacturer,
    manufacturerSlug,
    category: categoryLabel,
    categoryLabel,
    categorySlug,
    package: packageName,
    overviewTags:
      apiPage.content.overviewTags?.length
        ? apiPage.content.overviewTags
        : buildOverviewTagsFromEsComponent(component),
    meta,
    subtitle: {
      manufacturer,
      manufacturerHref: apiPage.links.manufacturer?.href,
      category: categoryLabel,
      categoryHref: apiPage.links.category?.href,
      package: packageName,
    },
    breadcrumbs: mapBreadcrumbs(apiPage.links),
    shortAnswer: summary,
    aiVerdict: {
      bestFor,
      avoidIf,
      checkBeforeUse,
      replacementDifficulty:
        aiVerdictRaw.replacementDifficulty === 'low' ||
        aiVerdictRaw.replacementDifficulty === 'high'
          ? aiVerdictRaw.replacementDifficulty
          : 'medium',
      sourcingRisk:
        aiVerdictRaw.sourcingRisk === 'low' || aiVerdictRaw.sourcingRisk === 'high'
          ? aiVerdictRaw.sourcingRisk
          : 'medium',
    },
    keySpecs: (apiPage.content.keySpecs ?? []).map((row) => ({
      label: row.label,
      value: row.value,
    })),
    applications: mapApplications(apiPage.content.applications),
    designConsiderations: apiPage.content.designConsiderations ?? [],
    commonPitfalls: mapCommonPitfalls(apiPage.content.commonPitfalls),
    alternatives: substituteItems,
    compareLinks: (apiPage.links.compare ?? []).map((link) => ({
      label: link.label,
      href: link.href,
    })),
    bomSourcing: {
      lifecycle:
        stringField(bomSourcingRaw as Record<string, unknown>, 'lifecycle') ||
        lifecycleStatus ||
        stringField(component, 'lifecycle') ||
        'Review lifecycle status before production.',
      supplyRisk:
        stringField(bomSourcingRaw as Record<string, unknown>, 'supplyRisk') ||
        'Confirm authorized supply channels for your region.',
      replacementReadiness:
        stringField(bomSourcingRaw as Record<string, unknown>, 'replacementReadiness') ||
        (apiPage.content.degraded
          ? 'Alternatives are being enriched in PartGenie.'
          : 'Review substitute options in PartGenie.'),
      bullets: bomBullets,
    },
    decisionMatrix: [],
    faq: qa,
    relatedAnswers: (apiPage.links.answers ?? []).map((link) => ({
      label: link.label,
      href: link.href,
    })),
    relatedCategory: apiPage.links.category
      ? { label: apiPage.links.category.label, href: apiPage.links.category.href }
      : { label: categoryLabel, href: `/categories/${categorySlug}` },
    relatedManufacturer: apiPage.links.manufacturer
      ? { label: apiPage.links.manufacturer.label, href: apiPage.links.manufacturer.href }
      : manufacturerSlug
        ? { label: `${manufacturer} component intelligence`, href: `/manufacturers/${manufacturerSlug}` }
        : { label: manufacturer, href: '/manufacturers' },
    identity: {
      codeNorm: code,
      codeYuanqi: stringField(component, 'code_yuanqi') || code,
      manufacturerNorm: manufacturer,
      identityKey: `${code}|${manufacturerSlug || manufacturer}`,
    },
    compliance: mapCompliance(component),
    mechanical: mapMechanical(component),
    sourceQuality: {
      datasheetStatus: datasheetUrls.length ? 'matched' : 'missing',
      datasheetTextQuality: enriched ? 'good' : 'unavailable',
      enrichmentVersion: enriched ? 'tier-a-basic-v2' : '2a-degraded',
      usedSources: enriched ? ['es', 'content_json'] : ['es'],
      requiresHumanReview: apiPage.content.degraded,
    },
    media: {
      datasheetUrls,
      imgUrls,
    },
    substituteSummary: {
      dropInCount: substituteCounts.dropInCount,
      functionalCount: substituteCounts.functionalCount,
      alternateCount: substituteCounts.alternateCount,
      requiresValidation: apiPage.content.degraded || substituteItems.length === 0,
    },
  }
}

export function mapPublicSeoPageToAlternativePage(
  apiPage: PublicSeoPage,
  locale: AppLocale,
): AlternativeIntelligencePage {
  const component = apiPage.component ?? {}
  const signals = apiPage.content.signals ?? {}
  const code = stringField(component, 'code') || stringField(signals as Record<string, unknown>, 'targetEntityKey').split('|')[0] || apiPage.slug.toUpperCase()
  const { name: manufacturer } = manufacturerFromComponent(component)
  const categoryLabel = stringField(component, 'category_str') || stringField(component, 'category') || 'Component'
  const packageName = stringField(component, 'package')
  const substitutes = mapSubstituteRows(apiPage.content.substitutes)
  const insight = apiPage.content.aiReplacementInsight ?? {}
  const verdictRaw = apiPage.content.replacementVerdict ?? {}
  const replacementVerdict: ReplacementVerdict = {
    canReplaceDirectly: Boolean(verdictRaw.canReplaceDirectly),
    directReplacementAnswer:
      stringField(verdictRaw as Record<string, unknown>, 'directReplacementAnswer') ||
      stringField(insight as Record<string, unknown>, 'direct_replacement_answer') ||
      'Treat substitution as an engineering review, not a simple MPN swap.',
    bestReplacementType:
      stringField(verdictRaw as Record<string, unknown>, 'bestReplacementType') ||
      stringField(insight as Record<string, unknown>, 'best_replacement_path') ||
      'Review ranked alternatives before substitution.',
    mainRisk:
      stringField(verdictRaw as Record<string, unknown>, 'mainRisk') ||
      stringField(insight as Record<string, unknown>, 'main_risk') ||
      'Validate package, pinout, and key electrical limits before substitution.',
    summary:
      stringField(verdictRaw as Record<string, unknown>, 'summary') ||
      apiPage.content.heroSummary ||
      apiPage.content.shortAnswerText ||
      '',
  }
  const metaBase = alternativeSeoMetaSync({
    mpn: code,
    manufacturer,
    category: categoryLabel,
    slug: apiPage.slug,
  })
  const meta = {
    ...metaBase,
    title: apiPage.title || metaBase.title,
    description: apiPage.description || metaBase.description,
    canonicalPath: apiPage.canonicalPath || metaBase.canonicalPath,
    robots: apiPage.robots || metaBase.robots,
  }
  const originalPartSlug = stringField(signals as Record<string, unknown>, 'originalPartSlug') || apiPage.slug
  const riskAnalysis: RiskAnalysisItem[] = (apiPage.content.riskAnalysis ?? []).map((row) => ({
    category: stringField(row, 'category') || 'Risk',
    level: (stringField(row, 'level') || 'medium') as ReplacementDifficulty,
    detail: stringField(row, 'detail'),
  }))
  const compatibilityMatrix = (apiPage.content.compatibilityMatrix ?? []).map((row) => ({
    factor: stringField(row, 'factor'),
    original: stringField(row, 'original'),
    topAlternative: stringField(row, 'topAlternative'),
    notes: stringField(row, 'notes') || undefined,
  }))
  const featureComparison = (apiPage.content.featureComparison ?? []).map((row) => ({
    feature: stringField(row, 'feature'),
    original: stringField(row, 'original'),
    alt1: stringField(row, 'alt1'),
    alt2: stringField(row, 'alt2'),
    alt3: stringField(row, 'alt3'),
  }))
  const headers = apiPage.content.featureComparisonHeaders ?? {}
  const top = substitutes.slice(0, 4)
  return {
    pageType: 'alternative',
    slug: apiPage.slug,
    mpn: code,
    manufacturer,
    category: categoryLabel,
    overviewTags: buildOverviewTagsFromEsComponent(component),
    subtitle: {
      manufacturer,
      category: categoryLabel,
      package: packageName,
    },
    meta,
    breadcrumbs: mapBreadcrumbs(apiPage.links),
    shortAnswer: apiPage.content.shortAnswerText || apiPage.content.heroSummary || apiPage.description,
    replacementVerdict,
    alternatives: substitutes,
    compatibilityMatrix,
    riskAnalysis,
    featureComparison,
    featureComparisonHeaders: {
      original: headers.original || code,
      alt1: headers.alt1 || top[0]?.mpn || 'Alt 1',
      alt2: headers.alt2 || top[1]?.mpn || 'Alt 2',
      alt3: headers.alt3 || top[2]?.mpn || 'Alt 3',
    },
    applicationFit: (apiPage.content.applicationFit ?? []).map((row) => ({
      scenario: stringField(row, 'scenario'),
      guidance: stringField(row, 'guidance'),
    })),
    regionalNotes: apiPage.content.regionalNotes ?? [],
    compareLinks: (apiPage.content.compareLinks ?? apiPage.links.compare ?? []).map((link) => ({
      label: link.label,
      href: link.href,
    })),
    faq: mapQaBlocks(apiPage.content.qaBlocks),
    originalPartHref: `/parts/${originalPartSlug}`,
    categoryLink: apiPage.links.category
      ? { label: apiPage.links.category.label, href: apiPage.links.category.href }
      : { label: categoryLabel, href: '/categories' },
  }
}

export function productJsonLdFromPublicPage(apiPage: PublicSeoPage): ProductJsonLdInput {
  const component = apiPage.component ?? {}
  const code = stringField(component, 'code') || apiPage.slug
  const { name: manufacturer } = manufacturerFromComponent(component)
  const category = stringField(component, 'category_str') || stringField(component, 'category')
  const image = resolvePartImageUrl(code, mapImageUrls(component))

  return {
    name: code,
    mpn: code,
    brandName: manufacturer,
    description: apiPage.description || stringField(component, 'summary') || apiPage.title,
    canonicalPath: apiPage.canonicalPath || `/parts/${apiPage.slug}`,
    image,
    category: category || undefined,
  }
}

export function mapPublicSeoPageToManufacturerPage(
  apiPage: PublicSeoPage,
  _locale: AppLocale,
): import('@/types/seo-intelligence').ManufacturerIntelligencePage {
  const hubPage = apiPage.hubPage as import('@/types/seo-intelligence').ManufacturerIntelligencePage
  if (!hubPage) {
    throw new Error(`Missing hubPage for manufacturer slug ${apiPage.slug}`)
  }

  const hubMeta = hubPage.meta ?? {
    title: apiPage.title,
    description: apiPage.description,
    canonicalPath: apiPage.canonicalPath || `/manufacturers/${apiPage.slug}`,
    robots: apiPage.robots,
    h1: apiPage.title,
  }

  const meta = {
    ...hubMeta,
    title: apiPage.title || hubMeta.title,
    description: apiPage.description || hubMeta.description,
    canonicalPath: apiPage.canonicalPath || hubMeta.canonicalPath,
    robots: apiPage.robots || hubMeta.robots,
  }

  const breadcrumbs = normalizeBreadcrumbItems(
    Array.isArray(hubPage.breadcrumbs) && hubPage.breadcrumbs.length > 0
      ? hubPage.breadcrumbs
      : mapBreadcrumbs(apiPage.links),
  )

  const faqItems = Array.isArray(hubPage.faq) ? hubPage.faq : []

  return {
    ...hubPage,
    meta,
    breadcrumbs,
    shortAnswer: hubPage.shortAnswer || apiPage.content.shortAnswerText || '',
    faq:
      faqItems.length > 0
        ? faqItems
        : mapQaBlocks(apiPage.content.qaBlocks),
  }
}
