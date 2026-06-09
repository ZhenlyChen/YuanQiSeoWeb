import Link from 'next/link'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { signUpUrl } from '@/lib/tool-urls'
import type { CompetitorComparePage } from '@/types/seo-intelligence'

function rowTone(emphasis: CompetitorComparePage['comparisonRows'][number]['emphasis']) {
  if (emphasis === 'partgenie') return 'PartGenie advantage'
  if (emphasis === 'competitor') return 'Competitor advantage'
  return 'Depends on workflow'
}

export function CompetitorCompareView({ page }: { page: CompetitorComparePage }) {
  const ctaHref = signUpUrl(page.slug)

  return (
    <>
      <section className="seo-competitor-hero">
        <div className="seo-competitor-hero__copy">
          <p className="seo-competitor-hero__eyebrow">{page.hero.eyebrow}</p>
          <h1>{page.hero.title}</h1>
          <p className="seo-competitor-hero__subtitle">{page.hero.subtitle}</p>
          <div className="seo-competitor-hero__actions">
            <a className="seo-btn seo-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
              {page.hero.primaryCtaLabel}
            </a>
            <a className="seo-btn seo-btn--secondary" href="#workflow">
              {page.hero.secondaryCtaLabel}
            </a>
          </div>
        </div>

        <div className="seo-competitor-hero__visual" aria-label={`${page.hero.title} workflow snapshot`}>
          <div className="seo-competitor-visual__bar">
            <span />
            <span />
            <span />
          </div>
          <div className="seo-competitor-visual__brands">
            <div>
              <img src="/logo-wide-en.svg" alt="PartGenie" />
              <strong>AI workflow</strong>
            </div>
            <span aria-hidden="true">vs</span>
            <div>
              <strong>{page.competitor.shortName}</strong>
              <small>{page.competitor.category}</small>
            </div>
          </div>
          <div className="seo-competitor-visual__answer">
            <span>Requirement</span>
            <strong>Find a lower-risk replacement for a production BOM</strong>
          </div>
          <div className="seo-competitor-visual__steps">
            <span>Search</span>
            <span>Datasheet Q&A</span>
            <span>BOM risk</span>
            <span>Alternatives</span>
          </div>
        </div>
      </section>

      <section className="seo-competitor-proof" aria-label="PartGenie proof points">
        {page.proofPoints.map((point) => (
          <div key={point.label} className="seo-competitor-proof__item">
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </section>

      <section className="seo-section">
        <p className="seo-direct-answer seo-direct-answer--gradient">{page.shortAnswer}</p>
      </section>

      <section className="seo-section" id="workflow">
        <div className="seo-section__head">
          <h2 className="seo-section__title">The core workflow difference</h2>
          <p className="seo-section__lead">
            PartGenie keeps search, datasheet interpretation, alternatives, and BOM action in one decision path.
          </p>
        </div>
        <div className="seo-competitor-workflow">
          {page.workflowCards.map((card, index) => (
            <article key={card.title} className="seo-competitor-workflow__card">
              <span>{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-section">
        <div className="seo-section__head">
          <h2 className="seo-section__title">Feature comparison</h2>
          <p className="seo-section__lead">
            A structured view of where each tool fits in component research and sourcing workflows.
          </p>
        </div>
        <div className="seo-table-wrap">
          <table className="seo-table seo-table--enhanced seo-competitor-table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">PartGenie</th>
                <th scope="col">{page.competitor.shortName}</th>
                <th scope="col">Best fit</th>
              </tr>
            </thead>
            <tbody>
              {page.comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td>{row.partgenie}</td>
                  <td>{row.competitor}</td>
                  <td>
                    <span className="seo-competitor-table__badge">{rowTone(row.emphasis)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="seo-section">
        <div className="seo-section__head">
          <h2 className="seo-section__title">When simple lookup is not enough</h2>
          <p className="seo-section__lead">
            These are the gaps PartGenie is designed to close after a part number or datasheet is found.
          </p>
        </div>
        <div className="seo-competitor-gap-grid">
          {page.gapSections.map((section) => (
            <article key={section.title} className="seo-competitor-gap-card">
              <h3>{section.title}</h3>
              <p>{section.summary}</p>
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {page.testimonials.length ? (
        <section className="seo-section">
          <div className="seo-section__head">
            <h2 className="seo-section__title">Why teams try PartGenie</h2>
          </div>
          <div className="seo-competitor-testimonials">
            {page.testimonials.map((testimonial) => (
              <figure key={`${testimonial.name}-${testimonial.quote}`} className="seo-competitor-testimonial">
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <QaBlocks items={page.faq} />

      <section className="seo-section">
        <div className="seo-competitor-related">
          <div>
            <h2>{page.cta.title}</h2>
            <p>{page.cta.body}</p>
          </div>
          <div className="seo-competitor-related__actions">
            <a className="seo-btn seo-btn--dark" href={ctaHref} target="_blank" rel="noopener noreferrer">
              {page.cta.label}
            </a>
            {page.relatedComparisons.map((link) => (
              <Link key={link.href} className="seo-btn seo-btn--secondary" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
