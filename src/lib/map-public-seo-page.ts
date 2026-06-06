import type { AppLocale } from '@/i18n/routing'
import { componentSeoMetaSync } from '@/lib/seo-meta'
import type { PublicSeoPage } from '@/lib/seo-api'
import type { ProductJsonLdInput } from '@/lib/json-ld'
import type { BreadcrumbItem, ComponentIntelligencePage, FaqItem } from '@/types/seo-intelligence'

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
  return (links.breadcrumbs ?? []).map((item) => ({
    label: item.label ?? '',
    href: item.href,
  }))
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
    applications: { goodFit: [], notRecommended: [] },
    designConsiderations: [],
    commonPitfalls: [],
    alternatives: [],
    compareLinks: (apiPage.links.compare ?? []).map((link) => ({
      label: link.label,
      href: link.href,
    })),
    bomSourcing: {
      lifecycle: 'Review lifecycle status before production.',
      supplyRisk: 'Confirm authorized supply channels for your region.',
      replacementReadiness: apiPage.content.degraded
        ? 'Alternatives are being enriched in PartGenie.'
        : 'Review substitute options in PartGenie.',
      bullets: [],
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
    sourceQuality: {
      datasheetStatus: stringField(component, 'datasheet_urls') ? 'matched' : 'missing',
      datasheetTextQuality: 'unavailable',
      enrichmentVersion: apiPage.content.degraded ? '2a-degraded' : '2b',
      usedSources: ['es'],
      requiresHumanReview: apiPage.content.degraded,
    },
    media: {
      datasheetUrls: stringField(component, 'datasheet_urls')
        ? [stringField(component, 'datasheet_urls')]
        : [],
      imgUrls: stringField(component, 'img_urls') ? [stringField(component, 'img_urls')] : [],
    },
    substituteSummary: {
      dropInCount: 0,
      functionalCount: 0,
      alternateCount: apiPage.content.substitutes?.length ?? 0,
      requiresValidation: apiPage.content.degraded,
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