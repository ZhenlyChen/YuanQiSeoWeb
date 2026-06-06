import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { AppLocale } from '@/i18n/routing'
import { buildHreflangAlternates, localizePath, openGraphAlternateLocale, openGraphLocale } from '@/lib/localized-path'
import type { SeoMeta } from '@/types/seo-intelligence'
import { SEO_DEFAULT_OG_IMAGE, SEO_SITE_ORIGIN } from '@/lib/site'

export function buildPageMetadata(meta: SeoMeta, locale: AppLocale = 'en'): Metadata {
  const localizedPath = localizePath(meta.canonicalPath, locale)
  const canonical = `${SEO_SITE_ORIGIN}${localizedPath}`

  const metadata: Metadata = {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: buildHreflangAlternates(meta.canonicalPath),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      locale: openGraphLocale(locale),
      alternateLocale: [openGraphAlternateLocale(locale)],
      title: meta.title,
      description: meta.description,
      images: [{ url: SEO_DEFAULT_OG_IMAGE, alt: meta.h1SecondLine ? `${meta.h1} ${meta.h1SecondLine}` : meta.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [SEO_DEFAULT_OG_IMAGE],
    },
  }

  if (meta.robots) {
    metadata.robots = parseRobots(meta.robots)
  }

  return metadata
}

function parseRobots(value: string): Metadata['robots'] {
  const normalized = value.toLowerCase()
  return {
    index: !normalized.includes('noindex'),
    follow: !normalized.includes('nofollow'),
  }
}

export function buildPageMetadataFromApi(input: {
  title: string
  description: string
  canonicalPath: string
  slug: string
  robots?: string
  locale?: AppLocale
}): Metadata {
  const locale = input.locale ?? 'en'
  return buildPageMetadata(
    {
      title: input.title,
      description: input.description,
      h1: input.title,
      canonicalPath: input.canonicalPath || `/parts/${input.slug}`,
      keywords: [input.slug, input.title],
      robots: input.robots,
    },
    locale,
  )
}

/** Component intelligence — not datasheet/price catalog titles */
export async function componentSeoMeta(input: {
  mpn: string
  manufacturer: string
  category: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { mpn, manufacturer, category, slug } = input
  return {
    title: t('component.title', { mpn }),
    description: t('component.description', { mpn, manufacturer }),
    h1: t('component.h1', { mpn }),
    h1SecondLine: t('component.h1SecondLine'),
    canonicalPath: `/parts/${slug}`,
    keywords: [
      mpn,
      `${mpn} alternatives`,
      `${mpn} replacement`,
      `${mpn} specs`,
      `${mpn} cross reference`,
      `${mpn} AI analysis`,
      manufacturer,
      category,
      'AI component analysis',
      'component intelligence',
      'pin-compatible replacement',
      'BOM analysis',
    ],
  }
}

export async function alternativeSeoMeta(input: {
  mpn: string
  manufacturer: string
  category: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { mpn, manufacturer, category, slug } = input
  return {
    title: t('alternative.title', { mpn }),
    description: t('alternative.description', { mpn, manufacturer, category }),
    h1: t('alternative.h1', { mpn }),
    canonicalPath: `/alternatives/${slug}`,
    keywords: [
      `${mpn} alternative`,
      `${mpn} replacement`,
      `${mpn} cross reference`,
      `${mpn} pin compatible`,
      `${mpn} equivalent`,
      manufacturer,
      category,
      'replacement risk',
      'functional alternative',
    ],
  }
}

export async function compareSeoMeta(input: {
  mpnA: string
  mpnB: string
  mfgA: string
  mfgB: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { mpnA, mpnB, mfgA, mfgB, slug } = input
  return {
    title: t('compare.title', { mpnA, mpnB }),
    description: t('compare.description', { mpnA, mpnB, mfgA, mfgB }),
    h1: t('compare.h1', { mpnA, mpnB }),
    canonicalPath: `/compare/${slug}`,
    keywords: [
      `${mpnA} vs ${mpnB}`,
      `${mpnA} ${mpnB} comparison`,
      `${mpnA} pin compatible`,
      `${mpnB} replacement`,
      'component comparison',
      'replacement guide',
      mfgA,
      mfgB,
    ],
  }
}

export async function manufacturerSeoMeta(input: {
  name: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { name, slug } = input
  return {
    title: t('manufacturer.title', { name }),
    description: t('manufacturer.description', { name }),
    h1: t('manufacturer.h1', { name }),
    canonicalPath: `/manufacturers/${slug}`,
    keywords: [
      name,
      `${name} components`,
      `${name} alternatives`,
      'manufacturer intelligence',
      'product families',
      'supply chain',
      'cross reference',
    ],
  }
}

export async function answerSeoMeta(input: {
  useCase: string
  category: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { useCase, category, slug } = input
  const titleCase = useCase.charAt(0).toUpperCase() + useCase.slice(1)
  return {
    title: t('answer.title', { category, useCase: titleCase }),
    description: t('answer.description', { category, useCase }),
    h1: t('answer.h1', { category, useCase: titleCase }),
    canonicalPath: `/answers/${slug}`,
    keywords: [
      `best ${category} for ${useCase}`,
      `${category} selection guide`,
      `${useCase} ${category}`,
      'component selection',
      'engineering guide',
      'BOM recommendations',
    ],
  }
}

export async function categoryFinderSeoMeta(input: {
  categoryLabel: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { categoryLabel, slug } = input
  return {
    title: t('categoryFinder.title', { categoryLabel }),
    description: t('categoryFinder.description', { categoryLabel }),
    h1: t('categoryFinder.h1', { categoryLabel }),
    canonicalPath: `/categories/${slug}/finder`,
    keywords: [
      `${categoryLabel} finder`,
      `${categoryLabel} component selection`,
      `${categoryLabel} alternatives`,
      `${categoryLabel} BOM`,
      'component finder',
      'engineering selection guide',
    ],
  }
}

export async function manufacturerDirectorySeoMeta(): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  return {
    title: t('manufacturerDirectory.title'),
    description: t('manufacturerDirectory.description'),
    h1: t('manufacturerDirectory.h1'),
    canonicalPath: '/manufacturers',
    keywords: [
      'electronics manufacturers',
      'semiconductor manufacturers',
      'component manufacturer directory',
      'manufacturer intelligence',
      'alternatives',
      'supply chain',
    ],
  }
}

export async function manufacturerDirectoryCategorySeoMeta(input: {
  categoryLabel: string
  slug: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const { categoryLabel, slug } = input
  return {
    title: t('manufacturerDirectoryCategory.title', { category: categoryLabel }),
    description: t('manufacturerDirectoryCategory.description', { category: categoryLabel }),
    h1: t('manufacturerDirectoryCategory.h1', { category: categoryLabel }),
    canonicalPath: `/manufacturers/category/${slug}`,
    keywords: [
      `${categoryLabel} manufacturers`,
      `${categoryLabel} semiconductor suppliers`,
      'manufacturer directory',
      'component intelligence',
    ],
  }
}

export async function manufacturerDirectoryLetterSeoMeta(input: {
  letter: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const display = input.letter === '0-9' || input.letter === '#' ? '0–9' : input.letter.toUpperCase()
  return {
    title: t('manufacturerDirectoryLetter.title', { letter: display }),
    description: t('manufacturerDirectoryLetter.description', { letter: display }),
    h1: t('manufacturerDirectoryLetter.h1', { letter: display }),
    canonicalPath: `/manufacturers/letter/${encodeURIComponent(input.letter === '#' ? '0-9' : input.letter.toLowerCase())}`,
    keywords: [
      `manufacturers ${display}`,
      'manufacturer directory',
      'semiconductor suppliers',
      'component intelligence',
    ],
  }
}

/** English-only sync helpers for mock fixtures and dev previews. */
export function componentSeoMetaSync(input: {
  mpn: string
  manufacturer: string
  category: string
  slug: string
}): SeoMeta {
  const { mpn, manufacturer, category, slug } = input
  return {
    title: `${mpn} AI Component Analysis: Specs, Uses, Alternatives & Risks | PartGenie`,
    description: `AI-powered review of ${mpn} specs, applications, design considerations, replacement risks, and alternative components from ${manufacturer}. Compare pin-compatible options and analyze ${mpn} in your BOM with PartGenie.`,
    h1: `${mpn} AI Analysis:`,
    h1SecondLine: 'Specs, Applications & Alternatives',
    canonicalPath: `/parts/${slug}`,
    keywords: [mpn, manufacturer, category],
  }
}

export function alternativeSeoMetaSync(input: {
  mpn: string
  manufacturer: string
  category: string
  slug: string
}): SeoMeta {
  const { mpn, manufacturer, category, slug } = input
  return {
    title: `Best ${mpn} Alternatives & Cross References | PartGenie`,
    description: `Find ${mpn} alternatives, pin-compatible replacements, and functional equivalents from ${manufacturer}. Compare package risks, application fit, and sourcing options for ${category} designs.`,
    h1: `Best Alternatives to ${mpn}`,
    canonicalPath: `/alternatives/${slug}`,
    keywords: [`${mpn} alternative`, manufacturer, category],
  }
}

export function compareSeoMetaSync(input: {
  mpnA: string
  mpnB: string
  mfgA: string
  mfgB: string
  slug: string
}): SeoMeta {
  const { mpnA, mpnB, mfgA, mfgB, slug } = input
  return {
    title: `${mpnA} vs ${mpnB}: Specs, Differences & Replacement Guide | PartGenie`,
    description: `Compare ${mpnA} (${mfgA}) and ${mpnB} (${mfgB}) by specifications, package, pin compatibility, applications, sourcing risk, and drop-in replacement suitability.`,
    h1: `${mpnA} vs ${mpnB}`,
    canonicalPath: `/compare/${slug}`,
    keywords: [`${mpnA} vs ${mpnB}`, mfgA, mfgB],
  }
}

export function manufacturerSeoMetaSync(input: { name: string; slug: string }): SeoMeta {
  const { name, slug } = input
  return {
    title: `${name} Components, Alternatives & Market Analysis | PartGenie`,
    description: `Explore ${name} components, popular product families, comparable manufacturers, replacement options, applications, and sourcing considerations — curated intelligence, not a full catalog.`,
    h1: `${name} Component Intelligence`,
    canonicalPath: `/manufacturers/${slug}`,
    keywords: [name, `${name} components`],
  }
}

export function answerSeoMetaSync(input: { useCase: string; category: string; slug: string }): SeoMeta {
  const { useCase, category, slug } = input
  const titleCase = useCase.charAt(0).toUpperCase() + useCase.slice(1)
  return {
    title: `Best ${category} for ${titleCase}: Selection Guide | PartGenie`,
    description: `Compare ${category} options for ${useCase} by performance, power, interfaces, package, ecosystem, sourcing availability, and design tradeoffs.`,
    h1: `Best ${category} for ${titleCase}`,
    canonicalPath: `/answers/${slug}`,
    keywords: [`best ${category} for ${useCase}`],
  }
}

export function manufacturerDirectorySeoMetaSync(): SeoMeta {
  return {
    title: 'Electronic Component Manufacturers Directory | PartGenie',
    description:
      'Electronic component manufacturers indexed by category and name — with PartGenie intelligence for alternatives, supply context, and BOM analysis.',
    h1: 'Manufacturer Directory',
    canonicalPath: '/manufacturers',
    keywords: ['electronics manufacturers', 'manufacturer directory'],
  }
}

export async function categoryDirectorySeoMeta(): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  return {
    title: t('categoryDirectory.title'),
    description: t('categoryDirectory.description'),
    h1: t('categoryDirectory.h1'),
    canonicalPath: '/categories',
    keywords: [
      'component categories',
      'electronics taxonomy',
      'category intelligence',
      'selection guide',
      'alternatives hub',
    ],
  }
}

export async function categoryHubSeoMeta(input: {
  name: string
  l1Slug: string
  l2Slug?: string
}): Promise<SeoMeta> {
  const t = await getTranslations('seoMeta')
  const canonicalPath = input.l2Slug
    ? `/categories/${input.l1Slug}/${input.l2Slug}`
    : `/categories/${input.l1Slug}`

  if (input.l2Slug) {
    return {
      title: t('categoryHub.l2.title', { categoryName: input.name }),
      description: t('categoryHub.l2.description', { categoryName: input.name }),
      h1: t('categoryHub.l2.h1', { categoryName: input.name }),
      canonicalPath,
      keywords: [input.name, `${input.name} components`, `${input.name} alternatives`],
    }
  }

  return {
    title: t('categoryHub.l1.title', { categoryName: input.name }),
    description: t('categoryHub.l1.description', { categoryName: input.name }),
    h1: t('categoryHub.l1.h1', { categoryName: input.name }),
    canonicalPath,
    keywords: [input.name, `${input.name} components`, `${input.name} alternatives`],
  }
}

export function categoryDirectorySeoMetaSync(): SeoMeta {
  return {
    title: 'Component Category Directory | PartGenie',
    description:
      'Browse electronic component categories by name — selection guides, alternatives context, and intelligence hubs for engineers and sourcing teams.',
    h1: 'Component Category Directory',
    canonicalPath: '/categories',
    keywords: ['component categories', 'category directory'],
  }
}

export function categoryHubSeoMetaSync(input: {
  name: string
  l1Slug: string
  l2Slug?: string
}): SeoMeta {
  const canonicalPath = input.l2Slug
    ? `/categories/${input.l1Slug}/${input.l2Slug}`
    : `/categories/${input.l1Slug}`
  const description = input.l2Slug
    ? `Explore ${input.name} components, selection factors, popular parts, alternatives, design risks, and sourcing considerations with PartGenie.`
    : `Explore ${input.name} components, key selection factors, popular parts, alternatives, design risks, and sourcing considerations with PartGenie intelligence.`

  return {
    title: `${input.name} Components, Alternatives & Selection Guide | PartGenie`,
    description: description.slice(0, 155),
    h1: `${input.name} Component Intelligence`,
    canonicalPath,
    keywords: [input.name, `${input.name} components`, `${input.name} alternatives`],
  }
}
