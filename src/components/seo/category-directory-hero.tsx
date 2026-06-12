'use client'

import { useTranslations } from 'next-intl'
import { CategoryIcon } from '@/components/seo/category-icon'
import { Link } from '@/i18n/navigation'
import { categoryDirectorySearchActionUrl } from '@/lib/tool-urls'
import type { CategoryDirectoryItem } from '@/types/seo-intelligence'

export function CategoryDirectoryHero({
  totalInDatabase,
  marqueeItems,
}: {
  totalInDatabase: number
  marqueeItems: CategoryDirectoryItem[]
}) {
  const t = useTranslations('categories')

  return (
    <section className="seo-cat-dir-hero seo-dot-grid-bg" aria-labelledby="seo-cat-dir-hero-title">
      <div className="seo-cat-dir-hero__inner">
        <p className="seo-cat-dir-hero__eyebrow">
          <span className="seo-cat-dir-hero__dot" aria-hidden="true" />
          {t('directory.heroEyebrow', { count: totalInDatabase.toLocaleString() })}
        </p>
        <h1 id="seo-cat-dir-hero-title" className="seo-cat-dir-hero__title">
          {t('directory.heroTitle')}
        </h1>
        <p className="seo-cat-dir-hero__subtitle">{t('directory.heroSubtitle')}</p>
      </div>

      {marqueeItems.length > 0 ? (
        <div className="seo-cat-dir-hero__marquee" aria-label={t('directory.heroMarqueeLabel')}>
          <div className="seo-cat-dir-hero__marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <Link
                key={`${item.slug}-${index}`}
                href={item.href}
                className="seo-cat-dir-hero__marquee-chip"
              >
                <CategoryIcon
                  iconId={item.iconId}
                  iconUrl={item.iconUrl}
                  className="seo-cat-dir-hero__marquee-icon"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="seo-cat-dir-hero__inner">
        <div className="seo-cat-dir-hero__search-wrap">
          <form
            className="seo-floating-chat seo-floating-chat--inline"
            action={categoryDirectorySearchActionUrl()}
            method="get"
            role="search"
            aria-label={t('directory.searchFormLabel')}
          >
            <label htmlFor="seo-cat-dir-hero-search" className="seo-sr-only">
              {t('directory.searchLabel')}
            </label>
            <div className="seo-floating-chat__input-wrap">
              <input
                id="seo-cat-dir-hero-search"
                name="q"
                type="search"
                className="seo-floating-chat__input"
                placeholder={t('directory.searchPlaceholder')}
                autoComplete="off"
              />
            </div>
            <button type="submit" className="seo-floating-chat__submit" aria-label={t('directory.searchSubmit')}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
