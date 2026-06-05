import { rfqUrl, partFinderUrl, alternativeFinderUrl, bomAnalyzerUrl, datasheetAiUrl, openPartUrl } from '@/lib/tool-urls'
import { buildComponentToolCtaLinks } from '@/lib/component-tool-cta-links'
import { SEO_PUBLIC_BOUNDARY } from '@/lib/seo-copy'

type CtaLink = { href: string; label: string }

function linksForVariant(
  slug: string,
  mpn: string,
  variant: 'component' | 'alternative' | 'compare' | 'manufacturer' | 'answer',
): CtaLink[] {
  switch (variant) {
    case 'answer':
      return [
        { href: partFinderUrl(slug), label: 'Continue in Part Finder' },
        { href: alternativeFinderUrl(slug), label: 'Alternative Finder' },
      ]
    case 'manufacturer':
      return [
        { href: rfqUrl(slug), label: 'Request RFQ' },
        { href: partFinderUrl(slug), label: 'Part Finder' },
      ]
    case 'alternative':
      return [
        { href: bomAnalyzerUrl(slug), label: 'Analyze in your BOM' },
        { href: datasheetAiUrl(mpn, slug), label: `Ask Datasheet AI about ${mpn}` },
        { href: alternativeFinderUrl(slug), label: 'Find more alternatives' },
        { href: rfqUrl(slug), label: 'Request RFQ' },
      ]
    case 'compare':
      return [
        { href: openPartUrl(slug), label: SEO_PUBLIC_BOUNDARY.primaryCta(mpn) },
        { href: datasheetAiUrl(mpn, slug), label: 'Ask Datasheet AI' },
      ]
    case 'component':
      return buildComponentToolCtaLinks(slug, mpn).map(({ href, label }) => ({
        href,
        label,
      }))
  }
}

export function ToolCtaStrip({
  slug,
  mpn,
  variant = 'component',
}: {
  slug: string
  mpn: string
  variant?: 'component' | 'alternative' | 'compare' | 'manufacturer' | 'answer'
}) {
  const links = linksForVariant(slug, mpn, variant)

  return (
    <section className="seo-section">
      <div className="seo-card">
        <h2 className="seo-card__title">{SEO_PUBLIC_BOUNDARY.nextStepsTitle}</h2>
        <div className="seo-cta-row">
          {links.map((link, i) => (
            <a
              key={link.label}
              className={i === 0 ? 'seo-btn seo-btn--primary' : 'seo-btn seo-btn--secondary'}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
