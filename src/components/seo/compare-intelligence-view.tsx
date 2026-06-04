import Link from 'next/link'
import { AlternativeList } from '@/components/seo/alternative-list'
import { CompareVerdict } from '@/components/seo/compare-verdict'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SectionTitle } from '@/components/seo/section-title'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { partImageForMpn } from '@/lib/part-images'
import type { CompareIntelligencePage } from '@/types/seo-intelligence'

export function CompareIntelligenceView({ page }: { page: CompareIntelligencePage }) {
  const totalSpecs = page.specComparison.length
  const winsA = page.specComparison.filter((row) => row.winner === 'a').length
  const winsB = page.specComparison.filter((row) => row.winner === 'b').length
  const ties = page.specComparison.filter((row) => row.winner === 'tie').length
  const context = page.specComparison.filter((row) => row.winner === 'context').length

  const pct = (value: number) => `${Math.round((value / Math.max(totalSpecs, 1)) * 100)}%`
  const winnerLabel = (winner: CompareIntelligencePage['specComparison'][number]['winner']) => {
    if (winner === 'a') return page.partA.mpn
    if (winner === 'b') return page.partB.mpn
    if (winner === 'tie') return 'Tie'
    return 'Context dependent'
  }

  const winnerTone = (winner: CompareIntelligencePage['specComparison'][number]['winner']) => {
    if (winner === 'a' || winner === 'b') return 'seo-badge--exact'
    if (winner === 'tie') return 'seo-badge--pin-compatible'
    return 'seo-badge--functional'
  }

  return (
    <>
      <PageHeader
        h1={page.meta.h1}
        subtitle={{
          manufacturer: `${page.partA.manufacturer} vs ${page.partB.manufacturer}`,
          category: 'Detailed comparison of specifications, compatibility, and tradeoffs',
        }}
      />

      <section className="seo-model-visual seo-model-visual--compare">
        <article className="seo-model-compare-card">
          <div className="seo-model-visual__image-wrap">
            <img
              src={partImageForMpn(page.partA.mpn)}
              alt={`${page.partA.mpn} package`}
              className="seo-model-visual__image"
            />
          </div>
          <div className="seo-model-visual__meta">
            <p className="seo-model-visual__name">{page.partA.mpn}</p>
            <p className="seo-model-visual__desc">{page.partA.manufacturer}</p>
          </div>
        </article>
        <span className="seo-model-compare-vs" aria-hidden="true">
          VS
        </span>
        <article className="seo-model-compare-card">
          <div className="seo-model-visual__image-wrap">
            <img
              src={partImageForMpn(page.partB.mpn)}
              alt={`${page.partB.mpn} package`}
              className="seo-model-visual__image"
            />
          </div>
          <div className="seo-model-visual__meta">
            <p className="seo-model-visual__name">{page.partB.mpn}</p>
            <p className="seo-model-visual__desc">{page.partB.manufacturer}</p>
          </div>
        </article>
      </section>

      <PageLayout
        main={
          <>
            <p className="seo-direct-answer seo-direct-answer--gradient">{page.shortAnswer}</p>

            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Parameter comparison overview" icon="specs" />
                <div className="seo-compare-kpis">
                <div className="seo-kpi-card">
                  <p className="seo-kpi-card__label">{page.partA.mpn}</p>
                  <p className="seo-kpi-card__value">{winsA}</p>
                  <p className="seo-kpi-card__meta">spec wins</p>
                </div>
                <div className="seo-kpi-card">
                  <p className="seo-kpi-card__label">{page.partB.mpn}</p>
                  <p className="seo-kpi-card__value">{winsB}</p>
                  <p className="seo-kpi-card__meta">spec wins</p>
                </div>
                <div className="seo-kpi-card">
                  <p className="seo-kpi-card__label">Neutral / context</p>
                  <p className="seo-kpi-card__value">{ties + context}</p>
                  <p className="seo-kpi-card__meta">tie + context rows</p>
                </div>
              </div>
              <div className="seo-card seo-compare-bars">
                <div className="seo-compare-bars__row">
                  <span>{page.partA.mpn}</span>
                  <div className="seo-compare-bars__track">
                    <div className="seo-compare-bars__fill seo-compare-bars__fill--a" style={{ width: pct(winsA) }} />
                  </div>
                  <strong>{winsA}</strong>
                </div>
                <div className="seo-compare-bars__row">
                  <span>{page.partB.mpn}</span>
                  <div className="seo-compare-bars__track">
                    <div className="seo-compare-bars__fill seo-compare-bars__fill--b" style={{ width: pct(winsB) }} />
                  </div>
                  <strong>{winsB}</strong>
                </div>
                <div className="seo-compare-bars__row">
                  <span>Tie</span>
                  <div className="seo-compare-bars__track">
                    <div className="seo-compare-bars__fill seo-compare-bars__fill--tie" style={{ width: pct(ties) }} />
                  </div>
                  <strong>{ties}</strong>
                </div>
                <div className="seo-compare-bars__row">
                  <span>Context dependent</span>
                  <div className="seo-compare-bars__track">
                    <div
                      className="seo-compare-bars__fill seo-compare-bars__fill--context"
                      style={{ width: pct(context) }}
                    />
                  </div>
                  <strong>{context}</strong>
                </div>
              </div>
              </div>
            </section>

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
              <div className="seo-card">
                <SectionTitle title="Specifications comparison" icon="specs" />
                <div className="seo-table-wrap">
                  <table className="seo-table seo-table--enhanced">
                    <thead>
                      <tr>
                        <th scope="col">Specification</th>
                        <th scope="col">
                          {page.partA.mpn} ({page.partA.manufacturer})
                        </th>
                        <th scope="col">
                          {page.partB.mpn} ({page.partB.manufacturer})
                        </th>
                        <th scope="col">Edge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.specComparison.map((row) => (
                        <tr key={row.spec}>
                          <th scope="row">{row.spec}</th>
                          <td>{row.partA}</td>
                          <td>{row.partB}</td>
                          <td>
                            <span className={`seo-badge ${winnerTone(row.winner)}`}>{winnerLabel(row.winner)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Compatibility and lifecycle" icon="compat" />
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
              </div>
            </section>

            <section className="seo-section">
              <div className="seo-card">
                <SectionTitle title="Application fit and tradeoffs" icon="fit" />
                <div className="seo-dual-grid">
                <div className="seo-card">
                  <h3 className="seo-subheading">Application fit</h3>
                  <div className="seo-table-wrap">
                    <table className="seo-table seo-table--enhanced">
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
