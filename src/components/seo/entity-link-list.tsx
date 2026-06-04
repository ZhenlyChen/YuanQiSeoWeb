import Link from 'next/link'
import type { CompareLink, EntityLink } from '@/types/seo-intelligence'

export function EntityLinkList({
  links,
  title,
  intro,
}: {
  links: (EntityLink | CompareLink)[]
  title: string
  intro?: string
}) {
  return (
    <section className="seo-section">
      <div className="seo-card">
        <h2 className="seo-card__title">{title}</h2>
        {intro ? <p className="seo-section__lead">{intro}</p> : null}
        <ul className="seo-link-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        </ul>
      </div>
    </section>
  )
}
