'use client'

import Link from 'next/link'
import { useState, type CSSProperties } from 'react'
import type { AlternativeItem } from '@/types/seo-intelligence'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { AlternativesGraphPlaceholder } from '@/components/seo/alternative-list'
import { AlternativesViewToggle, type AlternativesViewMode } from '@/components/seo/alternatives-view-toggle'
import { SectionTitle } from '@/components/seo/section-title'
import { UIBadge } from '@/components/ui/ui-badge'
import { UIButton } from '@/components/ui/ui-button'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'
import { partImageForMpn } from '@/lib/part-images'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { buildCompareChatQuery, fillSeoFloatingChat } from '@/lib/seo-floating-chat'
import { signUpUrl } from '@/lib/tool-urls'

const GATED_BACKDROP_MIN_ROWS = 4
const GATED_BLURRED_MIN_ROWS = 3

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

function AlternativeRichListItem({
  alt,
  sourceMpn,
}: {
  alt: AlternativeItem
  sourceMpn?: string
}) {
  const canCompare = Boolean(sourceMpn && sourceMpn !== alt.mpn)

  function handleCompareClick() {
    if (!sourceMpn) return
    fillSeoFloatingChat(buildCompareChatQuery(sourceMpn, alt.mpn))
  }

  return (
    <article className="seo-alt-rich-item">
      <header className="seo-alt-rich-item__header">
        <div className="seo-alt-rich-item__thumb">
          <img src={partImageForMpn(alt.mpn)} alt={`${alt.mpn} package`} />
        </div>
        <div className="seo-alt-rich-item__intro">
          <Link href={alt.href} className="seo-alt-rich-item__mpn">
            {alt.mpn}
          </Link>
          <p className="seo-alt-rich-item__mfg">{alt.manufacturer}</p>
        </div>
        <div className="seo-alt-rich-item__badges">
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
      <p className="seo-alt-rich-item__reason">{alt.reason}</p>
      {alt.compatibility ? (
        <div className="seo-alt-rich-item__factors">
          {FACTOR_LABELS.map(({ key, label }) => (
            <div key={key} className="seo-alt-rich-item__factor">
              <FactorIcon status={alt.compatibility![key]} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="seo-alt-rich-item__actions">
        {canCompare ? (
          <button
            type="button"
            className="ui-button ui-button--primary ui-button--sm"
            onClick={handleCompareClick}
          >
            Compare specs
          </button>
        ) : null}
        <UIButton href={alt.href} variant="secondary" size="sm">
          View details
        </UIButton>
      </div>
    </article>
  )
}

function AlternativeRichListSkeletonItem() {
  return (
    <article className="seo-alt-rich-item seo-alt-rich-item--skeleton" aria-hidden="true">
      <div className="seo-alt-rich-skeleton__header">
        <div className="seo-alt-rich-skeleton__thumb" />
        <div className="seo-alt-rich-skeleton__intro">
          <div className="seo-alt-rich-skeleton__line seo-alt-rich-skeleton__line--title" />
          <div className="seo-alt-rich-skeleton__line seo-alt-rich-skeleton__line--meta" />
        </div>
        <div className="seo-alt-rich-skeleton__badges">
          <div className="seo-alt-rich-skeleton__pill" />
          <div className="seo-alt-rich-skeleton__pill seo-alt-rich-skeleton__pill--sm" />
        </div>
      </div>
      <div className="seo-alt-rich-skeleton__line seo-alt-rich-skeleton__line--body" />
      <div className="seo-alt-rich-skeleton__factors">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="seo-alt-rich-skeleton__chip" />
        ))}
      </div>
      <div className="seo-alt-rich-skeleton__actions">
        <div className="seo-alt-rich-skeleton__button" />
        <div className="seo-alt-rich-skeleton__button seo-alt-rich-skeleton__button--secondary" />
      </div>
    </article>
  )
}

function AlternativesGatedRichList({
  items,
  sourceMpn,
}: {
  items: AlternativeItem[]
  sourceMpn?: string
}) {
  const [preview, ...rest] = items
  const skeletonCount = Math.max(0, GATED_BLURRED_MIN_ROWS - rest.length)

  return (
    <div className="seo-alt-view seo-alt-rich-list-wrap seo-alt-rich-list-wrap--gated">
      <AlternativeRichListItem alt={preview} sourceMpn={sourceMpn} />
      <div className="seo-alt-rich-list-blurred" aria-hidden="true">
        {rest.map((alt) => (
          <AlternativeRichListItem key={alt.mpn} alt={alt} sourceMpn={sourceMpn} />
        ))}
        {Array.from({ length: skeletonCount }, (_, index) => (
          <AlternativeRichListSkeletonItem key={`skeleton-${index}`} />
        ))}
      </div>
    </div>
  )
}

export function AlternativeRichList({
  items,
  title = 'Recommended alternatives',
  gated = false,
  gatedCtaHref,
  gatedTitle,
  gatedDescription,
  gatedCtaLabel = SEO_PUBLIC_BOUNDARY.gateModalCta,
  slug,
  mpn,
  showViewToggle = false,
}: {
  items: AlternativeItem[]
  title?: string
  gated?: boolean
  gatedCtaHref?: string
  gatedTitle?: string
  gatedDescription?: string
  gatedCtaLabel?: string
  slug?: string
  mpn?: string
  showViewToggle?: boolean
}) {
  const [viewMode, setViewMode] = useState<AlternativesViewMode>('list')
  const { isLoggedIn, isReady } = useSeoNavUser()
  const showGated = gated && (!isReady || !isLoggedIn)
  const showGraph = showViewToggle && viewMode === 'graph'
  const resolvedGateHref = gatedCtaHref ?? (slug ? signUpUrl(slug) : undefined)
  const gatedWrapClass = [
    'seo-alt-gated-wrap',
    'seo-alt-gated-wrap--active',
    showGraph ? 'seo-alt-gated-wrap--graph' : 'seo-alt-gated-wrap--rich',
  ].join(' ')
  const altRowCount = Math.max(items.length, GATED_BACKDROP_MIN_ROWS)
  const altViewWrapStyle = {
    ['--seo-alt-rows' as string]: String(altRowCount),
  } satisfies CSSProperties

  const gateOverlay = showGated ? (
    <AlternativesGateModal
      alternativesCount={items.length}
      ctaHref={resolvedGateHref}
      title={gatedTitle}
      description={gatedDescription}
      ctaLabel={gatedCtaLabel}
    />
  ) : null

  const sectionHead = (
    <div className="seo-alt-section-head">
      <div className="seo-alt-section-head__title-wrap">
        <SectionTitle title={title} icon="alternatives" />
        {items.length > 0 ? <span className="seo-alt-section-head__count">{items.length}</span> : null}
      </div>
      {showViewToggle ? (
        <div className="seo-alt-section-head__actions">
          <AlternativesViewToggle active={viewMode} onChange={setViewMode} />
        </div>
      ) : null}
    </div>
  )

  return (
    <section className="seo-section seo-section--flat">
      <div className="seo-section-block">
        {sectionHead}
        {items.length === 0 ? (
          <p>Alternatives are being enriched. Analyze this part in PartGenie for the latest matches.</p>
        ) : showGated ? (
          <div
            className={gatedWrapClass}
            style={altViewWrapStyle}
            data-alt-rows={altRowCount}
            aria-live="polite"
            aria-label={showGraph ? 'Alternatives graph view' : 'Alternatives list view'}
          >
            {showGraph ? (
              <AlternativesGraphPlaceholder items={items} centerMpn={mpn} blurred />
            ) : (
              <AlternativesGatedRichList items={items} sourceMpn={mpn} />
            )}
            {gateOverlay}
          </div>
        ) : (
          <div
            aria-live="polite"
            aria-label={showGraph ? 'Alternatives graph view' : 'Alternatives list view'}
          >
            {showGraph ? (
              <AlternativesGraphPlaceholder items={items} centerMpn={mpn} />
            ) : (
              <div
                className="seo-alt-view seo-alt-rich-list-wrap"
                aria-label={`${items.length} recommended alternatives`}
              >
                {items.map((alt) => (
                  <AlternativeRichListItem key={alt.mpn} alt={alt} sourceMpn={mpn} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
