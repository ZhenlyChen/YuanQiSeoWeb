'use client'

import { useLocale, useTranslations } from 'next-intl'
import { SeoPrimaryCtaLink } from '@/components/seo/seo-primary-cta'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import type { AppLocale } from '@/i18n/routing'
import { buildNavLinks, getNavLabelsFromTranslations } from '@/lib/nav-links'
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
  const t = useTranslations('nav')
  const locale = useLocale() as AppLocale
  const nav = buildNavLinks(ctaSlug, getNavLabelsFromTranslations(t), locale)

  if (!isReady) {
    return (
      <div
        className={[
          'seo-nav-user-actions',
          'seo-nav-user-actions--loading',
          block ? 'seo-nav-user-actions--block' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        <div className="seo-nav-user-actions__placeholder seo-nav-user-actions__placeholder--avatar" />
        <div
          className={[
            'seo-nav-user-actions__placeholder seo-nav-user-actions__placeholder--dashboard',
            block ? 'seo-nav-user-actions__placeholder--dashboard-block' : null,
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
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
        <a
          href={dashboardHref}
          className={[
            'seo-nav-user-actions__dashboard',
            block ? 'seo-nav-user-actions__dashboard--block' : null,
          ]
            .filter(Boolean)
            .join(' ')}
        >
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
