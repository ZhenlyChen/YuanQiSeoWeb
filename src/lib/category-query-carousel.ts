import { categoryFinderPath } from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES } from '@/lib/tool-urls'
import type { CategoryHubPage, CategoryQueryChip } from '@/types/seo-intelligence'

const MIN_CAROUSEL_ITEMS = 6

function defaultCategoryQueryChips(page: CategoryHubPage): CategoryQueryChip[] {
  const name = page.name

  return [
    {
      label: `Find ${name} by electrical specs`,
      chatQuery: `Find ${name} components matching my electrical requirements`,
    },
    {
      label: `Pin-compatible alternatives in ${name}`,
      chatQuery: `Find pin-compatible alternatives in ${name}`,
    },
    {
      label: `Compare top ${name} options`,
      chatQuery: `Compare popular ${name} components for my design`,
    },
    {
      label: `Low-power ${name} for battery designs`,
      chatQuery: `Find low-power ${name} components for battery-powered products`,
    },
    {
      label: `${name} BOM lifecycle review`,
      chatQuery: `Review BOM lifecycle risk for ${name} components`,
    },
    {
      label: `${name} finder`,
      href: categoryFinderPath(page.l1Slug),
    },
    {
      label: 'Find alternatives with AI',
      href: MARKETING_TOOL_PAGES.alternativeFinder,
    },
  ]
}

/** Category hub hero marquee — curated chips plus finder-style defaults. */
export function buildCategoryQueryCarouselItems(page: CategoryHubPage): CategoryQueryChip[] {
  const seen = new Set<string>()
  const merged: CategoryQueryChip[] = []

  for (const chip of [...page.queryChips, ...defaultCategoryQueryChips(page)]) {
    const key = chip.label.trim().toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(chip)
    if (merged.length >= MIN_CAROUSEL_ITEMS + 2) break
  }

  return merged
}
