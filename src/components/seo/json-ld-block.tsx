import { getTranslations } from 'next-intl/server'
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, jsonLdScript, productJsonLd, type ProductJsonLdInput } from '@/lib/json-ld'
import type { AppLocale } from '@/i18n/routing'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export async function JsonLdBlock({
  breadcrumbs,
  faq,
  itemList,
  locale = 'en',
  product,
  includeFaq = true,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  itemList?: { name: string; items: { name: string; url: string }[] }
  locale?: AppLocale
  product?: ProductJsonLdInput
  includeFaq?: boolean
}) {
  const t = await getTranslations({ locale, namespace: 'common' })
  const homeLabel = t('breadcrumbHome')

  const graphs: object[] = [breadcrumbJsonLd(breadcrumbs, locale, homeLabel)]
  if (product) {
    graphs.push(productJsonLd(product, locale))
  }
  if (includeFaq) {
    const faqLd = faq?.length ? faqJsonLd(faq) : null
    if (faqLd) graphs.push(faqLd)
  }
  const listLd = itemList ? itemListJsonLd(itemList, locale) : null
  if (listLd) graphs.push(listLd)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(graphs) }}
    />
  )
}
