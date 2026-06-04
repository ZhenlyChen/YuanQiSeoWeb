import { AvatarStack } from '@/components/seo/avatar-stack'
import { WhatsAppBrandIcon } from '@/components/seo/whatsapp-brand-icon'
import { UIButton } from '@/components/ui/ui-button'
import { rfqUrl } from '@/lib/tool-urls'

export function SidebarSourcingHelp({ slug }: { slug: string }) {
  return (
    <div className="seo-sidebar-sourcing-help">
      <section className="seo-sidebar-card seo-sidebar-sourcing-help__card">
        <AvatarStack size={36} className="seo-sidebar-sourcing-help__avatars" />
        <h2 className="seo-sidebar-card__title">Need sourcing support?</h2>
        <p className="seo-sidebar-sourcing-help__text">
          Get authorized channels, lead-time guidance, and BOM risk checks in PartGenie.
        </p>
        <UIButton href={rfqUrl(slug)} variant="secondary" size="sm" className="seo-sidebar-sourcing-help__cta">
          <WhatsAppBrandIcon className="seo-sidebar-sourcing-help__cta-icon" />
          Get sourcing help
        </UIButton>
      </section>
    </div>
  )
}
