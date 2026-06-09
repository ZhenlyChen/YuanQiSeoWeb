'use client'

import Link from 'next/link'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { UIBadge } from '@/components/ui/ui-badge'
import { formatCategoryLabel } from '@/lib/category-display'
import { cn } from '@/lib/cn'
import { partImageForMpn } from '@/lib/part-images'
import { SEO_PUBLIC_BOUNDARY, buildCategoryTopPartsGateStats, buildGeneralGateStats } from '@/lib/seo-copy'
import { MARKETING_TOOL_PAGES, signUpUrl } from '@/lib/tool-urls'
import type { TopSearchedPartItem } from '@/types/seo-intelligence'

const MAX_VISIBLE = 10
const FREE_VISIBLE = 3
const LOCKED_SLOT_COUNT = MAX_VISIBLE - FREE_VISIBLE

function placeholderPart(index: number): TopSearchedPartItem {
  return {
    mpn: `__placeholder_${index}`,
    href: '#',
    category: '',
    interest: 0,
  }
}

function isPlaceholderPart(item: TopSearchedPartItem): boolean {
  return item.mpn.startsWith('__placeholder_')
}

function padParts(items: TopSearchedPartItem[], target: number): TopSearchedPartItem[] {
  const out = items.slice(0, target)
  while (out.length < target) {
    out.push(placeholderPart(out.length))
  }
  return out
}

function rankBadgeTone(rank: number): 'danger' | 'warning' | 'neutral' {
  if (rank === 1) return 'danger'
  if (rank <= 3) return 'warning'
  return 'neutral'
}

function formatDemandTooltip(item: TopSearchedPartItem): string | undefined {
  const breakdown = item.demandBreakdown
  if (!breakdown) return undefined
  const parts = [
    breakdown.proxy != null ? `proxy ${breakdown.proxy}` : null,
    breakdown.chat != null ? `chat ${breakdown.chat}` : null,
    breakdown.rfq != null ? `rfq ${breakdown.rfq}` : null,
    breakdown.bom != null ? `bom ${breakdown.bom}` : null,
    breakdown.seo != null ? `seo ${breakdown.seo}` : null,
  ].filter(Boolean)
  if (parts.length === 0) return undefined
  const suffix = item.computedAt ? ` · ${item.computedAt}` : ''
  return parts.join(' · ') + suffix
}

function TopSearchedPartRow({
  item,
  rank,
  variant,
  showDemandScores,
}: {
  item: TopSearchedPartItem
  rank: number
  variant: 'default' | 'category'
  showDemandScores?: boolean
}) {
  const imageSrc = item.imageUrl?.trim() || partImageForMpn(item.mpn)
  const partHref = item.href?.trim() || '#'
  const showCategoryColumns = variant === 'category'
  const placeholder = isPlaceholderPart(item)

  return (
    <tr className={cn('seo-top-parts__row', placeholder && 'seo-top-parts__row--placeholder')}>
      <td className="seo-top-parts__rank">
        {placeholder ? (
          '\u00a0'
        ) : (
          <UIBadge tone={rankBadgeTone(rank)} className="seo-top-parts__rank-badge">
            #{rank}
          </UIBadge>
        )}
      </td>
      <td className="seo-top-parts__part">
        {placeholder ? (
          '\u00a0'
        ) : (
          <div className="seo-top-parts__part-inner">
            <div className="seo-top-parts__thumb">
              <img src={imageSrc} alt="" />
            </div>
            <Link href={partHref} className="seo-top-parts__part-link">
              {item.mpn}
            </Link>
          </div>
        )}
      </td>
      {showCategoryColumns ? (
        <td className="seo-top-parts__category">{placeholder ? '\u00a0' : (formatCategoryLabel(item.category) || '—')}</td>
      ) : null}
      {showDemandScores ? (
        <td
          className="seo-top-parts__score"
          title={placeholder ? undefined : formatDemandTooltip(item)}
        >
          {placeholder ? '\u00a0' : (item.demandScore ?? item.interest)}
        </td>
      ) : null}
      {variant !== 'category' ? (
        <td className="seo-top-parts__category">{placeholder ? '\u00a0' : (formatCategoryLabel(item.category) || '—')}</td>
      ) : null}
    </tr>
  )
}

function TopSearchedPartsTableBody({
  items,
  startRank = 1,
  variant,
  showDemandScores,
}: {
  items: TopSearchedPartItem[]
  startRank?: number
  variant: 'default' | 'category'
  showDemandScores?: boolean
}) {
  return (
    <>
      {items.map((item, index) => (
        <TopSearchedPartRow
          key={`${item.href}-${item.mpn}`}
          item={item}
          rank={startRank + index}
          variant={variant}
          showDemandScores={showDemandScores}
        />
      ))}
    </>
  )
}

