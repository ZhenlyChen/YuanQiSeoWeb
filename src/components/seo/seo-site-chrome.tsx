import { SeoSiteFooter } from '@/components/seo/seo-site-footer'
import { SeoSiteNavbar } from '@/components/seo/seo-site-navbar'

export type SeoPageKind = 'part' | 'alternative' | 'manufacturer' | 'compare' | 'answer' | 'category'

export type SeoPageContext = {
  slug: string
  mpn?: string
  manufacturer?: string
  kind?: SeoPageKind
}

export function SeoSiteChrome({
  children,
  pageContext,
  banner,
}: {
  children: React.ReactNode
  pageContext?: SeoPageContext
  banner?: React.ReactNode
}) {
  const ctaSlug = pageContext?.slug ?? 'seo-header'

  return (
    <div className="seo-page">
      <SeoSiteNavbar ctaSlug={ctaSlug} />
      {banner}
      {children}
      <SeoSiteFooter />
    </div>
  )
}
