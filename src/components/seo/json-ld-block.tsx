import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, jsonLdScript } from '@/lib/json-ld'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export function JsonLdBlock({
  breadcrumbs,
  faq,
  itemList,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  itemList?: { name: string; items: { name: string; url: string }[] }
}) {
  const graphs: object[] = [breadcrumbJsonLd(breadcrumbs)]
  const faqLd = faq?.length ? faqJsonLd(faq) : null
  if (faqLd) graphs.push(faqLd)
  const listLd = itemList ? itemListJsonLd(itemList) : null
  if (listLd) graphs.push(listLd)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(graphs) }}
    />
  )
}