export function TopSearchedPartsTable({
  title = 'Most searched parts',
  slug,
  items,
  variant = 'default',
  intro,
  emptyMessage,
  catalogCta,
  showLiveBadge = true,
  gateTitle,
  gateDescription,
  showDemandScores = false,
}: {
  title?: string
  slug: string
  items: TopSearchedPartItem[]
  variant?: 'default' | 'category'
  intro?: string
  emptyMessage?: string
  catalogCta?: { label: string; href?: string }
  showLiveBadge?: boolean
  gateTitle?: string
  gateDescription?: string
  /** Preview-only: show internal demand score column. */
  showDemandScores?: boolean
}) {
  const { isLoggedIn, isReady } = useSeoNavUser()
  const showGated = !isReady || !isLoggedIn
  const showCategoryColumns = variant === 'category'
  const isEmpty = items.length === 0

  const ranked = isEmpty
    ? []
    : [...items].sort((a, b) => b.interest - a.interest).slice(0, MAX_VISIBLE)
  const preview = isEmpty ? padParts([], FREE_VISIBLE) : ranked.slice(0, FREE_VISIBLE)
  const locked = isEmpty
    ? padParts([], LOCKED_SLOT_COUNT)
    : padParts(ranked.slice(FREE_VISIBLE), LOCKED_SLOT_COUNT)
  const useGatedLayout = isEmpty || showGated
  const hiddenPartsCount = isEmpty ? 1 : Math.max(ranked.length - FREE_VISIBLE, 1)
  const gateHref = signUpUrl(slug)
  const catalogHref = catalogCta?.href ?? MARKETING_TOOL_PAGES.componentFinder

  const tableHead = (
    <thead>
      <tr>
        <th className="seo-top-parts__th seo-top-parts__th--rank" scope="col">
          #
        </th>
        <th className="seo-top-parts__th seo-top-parts__th--part" scope="col">
          Part
        </th>
        {showCategoryColumns ? (
          <th className="seo-top-parts__th seo-top-parts__th--category" scope="col">
            Category
          </th>
        ) : null}
        {showDemandScores ? (
          <th className="seo-top-parts__th seo-top-parts__th--score" scope="col">
            Score
          </th>
        ) : null}
        {variant !== 'category' ? (
          <th className="seo-top-parts__th seo-top-parts__th--category" scope="col">
            Category
          </th>
        ) : null}
      </tr>
    </thead>
  )

  return (
    <section
      className={`seo-section seo-top-parts${showCategoryColumns ? ' seo-top-parts--category' : ''}`}
    >
      <div className="seo-top-parts__card">
        <header className="seo-top-parts__head">
          <div className="seo-top-parts__title-row">
            <h2 className="seo-top-parts__title">{title}</h2>
            {showLiveBadge ? (
              <span className="seo-top-parts__live">
                <span className="seo-top-parts__live-dot" aria-hidden="true" />
                Live
              </span>
            ) : null}
          </div>
          {intro ? <p className="seo-top-parts__intro">{intro}</p> : null}
        </header>

        {useGatedLayout ? (
          <div className="seo-top-parts-gated-wrap seo-top-parts-gated-wrap--active">
            <table className="seo-top-parts__table">
              {tableHead}
              <tbody>
                <TopSearchedPartsTableBody items={preview} variant={variant} showDemandScores={showDemandScores} />
              </tbody>
            </table>
            <div className="seo-top-parts-gated-locked">
              <div className="seo-top-parts-blurred" aria-hidden="true">
                <table className="seo-top-parts__table">
                  <tbody>
                    <TopSearchedPartsTableBody
                      items={locked}
                      startRank={FREE_VISIBLE + 1}
                      variant={variant}
                      showDemandScores={showDemandScores}
                    />
                  </tbody>
                </table>
              </div>
              <AlternativesGateModal
                alternativesCount={hiddenPartsCount}
                stats={
                  variant === 'category'
                    ? buildCategoryTopPartsGateStats(hiddenPartsCount)
                    : buildGeneralGateStats()
                }
                ctaHref={gateHref}
                title={gateTitle ?? SEO_PUBLIC_BOUNDARY.topPartsGateTitle}
                description={gateDescription ?? SEO_PUBLIC_BOUNDARY.topPartsGateDescription}
                ctaLabel={SEO_PUBLIC_BOUNDARY.topPartsGateCta}
              />
            </div>
          </div>
        ) : (
          <table className="seo-top-parts__table">
            {tableHead}
            <tbody>
              <TopSearchedPartsTableBody
                items={padParts(ranked, MAX_VISIBLE)}
                variant={variant}
                showDemandScores={showDemandScores}
              />
            </tbody>
          </table>
        )}

        {catalogCta ? (
          <div className="seo-top-parts__footer">
            <a
              href={catalogHref}
              className="seo-primary-cta seo-primary-cta--compact"
              target="_blank"
              rel="noopener noreferrer"
            >
              {catalogCta.label}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
