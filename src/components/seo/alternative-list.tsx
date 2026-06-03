import Link from 'next/link'
import type { AlternativeItem } from '@/types/seo-intelligence'
import { SectionTitle } from '@/components/seo/section-title'
import { UIBadge } from '@/components/ui/ui-badge'
import { UICard } from '@/components/ui/ui-card'

export function AlternativeList({
  items,
  title = 'Alternative components',
  emptyMessage,
  viewAllHref,
}: {
  items: AlternativeItem[]
  title?: string
  emptyMessage?: string
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
      <p className="seo-section__lead">
        Top recommendations for public review. Full ranked analysis is available in PartGenie.
      </p>
      <UICard className="seo-card">
        {items.length === 0 ? (
          <p>{emptyMessage ?? 'Alternatives are being enriched. Analyze this part in PartGenie for the latest matches.'}</p>
        ) : (
          items.map((alt) => (
            <div key={alt.mpn} className="seo-alt-row">
              <div className="seo-alt-row__main">
                <Link href={alt.href}>{alt.mpn}</Link>
                <span style={{ color: 'var(--pg-color-text-placeholder)', marginLeft: 8 }}>
                  {alt.manufacturer}
                </span>
                <p className="seo-alt-row__reason">{alt.reason}</p>
              </div>
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
                className={`seo-badge seo-badge--${alt.matchType}`}
              >
                {alt.matchType.replace('-', ' ')}
              </UIBadge>
            </div>
          ))
        )}
      </UICard>
    </section>
  )
}
