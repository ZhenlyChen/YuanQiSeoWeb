import { competitorCompareSeoMetaSync } from '@/lib/seo-meta'
import type { CompetitorComparePage } from '@/types/seo-intelligence'

type CompetitorDraft = Omit<CompetitorComparePage, 'pageType' | 'compareKind' | 'meta' | 'breadcrumbs'>

const sharedProofPoints = [
  { value: '22M+', label: 'verified components' },
  { value: '7,700+', label: 'manufacturers covered' },
  { value: 'AI', label: 'search, datasheet, BOM' },
]

function makePage(page: CompetitorDraft): CompetitorComparePage {
  return {
    ...page,
    pageType: 'compare',
    compareKind: 'competitor',
    meta: competitorCompareSeoMetaSync({
      competitor: page.competitor.name,
      slug: page.slug,
      title: `${page.hero.title}: AI Component Search & BOM Workflow Comparison | PartGenie`,
      description: page.hero.subtitle,
    }),
    breadcrumbs: [
      { label: 'Compare' },
      { label: page.hero.title },
    ],
  }
}

export const competitorComparePages: CompetitorComparePage[] = [
  makePage({
    slug: 'partgenie-vs-octopart',
    compareSlug: 'vs-octopart',
    competitor: {
      name: 'Octopart',
      shortName: 'Octopart',
      category: 'price and inventory search',
    },
    hero: {
      eyebrow: 'AI component search vs catalog aggregation',
      title: 'PartGenie vs Octopart',
      subtitle:
        'PartGenie turns component research into an AI-assisted design and sourcing workflow, while Octopart is strongest when you already know the part number and need pricing or inventory context.',
      primaryCtaLabel: 'Try PartGenie in action',
      secondaryCtaLabel: 'Compare the workflow',
    },
    proofPoints: sharedProofPoints,
    shortAnswer:
      'Use Octopart when you need a familiar price and inventory lookup. Use PartGenie when the task starts with a design need, BOM risk, datasheet question, or replacement search that requires interpretation before sourcing.',
    comparisonRows: [
      {
        feature: 'Search understanding',
        partgenie: 'AI understands natural-language design intent and component constraints',
        competitor: 'Keyword and parameter matching for known parts',
        emphasis: 'partgenie',
      },
      {
        feature: 'Data foundation',
        partgenie: '22M+ verified components from 7,700+ manufacturers',
        competitor: 'Aggregated catalog, price, and inventory data',
        emphasis: 'neutral',
      },
      {
        feature: 'Primary workflow',
        partgenie: 'AI-powered design, sourcing, datasheet, and BOM support',
        competitor: 'Price and inventory aggregation',
        emphasis: 'partgenie',
      },
      {
        feature: 'BOM management',
        partgenie: 'BOM analysis, lifecycle risk review, and replacement suggestions',
        competitor: 'Cross-reference and sourcing context around part numbers',
        emphasis: 'partgenie',
      },
      {
        feature: 'Design assistance',
        partgenie: 'Datasheet Q&A, alternatives, tradeoff explanations, and next-step guidance',
        competitor: 'Part lists, distributor offers, and datasheet links',
        emphasis: 'partgenie',
      },
      {
        feature: 'Typical output',
        partgenie: 'A clearer component decision and BOM action plan',
        competitor: 'A list of part numbers, offers, and reference data',
        emphasis: 'partgenie',
      },
    ],
    gapSections: [
      {
        title: 'Passive data vs proactive review',
        summary:
          'A catalog result can tell you what exists. PartGenie helps explain what is risky, what may fit, and what should be checked before a BOM change.',
        bullets: [
          'Flags lifecycle and replacement concerns during BOM review',
          'Turns datasheet and search context into engineering next steps',
          'Keeps sourcing in the same flow as component selection',
        ],
      },
      {
        title: 'Search terms vs design intent',
        summary:
          'When a query starts as a design problem, PartGenie can reason over requirements instead of waiting for a perfect part number.',
        bullets: [
          'Supports natural-language component requirements',
          'Connects applications, specs, alternatives, and sourcing context',
          'Helps teams move from fuzzy ask to shortlist faster',
        ],
      },
      {
        title: 'Fragmented references vs actionable insight',
        summary:
          'PartGenie is built to reduce manual tab switching across datasheets, BOMs, alternatives, and supplier context.',
        bullets: [
          'Ask questions directly against datasheets',
          'Compare tradeoffs before approving a replacement',
          'Use BOM context to prioritize what needs validation',
        ],
      },
    ],
    workflowCards: [
      {
        title: 'Start with the requirement',
        body: 'Describe the component, application, constraints, or replacement problem in natural language.',
      },
      {
        title: 'Review an AI-built shortlist',
        body: 'Compare candidate parts, datasheet evidence, lifecycle risk, and sourcing context in one workflow.',
      },
      {
        title: 'Move into BOM action',
        body: 'Save, analyze, and revisit parts with alternatives and validation notes attached to the BOM decision.',
      },
    ],
    testimonials: [
      {
        quote: 'The BOM feature was the best.',
        name: 'JC Chan',
        role: 'Quality Engineering Manager',
      },
      {
        quote: 'PartGenie helps turn complex customer requirements into workable hardware directions faster.',
        name: 'Jeffery Tang',
        role: 'Senior Field Application Engineer',
      },
    ],
    relatedComparisons: [
      { label: 'PartGenie vs Findchips', href: '/partgenie-vs-findchips' },
      { label: 'PartGenie vs Alldatasheet', href: '/partgenie-vs-alldatasheet' },
    ],
    faq: [
      {
        question: 'Is PartGenie a replacement for Octopart?',
        answer:
          'PartGenie is best viewed as an AI workflow for component decisions, BOM review, datasheet questions, and alternatives. Octopart remains useful for price and inventory lookup when the part number is already known.',
      },
      {
        question: 'When should I use PartGenie instead of a catalog search?',
        answer:
          'Use PartGenie when you need to describe a design requirement, compare options, ask datasheet questions, find alternatives, or understand risk before changing a BOM.',
      },
      {
        question: 'Does PartGenie include sourcing context?',
        answer:
          'Yes. PartGenie connects component search with sourcing, lifecycle, alternatives, and BOM context so engineering and procurement can review the same decision.',
      },
    ],
    cta: {
      title: 'Ready to build with an AI component workflow?',
      body: 'Move from static lookup to component search, datasheet Q&A, alternatives, and BOM analysis in one place.',
      label: 'Get started for free',
    },
  }),
  makePage({
    slug: 'partgenie-vs-findchips',
    compareSlug: 'vs-findchips',
    competitor: {
      name: 'Findchips',
      shortName: 'Findchips',
      category: 'electronic parts search',
    },
    hero: {
      eyebrow: 'AI workflow vs part search',
      title: 'PartGenie vs Findchips',
      subtitle:
        'Findchips helps users look up electronic parts and supplier context. PartGenie adds AI search, datasheet Q&A, alternatives, and BOM reasoning for teams that need a decision workflow.',
      primaryCtaLabel: 'Try PartGenie in action',
      secondaryCtaLabel: 'Compare the workflow',
    },
    proofPoints: sharedProofPoints,
    shortAnswer:
      'Use Findchips for direct part lookup. Use PartGenie when the job requires interpreting requirements, checking alternatives, asking datasheet questions, or reviewing BOM risk.',
    comparisonRows: [
      {
        feature: 'Starting point',
        partgenie: 'Design intent, part number, image, datasheet, or BOM context',
        competitor: 'Known part number or keyword search',
        emphasis: 'partgenie',
      },
      {
        feature: 'Reasoning layer',
        partgenie: 'AI explains tradeoffs, risks, and next checks',
        competitor: 'Search results and supplier/reference links',
        emphasis: 'partgenie',
      },
      {
        feature: 'BOM support',
        partgenie: 'Analyze BOM rows and prioritize risky components',
        competitor: 'Useful input for sourcing research',
        emphasis: 'partgenie',
      },
      {
        feature: 'Alternatives',
        partgenie: 'Pin-compatible and functional replacement exploration',
        competitor: 'Part cross-reference oriented workflows',
        emphasis: 'partgenie',
      },
      {
        feature: 'Datasheet work',
        partgenie: 'Chat with datasheets and extract decision-relevant details',
        competitor: 'Datasheet discovery and reference access',
        emphasis: 'partgenie',
      },
    ],
    gapSections: [
      {
        title: 'Lookup vs decision support',
        summary:
          'Part lookup is only one step. PartGenie is designed for the full loop from requirement to validated shortlist.',
        bullets: [
          'Ask in natural language instead of perfecting search filters',
          'Compare candidates with application context',
          'Capture why a part or substitute is worth reviewing',
        ],
      },
      {
        title: 'Single part vs BOM context',
        summary:
          'PartGenie keeps the part decision connected to the BOM it affects.',
        bullets: [
          'Review lifecycle and replacement risk by BOM row',
          'Use alternatives to unblock sourcing issues',
          'Bring engineering and procurement context together',
        ],
      },
    ],
    workflowCards: [
      {
        title: 'Ask a component question',
        body: 'Search by requirement, part number, function, or application fit.',
      },
      {
        title: 'Validate with context',
        body: 'Review datasheet answers, alternatives, lifecycle risk, and sourcing considerations.',
      },
      {
        title: 'Keep the decision',
        body: 'Move the result into a BOM workflow instead of losing context across tabs.',
      },
    ],
    testimonials: [
      {
        quote: 'The BOM feature was the best.',
        name: 'JC Chan',
        role: 'Quality Engineering Manager',
      },
    ],
    relatedComparisons: [
      { label: 'PartGenie vs Octopart', href: '/partgenie-vs-octopart' },
      { label: 'PartGenie vs Alldatasheet', href: '/partgenie-vs-alldatasheet' },
    ],
    faq: [
      {
        question: 'Is PartGenie only a parts search engine?',
        answer:
          'No. PartGenie combines component search with datasheet Q&A, alternatives, BOM review, and sourcing context.',
      },
      {
        question: 'When is Findchips still useful?',
        answer:
          'Findchips can be useful for quick part lookup and supplier research. PartGenie is stronger when you need AI-assisted interpretation and decision support.',
      },
    ],
    cta: {
      title: 'Turn part lookup into an engineering workflow',
      body: 'Search, compare, ask datasheet questions, and review BOM risk with PartGenie.',
      label: 'Get started for free',
    },
  }),
  makePage({
    slug: 'partgenie-vs-alldatasheet',
    compareSlug: 'vs-alldatasheet',
    competitor: {
      name: 'Alldatasheet',
      shortName: 'Alldatasheet',
      category: 'datasheet search',
    },
    hero: {
      eyebrow: 'Datasheet search vs datasheet intelligence',
      title: 'PartGenie vs Alldatasheet',
      subtitle:
        'Alldatasheet is useful for finding datasheet documents. PartGenie helps engineers ask questions, compare parts, find alternatives, and connect datasheet details to BOM decisions.',
      primaryCtaLabel: 'Try PartGenie in action',
      secondaryCtaLabel: 'Compare the workflow',
    },
    proofPoints: sharedProofPoints,
    shortAnswer:
      'Use Alldatasheet when you need to locate a datasheet. Use PartGenie when you need to understand the datasheet, compare options, or turn the answer into a sourcing and BOM decision.',
    comparisonRows: [
      {
        feature: 'Primary job',
        partgenie: 'Answer component and datasheet questions with decision context',
        competitor: 'Find datasheet documents',
        emphasis: 'partgenie',
      },
      {
        feature: 'Search input',
        partgenie: 'Part number, requirement, image/file, datasheet, or BOM',
        competitor: 'Part number or keyword',
        emphasis: 'partgenie',
      },
      {
        feature: 'Datasheet handling',
        partgenie: 'Ask questions and extract relevant specs',
        competitor: 'Open and read the document manually',
        emphasis: 'partgenie',
      },
      {
        feature: 'Alternatives',
        partgenie: 'Explore functional and replacement candidates',
        competitor: 'Manual follow-up search',
        emphasis: 'partgenie',
      },
      {
        feature: 'BOM connection',
        partgenie: 'Use datasheet findings in BOM review and sourcing context',
        competitor: 'Document reference workflow',
        emphasis: 'partgenie',
      },
    ],
    gapSections: [
      {
        title: 'Finding a PDF is not the finish line',
        summary:
          'Teams still need to extract specs, compare candidates, and decide whether a part belongs in the BOM.',
        bullets: [
          'Ask direct questions against datasheet content',
          'Summarize specs and constraints for the decision at hand',
          'Carry findings into alternatives and BOM workflows',
        ],
      },
      {
        title: 'Datasheet reading vs component decisions',
        summary:
          'PartGenie helps transform datasheet facts into useful engineering and sourcing actions.',
        bullets: [
          'Compare specs and application fit',
          'Review replacement paths before approving a swap',
          'Keep sourcing context near the technical answer',
        ],
      },
    ],
    workflowCards: [
      {
        title: 'Upload or open a datasheet',
        body: 'Ask targeted questions instead of scanning long PDFs manually.',
      },
      {
        title: 'Compare what matters',
        body: 'Extract parameters, application notes, constraints, and tradeoffs for the actual design.',
      },
      {
        title: 'Act on the answer',
        body: 'Connect datasheet insights to alternatives, sourcing, and BOM review.',
      },
    ],
    testimonials: [
      {
        quote: 'PartGenie helps turn complex customer requirements into workable hardware directions faster.',
        name: 'Jeffery Tang',
        role: 'Senior Field Application Engineer',
      },
    ],
    relatedComparisons: [
      { label: 'PartGenie vs Octopart', href: '/partgenie-vs-octopart' },
      { label: 'PartGenie vs Findchips', href: '/partgenie-vs-findchips' },
    ],
    faq: [
      {
        question: 'Can PartGenie help after I find a datasheet?',
        answer:
          'Yes. PartGenie lets you ask datasheet questions, compare parts, and connect the answer to alternatives and BOM review.',
      },
      {
        question: 'When is Alldatasheet useful?',
        answer:
          'Alldatasheet is useful for finding datasheet documents. PartGenie is useful when you need interpretation, comparison, and next-step guidance.',
      },
    ],
    cta: {
      title: 'Go beyond opening datasheets',
      body: 'Ask, compare, validate, and move component decisions into your BOM workflow.',
      label: 'Get started for free',
    },
  }),
]

const pagesBySlug = new Map<string, CompetitorComparePage>()
for (const page of competitorComparePages) {
  pagesBySlug.set(page.slug, page)
  pagesBySlug.set(page.compareSlug, page)
}

export function getCompetitorComparePage(slug: string): CompetitorComparePage | null {
  return pagesBySlug.get(slug.toLowerCase()) ?? null
}
