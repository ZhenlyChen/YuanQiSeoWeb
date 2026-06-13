import Link from 'next/link'
import { CategoryIcon } from '@/components/seo/category-icon'
import type { CategorySubcategoryCard } from '@/types/seo-intelligence'

export function CategorySubcategoryCards({
  title,
  cards,
}: {
  title: string
  cards: CategorySubcategoryCard[]
}) {
  if (cards.length === 0) return null

  return (
    <section className="seo-page-section seo-page-section-anchor seo-cat-subcat-section">
      <h2 className="seo-card__title">{title}</h2>
      <div className="seo-cat-subcat-grid">
        {cards.map((card) => {
          const href = card.href?.trim() || (card.slug ? `#${card.slug}` : '#')
          return (
          <Link
            key={card.slug}
            href={href}
            className="seo-cat-subcat-card"
          >
            <span
              className={[
                'seo-cat-subcat-card__icon',
                card.iconUrl ? 'seo-cat-subcat-card__icon--image' : '',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            >
              <CategoryIcon
                iconId={card.iconId}
                iconUrl={card.iconUrl}
                className="seo-cat-subcat-card__category-icon"
              />
            </span>
            <span className="seo-cat-subcat-card__title">{card.name}</span>
            <span className="seo-cat-subcat-card__detail">{card.description}</span>
          </Link>
          )
        })}
      </div>
    </section>
  )
}
