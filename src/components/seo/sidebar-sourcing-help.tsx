import { UIButton } from '@/components/ui/ui-button'
import { rfqUrl } from '@/lib/tool-urls'

export function SidebarSourcingHelp({ slug }: { slug: string }) {
  return (
    <section className="seo-sidebar-card seo-sidebar-sourcing-help">
      <h2 className="seo-sidebar-card__title">Need sourcing support?</h2>
      <p className="seo-sidebar-sourcing-help__text">
        Get authorized channels, lead-time guidance, and BOM risk checks in PartGenie.
      </p>
      <UIButton href={rfqUrl(slug)} variant="primary" size="sm" className="seo-sidebar-sourcing-help__cta">
        Get sourcing help
      </UIButton>
    </section>
  )
}
