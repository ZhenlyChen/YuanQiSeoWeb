'use client'

import { useState } from 'react'

export function resolveSourceFaviconUrl(sourceUrl?: string): string | undefined {
  const raw = sourceUrl?.trim()
  if (!raw) {
    return undefined
  }
  try {
    const host = new URL(raw).hostname
    if (!host) {
      return undefined
    }
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=32`
  } catch {
    return undefined
  }
}

function resolveSourceDisplayName(name?: string, sourceUrl?: string): string | undefined {
  const trimmed = name?.trim()
  if (trimmed) {
    return trimmed
  }
  const raw = sourceUrl?.trim()
  if (!raw) {
    return undefined
  }
  try {
    return new URL(raw).hostname.replace(/^www\./i, '')
  } catch {
    return undefined
  }
}

export function DiscoverSourceLabel({
  name,
  sourceUrl,
  className,
  linkClassName,
}: {
  name?: string
  sourceUrl?: string
  className?: string
  linkClassName?: string
}) {
  const [failed, setFailed] = useState(false)
  const favicon = resolveSourceFaviconUrl(sourceUrl)
  const displayName = resolveSourceDisplayName(name, sourceUrl)

  if (!displayName) {
    return null
  }

  const content = (
    <>
      {favicon && !failed ? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F2F4F7]">
          <img
            src={favicon}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
          />
        </span>
      ) : null}
      <span>{displayName}</span>
    </>
  )

  const wrapperClass = `inline-flex items-center gap-1.5 ${className ?? ''}`

  if (sourceUrl?.trim()) {
    return (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${wrapperClass} ${linkClassName ?? 'transition-colors hover:text-[#207883] hover:underline'}`}
        onClick={(event) => event.stopPropagation()}
      >
        {content}
      </a>
    )
  }

  return <span className={wrapperClass}>{content}</span>
}
