'use client'

import { useMemo } from 'react'
import type { PublicDiscoverFeedItem, PublicDiscoverTrending } from '@/lib/discover-api'
import { DiscoverFeedBlocks } from '@/components/discover/DiscoverFeedBlocks'
import { DiscoverTrendingMobileStrip, DiscoverTrendingSidebar } from '@/components/discover/DiscoverTrendingSidebar'
import { buildDiscoverFeedLayout, isDiscoverFeaturedItem } from '@/components/discover/buildFeedLayout'

export function DiscoverFeed({
  locale,
  feed,
  trending,
}: {
  locale: string
  feed: PublicDiscoverFeedItem[]
  trending: PublicDiscoverTrending | null
}) {
  const feedGroups = useMemo(
    () => buildDiscoverFeedLayout(feed, isDiscoverFeaturedItem),
    [feed],
  )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0 space-y-4">
        {trending && <DiscoverTrendingMobileStrip trending={trending} />}

        {feedGroups.length > 0 && <DiscoverFeedBlocks groups={feedGroups} locale={locale} />}
      </main>

      {trending && (
        <DiscoverTrendingSidebar
          trending={trending}
          className="hidden lg:block lg:sticky lg:top-4 lg:self-start"
        />
      )}
    </div>
  )
}
