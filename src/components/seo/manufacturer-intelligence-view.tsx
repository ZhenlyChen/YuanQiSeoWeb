import { Stars02Icon } from '@/components/seo/stars-02-icon'
import { ComponentSectionNav } from '@/components/seo/component-section-nav'
import { PageLayout } from '@/components/seo/page-layout'
import { TopSearchedPartsTable } from '@/components/seo/top-searched-parts-table'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { buildManufacturerSectionNavItems } from '@/lib/manufacturer-section-nav-items'
import { ComparableManufacturersList } from '@/components/seo/comparable-manufacturers-list'
import { ManufacturerCatalogTable } from '@/components/seo/manufacturer-catalog-table'
import { ManufacturerSupplyInsights } from '@/components/seo/manufacturer-supply-insights'
import { TypewriterText } from '@/components/seo/typewriter-text'
import { buildManufacturerToolGrid, SidebarToolGrid } from '@/components/seo/sidebar-tool-grid'
import type { ManufacturerIntelligencePage } from '@/types/seo-intelligence'

export function ManufacturerIntelligenceView({ page }: { page: ManufacturerIntelligencePage }) {
  const catalogManufacturerId = page.manufacturerId?.trim()

  return (
    <div className="seo-page-body seo-page-body--manufacturer">
      <ComponentSectionNav items={buildManufacturerSectionNavItems()} />
      <div className="seo-page-split seo-page-split--manufacturer">
        <PageLayout
          main={
            <>
              <div
                id="overview"
                className="seo-page-section seo-page-section-anchor seo-direct-answer seo-direct-answer--gradient seo-direct-answer--manufacturer"
              >
                <h2 className="seo-card__title seo-ai-summary__title">
                  <Stars02Icon className="seo-ai-summary__icon" />
                  {page.name} at a Glance
                </h2>
                <TypewriterText text={page.shortAnswer} className="seo-direct-answer__body" />
              </div>

              <div id="parts" className="seo-page-section seo-page-section-anchor">
                <TopSearchedPartsTable slug={page.slug} items={page.mostSearchedParts} />
              </div>

              {catalogManufacturerId ? (
                <div id="catalog" className="seo-page-section seo-page-section-anchor">
                  <ManufacturerCatalogTable
                    slug={page.slug}
                    manufacturerId={catalogManufacturerId}
                    categories={page.catalogCategories}
                  />
                </div>
              ) : null}

              <section id="supply" className="seo-page-section seo-page-section-anchor">
                <ManufacturerSupplyInsights groups={page.supplyInsights} />
              </section>

              <div id="resources" className="seo-page-section seo-page-section-anchor">
                <QaBlocks items={page.faq} />
              </div>
            </>
          }
          sidebar={
            <>
              <SidebarToolGrid tools={buildManufacturerToolGrid(page)} />
              <ComparableManufacturersList items={page.comparableManufacturers} />
            </>
          }
        />
      </div>
    </div>
  )
}
