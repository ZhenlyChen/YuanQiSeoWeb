import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/seo/arrow-up-right-icon'
import type { CompareLink, EntityLink } from '@/types/seo-intelligence'

export function SidebarRelatedLinks({
  title = 'You might also like',
  links,
}: {
  title?: string
  links: (EntityLink | CompareLink)[]
}) {
  return (
    <section className="seo-sidebar-related">
      <h2 className="seo-sidebar-related__title">{title}</h2>
      <ul className="seo-sidebar-links seo-sidebar-links--compact">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="seo-sidebar-links__item">
              <span className="seo-sidebar-links__text">{link.label}</span>
              <ArrowUpRightIcon className="seo-sidebar-links__arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
