'use client'

import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRightIcon } from '@/components/seo/arrow-up-right-icon'
import { resolveManufacturerLogo } from '@/lib/manufacturer-logos'
import { manufacturerDirectorySearchActionUrl } from '@/lib/tool-urls'
import type { ManufacturerDirectoryItem } from '@/types/seo-intelligence'

function monogramFor(item: ManufacturerDirectoryItem): string {
  const fromShort = item.shortName?.trim().charAt(0)
  if (fromShort) return fromShort.toUpperCase()
  return item.name.trim().charAt(0).toUpperCase() || 'M'
}

function ManufacturerDirectoryLogo({
  item,
  logo,
}: {
  item: ManufacturerDirectoryItem
  logo?: string
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [logo])

  const monogram = (
    <span className="seo-mfg-dir-card__monogram">{monogramFor(item)}</span>
  )

  if (!logo || failed) {
    return monogram
  }

  return (
    <>
      {!loaded ? monogram : null}
      <img
        src={logo}
        alt=""
        className="seo-mfg-dir-card__logo"
        hidden={!loaded}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  )
}

function knownForTags(raw: string): string[] {
  return raw
    .split(/[,·|/]/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function ManufacturerDirectoryCard({ item }: { item: ManufacturerDirectoryItem }) {
  const logo = resolveManufacturerLogo(item.slug, item.logoUrl)
  const tags = knownForTags(item.knownFor ?? item.subtitle ?? '')
  const intro = item.peekSummary ?? item.popularPaths ?? ''
  const hoverLabel = item.published ? 'View intelligence' : 'Hub coming soon'

  const inner = (
    <>
      <div className="seo-mfg-dir-card__content">
        <div className="seo-mfg-dir-card__head">
          <span className="seo-mfg-dir-card__logo-wrap" aria-hidden="true">
            <ManufacturerDirectoryLogo item={item} logo={logo} />
          </span>
          <span className="seo-mfg-dir-card__name">{item.name}</span>
        </div>
        {tags.length > 0 ? (
          <ul className="seo-mfg-dir-card__tags">
            {tags.map((tag) => (
              <li key={tag} className="seo-mfg-dir-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        {intro ? <p className="seo-mfg-dir-card__intro">{intro}</p> : null}
      </div>
      <div className="seo-mfg-dir-card__hover" aria-hidden="true">
        <span className="seo-mfg-dir-card__hover-cta">
          <span className="seo-mfg-dir-card__hover-text">{hoverLabel}</span>
          {item.published ? <ArrowUpRightIcon className="seo-mfg-dir-card__hover-arrow" /> : null}
        </span>
      </div>
    </>
  )

  const className = `seo-mfg-dir-card${item.published ? '' : ' seo-mfg-dir-card--soon'}`

  if (!item.published) {
    return (
      <div className={className} aria-disabled="true">
        {inner}
      </div>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  )
}

export function ManufacturerDirectoryList({ items }: { items: ManufacturerDirectoryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="seo-mfg-dir-empty">
        <p>No manufacturers match your filters.</p>
        <p className="seo-mfg-dir-empty__hint">
          Try clearing filters or use the hero search to ask PartGenie about a manufacturer.
        </p>
        <form action={manufacturerDirectorySearchActionUrl()} method="get" className="seo-mfg-dir-empty__form">
          <input
            name="q"
            type="search"
            className="seo-mfg-dir-empty__input"
            placeholder="Ask about a manufacturer…"
          />
          <button type="submit" className="seo-mfg-dir-empty__submit">
            Search
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="seo-mfg-dir-grid-wrap">
      <ul className="seo-mfg-dir-grid">
        {items.map((item, index) => (
          <li key={item.manufacturerId ?? `${item.slug}-${index}`}>
            <ManufacturerDirectoryCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
