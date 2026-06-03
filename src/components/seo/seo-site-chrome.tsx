import Link from 'next/link'
import { FloatingCtaDock } from '@/components/seo/floating-cta-dock'
import { partFinderUrl } from '@/lib/tool-urls'

export function SeoSiteChrome({ children }: { children: React.ReactNode }) {
  const ctaSlug = 'seo-header'
  return (
    <div className="seo-page">
      <header className="seo-site-header">
        <div className="seo-site-header__inner">
          <Link href="https://www.partgenie.ai/" className="seo-site-header__brand">
            <img src="/logo-wide-en.svg" alt="PartGenie" className="seo-site-header__brand-logo" />
          </Link>
          <nav className="seo-site-header__nav" aria-label="Primary">
            <a href={partFinderUrl(ctaSlug)}>Finder</a>
            <Link href="/dev/seo-previews">Guides</Link>
            <button type="button" className="seo-menu-btn" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>
      {children}
      <FloatingCtaDock />
      <footer className="seo-site-footer">
        <div className="seo-site-footer__inner">
          <p>
            PartGenie provides component decision intelligence — alternatives, design review, and
            sourcing guidance. Full analysis available in the app.
          </p>
          <p style={{ marginTop: '1rem' }}>
            <a href="https://www.partgenie.ai/">Marketing site</a>
            {' · '}
            <a href="https://app.partgenie.ai/">Application</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
