import { Stars02Icon } from '@/components/seo/stars-02-icon'
import type { AiVerdict, ReplacementDifficulty, SourcingRisk } from '@/types/seo-intelligence'

function difficultyLabel(level: ReplacementDifficulty): string {
  if (level === 'low') return 'Low'
  if (level === 'medium') return 'Moderate'
  return 'High'
}

function sourcingLabel(level: SourcingRisk, context?: string): string {
  const base = level === 'low' ? 'Low' : level === 'medium' ? 'Medium' : 'High'
  return context ? `${base} — ${context}` : base
}

/** Untitled UI status dot (Avatar online indicator / feed dot, Figma 6277:264606). */
function VerdictStatusDot({ variant }: { variant: 'good' | 'avoid' | 'check' }) {
  return <span className={`seo-verdict-dot seo-verdict-dot--${variant}`} aria-hidden="true" />
}

export function AiSummaryHeading() {
  return (
    <h2 className="seo-card__title seo-ai-summary__title seo-ai-summary__title--lead">
      <Stars02Icon className="seo-ai-summary__icon" />
      AI summary
    </h2>
  )
}

export function AiVerdictCard({
  verdict,
  sourcingContext,
  hideHeading = false,
  hideFooter = false,
}: {
  verdict: AiVerdict
  sourcingContext?: string
  hideHeading?: boolean
  /** Temporarily hide replacement difficulty / sourcing risk row. */
  hideFooter?: boolean
}) {
  return (
    <section className="seo-section seo-ai-summary">
      {hideHeading ? null : <AiSummaryHeading />}
      <div className="seo-verdict-card seo-verdict-card--embedded">
        <div className="seo-verdict-columns">
          <div className="seo-verdict-block seo-verdict-block--good">
            <h3 className="seo-verdict-block__title">
              <VerdictStatusDot variant="good" />
              Best for
            </h3>
            <ul>
              {verdict.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="seo-verdict-block seo-verdict-block--avoid">
            <h3 className="seo-verdict-block__title">
              <VerdictStatusDot variant="avoid" />
              Avoid if
            </h3>
            <ul>
              {verdict.avoidIf.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="seo-verdict-block seo-verdict-block--check">
            <h3 className="seo-verdict-block__title">
              <VerdictStatusDot variant="check" />
              Check before use
            </h3>
            <ul>
              {verdict.checkBeforeUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        {hideFooter ? null : (
          <footer className="seo-verdict-footer">
            <div>
              <span className="seo-verdict-footer__label">Replacement difficulty</span>
              <strong>{difficultyLabel(verdict.replacementDifficulty)}</strong>
            </div>
            <div>
              <span className="seo-verdict-footer__label">Sourcing risk</span>
              <strong>{sourcingLabel(verdict.sourcingRisk, sourcingContext)}</strong>
            </div>
          </footer>
        )}
      </div>
    </section>
  )
}
