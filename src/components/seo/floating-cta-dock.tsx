import { partFinderUrl } from '@/lib/tool-urls'

export function FloatingCtaDock() {
  return (
    <form className="seo-floating-chat" action={partFinderUrl('floating_chat')} role="search" aria-label="Ask in PartGenie">
      <label htmlFor="seo-floating-chat-input" className="seo-sr-only">
        Ask in PartGenie
      </label>
      <div className="seo-floating-chat__input-wrap">
        <input
          id="seo-floating-chat-input"
          name="q"
          type="search"
          className="seo-floating-chat__input"
          placeholder='Try "BQ24195L alternative" or ask a design question'
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
