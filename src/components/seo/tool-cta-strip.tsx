import {
  alternativeFinderUrl,
  bomAnalyzerUrl,
  datasheetAiUrl,
  openPartUrl,
  partFinderUrl,
  rfqUrl,
} from '@/lib/tool-urls'

export function ToolCtaStrip({
  slug,
  mpn,
  variant = 'component',
}: {
  slug: string
  mpn: string
  variant?: 'component' | 'alternative' | 'compare' | 'manufacturer' | 'answer'
}) {
  const links =
    variant === 'answer'
      ? [
          { href: partFinderUrl(slug), label: 'Continue in Part Finder' },
          { href: alternativeFinderUrl(slug), label: 'Alternative Finder' },
        ]
      : variant === 'manufacturer'
        ? [
            { href: rfqUrl(slug), label: 'Request RFQ' },
            { href: partFinderUrl(slug), label: 'Part Finder' },
          ]
        : variant === 'alternative'
          ? [
              { href: bomAnalyzerUrl(slug), label: 'Analyze in your BOM' },
              { href: datasheetAiUrl(mpn), label: `Ask Datasheet AI about ${mpn}` },
              { href: alternativeFinderUrl(slug), label: 'Find more alternatives' },
              { href: rfqUrl(slug), label: 'Request RFQ' },
            ]
          : variant === 'compare'
            ? [
                { href: openPartUrl(slug), label: 'Compare in PartGenie' },
                { href: datasheetAiUrl(mpn), label: 'Ask Datasheet AI' },
              ]
            : [
                { href: `/alternatives/${slug}`, label: `Find alternatives to ${mpn}` },
                { href: datasheetAiUrl(mpn), label: `Ask Datasheet AI about ${mpn}` },
                { href: bomAnalyzerUrl(slug), label: `Analyze ${mpn} in your BOM` },
                { href: partFinderUrl(slug), label: 'Part Finder' },
              ]

  return (
    <section className="seo-section">
      <h2 className="seo-section__title">Next steps in PartGenie</h2>
      <div className="seo-cta-row">
        {links.map((link, i) => (
          <a
            key={link.label}
            className={i === 0 ? 'seo-btn seo-btn--primary' : 'seo-btn seo-btn--secondary'}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
