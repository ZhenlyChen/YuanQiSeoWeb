import { notFound } from 'next/navigation'
import {
  getCategoryFacetLabel,
  getMockManufacturerDirectoryPage,
} from '@/data/mock/manufacturer-directory'
import { filterDirectoryItems } from '@/lib/manufacturer-directory'
import { SEO_SITE_ORIGIN } from '@/lib/site'
import type {
  BreadcrumbItem,
  ManufacturerDirectoryActiveFacet,
  ManufacturerDirectoryViewMode,
} from '@/types/seo-intelligence'

export function getManufacturerDirectoryBase() {
  return getMockManufacturerDirectoryPage()
}

function normalizeLetterParam(letter: string): string {
  const value = letter.trim().toLowerCase()
  if (value === '0-9') return '0-9'
  if (value.length === 1 && /[a-z]/.test(value)) return value
  return ''
}

export function buildDirectoryIndexProps() {
  const page = getManufacturerDirectoryBase()
  return {
    page,
    activeFacet: { tab: 'all' as const },
    viewMode: 'browse' as ManufacturerDirectoryViewMode,
    pageTitle: 'All manufacturers',
    breadcrumbs: [{ label: 'Manufacturers' }],
    itemList: {
      name: 'Electronic component manufacturers',
      items: page.items.slice(0, 50).map((item) => ({
        name: item.name,
        url: `${SEO_SITE_ORIGIN}${item.href}`,
      })),
    },
  }
}

export function buildDirectoryCategoryProps(l1: string) {
  const page = getManufacturerDirectoryBase()
  const label = getCategoryFacetLabel(l1)
  if (!label) notFound()

  const filtered = filterDirectoryItems(page.items, { categoryL1: l1 })
  return {
    page: { ...page, meta: page.meta },
    activeFacet: {
      tab: 'category' as const,
      categoryL1: l1,
      categoryLabel: label,
    } satisfies ManufacturerDirectoryActiveFacet,
    viewMode: 'browse' as ManufacturerDirectoryViewMode,
    pageTitle: `${label} manufacturers`,
    breadcrumbs: [
      { label: 'Manufacturers', href: '/manufacturers' },
      { label: label },
    ],
    itemList: {
      name: `${label} manufacturers`,
      items: filtered.slice(0, 50).map((item) => ({
        name: item.name,
        url: `${SEO_SITE_ORIGIN}${item.href}`,
      })),
    },
  }
}

export function buildDirectoryLetterProps(letterParam: string, categoryL1?: string) {
  const letter = normalizeLetterParam(letterParam)
  if (!letter) notFound()

  const page = getManufacturerDirectoryBase()
  let categoryLabel: string | undefined
  if (categoryL1) {
    categoryLabel = getCategoryFacetLabel(categoryL1)
    if (!categoryLabel) notFound()
  }

  const filtered = filterDirectoryItems(page.items, {
    categoryL1,
    letter: letter === '0-9' ? '0-9' : letter,
  })

  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Manufacturers', href: '/manufacturers' }]
  if (categoryLabel && categoryL1) {
    breadcrumbs.push({
      label: categoryLabel,
      href: `/manufacturers/category/${categoryL1}`,
    })
  }
  const display = letter === '0-9' ? '0–9' : letter.toUpperCase()
  breadcrumbs.push({ label: `Letter ${display}` })

  return {
    page,
    activeFacet: {
      tab: 'letter' as const,
      categoryL1,
      categoryLabel,
      letter,
    } satisfies ManufacturerDirectoryActiveFacet,
    viewMode: 'letter' as ManufacturerDirectoryViewMode,
    pageTitle: `Manufacturers starting with ${display}`,
    breadcrumbs,
    itemList: {
      name: `Manufacturers starting with ${display}`,
      items: filtered.slice(0, 50).map((item) => ({
        name: item.name,
        url: `${SEO_SITE_ORIGIN}${item.href}`,
      })),
    },
  }
}
