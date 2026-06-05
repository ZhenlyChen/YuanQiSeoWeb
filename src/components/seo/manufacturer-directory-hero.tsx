import { ManufacturerDirectoryNameCarousel } from '@/components/seo/manufacturer-directory-name-carousel'
import { manufacturerDirectorySearchActionUrl } from '@/lib/tool-urls'
import type { ManufacturerDirectoryItem } from '@/types/seo-intelligence'

export function ManufacturerDirectoryHero({
  totalInDatabase,
  marqueeItems,
}: {
  totalInDatabase: number
  marqueeItems: ManufacturerDirectoryItem[]
}) {
  return (
    <section className="seo-mfg-dir-hero" aria-labelledby="seo-mfg-dir-hero-title">
      <div className="seo-mfg-dir-hero__inner">
        <p className="seo-mfg-dir-hero__eyebrow">
          <span className="seo-mfg-dir-hero__dot" aria-hidden="true" />
          {totalInDatabase.toLocaleString()}+ manufacturers in PartGenie
        </p>
        <h1 id="seo-mfg-dir-hero-title" className="seo-mfg-dir-hero__title">
          The connected manufacturer intelligence directory
        </h1>
        <p className="seo-mfg-dir-hero__subtitle">
          Browse by category and A–Z — or chat to ask about any manufacturer. Intelligence hubs for
          alternatives, supply context, and BOM-ready analysis, not a traditional catalog.
        </p>
      </div>

      <ManufacturerDirectoryNameCarousel items={marqueeItems} />

      <div className="seo-mfg-dir-hero__inner">
        <div className="seo-mfg-dir-hero__search-wrap">
          <form
            className="seo-floating-chat seo-floating-chat--inline"
            action={manufacturerDirectorySearchActionUrl()}
            method="get"
            role="search"
            aria-label="Search manufacturers in PartGenie"
          >
            <label htmlFor="seo-mfg-dir-hero-search" className="seo-sr-only">
              Search manufacturers
            </label>
            <div className="seo-floating-chat__input-wrap">
              <input
                id="seo-mfg-dir-hero-search"
                name="q"
                type="search"
                className="seo-floating-chat__input"
                placeholder="Ask PartGenie about manufacturers, alternatives, or BOM"
                autoComplete="off"
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
        </div>
      </div>
    </section>
  )
}
