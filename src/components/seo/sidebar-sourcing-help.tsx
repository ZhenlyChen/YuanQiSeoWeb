'use client'

import { AvatarStack } from '@/components/seo/avatar-stack'
import { WhatsAppBrandIcon } from '@/components/seo/whatsapp-brand-icon'
import { useSeoNavUser } from '@/components/seo/use-seo-nav-user'
import { cn } from '@/lib/cn'
import { sourcingHelpAppUrl, sourcingHelpSignInUrl } from '@/lib/tool-urls'

export function SidebarSourcingHelp({ slug, mpn }: { slug: string; mpn: string }) {
  const { isLoggedIn, isReady } = useSeoNavUser()
  const href =
    isReady && isLoggedIn ? sourcingHelpAppUrl(slug, mpn) : sourcingHelpSignInUrl(slug, mpn)

  return (
    <div className="seo-sidebar-sourcing-help">
      <section className="seo-sidebar-card seo-sidebar-sourcing-help__card">
        <AvatarStack size={36} className="seo-sidebar-sourcing-help__avatars" />
        <h2 className="seo-sidebar-card__title">Need sourcing support?</h2>
        <p className="seo-sidebar-sourcing-help__text">
          Get authorized channels, lead-time guidance, and BOM risk checks in PartGenie.
        </p>
        <a
          href={href}
          className={cn(
            'ui-button',
            'ui-button--secondary',
            'ui-button--sm',
            'seo-sidebar-sourcing-help__cta',
            !isReady && 'seo-sidebar-sourcing-help__cta--pending',
          )}
          aria-busy={!isReady}
        >
          <WhatsAppBrandIcon className="seo-sidebar-sourcing-help__cta-icon" />
          Get sourcing help
        </a>
      </section>
    </div>
  )
}
