import type { ManufacturerIntelligencePage } from '@/types/seo-intelligence'
import { manufacturerSeoMetaSync } from '@/lib/seo-meta'

export function createMinimalManufacturerMock(input: {
  slug: string
  name: string
  shortName?: string
  subtitle: string
  shortAnswer: string
  categories: { label: string; partCount: number; categoryL1?: string; categoryL2?: string }[]
}): ManufacturerIntelligencePage {
  return {
    pageType: 'manufacturer',
    slug: input.slug,
    name: input.name,
    shortName: input.shortName,
    meta: manufacturerSeoMetaSync({ name: input.name, slug: input.slug }),
    breadcrumbs: [
      { label: 'Manufacturers', href: '/manufacturers' },
      { label: input.name },
    ],
    shortAnswer: input.shortAnswer,
    summary: `${input.name} intelligence hub — curated families and high-intent parts, not a full catalog.`,
    catalogCategories: input.categories,
    mostSearchedParts: [],
    popularAlternatives: [],
    comparableManufacturers: [],
    supplyInsights: [],
    faq: [
      {
        question: `Is this a full ${input.name} catalog?`,
        answer: `No. This hub highlights curated ${input.name} families and decision-oriented intelligence. Use PartGenie for deeper BOM and alternative analysis.`,
      },
    ],
  }
}
