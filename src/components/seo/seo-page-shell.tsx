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
  itemList,
  hideBreadcrumbs = false,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  children: React.ReactNode
  showPreviewBanner?: boolean
  pageContext?: SeoPageContext
  banner?: React.ReactNode
  hideBreadcrumbs?: boolean
  itemList?: { name: string; items: { name: string; url: string }[] }
}) {
  return (
    <SeoSiteChrome pageContext={pageContext} banner={banner}>
      <main className="seo-page__main">
        <div className="seo-page__body">
          {showPreviewBanner ? <PreviewBanner /> : null}
          {hideBreadcrumbs ? null : <Breadcrumbs items={breadcrumbs} />}
          {children}
        </div>
        {pageContext?.slug !== 'manufacturer-directory' && pageContext?.slug !== 'category-directory' ? (
          <FloatingCtaDock pageContext={pageContext} />
        ) : null}
      </main>
      <JsonLdBlock breadcrumbs={breadcrumbs} faq={faq} itemList={itemList} />
    </SeoSiteChrome>
  )
}
