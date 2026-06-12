'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { DiscoverCategoryFilter } from '@/components/discover/DiscoverCategoryFilter'
import { DiscoverFeed } from '@/components/discover/DiscoverFeed'
import type { PublicDiscoverFeedItem, PublicDiscoverTrending } from '@/lib/discover-api'
import { fetchDiscoverFeed } from '@/lib/discover-api'

type Props = {
  locale: string
  initialFeed: PublicDiscoverFeedItem[]
  trending: PublicDiscoverTrending | null
  categories: string[]
  initialHasMore: boolean
  initialNextCursor: string
}

export function InsightsFeedPanel({
  locale,
  initialFeed,
  trending,
  categories,
  initialHasMore,
  initialNextCursor,
}: Props) {
  const t = useTranslations('insights')
  const [categoryLabel, setCategoryLabel] = useState('')
  const [items, setItems] = useState(initialFeed)
  const [nextCursor, setNextCursor] = useState(initialNextCursor)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const loadFeed = useCallback(async (category: string, cursor?: string, append = false) => {
    const result = await fetchDiscoverFeed(cursor, category || undefined, { cache: 'no-store' })
    const nextItems = result?.items ?? []
    setItems((prev) => (append ? [...prev, ...nextItems] : nextItems))
    setNextCursor(result?.nextCursor ?? '')
    setHasMore(Boolean(result?.hasMore))
  }, [])

  useEffect(() => {
    if (!categoryLabel) {
      setItems(initialFeed)
      setNextCursor(initialNextCursor)
      setHasMore(initialHasMore)
      return
    }
    setLoading(true)
    void loadFeed(categoryLabel).finally(() => setLoading(false))
  }, [categoryLabel, initialFeed, initialHasMore, initialNextCursor, loadFeed])

  async function onLoadMore() {
    if (!hasMore || loadingMore || !nextCursor) return
    setLoadingMore(true)
    try {
      await loadFeed(categoryLabel, nextCursor, true)
    } finally {
      setLoadingMore(false)
    }
  }

  const showEmpty = !loading && items.length === 0

  return (
    <div className="seo-insights-hub__content">
      {categories.length > 0 && (
        <DiscoverCategoryFilter
          className="seo-insights-hub__filters"
          categories={categories}
          selected={categoryLabel}
          allLabel={t('filterAllCategories')}
          onChange={setCategoryLabel}
        />
      )}

      {loading && (
        <p className="py-8 text-center text-sm text-[#667085]">{t('loadingFeed')}</p>
      )}

      {showEmpty && (
        <p className="rounded-xl border border-dashed border-[#E4E7EC] py-10 text-center text-sm text-[#667085]">
          {t('emptyFeed')}
        </p>
      )}

      {!loading && items.length > 0 && (
        <>
          <DiscoverFeed locale={locale} feed={items} trending={trending} />
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB] disabled:opacity-60"
                disabled={loadingMore}
                onClick={() => void onLoadMore()}
              >
                {loadingMore ? t('loadingFeed') : t('loadMore')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
