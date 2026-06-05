'use client'

import Link from 'next/link'
import type { ManufacturerDirectoryItem } from '@/types/seo-intelligence'

function NameChip({ item }: { item: ManufacturerDirectoryItem }) {
  const className = 'seo-mfg-query-carousel__chip'

  if (item.published) {
    return (
      <Link href={item.href} className={className}>
        {item.name}
      </Link>
    )
  }

  return <span className={`${className} seo-mfg-query-carousel__chip--static`}>{item.name}</span>
}

export function ManufacturerDirectoryNameCarousel({ items }: { items: ManufacturerDirectoryItem[] }) {
  if (items.length === 0) return null

  const loops = [0, 1] as const

  return (
    <section className="seo-mfg-query-carousel seo-mfg-dir-hero__marquee" aria-label="Featured manufacturers">
      <div className="seo-mfg-query-carousel__viewport">
        <div className="seo-mfg-query-carousel__track">
          {loops.map((loopIndex) =>
            items.map((item) => <NameChip key={`${loopIndex}-${item.slug}`} item={item} />),
          )}
        </div>
      </div>
    </section>
  )
}
