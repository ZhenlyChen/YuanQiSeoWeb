'use client'

import type { PublicDiscoverFeedItem } from '@/lib/discover-api'
import { CommunitySearchCard } from '@/components/discover/CommunitySearchCard'
import { IndustrySignalCard } from '@/components/discover/IndustrySignalCard'
import type { DiscoverFeedLayoutBlock } from '@/components/discover/buildFeedLayout'
import { feedItemKey, isDiscoverFeaturedItem } from '@/components/discover/buildFeedLayout'

function FeedCard({
  item,
  locale,
  layout,
}: {
  item: PublicDiscoverFeedItem
  locale: string
  layout: 'row' | 'row-reverse' | 'grid'
}) {
  if (item.cardType === 'community_article' && item.community) {
    return <CommunitySearchCard item={item.community} layout={layout === 'grid' ? 'grid' : layout} />
  }
  if (item.industry) {
    return (
      <IndustrySignalCard
        item={item.industry}
        locale={locale}
        layout={layout}
        featured={isDiscoverFeaturedItem(item)}
        publishedAt={item.publishedAt}
      />
    )
  }
  return null
}

function FeedLayoutBlock({
  block,
  blockIndex,
  locale,
}: {
  block: DiscoverFeedLayoutBlock<PublicDiscoverFeedItem>
  blockIndex: number
  locale: string
}) {
  if (block.type === 'solo') {
    const layout = block.variant === 'text-first' ? 'row' : 'row-reverse'
    return (
      <FeedCard
        key={`solo-${blockIndex}-${feedItemKey(block.item)}`}
        item={block.item}
        locale={locale}
        layout={layout}
      />
    )
  }

  return (
    <div key={`grid-${blockIndex}-${block.items.map(feedItemKey).join('-')}`}>
      <div className="hidden md:grid md:grid-cols-3 md:gap-4">
        {block.items.map((item) => (
          <FeedCard
            key={`grid-${feedItemKey(item)}`}
            item={item}
            locale={locale}
            layout="grid"
          />
        ))}
      </div>
      <div className="space-y-0 md:hidden">
        {block.items.map((item) => (
          <FeedCard
            key={`list-${feedItemKey(item)}`}
            item={item}
            locale={locale}
            layout="row"
          />
        ))}
      </div>
    </div>
  )
}

export function DiscoverFeedBlocks({
  groups,
  locale,
}: {
  groups: DiscoverFeedLayoutBlock<PublicDiscoverFeedItem>[][]
  locale: string
}) {
  return (
    <div>
      {groups.map((group, groupIndex) => (
        <div
          key={`feed-group-${groupIndex}`}
          className={groupIndex < groups.length - 1 ? 'mb-16 border-b border-[#E4E7EC] pb-12' : undefined}
        >
          <div className="space-y-6">
            {group.map((block, blockIndex) => (
              <FeedLayoutBlock
                key={`block-${groupIndex}-${blockIndex}`}
                block={block}
                blockIndex={blockIndex}
                locale={locale}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
