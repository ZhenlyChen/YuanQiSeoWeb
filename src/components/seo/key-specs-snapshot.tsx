import type { KeySpec } from '@/types/seo-intelligence'

import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'
import { openPartUrl } from '@/lib/tool-urls'

function ApplicationTagIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function KeySpecsSnapshot({
  specs,
  applicationTags = [],
  mpn,
  slug,
}: {
  specs: KeySpec[]
  applicationTags?: string[]
  mpn?: string
  slug?: string
}) {
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
        {applicationTags.length > 0 ? (
          <>
            <hr className="seo-spec-divider" />
            <div className="seo-perplexity-tags" role="list" aria-label="Application fit">
              {applicationTags.map((tag) => (
                <span key={tag} className="seo-perplexity-tag" role="listitem">
                  <ApplicationTagIcon />
                  {tag}
                </span>
              ))}
            </div>
          </>
        ) : null}
        {mpn && slug ? (
          <p className="seo-spec-footer">
            {SEO_PUBLIC_BOUNDARY.specsFooter(mpn)}{' '}
            <a href={openPartUrl(slug)} className="seo-section__link">
              {SEO_PUBLIC_BOUNDARY.specsFooterCta} ↗
            </a>
          </p>
        ) : null}
      </UICard>
    </section>
  )
}
