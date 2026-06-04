import Link from 'next/link'
import type { CompareLink } from '@/types/seo-intelligence'

export function CompareLinkButtons({ links }: { links: CompareLink[] }) {
  return (
    <section className="seo-section">
      <div className="seo-card">
        <h2 className="seo-card__title">Compare components</h2>
        <div className="seo-compare-buttons">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="seo-compare-buttons__item">
            {link.label}
          </Link>
        ))}
        </div>
      </div>
    </section>
  )
}
