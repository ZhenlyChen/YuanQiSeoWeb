import Link from 'next/link'
import type { AlternativeItem } from '@/types/seo-intelligence'
import { SectionTitle } from '@/components/seo/section-title'
import { UIBadge } from '@/components/ui/ui-badge'
import { UICard } from '@/components/ui/ui-card'
import { partImageForMpn } from '@/lib/part-images'

export function AlternativeList({
  items,
  title = 'Alternative components',
  emptyMessage,
  viewAllHref,
  layout = 'list',
  gated = false,
  gatedCtaHref,
  gatedTitle = 'Sign in to view full alternatives',
  gatedDescription = 'Unlock ranked substitutes, validation risk notes, and package/electrical compatibility details in PartGenie.',
}: {
  items: AlternativeItem[]
  title?: string
  emptyMessage?: string
  viewAllHref?: string
  layout?: 'list' | 'card'
  gated?: boolean
  gatedCtaHref?: string
  gatedTitle?: string
  gatedDescription?: string
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
      {items.length === 0 ? (
        <UICard className="seo-card">
          <p>{emptyMessage ?? 'Alternatives are being enriched. Analyze this part in PartGenie for the latest matches.'}</p>
        </UICard>
      ) : layout === 'card' ? (
        <div className={`seo-alt-gated-wrap ${gated ? 'seo-alt-gated-wrap--active' : ''}`}>
          <div className={`seo-alt-card-grid ${gated ? 'seo-alt-card-grid--blurred' : ''}`}>
          {items.map((alt) => (
            <article key={alt.mpn} className="seo-alt-compact-card">
              <div className="seo-alt-compact-card__image">
                <img src={partImageForMpn(alt.mpn)} alt={`${alt.mpn} package`} />
              </div>
              <div className="seo-alt-compact-card__body">
                <div className="seo-alt-compact-card__head">
                  <Link href={alt.href} className="seo-alt-compact-card__mpn">
                    {alt.mpn}
                  </Link>
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
                <p className="seo-alt-compact-card__mfg">{alt.manufacturer}</p>
                <p className="seo-alt-compact-card__reason">{alt.reason}</p>
              </div>
            </article>
          ))}
          </div>
          {gated ? (
            <div className="seo-alt-gated-overlay">
              <div className="seo-alt-gated-overlay__card">
                <p className="seo-alt-gated-overlay__title">{gatedTitle}</p>
                <p className="seo-alt-gated-overlay__desc">{gatedDescription}</p>
                {gatedCtaHref ? (
                  <a className="seo-btn seo-btn--dark" href={gatedCtaHref}>
                    View full alternatives
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <UICard className="seo-card">
          {items.map((alt) => (
            <div key={alt.mpn} className="seo-alt-row">
              <div className="seo-alt-thumb">
                <img src={partImageForMpn(alt.mpn)} alt={`${alt.mpn} thumbnail`} />
              </div>
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
          ))}
        </UICard>
      )}
    </section>
  )
}
