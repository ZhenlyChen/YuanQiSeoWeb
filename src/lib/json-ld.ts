import { SEO_SITE_ORIGIN } from '@/lib/site'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export function breadcrumbJsonLd(items: BreadcrumbItem[]): object {
  const list = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_SITE_ORIGIN },
    ...items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: item.label,
      ...(item.href ? { item: `${SEO_SITE_ORIGIN}${item.href}` } : {}),
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

export function jsonLdScript(data: object | object[]): string {
  const payload = Array.isArray(data) ? data : [data]
  return JSON.stringify(payload.length === 1 ? payload[0] : payload)
}
