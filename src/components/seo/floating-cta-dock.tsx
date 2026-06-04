import { seoChatDeepLinkUrl } from '@/lib/tool-urls'
import type { SeoPageContext } from '@/components/seo/seo-site-chrome'

export function FloatingCtaDock({ pageContext }: { pageContext?: SeoPageContext }) {
  const slug = pageContext?.slug ?? 'floating_chat'
  const mpn = pageContext?.mpn
  const placeholder = mpn
    ? `Ask about ${mpn} alternatives, compare options, or design fit`
    : 'Try "BQ24195L alternative" or ask a design question'
  const defaultQuery = mpn ? `${mpn} alternatives and replacement risk` : undefined

  return (
    <form
      className="seo-floating-chat"
      action={seoChatDeepLinkUrl(slug)}
      method="get"
      role="search"
      aria-label="Ask in PartGenie"
    >
      <label htmlFor="seo-floating-chat-input" className="seo-sr-only">
        Ask in PartGenie
      </label>
      <div className="seo-floating-chat__input-wrap">
        <input
          id="seo-floating-chat-input"
          name="q"
          type="search"
          className="seo-floating-chat__input"
          placeholder={placeholder}
          defaultValue={defaultQuery}
        />
      </div>
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
  )
}
