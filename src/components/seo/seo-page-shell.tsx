import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { FloatingCtaDock } from '@/components/seo/floating-cta-dock'
import { JsonLdBlock } from '@/components/seo/json-ld-block'
import { PreviewBanner } from '@/components/seo/preview-banner'
import { SeoSiteChrome, type SeoPageContext } from '@/components/seo/seo-site-chrome'
import type { AppLocale } from '@/i18n/routing'
import { localizeItemList } from '@/lib/json-ld'
import type { ProductJsonLdInput } from '@/lib/json-ld'
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
  locale = 'en',
  product,
  includeFaqJsonLd = true,
}: {
  breadcrumbs: BreadcrumbItem[]
  faq?: FaqItem[]
  children: React.ReactNode
  showPreviewBanner?: boolean
  pageContext?: SeoPageContext
  banner?: React.ReactNode
  hideBreadcrumbs?: boolean
  itemList?: { name: string; items: { name: string; url: string }[] }
  locale?: AppLocale
  product?: ProductJsonLdInput
  includeFaqJsonLd?: boolean
}) {
  const localizedItemList = itemList ? localizeItemList(itemList, locale) : undefined

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
      <JsonLdBlock
        breadcrumbs={breadcrumbs}
        faq={faq}
        itemList={localizedItemList}
        locale={locale}
        product={product}
        includeFaq={includeFaqJsonLd}
      />
    </SeoSiteChrome>
  )
}
