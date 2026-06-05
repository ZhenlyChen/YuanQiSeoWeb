'use client'

import { SeoPrimaryCtaLink } from '@/components/seo/seo-primary-cta'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { buildNavLinks } from '@/lib/nav-links'
import { dashboardUrl } from '@/lib/tool-urls'

export function SeoNavUserActions({
  ctaSlug,
  block = false,
  className,
}: {
  ctaSlug: string
  block?: boolean
  className?: string
}) {
  const { user, isLoggedIn, isReady } = useSeoNavUser()
  const nav = buildNavLinks(ctaSlug)

  if (!isReady) {
    return (
      <div
        className={[
          'seo-nav-user-actions__placeholder',
          block ? 'seo-nav-user-actions__placeholder--block' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />
    )
  }

  if (isLoggedIn && user) {
    const dashboardHref = dashboardUrl()

    return (
      <div
        className={[
          'seo-nav-user-actions',
          block ? 'seo-nav-user-actions--block' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <a
          href={dashboardHref}
          className="seo-nav-user-actions__avatar"
          aria-label={`Open dashboard for ${user.nickname}`}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="" className="seo-nav-user-actions__avatar-image" />
          ) : (
            <span className="seo-nav-user-actions__avatar-initial">{user.initial}</span>
          )}
        </a>
        <a href={dashboardHref} className="seo-nav-user-actions__dashboard">
          Dashboard
        </a>
      </div>
    )
  }

  return (
    <SeoPrimaryCtaLink href={nav.cta.href} block={block} className={className}>
      {nav.cta.label}
    </SeoPrimaryCtaLink>
  )
}
