import { notFound } from 'next/navigation'
import { getMockManufacturerDirectoryPage } from '@/data/mock/manufacturer-directory'
import { fetchManufacturerDirectory } from '@/lib/seo-api'
import { SEO_SITE_ORIGIN } from '@/lib/site'
import {
  manufacturerDirectoryCategorySeoMeta,
  manufacturerDirectoryLetterSeoMeta,
  manufacturerDirectorySeoMeta,
} from '@/lib/seo-meta'
import type {
  BreadcrumbItem,
  ManufacturerDirectoryActiveFacet,
  ManufacturerDirectoryPage,
  ManufacturerDirectoryViewMode,
} from '@/types/seo-intelligence'

export type DirectoryFetchParams = {
  locale?: string
  categoryL1?: string
  letter?: string
  sort?: 'popular' | 'name'
  page?: number
  pageSize?: number
}

function useMockManufacturerDirectory(): boolean {
  return process.env.USE_MOCK_MANUFACTURER_DIRECTORY === 'true'
}

export function getCategoryFacetLabel(page: ManufacturerDirectoryPage, slug: string): string | undefined {
  return page.categoryFacets.find((facet) => facet.slug === slug)?.label
}

async function fetchManufacturerDirectoryPage(
  params: DirectoryFetchParams = {},
): Promise<ManufacturerDirectoryPage> {
  if (useMockManufacturerDirectory()) {
    return getMockManufacturerDirectoryPage()
  }

  const apiPage = await fetchManufacturerDirectory(params)
  if (!apiPage) {
    return getMockManufacturerDirectoryPage()
  }

  return {
    pageType: 'manufacturer_directory',
    meta: manufacturerDirectorySeoMeta(),
    items: apiPage.items.map((item) => ({
      ...item,
      primaryCategoryL1: item.primaryCategoryL1 ?? [],
    })),
    categoryFacets: apiPage.categoryFacets,
    totalInDatabase: apiPage.totalInDatabase,
    total: apiPage.total,
    page: apiPage.page,
    pageSize: apiPage.pageSize,
  }
}

function normalizeLetterParam(letter: string): string {
  const value = letter.trim().toLowerCase()
  if (value === '0-9') return '0-9'
  if (value.length === 1 && /[a-z]/.test(value)) return value
  return ''
}

function normalizeSortParam(sort?: string): 'popular' | 'name' {
  return sort === 'name' ? 'name' : 'popular'
}

export async function buildDirectoryIndexProps(params?: {
  sort?: string
  page?: number
  pageSize?: number
}) {
  const sort = normalizeSortParam(params?.sort)
  const pageNum = Math.max(1, params?.page ?? 1)
  const pageSize = params?.pageSize ?? 100
  const page = await fetchManufacturerDirectoryPage({ sort, page: pageNum, pageSize })

  return {
    page,
    activeFacet: { tab: 'all' as const },
    viewMode: 'browse' as ManufacturerDirectoryViewMode,
    pageTitle: 'All manufacturers',
    sort,
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

export async function buildDirectoryCategoryProps(l1: string, params?: { sort?: string }) {
  const sort = normalizeSortParam(params?.sort)
  const page = await fetchManufacturerDirectoryPage({ categoryL1: l1, sort, pageSize: 500 })
  const label = getCategoryFacetLabel(page, l1)
  if (!label) notFound()

  return {
    page: { ...page, meta: manufacturerDirectoryCategorySeoMeta({ categoryLabel: label, slug: l1 }) },
    activeFacet: {
      tab: 'category' as const,
      categoryL1: l1,
      categoryLabel: label,
    } satisfies ManufacturerDirectoryActiveFacet,
    viewMode: 'browse' as ManufacturerDirectoryViewMode,
    pageTitle: `${label} manufacturers`,
    sort,
    breadcrumbs: [
      { label: 'Manufacturers', href: '/manufacturers' },
      { label: label },
    ] satisfies BreadcrumbItem[],
    itemList: {
      name: `${label} manufacturers`,
      items: page.items.slice(0, 50).map((item) => ({
        name: item.name,
        url: `${SEO_SITE_ORIGIN}${item.href}`,
      })),
    },
  }
}

export async function buildDirectoryLetterProps(
  letterParam: string,
  categoryL1?: string,
  params?: { sort?: string },
) {
  const letter = normalizeLetterParam(letterParam)
  if (!letter) notFound()

  const sort = normalizeSortParam(params?.sort)
  const page = await fetchManufacturerDirectoryPage({
    categoryL1,
    letter: letter === '0-9' ? '0-9' : letter,
    sort,
    pageSize: 500,
  })

  let categoryLabel: string | undefined
  if (categoryL1) {
    categoryLabel = getCategoryFacetLabel(page, categoryL1)
    if (!categoryLabel) notFound()
  }

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
    page: {
      ...page,
      meta: manufacturerDirectoryLetterSeoMeta({ letter }),
    },
    activeFacet: {
      tab: 'letter' as const,
      categoryL1,
      categoryLabel,
      letter,
    } satisfies ManufacturerDirectoryActiveFacet,
    viewMode: 'letter' as ManufacturerDirectoryViewMode,
    pageTitle: `Manufacturers starting with ${display}`,
    sort,
    breadcrumbs,
    itemList: {
      name: `Manufacturers starting with ${display}`,
      items: page.items.slice(0, 50).map((item) => ({
        name: item.name,
        url: `${SEO_SITE_ORIGIN}${item.href}`,
      })),
    },
  }
}
