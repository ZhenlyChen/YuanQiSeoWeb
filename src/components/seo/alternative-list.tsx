import Link from 'next/link'
import type { AlternativeItem } from '@/types/seo-intelligence'
import { SectionTitle } from '@/components/seo/section-title'
import { UIBadge } from '@/components/ui/ui-badge'
import { UICard } from '@/components/ui/ui-card'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'
import { partImageForMpn } from '@/lib/part-images'
import { signUpUrl } from '@/lib/tool-urls'

export function AlternativeList({
  items,
  title = 'Alternative components',
  emptyMessage,
  viewAllHref,
  layout = 'list',
  gated = false,
  gatedCtaHref,
  gatedTitle,
  gatedDescription,
  gatedBullets = SEO_PUBLIC_BOUNDARY.gateBullets,
  gatedCtaLabel = SEO_PUBLIC_BOUNDARY.gateCta,
  slug,
  mpn,
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
  gatedBullets?: readonly string[]
  gatedCtaLabel?: string
  slug?: string
  mpn?: string
}) {
  const resolvedGateTitle = gatedTitle ?? (mpn ? SEO_PUBLIC_BOUNDARY.gateTitle(mpn) : 'See ranked alternatives')
  const resolvedGateHref = gatedCtaHref ?? (slug ? signUpUrl(slug) : undefined)

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
                <p className="seo-alt-gated-overlay__title">{resolvedGateTitle}</p>
                <p className="seo-alt-gated-overlay__desc">
                  {gatedDescription ?? SEO_PUBLIC_BOUNDARY.gateDescription}
                </p>
                {gatedBullets.length > 0 ? (
                  <ul className="seo-alt-gated-overlay__list">
                    {gatedBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {resolvedGateHref ? (
                  <a className="seo-btn seo-btn--dark" href={resolvedGateHref}>
                    {gatedCtaLabel}
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
