import Link from 'next/link'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import type { QueryAnswerPage } from '@/types/seo-intelligence'

export function QueryAnswerView({ page }: { page: QueryAnswerPage }) {
  return (
    <>
      <PageHeader
        h1={page.meta.h1}
        subtitle={{
          manufacturer: 'Selection guide',
          category: page.category,
        }}
      />
      <p className="seo-direct-answer seo-direct-answer--gradient seo-direct-answer--main-width">{page.shortAnswer}</p>

      <PageLayout
        main={
          <>
            <section className="seo-section">
              <h2 className="seo-section__title">Direct answer</h2>
              <div className="seo-card">
                <p style={{ margin: 0, lineHeight: 1.65, color: 'var(--pg-color-text-secondary)' }}>
                  {page.directAnswer}
                </p>
              </div>
            </section>

            <section className="seo-section">
              <h2 className="seo-section__title">Recommended components</h2>
              <div className="seo-card">
                {page.recommendedComponents.map((part) => (
                  <div key={part.mpn} className="seo-alt-row">
                    <div className="seo-alt-row__main">
                      <Link href={part.href}>{part.mpn}</Link>
                      <span style={{ color: 'var(--pg-color-text-placeholder)', marginLeft: 8 }}>
                        {part.manufacturer}
                      </span>
                      <span className="seo-badge seo-badge--exact" style={{ marginLeft: 8 }}>
                        Recommended
                      </span>
                      <p className="seo-alt-row__reason">{part.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="seo-section">
              <h2 className="seo-section__title">Selection criteria</h2>
              <div className="seo-card">
                <ul className="seo-criteria-list">
                  {page.selectionCriteria.map((item, i) => (
                    <li key={item}>
                      <span
                        className={`seo-criteria-tag seo-criteria-tag--${i === 0 ? 'critical' : i === 1 ? 'high' : 'medium'}`}
                      >
                        {i === 0 ? 'Critical' : i === 1 ? 'High' : 'Medium'}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="seo-section">
              <h2 className="seo-section__title">Tradeoffs</h2>
              <div className="seo-card">
                {page.tradeoffs.map((t) => (
                  <div key={t.title} className="seo-pitfall">
                    <strong>{t.title}</strong>
                    <p>{t.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="seo-section">
              <h2 className="seo-section__title">Suggested BOM</h2>
              <div className="seo-card">
                <table className="seo-table">
                  <thead>
                    <tr>
                      <th scope="col">Component</th>
                      <th scope="col">Part number</th>
                      <th scope="col">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.suggestedBom.map((line) => (
                      <tr key={line.mpn}>
                        <td>{line.role}</td>
                        <td>{line.mpn}</td>
                        <td>{line.notes ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="seo-section">
              <h2 className="seo-section__title">When to avoid</h2>
              <div className="seo-card">
                <ul>
                  {page.whenToAvoid.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <QaBlocks items={page.faq} title="Common questions" />
          </>
        }
        sidebar={
          <>
            <SidebarRelatedLinks
              title="Related guides"
              links={[page.categoryFinderLink, ...page.alternatives, ...page.relatedComponents]}
            />
          </>
        }
      />
    </>
  )
}
