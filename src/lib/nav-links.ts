import type { ComponentToolIconName } from '@/components/seo/untitled-ui-line-icon'
import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/lib/localized-path'
import {
  getHelpCenterPages,
  NAV_COMPARE_PAGES,
  NAV_MARKETING_PAGES,
  NAV_MARKETING_TOOL_PAGES,
  signUpUrl,
} from '@/lib/tool-urls'

export const NAV_LOGO_SRC = '/logo-wide-en.svg'

export type NavLink = {
  label: string
  href: string
  icon?: ComponentToolIconName
}

export type NavLabels = {
  tools: string
  pricing: string
  compare: string
  resources: string
  aiAlternativeFinder: string
  aiComponentFinder: string
  datasheetAi: string
  bomAnalyzer: string
  vsOctopart: string
  vsFindchips: string
  vsAlldatasheet: string
  manufacturerDirectory: string
  categoryDirectory: string
  insights: string
  helpCenter: string
  changelog: string
  getStarted: string
}

export const NAV_LOCALES: ReadonlyArray<{
  tag: AppLocale
  label: string
  fullLabelKey: 'english' | 'german'
}> = [
  { tag: 'en', label: 'EN', fullLabelKey: 'english' },
  { tag: 'de', label: 'DE', fullLabelKey: 'german' },
]

export function buildNavLinks(
  slug: string,
  labels: NavLabels,
  locale: AppLocale = 'en',
): {
  tools: NavLink[]
  pricing: { label: string; href: string }
  compare: NavLink[]
  insights: { label: string; href: string }
  resources: NavLink[]
  cta: { label: string; href: string }
} {
  const helpCenter = getHelpCenterPages(locale)

  return {
    tools: [
      {
        label: labels.aiAlternativeFinder,
        href: NAV_MARKETING_TOOL_PAGES.alternativeFinder,
        icon: 'list',
      },
      {
        label: labels.aiComponentFinder,
        href: NAV_MARKETING_TOOL_PAGES.componentFinder,
        icon: 'chip',
      },
      {
        label: labels.datasheetAi,
        href: NAV_MARKETING_TOOL_PAGES.datasheetAi,
        icon: 'file06',
      },
      {
        label: labels.bomAnalyzer,
        href: NAV_MARKETING_TOOL_PAGES.bomAnalyzer,
        icon: 'hash02',
      },
    ],
    pricing: { label: labels.pricing, href: NAV_MARKETING_PAGES.pricing },
    compare: [
      { label: labels.vsOctopart, href: NAV_COMPARE_PAGES.vsOctopart },
      { label: labels.vsFindchips, href: NAV_COMPARE_PAGES.vsFindchips },
      { label: labels.vsAlldatasheet, href: NAV_COMPARE_PAGES.vsAlldatasheet },
    ],
    insights: { label: labels.insights, href: localizePath('/insights', locale) },
    resources: [
      { label: labels.categoryDirectory, href: localizePath('/categories', locale) },
      { label: labels.manufacturerDirectory, href: localizePath('/manufacturers', locale) },
      { label: labels.helpCenter, href: helpCenter.home },
      { label: labels.changelog, href: helpCenter.changelog },
    ],
    cta: { label: labels.getStarted, href: signUpUrl(slug) },
  }
}

export function getNavLabelsFromTranslations(t: (key: string) => string): NavLabels {
  return {
    tools: t('tools'),
    pricing: t('pricing'),
    compare: t('compare'),
    resources: t('resources'),
    aiAlternativeFinder: t('aiAlternativeFinder'),
    aiComponentFinder: t('aiComponentFinder'),
    datasheetAi: t('datasheetAi'),
    bomAnalyzer: t('bomAnalyzer'),
    vsOctopart: t('vsOctopart'),
    vsFindchips: t('vsFindchips'),
    vsAlldatasheet: t('vsAlldatasheet'),
    manufacturerDirectory: t('manufacturerDirectory'),
    categoryDirectory: t('categoryDirectory'),
    insights: t('insights'),
    helpCenter: t('helpCenter'),
    changelog: t('changelog'),
    getStarted: t('getStarted'),
  }
}
