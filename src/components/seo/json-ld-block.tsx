import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from '@/lib/json-ld'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export function JsonLdBlock({
  breadcrumbs,
  faq,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
}) {
  const graphs: object[] = [breadcrumbJsonLd(breadcrumbs)]
  const faqLd = faq?.length ? faqJsonLd(faq) : null
  if (faqLd) graphs.push(faqLd)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(graphs) }}
    />
  )
}
