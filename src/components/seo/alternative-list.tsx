'use client'

import Link from 'next/link'
import { useState, type CSSProperties } from 'react'
import type { AlternativeItem } from '@/types/seo-intelligence'
import { AlternativesViewToggle } from '@/components/seo/alternatives-view-toggle'
import { SectionTitle } from '@/components/seo/section-title'
import { alternativeMatchLabel } from '@/lib/alternative-match-labels'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'
import { partImageForMpn } from '@/lib/part-images'
import { signUpUrl } from '@/lib/tool-urls'

function AlternativeListRow({ alt }: { alt: AlternativeItem }) {
  return (
    <div className="seo-alt-row">
      <div className="seo-alt-thumb">
        <img src={partImageForMpn(alt.mpn)} alt="" />
      </div>
      <div className="seo-alt-row__main">
        <div className="seo-alt-row__headline">
          <Link href={alt.href}>{alt.mpn}</Link>
          <span className="seo-alt-row__mfg">{alt.manufacturer}</span>
        </div>
        <p className="seo-alt-row__reason">{alt.reason}</p>
      </div>
      <span className="seo-alt-row__badge">{alternativeMatchLabel(alt.matchType)}</span>
    </div>
  )
}

function AlternativesGatedTable({ items }: { items: AlternativeItem[] }) {
  return (
    <div className="seo-alt-view seo-alt-table-wrap">
      <table className="seo-alt-table seo-table--webapp">
        <thead>
          <tr>
            <th scope="col">Part</th>
            <th scope="col">Details</th>
            <th scope="col" className="seo-alt-table__col-match">
              Match
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((alt) => (
            <tr key={alt.mpn}>
              <td className="seo-alt-table__cell-part">
                <div className="seo-alt-table__part">
                  <div className="seo-alt-thumb">
                    <img src={partImageForMpn(alt.mpn)} alt="" />
                  </div>
                  <div className="seo-alt-table__part-text">
                    <Link href={alt.href} className="seo-alt-table__mpn">
                      {alt.mpn}
                    </Link>
                    <span className="seo-alt-row__mfg">{alt.manufacturer}</span>
                  </div>
                </div>
              </td>
              <td className="seo-alt-table__cell-details">
                <p className="seo-alt-table__reason">{alt.reason}</p>
              </td>
              <td className="seo-alt-table__cell-match">
                <span className="seo-alt-row__badge">{alternativeMatchLabel(alt.matchType)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AlternativesGraphPlaceholder({
  items,
  centerMpn,
  blurred = false,
}: {
  items: AlternativeItem[]
  centerMpn?: string
  blurred?: boolean
}) {
  const satellites = items.slice(0, 8)
  const center = centerMpn ?? 'Target part'

  return (
    <div
      className={`seo-alt-view seo-alt-graph-placeholder${blurred ? ' seo-alt-graph-placeholder--blurred' : ''}`}
      aria-hidden="true"
    >
      <div className="seo-alt-graph-placeholder__canvas">
        <svg className="seo-alt-graph-placeholder__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {satellites.map((_, index) => {
            const angle = (index / satellites.length) * Math.PI * 2 - Math.PI / 2
            const x = 50 + Math.cos(angle) * 38
            const y = 50 + Math.sin(angle) * 36
            return <line key={index} x1="50" y1="50" x2={x} y2={y} />
          })}
        </svg>
        <div className="seo-alt-graph-placeholder__node seo-alt-graph-placeholder__node--center">{center}</div>
        {satellites.map((alt, index) => {
          const angle = (index / satellites.length) * Math.PI * 2 - Math.PI / 2
          const left = 50 + Math.cos(angle) * 38
          const top = 50 + Math.sin(angle) * 36
          return (
            <div
              key={alt.mpn}
              className="seo-alt-graph-placeholder__node seo-alt-graph-placeholder__node--sat"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {alt.mpn}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function AlternativeList({
  items,
  title = 'Alternative components',
  emptyMessage,
  viewAllHref,
  showViewToggle = false,
  gated = false,
  gatedCtaHref,
  gatedTitle,
  gatedDescription,
  gatedCtaLabel = SEO_PUBLIC_BOUNDARY.gateModalCta,
  slug,
  mpn,
}: {
  items: AlternativeItem[]
  title?: string
  emptyMessage?: string
  /** @deprecated Use showViewToggle instead */
  viewAllHref?: string
  showViewToggle?: boolean
  /** @deprecated List view is always used; card layout removed */
  layout?: 'list' | 'card'
  gated?: boolean
  gatedCtaHref?: string
  gatedTitle?: string
  gatedDescription?: string
  gatedCtaLabel?: string
  slug?: string
  mpn?: string
}) {
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list')
  const resolvedGateHref = gatedCtaHref ?? (slug ? signUpUrl(slug) : undefined)
  const useToggle = showViewToggle
  const showGraph = useToggle && viewMode === 'graph'

  const headAction = useToggle ? (
    <AlternativesViewToggle active={viewMode} onChange={setViewMode} />
  ) : viewAllHref ? (
    <Link href={viewAllHref} className="seo-section__link">
      View all alternatives →
    </Link>
  ) : null

  const gateOverlay = gated ? (
    <AlternativesGateModal
      alternativesCount={items.length}
      ctaHref={resolvedGateHref}
      title={gatedTitle}
      description={gatedDescription}
      ctaLabel={gatedCtaLabel}
    />
  ) : null

  const cardHead = (
    <div className="seo-alt-section-head">
      <div className="seo-alt-section-head__title-wrap">
        <SectionTitle title={title} />
        {items.length > 0 ? <span className="seo-alt-section-head__count">{items.length}</span> : null}
        <button
          type="button"
          className="seo-alt-section-head__info"
          aria-label="Alternatives are ranked by pin compatibility, electrical fit, and lifecycle risk."
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.25" stroke="#98A2B3" strokeWidth="1.25" />
            <path d="M8 7.2V11" stroke="#98A2B3" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="8" cy="5.1" r="0.75" fill="#98A2B3" />
          </svg>
        </button>
      </div>
      {headAction ? <div className="seo-alt-section-head__actions">{headAction}</div> : null}
    </div>
  )

  const gatedWrapClass = `seo-alt-gated-wrap${gated ? ' seo-alt-gated-wrap--active' : ''}`
  const altRowCount = Math.max(items.length, 1)
  const altViewWrapStyle = {
    ['--seo-alt-rows' as string]: String(altRowCount),
  } satisfies CSSProperties

  return (
    <section className="seo-section seo-section--flat">
      {items.length === 0 ? (
        <div className="seo-section-block">
          {cardHead}
          <p>{emptyMessage ?? 'Alternatives are being enriched. Analyze this part in PartGenie for the latest matches.'}</p>
        </div>
      ) : (
        <div className="seo-section-block">
          {cardHead}
          <div
            className={gatedWrapClass}
            style={altViewWrapStyle}
            data-alt-rows={altRowCount}
            aria-live="polite"
            aria-label={showGraph ? 'Alternatives graph view' : 'Alternatives list view'}
          >
            {showGraph ? (
              <AlternativesGraphPlaceholder items={items} centerMpn={mpn} blurred={gated} />
            ) : gated ? (
              <div className="seo-alt-list--blurred">
                <AlternativesGatedTable items={items} />
              </div>
            ) : (
              <div className="seo-alt-view seo-alt-list" aria-label={`${items.length} alternative components`}>
                {items.map((alt) => (
                  <AlternativeListRow key={alt.mpn} alt={alt} />
                ))}
              </div>
            )}
            {gateOverlay}
          </div>
        </div>
      )}
    </section>
  )
}
