'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { AlternativesGateModal } from '@/components/seo/alternatives-gate-modal'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { UIBadge } from '@/components/ui/ui-badge'
import { partImageForMpn } from '@/lib/part-images'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'
import { signUpUrl } from '@/lib/tool-urls'
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
}: {
  item: TopSearchedPartItem
  rank: number
}) {
  const imageSrc = item.imageUrl?.trim() || partImageForMpn(item.mpn)

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
      <td className="seo-top-parts__category">{item.category}</td>
    </tr>
  )
}

function TopSearchedPartsTableBody({ items }: { items: TopSearchedPartItem[] }) {
  return (
    <>
      {items.map((item, index) => (
        <TopSearchedPartRow key={`${item.href}-${item.mpn}`} item={item} rank={index + 1} />
      ))}
    </>
  )
}

export function TopSearchedPartsTable({
  title = 'Most searched parts',
  slug,
  items,
}: {
  title?: string
  slug: string
  items: TopSearchedPartItem[]
}) {
  const { isLoggedIn, isReady } = useSeoNavUser()
  const showGated = !isReady || !isLoggedIn

  if (items.length === 0) return null

  const ranked = [...items].sort((a, b) => b.interest - a.interest).slice(0, MAX_VISIBLE)
  const preview = ranked.slice(0, FREE_VISIBLE)
  const locked = ranked.slice(FREE_VISIBLE)
  const gateHref = signUpUrl(slug)

  const tableHead = (
    <thead>
      <tr>
        <th className="seo-top-parts__th seo-top-parts__th--rank" scope="col">
          #
        </th>
        <th className="seo-top-parts__th seo-top-parts__th--part" scope="col">
          Part
        </th>
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
    <section className="seo-section seo-top-parts">
      <div className="seo-top-parts__card">
        <header className="seo-top-parts__head">
          <div className="seo-top-parts__title-row">
            <h2 className="seo-top-parts__title">{title}</h2>
            <span className="seo-top-parts__live">
              <span className="seo-top-parts__live-dot" aria-hidden="true" />
              Live
            </span>
          </div>
        </header>

        {showGated && locked.length > 0 ? (
          <div
            className="seo-top-parts-gated-wrap seo-top-parts-gated-wrap--active"
            style={gatedWrapStyle}
          >
            <table className="seo-top-parts__table">
              {tableHead}
              <tbody>
                <TopSearchedPartsTableBody items={preview} />
              </tbody>
            </table>
            <div className="seo-top-parts-blurred" aria-hidden="true">
              <table className="seo-top-parts__table">
                {tableHead}
                <tbody>
                  <TopSearchedPartsTableBody items={locked} />
                </tbody>
              </table>
            </div>
            <AlternativesGateModal
              alternativesCount={locked.length}
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
              <TopSearchedPartsTableBody items={ranked} />
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
