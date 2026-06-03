import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoSiteChrome } from '@/components/seo/seo-site-chrome'
import { MOCK_PREVIEW_PAGES } from '@/data/mock'

export const metadata: Metadata = {
  title: 'SEO / AEO design previews',
  robots: { index: false, follow: false },
}

export default function SeoPreviewsIndexPage() {
  return (
    <SeoSiteChrome>
      <main className="seo-page__main">
        <article className="seo-card">
          <h1 style={{ marginTop: 0 }}>SEO / AEO page previews</h1>
          <p className="seo-section__lead">
            Mock intelligence templates for design review. Data is static — not connected to the
            SEO API or alternative graph.
          </p>
        </article>

        <section className="seo-section">
          <h2 className="seo-section__title">Sample pages</h2>
          <ul className="seo-dev-index">
            {MOCK_PREVIEW_PAGES.map((entry) => (
              <li key={entry.href}>
                <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{entry.type}</p>
                <Link href={entry.href}>{entry.href}</Link>
                <p style={{ margin: '8px 0 0', color: 'var(--pg-color-text-secondary)' }}>
                  {entry.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="seo-section">
          <h2 className="seo-section__title">Modules per template</h2>
          <div className="seo-card">
            <ul>
              <li>Short Answer / AI Verdict (AEO)</li>
              <li>Decision matrix & engineering Q&A</li>
              <li>Top alternatives only (no full graph)</li>
              <li>Descriptive in-content entity links</li>
              <li>Tool CTAs with UTM</li>
              <li>BreadcrumbList + FAQPage JSON-LD (visible content only)</li>
            </ul>
          </div>
        </section>
      </main>
    </SeoSiteChrome>
  )
}
