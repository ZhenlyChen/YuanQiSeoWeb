'use client'

import { appCtaUrl } from '@/lib/seo-api'

export function PartCta({ slug, code }: { slug: string; code: string }) {
  return (
    <div className="cta">
      <a className="cta-button" href={appCtaUrl(slug)}>
        Open {code || 'part'} in PartGenie
      </a>
    </div>
  )
}
