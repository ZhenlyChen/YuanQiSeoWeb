import type { AiVerdict, ReplacementDifficulty, SourcingRisk } from '@/types/seo-intelligence'
import { UICard } from '@/components/ui/ui-card'

function difficultyLabel(level: ReplacementDifficulty): string {
  if (level === 'low') return 'Low'
  if (level === 'medium') return 'Moderate'
  return 'High'
}

function sourcingLabel(level: SourcingRisk, context?: string): string {
  const base = level === 'low' ? 'Low' : level === 'medium' ? 'Medium' : 'High'
  return context ? `${base} — ${context}` : base
}

export function AiVerdictCard({ verdict, sourcingContext }: { verdict: AiVerdict; sourcingContext?: string }) {
  return (
    <section className="seo-section">
      <h2 className="seo-section__title">AI verdict</h2>
      <UICard className="seo-card seo-verdict-card">
        <div className="seo-verdict-columns">
          <div className="seo-verdict-block seo-verdict-block--good">
            <h3 className="seo-verdict-block__title">
              <span className="seo-verdict-icon seo-verdict-icon--good" aria-hidden="true" />
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
              <span className="seo-verdict-icon seo-verdict-icon--avoid" aria-hidden="true" />
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
              <span className="seo-verdict-icon seo-verdict-icon--check" aria-hidden="true" />
              Check before use
            </h3>
            <ul>
              {verdict.checkBeforeUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
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
      </UICard>
    </section>
  )
}
