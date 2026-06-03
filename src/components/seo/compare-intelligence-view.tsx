import Link from 'next/link'
import { AlternativeList } from '@/components/seo/alternative-list'
import { CompareVerdict } from '@/components/seo/compare-verdict'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import type { CompareIntelligencePage } from '@/types/seo-intelligence'

export function CompareIntelligenceView({ page }: { page: CompareIntelligencePage }) {
  return (
    <>
      <PageHeader
        h1={page.meta.h1}
        headingFont="mozilla"
        subtitle={{
          manufacturer: `${page.partA.manufacturer} vs ${page.partB.manufacturer}`,
          category: 'Detailed comparison of specifications, compatibility, and tradeoffs',
        }}
      />

      <PageLayout
        main={
          <>
        <p className="seo-direct-answer seo-direct-answer--gradient">{page.shortAnswer}</p>
        <CompareVerdict
          chooseAIf={page.chooseAIf}
          chooseBIf={page.chooseBIf}
          doNotReplaceIf={page.doNotReplaceIf}
          partALabel={page.partA.mpn}
          partBLabel={page.partB.mpn}
        />
        {!page.dropInReplacement ? (
          <div className="seo-drop-in-warning" role="note">
            <strong>Drop-in replacement status: No</strong>
            <p>{page.dropInWarning}</p>
          </div>
        ) : null}

        <section className="seo-section">
          <h2 className="seo-section__title">Specifications comparison</h2>
          <div className="seo-card">
            <table className="seo-table">
              <thead>
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">
                    {page.partA.mpn} ({page.partA.manufacturer})
                  </th>
                  <th scope="col">
                    {page.partB.mpn} ({page.partB.manufacturer})
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.specComparison.map((row) => (
                  <tr key={row.spec}>
                    <th scope="row">{row.spec}</th>
                    <td>{row.partA}</td>
                    <td>{row.partB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="seo-section">
          <h2 className="seo-section__title">Compatibility and lifecycle</h2>
          <div className="seo-dual-grid">
            <div className="seo-card">
              <h3 className="seo-subheading">Pin / package compatibility</h3>
              <ul className="seo-compact-list">
                {page.pinPackageNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="seo-card">
              <h3 className="seo-subheading">Sourcing & lifecycle notes</h3>
              <ul className="seo-compact-list">
                {page.sourcingNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="seo-section">
          <h2 className="seo-section__title">Application fit and tradeoffs</h2>
          <div className="seo-dual-grid">
            <div className="seo-card">
              <h3 className="seo-subheading">Application fit</h3>
              <table className="seo-table">
                <thead>
                  <tr>
                    <th scope="col">Application</th>
                    <th scope="col">Better choice</th>
                    <th scope="col">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {page.applicationFit.map((row) => (
                    <tr key={row.application}>
                      <th scope="row">{row.application}</th>
                      <td>
                        {row.better === 'a'
                          ? page.partA.mpn
                          : row.better === 'b'
                            ? page.partB.mpn
                            : 'Either (with validation)'}
                      </td>
                      <td>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="seo-card">
              <h3 className="seo-subheading">Design tradeoffs</h3>
              <ul className="seo-compact-list">
                {page.designTradeoffs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <AlternativeList items={page.alternativesToBoth} title="Alternatives to both" />

        <QaBlocks items={page.faq} />

        <div className="seo-compare-footer-cta">
          <Link href={`/parts/${page.partA.slug}`} className="seo-btn seo-btn--dark">
            View {page.partA.mpn} details
          </Link>
          <Link href={`/parts/${page.partB.slug}`} className="seo-btn seo-btn--secondary">
            View {page.partB.mpn} details
          </Link>
        </div>
          </>
        }
        sidebar={
          <>
            <section className="seo-sidebar-card">
              <h2 className="seo-sidebar-card__title">At a glance</h2>
              <dl className="seo-sidebar-notes">
                <div>
                  <dt>Drop-in replacement</dt>
                  <dd>{page.dropInReplacement ? 'Possible with checks' : 'No'}</dd>
                </div>
                <div>
                  <dt>Choose {page.partA.mpn} when</dt>
                  <dd>{page.chooseAIf[0]}</dd>
                </div>
                <div>
                  <dt>Choose {page.partB.mpn} when</dt>
                  <dd>{page.chooseBIf[0]}</dd>
                </div>
              </dl>
            </section>
            <SidebarRelatedLinks title="Related queries" links={page.relatedQueries} />
          </>
        }
      />
    </>
  )
}
