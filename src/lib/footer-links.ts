import {
  HELP_CENTER_PAGES,
  MARKETING_ORIGIN,
  MARKETING_PAGES,
  MARKETING_TOOL_PAGES,
} from '@/lib/tool-urls'

export const FOOTER_LOGO_SRC =
  'https://cdn.prod.website-files.com/68bc2912d8c4f0f259702337/68bc2dc24c2d85bc943e5bbd_relume-364285.png'

export const FOOTER_SOCIAL = {
  discord: 'https://discord.gg/6UgXFWT3UW',
  x: 'https://x.com/PartGenie',
  linkedin: 'https://www.linkedin.com/company/partgenie/?viewAsMember=true',
  youtube: 'https://www.youtube.com/@partgenie',
} as const

export const FOOTER_LEGAL = {
  privacy: 'https://www.partgenie.ai/privacy-policy',
  terms: 'https://www.partgenie.ai/terms-of-service',
} as const

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: `${MARKETING_ORIGIN}/#features` },
      { label: 'Pricing', href: MARKETING_PAGES.pricing },
      { label: 'Changelog', href: HELP_CENTER_PAGES.changelog },
    ],
  },
  {
    title: 'Resource',
    links: [
      { label: 'Help Center', href: HELP_CENTER_PAGES.home },
      { label: 'Talk to Us', href: `${MARKETING_ORIGIN}/contact` },
      { label: 'Book a demo', href: MARKETING_PAGES.bookDemo },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'AI Component Finder', href: MARKETING_TOOL_PAGES.componentFinder },
      { label: 'Alternative Finder', href: MARKETING_TOOL_PAGES.alternativeFinder },
      { label: 'BOM Analyzer', href: MARKETING_TOOL_PAGES.bomAnalyzer },
      { label: 'Datasheet AI', href: MARKETING_TOOL_PAGES.datasheetAi },
    ],
  },
  {
    title: 'Best Practice',
    links: [
      {
        label: 'How to Write AI-Understandable Queries',
        href: HELP_CENTER_PAGES.aiQueryWriting,
      },
      {
        label: 'From Fuzzy Intent to Precise Solutions',
        href: HELP_CENTER_PAGES.fuzzyToPrecise,
      },
      {
        label: 'Electronics Search Optimization Tips',
        href: HELP_CENTER_PAGES.searchOptimization,
      },
      {
        label: 'Effective BOM Management Best Practices',
        href: HELP_CENTER_PAGES.effectiveBomManagement,
      },
    ],
  },
] as const
