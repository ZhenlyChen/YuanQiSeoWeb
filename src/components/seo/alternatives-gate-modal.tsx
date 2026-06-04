import { SEO_PUBLIC_BOUNDARY, buildAlternativesGateStats } from '@/lib/seo-copy'

function GatePatternDecor() {
  return (
    <svg width="336" height="336" viewBox="0 0 336 336" fill="none" aria-hidden="true">
      {[56, 88, 120, 152].map((r) => (
        <circle key={r} cx="168" cy="168" r={r} stroke="#E4E7EC" strokeWidth="1" />
      ))}
    </svg>
  )
}

function LockFeaturedIcon() {
  return (
    <div className="seo-alt-gate-modal__lock" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 10.5V8.5C16 5.73858 13.7614 3.5 11 3.5C8.23858 3.5 6 5.73858 6 8.5V10.5M6 10.5H16C17.1046 10.5 18 11.3954 18 12.5V17.5C18 18.6046 17.1046 19.5 16 19.5H6C4.89543 19.5 4 18.6046 4 17.5V12.5C4 11.3954 4.89543 10.5 6 10.5Z"
          stroke="#344054"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function CheckCircleIcon() {
  return (
    <svg className="seo-alt-gate-modal__check" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#22808D" />
      <path
        d="M8 12.5L10.5 15L16 9.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AlternativesGateModal({
  alternativesCount,
  ctaHref,
  title = SEO_PUBLIC_BOUNDARY.gateModalTitle,
  description = SEO_PUBLIC_BOUNDARY.gateModalDescription,
  ctaLabel = SEO_PUBLIC_BOUNDARY.gateModalCta,
}: {
  alternativesCount: number
  ctaHref?: string
  title?: string
  description?: string
  ctaLabel?: string
}) {
  const stats = buildAlternativesGateStats(alternativesCount)

  return (
    <div className="seo-alt-gated-overlay" role="dialog" aria-labelledby="seo-alt-gate-title">
      <div className="seo-alt-gate-modal">
        <div className="seo-alt-gate-modal__header">
          <div className="seo-alt-gate-modal__pattern" aria-hidden="true">
            <GatePatternDecor />
          </div>
          <LockFeaturedIcon />
          <div className="seo-alt-gate-modal__copy">
            <h3 id="seo-alt-gate-title" className="seo-alt-gate-modal__title">
              {title}
            </h3>
            <p className="seo-alt-gate-modal__desc">{description}</p>
          </div>
          <div className="seo-alt-gate-modal__header-spacer" aria-hidden="true" />
        </div>

        <div className="seo-alt-gate-modal__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="seo-alt-gate-modal__stat">
              <div className="seo-alt-gate-modal__stat-head">
                <CheckCircleIcon />
                <p className="seo-alt-gate-modal__stat-value">{stat.value}</p>
              </div>
              <p className="seo-alt-gate-modal__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {ctaHref ? (
          <div className="seo-alt-gate-modal__footer">
            <a className="seo-btn seo-btn--untitled-primary seo-alt-gate-modal__cta" href={ctaHref}>
              {ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}
