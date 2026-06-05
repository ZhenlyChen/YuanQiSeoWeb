import type { ComponentToolIconName } from '@/components/seo/untitled-ui-line-icon'
import {
  HELP_CENTER_PAGES,
  MARKETING_ORIGIN,
  MARKETING_PAGES,
  MARKETING_TOOL_PAGES,
  signUpUrl,
} from '@/lib/tool-urls'

export const NAV_LOGO_SRC = '/logo-wide-en.svg'

export type NavLink = {
  label: string
  href: string
  icon?: ComponentToolIconName
}

export const NAV_LOCALES = [
  { tag: 'en', label: 'EN', fullLabel: 'English', href: MARKETING_ORIGIN },
  { tag: 'de', label: 'DE', fullLabel: 'Deutsch', href: `${MARKETING_ORIGIN}/de` },
] as const

export function buildNavLinks(slug: string): {
  tools: NavLink[]
  pricing: { label: string; href: string }
  compare: NavLink[]
  resources: NavLink[]
  cta: { label: string; href: string }
} {
  return {
    tools: [
      {
        label: 'AI Alternative Finder',
        href: MARKETING_TOOL_PAGES.alternativeFinder,
        icon: 'list',
      },
      {
        label: 'AI Component Finder',
        href: MARKETING_TOOL_PAGES.componentFinder,
        icon: 'chip',
      },
      {
        label: 'Datasheet AI',
        href: MARKETING_TOOL_PAGES.datasheetAi,
        icon: 'file06',
      },
      {
        label: 'BOM Analyzer',
        href: MARKETING_TOOL_PAGES.bomAnalyzer,
        icon: 'hash02',
      },
    ],
    pricing: { label: 'Pricing', href: MARKETING_PAGES.pricing },
    compare: [
      { label: 'PartGenie vs. Octopart', href: `${MARKETING_ORIGIN}/compare/vs-octopart` },
      { label: 'PartGenie vs. Findchips', href: `${MARKETING_ORIGIN}/compare/vs-findchips` },
      { label: 'PartGenie vs. Alldatasheet', href: `${MARKETING_ORIGIN}/compare/vs-alldatasheet` },
    ],
    resources: [
      { label: 'Help center', href: HELP_CENTER_PAGES.home },
      { label: 'Changelog', href: HELP_CENTER_PAGES.changelog },
    ],
    cta: { label: 'Get started', href: signUpUrl(slug) },
  }
}
