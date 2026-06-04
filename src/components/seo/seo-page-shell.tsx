import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { JsonLdBlock } from '@/components/seo/json-ld-block'
import { PreviewBanner } from '@/components/seo/preview-banner'
import { SeoSiteChrome, type SeoPageContext } from '@/components/seo/seo-site-chrome'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import type { BreadcrumbItem, FaqItem } from '@/types/seo-intelligence'

export function SeoPageShell({
  breadcrumbs,
  faq,
  children,
  showPreviewBanner = false,
  cpuHeroText,
  pageContext,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  children: React.ReactNode
  showPreviewBanner?: boolean
  cpuHeroText?: string
  pageContext?: SeoPageContext
}) {
  return (
    <SeoSiteChrome pageContext={pageContext}>
      <main className="seo-page__main">
        {showPreviewBanner ? <PreviewBanner /> : null}
        {cpuHeroText ? (
          <div className="seo-hero-stack">
            <div className="seo-hero-stack__cpu">
              <CpuArchitecture text={cpuHeroText} height="132px" />
            </div>
            <Breadcrumbs items={breadcrumbs} className="seo-hero-stack__breadcrumbs" />
          </div>
        ) : (
          <Breadcrumbs items={breadcrumbs} />
        )}
        {children}
      </main>
      <JsonLdBlock breadcrumbs={breadcrumbs} faq={faq} />
    </SeoSiteChrome>
  )
}
