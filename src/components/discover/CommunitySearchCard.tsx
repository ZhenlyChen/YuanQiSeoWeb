'use client'

import { useMemo } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { PublicDiscoverFeedItem } from '@/lib/discover-api'
import { signUpUrl } from '@/lib/tool-urls'

type Community = NonNullable<PublicDiscoverFeedItem['community']>

export function CommunitySearchCard({
  item,
  layout = 'row',
}: {
  item: Community
  layout?: 'row' | 'row-reverse' | 'grid'
}) {
  const t = useTranslations('insights')
  const href = signUpUrl('discover-community')
  const imageFirst = layout === 'row-reverse'

  if (layout === 'row' || layout === 'row-reverse') {
    const textBlock = (
      <div className="min-w-0">
        <span className="text-xs font-medium text-[#6941C6]">{t('communityBadge')}</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {item.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-[#1C6973]">
              #{tag}
            </span>
          ))}
        </div>
        <Link href={href}>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-[#101828] transition-colors group-hover:text-[#207883]">
            {item.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#475467]">{item.summary}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-[#667085]">
          <span>{t('communityAuthor')}</span>
          {item.visitCount > 0 && <span>{item.visitCount} views</span>}
        </div>
      </div>
    )
    const visualBlock = (
      <Link
        href={href}
        className="flex min-h-[120px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F4F3FF] to-[#EBE9FE] md:min-h-[140px]"
      >
        <span className="text-3xl text-[#6941C6]">⌕</span>
      </Link>
    )

    return (
      <article className="group border-b border-[#E4E7EC] py-6 last:border-b-0">
        <div className={clsx('grid gap-5', imageFirst ? 'md:grid-cols-[200px_1fr]' : 'md:grid-cols-[1fr_200px]')}>
          {imageFirst ? (
            <>
              {visualBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {visualBlock}
            </>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E4E7EC] bg-white transition-shadow hover:shadow-md">
      <Link
        href={href}
        className="flex h-28 items-center justify-center bg-gradient-to-br from-[#F4F3FF] to-[#EBE9FE]"
      >
        <span className="text-3xl text-[#6941C6]">⌕</span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-[#6941C6]">{t('communityBadge')}</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {item.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-[#1C6973]">
              #{tag}
            </span>
          ))}
        </div>
        <Link href={href}>
          <h3 className="mt-2 line-clamp-3 text-base font-semibold text-[#101828] hover:text-[#207883]">
            {item.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-[#475467]">{item.summary}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-[#667085]">
          <span>{t('communityAuthor')}</span>
          {item.visitCount > 0 && <span>{item.visitCount}</span>}
        </div>
      </div>
    </article>
  )
}
