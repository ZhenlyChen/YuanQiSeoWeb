import type { KeySpec } from '@/types/seo-intelligence'

import { datasheetAiUrl } from '@/lib/tool-urls'
import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'

export function KeySpecsSnapshot({ specs, mpn }: { specs: KeySpec[]; mpn?: string }) {
  return (
    <section className="seo-section">
      <SectionTitle title="Key specifications" icon="specs" />
      <p className="seo-section__lead">
        Decision-relevant specifications only — not a full parametric catalog.
      </p>
      <UICard className="seo-card">
        <dl className="seo-spec-grid">
          {specs.map((spec) => (
            <div key={spec.label} className="seo-spec-item">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
        {mpn ? (
          <p style={{ marginTop: 'var(--pg-space-5)', marginBottom: 0 }}>
            <a href={datasheetAiUrl(mpn)} className="seo-section__link">
              View full datasheet in Datasheet AI ↗
            </a>
          </p>
        ) : null}
      </UICard>
    </section>
  )
}
