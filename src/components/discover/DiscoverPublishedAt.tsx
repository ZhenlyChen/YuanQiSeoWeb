'use client'

import { useFormatter, useNow, useTranslations } from 'next-intl'

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 4.75V8l2.25 2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DiscoverPublishedAt({
  publishedAt,
  className,
}: {
  publishedAt?: string
  className?: string
}) {
  const t = useTranslations('insights')
  const format = useFormatter()
  const now = useNow({ updateInterval: 60_000 })

  if (!publishedAt) return null
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return null

  const relative = format.relativeTime(date, now)

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 text-xs text-[#667085] ${className ?? ''}`}
    >
      <ClockIcon className="h-3.5 w-3.5" />
      <span>{t('publishedAgo', { relative })}</span>
    </span>
  )
}
