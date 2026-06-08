import type { AppLocale } from '@/i18n/routing'
import { normalizeBreadcrumbItems } from '@/lib/breadcrumb-items'
import { componentSeoMetaSync } from '@/lib/seo-meta'
import type { PublicSeoPage } from '@/lib/seo-api'
import type { ProductJsonLdInput } from '@/lib/json-ld'
import type {
  ApplicationTagInput,
  BreadcrumbItem,
  CommonPitfall,
  ComponentIntelligencePage,
  FaqItem,
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
  return single ? [single] : []
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
    overviewTags: apiPage.content.overviewTags,
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
    alternatives: [],
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
      dropInCount: 0,
      functionalCount: 0,
      alternateCount: apiPage.content.substitutes?.length ?? 0,
      requiresValidation: apiPage.content.degraded || apiPage.content.signals?.hasSubstitute !== false,
    },
  }
}

export function productJsonLdFromPublicPage(apiPage: PublicSeoPage): ProductJsonLdInput {
  const component = apiPage.component ?? {}
  const code = stringField(component, 'code') || apiPage.slug
  const { name: manufacturer } = manufacturerFromComponent(component)
  const category = stringField(component, 'category_str') || stringField(component, 'category')
  const image = stringField(component, 'img_urls') || undefined

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