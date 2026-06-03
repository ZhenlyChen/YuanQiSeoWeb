import {
  alternativeFinderUrl,
  bomAnalyzerUrl,
  datasheetAiUrl,
  openPartUrl,
  rfqUrl,
} from '@/lib/tool-urls'

type Action = { label: string; description: string; href: string }

export function SidebarQuickActions({
  slug,
  mpn,
  variant = 'component',
}: {
  slug: string
  mpn: string
  variant?: 'component' | 'alternative' | 'compare' | 'answer' | 'manufacturer'
}) {
  const actions: Action[] =
    variant === 'alternative'
      ? [
          {
            label: 'Analyze in BOM',
            description: 'Check these alternatives in your bill of materials.',
            href: bomAnalyzerUrl(slug),
          },
          {
            label: 'Ask Datasheet AI',
            description: `Compare ${mpn} datasheets side by side.`,
            href: datasheetAiUrl(mpn),
          },
        ]
      : variant === 'manufacturer'
        ? [
            {
              label: 'Request RFQ',
              description: `Get sourcing support for ${mpn} lines.`,
              href: rfqUrl(slug),
            },
            {
              label: 'Analyze in BOM',
              description: 'Check lifecycle and replacement readiness for this vendor.',
              href: bomAnalyzerUrl(slug),
            },
          ]
      : variant === 'compare'
        ? [
            {
              label: 'Compare in PartGenie',
              description: 'Open the full interactive comparison workspace.',
              href: openPartUrl(slug),
            },
            {
              label: 'Ask Datasheet AI',
              description: 'Verify pinout and electrical limits from datasheets.',
              href: datasheetAiUrl(mpn),
            },
          ]
        : variant === 'answer'
          ? [
              {
                label: 'Continue in Part Finder',
                description: 'Turn requirements into a shortlist of parts.',
                href: openPartUrl(slug),
              },
              {
                label: 'Alternative Finder',
                description: 'Explore replacements for recommended parts.',
                href: alternativeFinderUrl(slug),
              },
            ]
          : [
              {
                label: 'Find Alternatives',
                description: 'Discover pin-compatible and functional replacements.',
                href: `/alternatives/${slug}`,
              },
              {
                label: 'Ask Datasheet AI',
                description: `Get instant answers from the ${mpn} datasheet.`,
                href: datasheetAiUrl(mpn),
              },
              {
                label: 'Analyze in BOM',
                description: 'Check compatibility and lifecycle in your BOM.',
                href: bomAnalyzerUrl(slug),
              },
              {
                label: 'Request RFQ',
                description: 'Get pricing and availability quotes.',
                href: rfqUrl(slug),
              },
            ]

  return (
    <section className="seo-sidebar-card">
      <h2 className="seo-sidebar-card__title">Quick actions</h2>
      <ul className="seo-quick-actions">
        {actions.map((action) => (
          <li key={action.label}>
            <a href={action.href} className="seo-quick-actions__link">
              <span className="seo-quick-actions__label">{action.label}</span>
              <span className="seo-quick-actions__desc">{action.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
