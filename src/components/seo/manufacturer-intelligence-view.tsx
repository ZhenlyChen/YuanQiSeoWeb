import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { EntityLinkList } from '@/components/seo/entity-link-list'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import type { ManufacturerIntelligencePage } from '@/types/seo-intelligence'

export function ManufacturerIntelligenceView({ page }: { page: ManufacturerIntelligencePage }) {
  return (
    <>
      <PageHeader
        h1={page.meta.h1}
        subtitle={{
          manufacturer: page.name,
          category: 'Manufacturer intelligence hub',
        }}
      />
      <p className="seo-direct-answer">{page.shortAnswer}</p>
      <p className="seo-section__lead">{page.summary}</p>

      <PageLayout
        main={
          <>
            <section className="seo-section">
              <h2 className="seo-section__title">Popular product families</h2>
              <div className="seo-card">
                {page.popularFamilies.map((family) => (
                  <div key={family.name} className="seo-pitfall">
                    <strong>{family.name}</strong>
                    <p>{family.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <EntityLinkList
              links={page.mostSearchedParts}
              title="Most searched parts"
              intro="Curated high-intent parts — not a full manufacturer catalog."
            />

            <section className="seo-section">
              <h2 className="seo-section__title">Supply chain / lifecycle notes</h2>
              <div className="seo-card">
                <ul>
                  {page.supplyNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </section>

            <EntityLinkList
              links={page.curatedCatalog}
              title="Curated product catalog"
              intro="Representative parts only (≤20). Full graph and rankings stay in the app."
            />

            <QaBlocks items={page.faq} />
          </>
        }
        sidebar={
          <>
            <SidebarRelatedLinks links={page.popularAlternatives} title="Popular alternatives" />
            <SidebarRelatedLinks links={page.comparableManufacturers} title="Comparable manufacturers" />
            <SidebarRelatedLinks links={page.categoryBreakdown} title="Category breakdown" />
          </>
        }
      />
    </>
  )
}
