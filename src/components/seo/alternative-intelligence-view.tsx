import Link from 'next/link'
import { AlternativesViewToggle } from '@/components/seo/alternatives-view-toggle'
import { AlternativeRichList } from '@/components/seo/alternative-rich-list'
import { CompatibilityMatrix } from '@/components/seo/compatibility-matrix'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SectionTitle } from '@/components/seo/section-title'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { openPartUrl } from '@/lib/tool-urls'
import type { AlternativeIntelligencePage } from '@/types/seo-intelligence'

export function AlternativeIntelligenceView({
  page,
  view = 'list',
}: {
  page: AlternativeIntelligencePage
  view?: 'list' | 'graph'
}) {
  if (view === 'graph') {
    return (
      <>
        <PageHeader
          h1={page.meta.h1}
          subtitle={page.subtitle}
          actions={<AlternativesViewToggle slug={page.slug} active="graph" />}
        />
        <p className="seo-direct-answer seo-direct-answer--gradient">{page.shortAnswer}</p>
        <div className="seo-card seo-graph-teaser">
          <p>
            Full alternative graph rankings and supplier weights are available inside PartGenie — not
            exposed on public SEO pages.
          </p>
          <a className="seo-btn seo-btn--primary" href={openPartUrl(page.slug)}>
            Open full analysis in PartGenie
          </a>
          <p style={{ marginTop: 'var(--pg-space-4)', fontSize: '0.8125rem' }}>
            <Link href={`/alternatives/${page.slug}`}>← Back to list view</Link>
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        h1={page.meta.h1}
        subtitle={page.subtitle}
        actions={<AlternativesViewToggle slug={page.slug} active="list" />}
      />
      <p className="seo-direct-answer seo-direct-answer--gradient seo-direct-answer--main-width">{page.shortAnswer}</p>

      <PageLayout
        main={
          <>
            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Quick replacement view" icon="verdict" />
                <div className="seo-dual-grid">
                <div className="seo-card">
                  <h3 className="seo-subheading">Can it be replaced directly?</h3>
                  <p>
                    {page.replacementVerdict.canReplaceDirectly
                      ? 'Possible only after electrical and firmware validation.'
                      : 'Not recommended without a structured substitution review.'}
                  </p>
                  <h3 className="seo-subheading">Best replacement path</h3>
                  <p>{page.replacementVerdict.bestReplacementType}</p>
                  <h3 className="seo-subheading">Main risk</h3>
                  <p>{page.replacementVerdict.mainRisk}</p>
                  <p style={{ marginTop: 'var(--pg-space-4)', color: 'var(--pg-color-text-secondary)' }}>
                    {page.replacementVerdict.summary}
                  </p>
                </div>
                <div className="seo-card">
                  <h3 className="seo-subheading">Replacement risk analysis</h3>
                  <div className="seo-risk-grid">
                    {page.riskAnalysis.map((risk) => (
                      <div key={risk.category} className="seo-risk-grid__item">
                        <h4>
                          {risk.category}{' '}
                          <span className={`seo-badge seo-badge--${risk.level}`}>{risk.level}</span>
                        </h4>
                        <p>{risk.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </section>

            <AlternativeRichList
              items={page.alternatives}
              viewAllHref={`/alternatives/${page.slug}`}
            />
            <CompatibilityMatrix rows={page.compatibilityMatrix} />

            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Feature comparison snapshot" icon="specs" />
                <div className="seo-table-wrap">
                  <table className="seo-table seo-table--enhanced">
                    <thead>
                      <tr>
                        <th scope="col">Feature</th>
                        <th scope="col">{page.featureComparisonHeaders.original}</th>
                        <th scope="col">{page.featureComparisonHeaders.alt1}</th>
                        <th scope="col">{page.featureComparisonHeaders.alt2}</th>
                        <th scope="col">{page.featureComparisonHeaders.alt3}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.featureComparison.map((row) => (
                        <tr key={row.feature}>
                          <th scope="row">{row.feature}</th>
                          <td>{row.original}</td>
                          <td>{row.alt1}</td>
                          <td>{row.alt2}</td>
                          <td>{row.alt3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Application compatibility" icon="fit" />
                <table className="seo-table">
                  <tbody>
                    {page.applicationFit.map((row) => (
                      <tr key={row.scenario}>
                        <th scope="row">{row.scenario}</th>
                        <td>{row.guidance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Authorized / regional alternatives" icon="sourcing" />
                <ul>
                  {page.regionalNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </section>

            <QaBlocks items={page.faq} />
          </>
        }
        sidebar={
          <>
            <SidebarRelatedLinks
              title="Related compare pages"
              links={[
                { label: `${page.mpn} component intelligence`, href: page.originalPartHref },
                ...page.compareLinks,
              ]}
            />
          </>
        }
      />
    </>
  )
}
