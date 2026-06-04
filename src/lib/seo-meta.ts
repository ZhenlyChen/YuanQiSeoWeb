import type { Metadata } from 'next'
import type { SeoMeta } from '@/types/seo-intelligence'
import { SEO_DEFAULT_OG_IMAGE, SEO_SITE_ORIGIN } from '@/lib/site'

export function buildPageMetadata(meta: SeoMeta): Metadata {
  const canonical = `${SEO_SITE_ORIGIN}${meta.canonicalPath}`
  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
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
}

/** Component intelligence — not datasheet/price catalog titles */
export function componentSeoMeta(input: {
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

export function alternativeSeoMeta(input: {
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

export function compareSeoMeta(input: {
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

export function manufacturerSeoMeta(input: {
  name: string
  slug: string
}): SeoMeta {
  const { name, slug } = input
  return {
    title: `${name} Components, Alternatives & Market Analysis | PartGenie`,
    description: `Explore ${name} components, popular product families, comparable manufacturers, replacement options, applications, and sourcing considerations — curated intelligence, not a full catalog.`,
    h1: `${name} Component Intelligence`,
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

export function answerSeoMeta(input: {
  useCase: string
  category: string
  slug: string
}): SeoMeta {
  const { useCase, category, slug } = input
  const titleCase = useCase.charAt(0).toUpperCase() + useCase.slice(1)
  return {
    title: `Best ${category} for ${titleCase}: Selection Guide | PartGenie`,
    description: `Compare ${category} options for ${useCase} by performance, power, interfaces, package, ecosystem, sourcing availability, and design tradeoffs. Curated part recommendations for engineers.`,
    h1: `Best ${category} for ${titleCase}`,
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

export function categoryFinderSeoMeta(input: {
  categoryLabel: string
  slug: string
}): SeoMeta {
  const { categoryLabel, slug } = input
  return {
    title: `${categoryLabel} Component Finder & Selection Guide | PartGenie`,
    description: `Find curated ${categoryLabel.toLowerCase()} options with engineering-oriented filters, replacement guidance, and related intelligence pages. Built for fast BOM decision-making.`,
    h1: `${categoryLabel} Component Finder`,
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
