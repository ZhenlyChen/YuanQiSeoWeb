import type { KeySpec } from '@/types/seo-intelligence'

import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'
import { openPartUrl } from '@/lib/tool-urls'

export function KeySpecsSnapshot({ specs, mpn, slug }: { specs: KeySpec[]; mpn?: string; slug?: string }) {
  return (
    <section className="seo-section">
      <SectionTitle title="Key specifications" icon="specs" />
      <UICard className="seo-card">
        <dl className="seo-spec-grid">
          {specs.map((spec) => (
            <div key={spec.label} className="seo-spec-item">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
        {mpn && slug ? (
          <p style={{ marginTop: 'var(--pg-space-5)', marginBottom: 0 }}>
            <a href={openPartUrl(slug)} className="seo-section__link">
              Sign in to view full datasheet, test conditions, and source confidence ↗
            </a>
          </p>
        ) : null}
      </UICard>
    </section>
  )
}
