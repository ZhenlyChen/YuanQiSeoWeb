'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { UIBadge } from '@/components/ui/ui-badge'
import { partImageForMpn } from '@/lib/part-images'
import { SEO_PUBLIC_BOUNDARY, buildCategoryTopPartsGateStats } from '@/lib/seo-copy'
import { MARKETING_TOOL_PAGES, signUpUrl } from '@/lib/tool-urls'
import type { TopSearchedPartItem } from '@/types/seo-intelligence'

const MAX_VISIBLE = 10
const FREE_VISIBLE = 3

function rankBadgeTone(rank: number): 'danger' | 'warning' | 'neutral' {
  if (rank === 1) return 'danger'
  if (rank <= 3) return 'warning'
  return 'neutral'
}

function TopSearchedPartRow({
  item,
  rank,
  variant,
}: {
  item: TopSearchedPartItem
  rank: number
  variant: 'default' | 'category'
}) {
  const imageSrc = item.imageUrl?.trim() || partImageForMpn(item.mpn)
  const showCategoryColumns = variant === 'category'

  return (
    <tr className="seo-top-parts__row">
      <td className="seo-top-parts__rank">
        <UIBadge tone={rankBadgeTone(rank)} className="seo-top-parts__rank-badge">
          #{rank}
        </UIBadge>
      </td>
      <td className="seo-top-parts__part">
        <div className="seo-top-parts__part-inner">
          <div className="seo-top-parts__thumb">
            <img src={imageSrc} alt="" />
          </div>
          <Link href={item.href} className="seo-top-parts__part-link">
            {item.mpn}
          </Link>
        </div>
      </td>
      {showCategoryColumns ? (
        <>
          <td className="seo-top-parts__manufacturer">{item.manufacturer ?? '—'}</td>
          <td className="seo-top-parts__keyspecs">{item.keySpecs ?? '—'}</td>
        </>
      ) : null}
      <td className="seo-top-parts__category">{item.category}</td>
    </tr>
  )
}

function TopSearchedPartsTableBody({
  items,
  startRank = 1,
  variant,
}: {
  items: TopSearchedPartItem[]
  startRank?: number
  variant: 'default' | 'category'
}) {
  return (
    <>
      {items.map((item, index) => (
        <TopSearchedPartRow
          key={`${item.href}-${item.mpn}`}
          item={item}
          rank={startRank + index}
          variant={variant}
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
}: {
  title?: string
  slug: string
  items: TopSearchedPartItem[]
  variant?: 'default' | 'category'
  intro?: string
  emptyMessage?: string
  catalogCta?: { label: string; href?: string }
}) {
  const { isLoggedIn, isReady } = useSeoNavUser()
  const showGated = !isReady || !isLoggedIn
  const showCategoryColumns = variant === 'category'
  const isEmpty = items.length === 0

  const ranked = isEmpty
    ? []
    : [...items].sort((a, b) => b.interest - a.interest).slice(0, MAX_VISIBLE)
  const preview = ranked.slice(0, FREE_VISIBLE)
  const locked = ranked.slice(FREE_VISIBLE)
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
          <>
            <th className="seo-top-parts__th seo-top-parts__th--manufacturer" scope="col">
              Manufacturer
            </th>
            <th className="seo-top-parts__th seo-top-parts__th--keyspecs" scope="col">
              Key Specs
            </th>
          </>
        ) : null}
        <th className="seo-top-parts__th seo-top-parts__th--category" scope="col">
          Category
        </th>
      </tr>
    </thead>
  )

  const gatedWrapStyle = {
    ['--seo-top-parts-locked-rows' as string]: String(Math.max(locked.length, 1)),
  } satisfies CSSProperties

  return (
    <section
      className={`seo-section seo-top-parts${showCategoryColumns ? ' seo-top-parts--category' : ''}`}
    >
      <div className="seo-top-parts__card">
        <header className="seo-top-parts__head">
          <div className="seo-top-parts__title-row">
            <h2 className="seo-top-parts__title">{title}</h2>
            <span className="seo-top-parts__live">
              <span className="seo-top-parts__live-dot" aria-hidden="true" />
              Live
            </span>
          </div>
          {intro ? <p className="seo-top-parts__intro">{intro}</p> : null}
        </header>

        {isEmpty ? (
          emptyMessage ? <p className="seo-top-parts__empty">{emptyMessage}</p> : null
        ) : showGated && locked.length > 0 ? (
          <div
            className="seo-top-parts-gated-wrap seo-top-parts-gated-wrap--active"
            style={gatedWrapStyle}
          >
            <table className="seo-top-parts__table">
              {tableHead}
              <tbody>
                <TopSearchedPartsTableBody items={preview} variant={variant} />
              </tbody>
            </table>
            <div className="seo-top-parts-blurred" aria-hidden="true">
              <table className="seo-top-parts__table">
                <tbody>
                  <TopSearchedPartsTableBody
                    items={locked}
                    startRank={FREE_VISIBLE + 1}
                    variant={variant}
                  />
                </tbody>
              </table>
            </div>
            <AlternativesGateModal
              alternativesCount={locked.length}
              stats={variant === 'category' ? buildCategoryTopPartsGateStats(locked.length) : undefined}
              ctaHref={gateHref}
              title={SEO_PUBLIC_BOUNDARY.topPartsGateTitle}
              description={SEO_PUBLIC_BOUNDARY.topPartsGateDescription}
              ctaLabel={SEO_PUBLIC_BOUNDARY.topPartsGateCta}
            />
          </div>
        ) : (
          <table className="seo-top-parts__table">
            {tableHead}
            <tbody>
              <TopSearchedPartsTableBody items={ranked} variant={variant} />
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
