import Link from 'next/link'

export function ContextualLinksBar({
  slug,
  mpn,
  compareHref,
  categoryHref,
  categoryLabel,
  manufacturerHref,
  manufacturerLabel,
}: {
  slug: string
  mpn: string
  compareHref: string
  categoryHref: string
  categoryLabel: string
  manufacturerHref: string
  manufacturerLabel: string
}) {
  return (
    <p className="seo-context-links">
      Explore{' '}
      <Link href={`/alternatives/${slug}`} className="seo-context-links__link">
        {mpn} alternatives
      </Link>
      , review a{' '}
      <Link href={compareHref} className="seo-context-links__link">
        side-by-side comparison
      </Link>
      , browse the{' '}
      <Link href={categoryHref} className="seo-context-links__link">
        {categoryLabel}
      </Link>
      , or open the{' '}
      <Link href={manufacturerHref} className="seo-context-links__link">
        {manufacturerLabel} hub
      </Link>
      .
    </p>
  )
}
