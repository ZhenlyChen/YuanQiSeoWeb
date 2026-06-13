import { getHelpCenterPages, MARKETING_ORIGIN, MARKETING_PAGES, MARKETING_TOOL_PAGES, NAV_COMPARE_PAGES } from '@/lib/tool-urls'
import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/lib/localized-path'

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

export type FooterLabels = {
  product: string
  resources: string
  tools: string
  compare: string
  bestPractice: string
  features: string
  pricing: string
  changelog: string
  insights: string
  vsOctopart: string
  vsFindchips: string
  vsAlldatasheet: string
  manufacturerDirectory: string
  categoryDirectory: string
  helpCenter: string
  talkToUs: string
  bookDemo: string
  aiComponentFinder: string
  alternativeFinder: string
  bomAnalyzer: string
  datasheetAi: string
  aiQueryWriting: string
  fuzzyToPrecise: string
  searchOptimization: string
  effectiveBomManagement: string
}

export function getFooterLabelsFromTranslations(t: (key: string) => string): FooterLabels {
  return {
    product: t('product'),
    resources: t('resources'),
    tools: t('tools'),
    compare: t('compare'),
    bestPractice: t('bestPractice'),
    features: t('features'),
    pricing: t('pricing'),
    changelog: t('changelog'),
    insights: t('insights'),
    vsOctopart: t('vsOctopart'),
    vsFindchips: t('vsFindchips'),
    vsAlldatasheet: t('vsAlldatasheet'),
    manufacturerDirectory: t('manufacturerDirectory'),
    categoryDirectory: t('categoryDirectory'),
    helpCenter: t('helpCenter'),
    talkToUs: t('talkToUs'),
    bookDemo: t('bookDemo'),
    aiComponentFinder: t('aiComponentFinder'),
    alternativeFinder: t('alternativeFinder'),
    bomAnalyzer: t('bomAnalyzer'),
    datasheetAi: t('datasheetAi'),
    aiQueryWriting: t('aiQueryWriting'),
    fuzzyToPrecise: t('fuzzyToPrecise'),
    searchOptimization: t('searchOptimization'),
    effectiveBomManagement: t('effectiveBomManagement'),
  }
}

export function buildFooterColumns(labels: FooterLabels, locale: AppLocale = 'en') {
  const helpCenter = getHelpCenterPages(locale)

  return [
    {
      title: labels.product,
      links: [
        { label: labels.features, href: `${MARKETING_ORIGIN}/#features` },
        { label: labels.pricing, href: MARKETING_PAGES.pricing },
        { label: labels.changelog, href: helpCenter.changelog },
        { label: labels.insights, href: localizePath('/insights', locale) },
      ],
    },
    {
      title: labels.resources,
      links: [
        { label: labels.categoryDirectory, href: localizePath('/categories', locale) },
        { label: labels.manufacturerDirectory, href: localizePath('/manufacturers', locale) },
        { label: labels.helpCenter, href: helpCenter.home },
        { label: labels.talkToUs, href: `${MARKETING_ORIGIN}/contact` },
        { label: labels.bookDemo, href: MARKETING_PAGES.bookDemo },
      ],
    },
    {
      title: labels.tools,
      links: [
        { label: labels.aiComponentFinder, href: MARKETING_TOOL_PAGES.componentFinder },
        { label: labels.alternativeFinder, href: MARKETING_TOOL_PAGES.alternativeFinder },
        { label: labels.bomAnalyzer, href: MARKETING_TOOL_PAGES.bomAnalyzer },
        { label: labels.datasheetAi, href: MARKETING_TOOL_PAGES.datasheetAi },
      ],
    },
    {
      title: labels.compare,
      links: [
        { label: labels.vsOctopart, href: NAV_COMPARE_PAGES.vsOctopart },
        { label: labels.vsFindchips, href: NAV_COMPARE_PAGES.vsFindchips },
        { label: labels.vsAlldatasheet, href: NAV_COMPARE_PAGES.vsAlldatasheet },
      ],
    },
    {
      title: labels.bestPractice,
      links: [
        {
          label: labels.aiQueryWriting,
          href: helpCenter.aiQueryWriting,
        },
        {
          label: labels.fuzzyToPrecise,
          href: helpCenter.fuzzyToPrecise,
        },
        {
          label: labels.searchOptimization,
          href: helpCenter.searchOptimization,
        },
        {
          label: labels.effectiveBomManagement,
          href: helpCenter.effectiveBomManagement,
        },
      ],
    },
  ] as const
}
