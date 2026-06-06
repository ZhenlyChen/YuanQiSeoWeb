'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ArrowUpRightIcon } from '@/components/seo/arrow-up-right-icon'
import { CategoryIcon } from '@/components/seo/category-icon'
import type { CategoryDirectoryItem } from '@/types/seo-intelligence'

function CategoryDirectoryCard({ item }: { item: CategoryDirectoryItem }) {
  const t = useTranslations('categories')

  return (
    <Link href={item.href} className="seo-cat-dir-card">
      <div className="seo-cat-dir-card__content">
        <div className="seo-cat-dir-card__head">
          <span className="seo-cat-dir-card__icon-wrap" aria-hidden="true">
            <CategoryIcon iconId={item.iconId} className="seo-cat-dir-card__icon" />
          </span>
          <span className="seo-cat-dir-card__name">{item.name}</span>
        </div>
        <ul className="seo-cat-dir-card__tags">
          <li className="seo-cat-dir-card__tag">
            {t('directory.subcategoryCount', { count: item.subcategoryCount })}
          </li>
          <li className="seo-cat-dir-card__tag">
            {t('directory.partCount', { count: item.partCount.toLocaleString() })}
          </li>
        </ul>
        <p className="seo-cat-dir-card__intro">{item.description}</p>
      </div>
      <div className="seo-cat-dir-card__hover" aria-hidden="true">
        <span className="seo-cat-dir-card__hover-cta">
          <span className="seo-cat-dir-card__hover-text">{t('directory.viewIntelligence')}</span>
          <ArrowUpRightIcon className="seo-cat-dir-card__hover-arrow" />
        </span>
      </div>
    </Link>
  )
}

export function CategoryDirectoryList({ items }: { items: CategoryDirectoryItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="seo-cat-dir-list">
      {items.map((item) => (
        <CategoryDirectoryCard key={item.slug} item={item} />
      ))}
    </div>
  )
}
