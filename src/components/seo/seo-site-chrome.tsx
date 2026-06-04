import Link from 'next/link'
import { partFinderUrl, signInUrl, signUpUrl } from '@/lib/tool-urls'

export type SeoPageContext = {
  slug: string
  mpn: string
}

export function SeoSiteChrome({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext?: SeoPageContext
}) {
  const ctaSlug = pageContext?.slug ?? 'seo-header'

  return (
    <div className="seo-page">
      <header className="seo-site-header">
        <div className="seo-site-header__inner">
          <Link href="https://www.partgenie.ai/" className="seo-site-header__brand">
            <img src="/logo-wide-en.svg" alt="PartGenie" className="seo-site-header__brand-logo" />
          </Link>
          <nav className="seo-site-header__nav" aria-label="Primary">
            <a href={partFinderUrl(ctaSlug)}>Finder</a>
            <Link href="/answers/best-mcu-for-wearable-device">Guides</Link>
            <a href={signInUrl(ctaSlug)}>Log in</a>
            <a href={signUpUrl(ctaSlug)} className="seo-site-header__cta">
              Get started
            </a>
          </nav>
        </div>
      </header>
      {children}
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
