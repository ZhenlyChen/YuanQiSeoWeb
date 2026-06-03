import Link from 'next/link'
import type { AlternativeItem } from '@/types/seo-intelligence'
import { SectionTitle } from '@/components/seo/section-title'
import { UIBadge } from '@/components/ui/ui-badge'
import { UIButton } from '@/components/ui/ui-button'

const FACTOR_LABELS: { key: keyof NonNullable<AlternativeItem['compatibility']>; label: string }[] =
  [
    { key: 'package', label: 'Package' },
    { key: 'pinout', label: 'Pinout' },
    { key: 'voltage', label: 'Voltage' },
    { key: 'temperature', label: 'Temperature' },
    { key: 'interface', label: 'Interface' },
    { key: 'lifecycle', label: 'Lifecycle' },
    { key: 'application', label: 'Application' },
  ]

function FactorIcon({ status }: { status: 'match' | 'partial' | 'mismatch' }) {
  if (status === 'match') return <span className="seo-factor-icon seo-factor-icon--match">✓</span>
  if (status === 'partial') return <span className="seo-factor-icon seo-factor-icon--partial">~</span>
  return <span className="seo-factor-icon seo-factor-icon--mismatch">✕</span>
}

export function AlternativeRichList({
  items,
  title = 'Recommended alternatives',
  viewAllHref,
}: {
  items: AlternativeItem[]
  title?: string
  viewAllHref?: string
}) {
  return (
    <section className="seo-section">
      <div className="seo-section__head">
        <SectionTitle title={title} icon="alternatives" />
        {viewAllHref ? (
          <Link href={viewAllHref} className="seo-section__link">
            View all alternatives →
          </Link>
        ) : null}
      </div>
      <div className="seo-alt-cards">
        {items.map((alt) => (
          <article key={alt.mpn} className="seo-alt-card">
            <header className="seo-alt-card__header">
              <div>
                <Link href={alt.href} className="seo-alt-card__mpn">
                  {alt.mpn}
                </Link>
                <p className="seo-alt-card__mfg">{alt.manufacturer}</p>
              </div>
              <div className="seo-alt-card__badges">
                <UIBadge
                  tone={
                    alt.matchType === 'exact'
                      ? 'success'
                      : alt.matchType === 'pin-compatible'
                        ? 'info'
                        : alt.matchType === 'functional'
                          ? 'warning'
                          : 'danger'
                  }
                >
                  {alt.matchType.replace('-', ' ')}
                </UIBadge>
                {alt.riskLevel ? (
                  <UIBadge tone={alt.riskLevel === 'high' ? 'danger' : alt.riskLevel === 'medium' ? 'warning' : 'success'}>
                    {alt.riskLevel} risk
                  </UIBadge>
                ) : null}
              </div>
            </header>
            <p className="seo-alt-card__reason">{alt.reason}</p>
            {alt.compatibility ? (
              <div className="seo-alt-card__factors">
                {FACTOR_LABELS.map(({ key, label }) => (
                  <div key={key} className="seo-alt-card__factor">
                    <FactorIcon status={alt.compatibility![key]} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="seo-alt-card__actions">
              {alt.compareHref ? (
                <UIButton href={alt.compareHref} variant="dark" size="sm">
                  Compare specs
                </UIButton>
              ) : null}
              <UIButton href={alt.href} variant="secondary" size="sm">
                View details
              </UIButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
