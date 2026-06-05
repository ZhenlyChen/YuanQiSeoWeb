import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { resolveManufacturerLogo } from '@/lib/manufacturer-logos'
import type { BreadcrumbItem } from '@/types/seo-intelligence'

export function ManufacturerHeroBanner({
  slug,
  name,
  title,
  subtitle,
  logoUrl,
  breadcrumbs,
}: {
  slug: string
  name: string
  title: string
  subtitle: string
  logoUrl?: string
  breadcrumbs: BreadcrumbItem[]
}) {
  const resolvedLogo = resolveManufacturerLogo(slug, logoUrl)
  const monogram = name.trim().charAt(0).toUpperCase() || 'M'

  return (
    <section className="seo-mfg-hero" aria-label={`${name} overview`}>
      <div className="seo-mfg-hero__split" aria-hidden="true" />
      <div className="seo-mfg-hero__layout">
        <div className="seo-mfg-hero__logo-slot">
          <div className="seo-mfg-hero__logo-card">
            {resolvedLogo ? (
              <img src={resolvedLogo} alt={`${name} logo`} className="seo-mfg-hero__logo" />
            ) : (
              <span className="seo-mfg-hero__monogram" aria-hidden="true">
                {monogram}
              </span>
            )}
          </div>
        </div>
        <div className="seo-mfg-hero__copy">
          <div className="seo-mfg-hero__copy-inner">
            <Breadcrumbs items={breadcrumbs} className="seo-breadcrumbs--mfg-hero" />
            <h1 className="seo-mfg-hero__title">{title}</h1>
            <p className="seo-mfg-hero__subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
