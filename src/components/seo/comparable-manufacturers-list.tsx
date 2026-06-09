import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/seo/arrow-up-right-icon'
import { ManufacturerLogoAvatar } from '@/components/seo/manufacturer-logo-avatar'
import { resolveManufacturerLogo } from '@/lib/manufacturer-logos'
import type { ManufacturerPeekLink } from '@/types/seo-intelligence'

function slugFromHref(href: string): string {
  const match = href.match(/\/manufacturers\/([^/?#]+)/)
  return match?.[1]?.trim().toLowerCase() ?? ''
}

function monogramFor(item: ManufacturerPeekLink): string {
  const fromShort = item.shortName?.trim().charAt(0)
  if (fromShort) return fromShort.toUpperCase()
  return item.label.trim().charAt(0).toUpperCase() || 'M'
}

export function ComparableManufacturersList({
  title = 'Comparable manufacturers',
  items,
  maxItems = 5,
}: {
  title?: string
  items: ManufacturerPeekLink[]
  maxItems?: number
}) {
  if (items.length === 0) return null

  const visible = items.slice(0, Math.max(1, maxItems))

  return (
    <section className="seo-mfr-peek">
      <h2 className="seo-mfr-peek__title">{title}</h2>
      <ul className="seo-mfr-peek__list">
        {visible.map((item) => {
          const slug = item.slug?.trim().toLowerCase() || slugFromHref(item.href)
          const logo = resolveManufacturerLogo(slug, item.logoUrl)

          return (
            <li key={`${item.href}-${item.label}`}>
              <Link href={item.href} className="seo-mfr-peek__row">
                <span className="seo-mfr-peek__avatar" aria-hidden="true">
                  <ManufacturerLogoAvatar
                    logo={logo}
                    monogram={monogramFor(item)}
                    imgClassName="seo-mfr-peek__logo"
                    monogramClassName="seo-mfr-peek__monogram"
                  />
                </span>
                <span className="seo-mfr-peek__copy">
                  <span className="seo-mfr-peek__name">{item.label}</span>
                  {item.subtitle ? <span className="seo-mfr-peek__meta">{item.subtitle}</span> : null}
                </span>
                <ArrowUpRightIcon className="seo-mfr-peek__arrow" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
