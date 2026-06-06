import type { SeoMeta } from '@/types/seo-intelligence'

export function categoryDirectorySeoMetaSync(): SeoMeta {
  return {
    title: 'Component Category Directory | PartGenie',
    description:
      'Browse electronic component categories by name — selection guides, alternatives context, and intelligence hubs for engineers and sourcing teams.',
    h1: 'Component Category Directory',
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

export function categoryHubSeoMetaSync(input: {
  name: string
  l1Slug: string
  l2Slug?: string
  parentName?: string
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
    keywords: [
      input.name,
      `${input.name} components`,
      `${input.name} alternatives`,
      `${input.name} selection guide`,
      'component intelligence',
      'BOM health',
    ],
  }
}
