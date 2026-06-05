import { SeoSiteFooter } from '@/components/seo/seo-site-footer'
import { SeoSiteNavbar } from '@/components/seo/seo-site-navbar'

export type SeoPageContext = {
  slug: string
  mpn: string
}

export function SeoSiteChrome({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext?: SeoPageContext
}) {
  const ctaSlug = pageContext?.slug ?? 'seo-header'

  return (
    <div className="seo-page">
      <SeoSiteNavbar ctaSlug={ctaSlug} />
      {children}
      <SeoSiteFooter />
    </div>
  )
}
