import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/lib/localized-path'
import { SEO_DEFAULT_OG_IMAGE, SEO_SITE_ORIGIN } from '@/lib/site'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

function absoluteUrl(path: string | undefined, locale: AppLocale): string | undefined {
  if (!path) return undefined
  return `${SEO_SITE_ORIGIN}${localizePath(path, locale)}`
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], locale: AppLocale = 'en'): object {
  const list = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: absoluteUrl('/', locale),
    },
    ...items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href, locale) } : {}),
    })),
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list,
  }
}

export function faqJsonLd(faq: FaqItem[]): object | null {
  if (!faq.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function itemListJsonLd(
  input: {
    name: string
    items: { name: string; url: string }[]
  },
  locale: AppLocale = 'en',
): object | null {
  if (!input.items.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: input.name,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http')
        ? item.url
        : absoluteUrl(item.url.replace(SEO_SITE_ORIGIN, ''), locale) ?? item.url,
    })),
  }
}

export type ProductJsonLdInput = {
  name: string
  description: string
  mpn: string
  brandName: string
  canonicalPath: string
  image?: string
  category?: string
}

export function productJsonLd(input: ProductJsonLdInput, locale: AppLocale = 'en'): object {
  const description =
    input.description.length > 300 ? `${input.description.slice(0, 297)}...` : input.description

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description,
    sku: input.mpn,
    mpn: input.mpn,
    brand: {
      '@type': 'Brand',
      name: input.brandName,
    },
    url: absoluteUrl(input.canonicalPath, locale),
    image: input.image || SEO_DEFAULT_OG_IMAGE,
    ...(input.category ? { category: input.category } : {}),
  }
}

export function jsonLdScript(data: object | object[]): string {
  const payload = Array.isArray(data) ? data : [data]
  return JSON.stringify(payload.length === 1 ? payload[0] : payload)
}

export function localizeItemList(
  itemList: { name: string; items: { name: string; url: string }[] },
  locale: AppLocale,
): { name: string; items: { name: string; url: string }[] } {
  return {
    name: itemList.name,
    items: itemList.items.map((item) => ({
      name: item.name,
      url: item.url.startsWith('http')
        ? `${SEO_SITE_ORIGIN}${localizePath(item.url.replace(SEO_SITE_ORIGIN, ''), locale)}`
        : `${SEO_SITE_ORIGIN}${localizePath(item.url, locale)}`,
    })),
  }
}
