import type { KeySpec } from '@/types/seo-intelligence'

import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'
import { normalizeApplicationTags, type ApplicationTagInput } from '@/lib/application-tags'
import { DatasheetFileCard } from '@/components/seo/datasheet-file-card'
import { datasheetAiUrl } from '@/lib/tool-urls'

export function KeySpecsSnapshot({
  specs,
  applicationTags = [],
  mpn,
  slug,
  datasheetUrls,
  datasheetSizeBytes,
  includeDatasheet = true,
}: {
  specs: KeySpec[]
  applicationTags?: ApplicationTagInput[]
  mpn?: string
  slug?: string
  datasheetUrls?: string[]
  datasheetSizeBytes?: number
  /** When false, render datasheet in a separate page section (component page nav). */
  includeDatasheet?: boolean
}) {
  const tags = normalizeApplicationTags(applicationTags)

  return (
    <section className="seo-section">
      <UICard className="seo-card">
        <SectionTitle title="Key specifications" icon="specs" />
        <dl className="seo-spec-grid">
          {specs.map((spec) => (
            <div key={spec.label} className="seo-spec-item">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
        {tags.length > 0 ? (
          <>
            <hr className="seo-spec-divider" />
            <SectionTitle title="Application" />
            <div
              id="applications"
              className="seo-application-tags seo-page-section-anchor"
              role="list"
              aria-label="Application fit">
              {tags.map((tag) => (
                <span key={tag.label} className="seo-application-tag" role="listitem">
                  {tag.label}
                </span>
              ))}
            </div>
          </>
        ) : null}
        {includeDatasheet && mpn && slug ? (
          <>
            <hr className="seo-spec-divider" />
            <SectionTitle title="Datasheet" />
            <DatasheetFileCard
              mpn={mpn}
              datasheetUrls={datasheetUrls}
              datasheetSizeBytes={datasheetSizeBytes}
              aiHref={datasheetAiUrl(mpn, slug)}
            />
          </>
        ) : null}
      </UICard>
    </section>
  )
}
