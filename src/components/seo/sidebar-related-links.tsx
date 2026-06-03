import Link from 'next/link'
import type { CompareLink, EntityLink } from '@/types/seo-intelligence'
import { UICard } from '@/components/ui/ui-card'

export function SidebarRelatedLinks({
  title = 'Related pages',
  links,
}: {
  title?: string
  links: (EntityLink | CompareLink)[]
}) {
  return (
    <UICard className="seo-sidebar-card">
      <h2 className="seo-sidebar-card__title">{title}</h2>
      <ul className="seo-sidebar-links seo-sidebar-links--compact">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="seo-sidebar-links__item">
              <span className="seo-sidebar-links__text">{link.label}</span>
              <span className="seo-sidebar-links__arrow" aria-hidden="true">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </UICard>
  )
}
