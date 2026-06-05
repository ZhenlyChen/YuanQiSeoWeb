import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { FloatingCtaDock } from '@/components/seo/floating-cta-dock'
import { JsonLdBlock } from '@/components/seo/json-ld-block'
import { PreviewBanner } from '@/components/seo/preview-banner'
import { SeoSiteChrome, type SeoPageContext } from '@/components/seo/seo-site-chrome'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export function SeoPageShell({
  breadcrumbs,
  faq,
  children,
  showPreviewBanner = false,
  pageContext,
  banner,
  hideBreadcrumbs = false,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  children: React.ReactNode
  showPreviewBanner?: boolean
  pageContext?: SeoPageContext
  banner?: React.ReactNode
  hideBreadcrumbs?: boolean
}) {
  return (
    <SeoSiteChrome pageContext={pageContext} banner={banner}>
      <main className="seo-page__main">
        <div className="seo-page__body">
          {showPreviewBanner ? <PreviewBanner /> : null}
          {hideBreadcrumbs ? null : <Breadcrumbs items={breadcrumbs} />}
          {children}
        </div>
        <FloatingCtaDock pageContext={pageContext} />
      </main>
      <JsonLdBlock breadcrumbs={breadcrumbs} faq={faq} />
    </SeoSiteChrome>
  )
}
