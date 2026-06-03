import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { JsonLdBlock } from '@/components/seo/json-ld-block'
import { PreviewBanner } from '@/components/seo/preview-banner'
import { SeoSiteChrome } from '@/components/seo/seo-site-chrome'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export function SeoPageShell({
  breadcrumbs,
  faq,
  children,
  showPreviewBanner = false,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  children: React.ReactNode
  showPreviewBanner?: boolean
}) {
  return (
    <SeoSiteChrome>
      <main className="seo-page__main">
        {showPreviewBanner ? <PreviewBanner /> : null}
        <Breadcrumbs items={breadcrumbs} />
        {children}
      </main>
      <JsonLdBlock breadcrumbs={breadcrumbs} faq={faq} />
    </SeoSiteChrome>
  )
}
