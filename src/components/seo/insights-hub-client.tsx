'use client'

import { useTranslations } from 'next-intl'
import { InsightsFeedPanel } from '@/components/insights/InsightsFeedPanel'
import type { PublicDiscoverFeedItem, PublicDiscoverTrending } from '@/lib/discover-api'

export function InsightsHubClient({
  locale,
  feed,
  trending,
  categories,
  initialHasMore,
  initialNextCursor,
}: {
  locale: string
  feed: PublicDiscoverFeedItem[]
  trending: PublicDiscoverTrending | null
  categories: string[]
  initialHasMore: boolean
  initialNextCursor: string
}) {
  const t = useTranslations('insights')

  return (
    <div className="seo-insights-hub">
      <section
        className="seo-insights-hub__hero seo-dot-grid-bg"
        aria-labelledby="insights-hub-title"
      >
        <div className="seo-insights-hub__hero-inner">
          <h1 id="insights-hub-title" className="seo-insights-hub__title">
            {t('title')}
          </h1>
          <p className="seo-insights-hub__subtitle">{t('subtitle')}</p>
        </div>
      </section>

      <InsightsFeedPanel
        locale={locale}
        initialFeed={feed}
        trending={trending}
        categories={categories}
        initialHasMore={initialHasMore}
        initialNextCursor={initialNextCursor}
      />
    </div>
  )
}
