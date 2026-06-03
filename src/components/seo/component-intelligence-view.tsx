import Link from 'next/link'
import { AiVerdictCard } from '@/components/seo/ai-verdict-card'
import { CompareLinkButtons } from '@/components/seo/compare-link-buttons'
import { KeySpecsSnapshot } from '@/components/seo/key-specs-snapshot'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SectionTitle } from '@/components/seo/section-title'
import { SidebarBomNotes } from '@/components/seo/sidebar-bom-notes'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { AlternativeList } from '@/components/seo/alternative-list'
import type { ComponentIntelligencePage } from '@/types/seo-intelligence'

export function ComponentIntelligenceView({ page }: { page: ComponentIntelligencePage }) {
  const relatedLinks = [
    page.relatedManufacturer,
    page.relatedCategory,
    { label: `${page.mpn} alternatives`, href: `/alternatives/${page.slug}` },
    ...page.compareLinks,
    ...page.relatedAnswers,
  ]

  return (
    <>
      <PageHeader h1={page.meta.h1} subtitle={page.subtitle} />

      <p className="seo-direct-answer" id="short-answer">
        {page.shortAnswer}
      </p>

      <PageLayout
        main={
          <>
            <AiVerdictCard
              verdict={page.aiVerdict}
              sourcingContext="Multiple alternatives available"
            />
            <KeySpecsSnapshot specs={page.keySpecs} mpn={page.mpn} />
            <AlternativeList
              items={page.alternatives}
              title="Alternative components"
              viewAllHref={`/alternatives/${page.slug}`}
            />
            <CompareLinkButtons links={page.compareLinks} />

            <section className="seo-section">
              <SectionTitle title="Design fit at a glance" icon="fit" />
              <div className="seo-dual-grid">
                <div className="seo-card">
                  <h3 className="seo-subheading">Best used for</h3>
                  <ul className="seo-compact-list">
                    {page.applications.goodFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="seo-subheading">Not recommended for</h3>
                  <ul className="seo-compact-list">
                    {page.applications.notRecommended.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="seo-card">
                  <h3 className="seo-subheading">Design considerations</h3>
                  <ul className="seo-compact-list">
                    {page.designConsiderations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="seo-section">
              <SectionTitle title="Common pitfalls" icon="risk" />
              <p className="seo-section__lead">
                Issues that distinguish decision intelligence from a parametric catalog.
              </p>
              <div className="seo-card">
                {page.commonPitfalls.map((pitfall) => (
                  <div key={pitfall.title} className="seo-pitfall">
                    <strong>{pitfall.title}</strong>
                    <p>{pitfall.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <QaBlocks items={page.faq} />
          </>
        }
        sidebar={
          <>
            <SidebarBomNotes notes={page.bomSourcing} />
            <SidebarRelatedLinks links={relatedLinks} />
          </>
        }
      />
    </>
  )
}
