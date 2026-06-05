'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SEO_FLOATING_CHAT_FILL_EVENT,
  type SeoFloatingChatFillDetail,
} from '@/lib/seo-floating-chat'
import {
  getFloatingChatInitialQuery,
  getFloatingChatPlaceholder,
} from '@/lib/seo-floating-chat-placeholder'
import { seoChatDeepLinkUrl } from '@/lib/tool-urls'
import type { SeoPageContext } from '@/components/seo/seo-site-chrome'

export function FloatingCtaDock({ pageContext }: { pageContext?: SeoPageContext }) {
  const slug = pageContext?.slug ?? 'floating_chat'
  const placeholder = getFloatingChatPlaceholder(pageContext)
  const initialQuery = getFloatingChatInitialQuery(pageContext)

  const [query, setQuery] = useState(initialQuery)
  const [primed, setPrimed] = useState(false)
  const dockRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleFill(event: Event) {
      const { query: nextQuery, activate } = (event as CustomEvent<SeoFloatingChatFillDetail>).detail
      setQuery(nextQuery)
      setPrimed(Boolean(activate))
      dockRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }

    window.addEventListener(SEO_FLOATING_CHAT_FILL_EVENT, handleFill)
    return () => window.removeEventListener(SEO_FLOATING_CHAT_FILL_EVENT, handleFill)
  }, [])

  useEffect(() => {
    if (!primed) return

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
      inputRef.current?.select()
    })

    return () => cancelAnimationFrame(frame)
  }, [primed, query])

  return (
    <div ref={dockRef} className="seo-floating-chat-dock">
      <form
        className={`seo-floating-chat${primed ? ' seo-floating-chat--primed' : ''}`}
        action={seoChatDeepLinkUrl(slug)}
        method="get"
        role="search"
        aria-label="Ask in PartGenie"
        onSubmit={() => setPrimed(false)}
      >
        <label htmlFor="seo-floating-chat-input" className="seo-sr-only">
          Ask in PartGenie
        </label>
        <div className="seo-floating-chat__input-wrap">
          <input
            ref={inputRef}
            id="seo-floating-chat-input"
            name="q"
            type="search"
            className="seo-floating-chat__input"
            placeholder={placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (primed) setPrimed(false)
            }}
            onBlur={() => setPrimed(false)}
            aria-describedby={primed ? 'seo-floating-chat-hint' : undefined}
          />
        </div>
        {primed ? (
          <p id="seo-floating-chat-hint" className="seo-sr-only">
            Comparison query ready. Press send to continue in PartGenie.
          </p>
        ) : null}
        <button type="submit" className="seo-floating-chat__submit" aria-label="Send query">
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
  )
}
