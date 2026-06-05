'use client'

import Link from 'next/link'
import { resolveManufacturerQueryHref } from '@/lib/manufacturer-query-links'
import type { ManufacturerIntelligencePage, ManufacturerQueryItem } from '@/types/seo-intelligence'

function QueryChip({ slug, item }: { slug: string; item: ManufacturerQueryItem }) {
  const href = resolveManufacturerQueryHref(slug, item)
  const className = 'seo-mfg-query-carousel__chip'

  if (href.startsWith('http')) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {item.question}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {item.question}
    </Link>
  )
}

export function ManufacturerQueryCarousel({ page }: { page: ManufacturerIntelligencePage }) {
  const items = page.queryIntelligence
  if (!items?.length) {
    return null
  }

  const loops = [0, 1] as const

  return (
    <section className="seo-mfg-query-carousel" aria-label="Popular engineer questions">
      <div className="seo-mfg-query-carousel__viewport">
        <div className="seo-mfg-query-carousel__track">
          {loops.map((loopIndex) =>
            items.map((item) => (
              <QueryChip key={`${loopIndex}-${item.question}`} slug={page.slug} item={item} />
            )),
          )}
        </div>
      </div>
    </section>
  )
}
