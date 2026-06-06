'use client'

import Link from 'next/link'
import { buildCategoryQueryCarouselItems } from '@/lib/category-query-carousel'
import { resolveCategoryQueryHref } from '@/lib/category-query-links'
import type { CategoryHubPage, CategoryQueryChip } from '@/types/seo-intelligence'

function QueryChip({ slug, item }: { slug: string; item: CategoryQueryChip }) {
  const href = resolveCategoryQueryHref(slug, item)
  const className = 'seo-mfg-query-carousel__chip'

  if (href.startsWith('http')) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {item.label}
    </Link>
  )
}

export function CategoryQueryCarousel({ page }: { page: CategoryHubPage }) {
  const items = buildCategoryQueryCarouselItems(page)
  if (items.length === 0) return null

  const loops = [0, 1] as const

  return (
    <section className="seo-mfg-query-carousel seo-cat-hero__query-carousel" aria-label="Popular category finder questions">
      <div className="seo-mfg-query-carousel__viewport">
        <div className="seo-mfg-query-carousel__track">
          {loops.map((loopIndex) =>
            items.map((item) => (
              <QueryChip key={`${loopIndex}-${item.label}`} slug={page.slug} item={item} />
            )),
          )}
        </div>
      </div>
    </section>
  )
}
