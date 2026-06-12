'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { DiscoverCoverImage } from '@/components/discover/DiscoverCoverImage'
import { DiscoverPublishedAt } from '@/components/discover/DiscoverPublishedAt'
import { DiscoverSourceLabel } from '@/components/discover/DiscoverSourceLabel'
import type { PublicDiscoverFeedItem } from '@/lib/discover-api'
import { formatDiscoverCategoryLabel } from '@/lib/discover-label'
import { stripHtml } from '@/lib/strip-html'

type Industry = NonNullable<PublicDiscoverFeedItem['industry']>

type Props = {
  item: Industry
  locale: string
  publishedAt?: string
  featured?: boolean
  layout?: 'row' | 'row-reverse' | 'grid'
}

function insightHref(locale: string, slug?: string) {
  return slug ? `/${locale}/insights/${slug}` : `/${locale}/insights`
}

export function DiscoverFeaturedCard({
  item,
  locale,
  publishedAt,
}: {
  item: Industry
  locale: string
  publishedAt?: string
}) {
  return <IndustrySignalCard item={item} locale={locale} layout="row" featured publishedAt={publishedAt} />
}

export function IndustrySignalCard({ item, locale, layout = 'grid', featured, publishedAt }: Props) {
  const t = useTranslations('insights')
  const href = insightHref(locale, item.insightSlug)
  const summaryPreview = stripHtml(item.summary)
  const isSolo = layout === 'row' || layout === 'row-reverse'
  const imageFirst = layout === 'row-reverse'
  const isHero = isSolo || featured || item.featured
  const showPublishedAt = layout !== 'grid'

  const metaRow = (
    <div
      className={clsx(
        'flex w-full items-center gap-2 text-xs text-[#667085]',
        showPublishedAt && 'justify-between',
      )}
    >
      {(item.sourceName || item.sourceUrl) ? (
        <DiscoverSourceLabel name={item.sourceName} sourceUrl={item.sourceUrl} />
      ) : null}
      {showPublishedAt && <DiscoverPublishedAt publishedAt={publishedAt} className="ml-auto" />}
    </div>
  )

  if (isSolo) {
    const textBlock = (
      <div className="flex h-full min-w-0 flex-col justify-between">
        <div>
          <Link href={href} className="block">
            <h2
              className={clsx(
                'font-semibold text-[#101828] transition-colors group-hover:text-[#207883]',
                isHero ? 'text-2xl leading-tight' : 'text-lg leading-tight',
              )}
            >
              {item.headline}
            </h2>
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475467]">{summaryPreview}</p>
        </div>
        <div className="pt-4">{metaRow}</div>
      </div>
    )
    const imageBlock = (
      <Link href={href} className="block">
        <DiscoverCoverImage
          src={item.coverImageUrl}
          className={clsx(
            'w-full shrink-0 rounded-lg',
            isHero ? 'aspect-[16/9] self-start' : 'min-h-[120px] md:min-h-[140px]',
          )}
        />
      </Link>
    )

    return (
      <article className={clsx('group', isHero ? 'pb-4' : 'border-b border-[#E4E7EC] py-6 last:border-b-0')}>
        <div
          className={clsx(
            'grid items-stretch gap-5',
            isHero
              ? imageFirst
                ? 'md:grid-cols-[360px_1fr]'
                : 'md:grid-cols-[1fr_360px]'
              : imageFirst
                ? 'md:grid-cols-[200px_1fr]'
                : 'md:grid-cols-[1fr_200px]',
          )}
        >
          {imageFirst ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E4E7EC] bg-white transition-shadow hover:shadow-md">
      <Link href={href} className="block">
        <DiscoverCoverImage src={item.coverImageUrl} className="h-36 w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-[#207883]">
          {formatDiscoverCategoryLabel(item.categoryLabel || t('industrySignal'))}
        </span>
        <Link href={href}>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-tight text-[#101828] hover:text-[#207883]">
            {item.headline}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-[#475467]">{summaryPreview}</p>
        <div className="mt-3">{metaRow}</div>
      </div>
    </article>
  )
}
