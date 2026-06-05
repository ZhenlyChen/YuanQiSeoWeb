import type { ComponentComplianceFields, KeySpec } from '@/types/seo-intelligence'

import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'
import { normalizeApplicationTags, type ApplicationTagInput } from '@/lib/application-tags'
import { DatasheetFileCard } from '@/components/seo/datasheet-file-card'
import { datasheetAiUrl } from '@/lib/tool-urls'

function buildComplianceSpecs(compliance?: ComponentComplianceFields): KeySpec[] {
  if (!compliance) return []

  const entries: Array<[string, string | undefined]> = [
    ['RoHS', compliance.rohs],
    ['REACH', compliance.reach],
    ['MSL', compliance.msl],
    ['ECCN', compliance.eccn],
    ['HTSUS', compliance.htsus],
  ]

  return entries
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, value]) => ({ label, value }))
}

export function KeySpecsSnapshot({
  specs,
  compliance,
  applicationTags = [],
  mpn,
  slug,
  datasheetUrls,
  datasheetSizeBytes,
  includeDatasheet = true,
}: {
  specs: KeySpec[]
  compliance?: ComponentComplianceFields
  applicationTags?: ApplicationTagInput[]
  mpn?: string
  slug?: string
  datasheetUrls?: string[]
  datasheetSizeBytes?: number
  /** When false, omit the datasheet block from this card. */
  includeDatasheet?: boolean
}) {
  const tags = normalizeApplicationTags(applicationTags)
  const complianceSpecs = buildComplianceSpecs(compliance)

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
        {complianceSpecs.length > 0 ? (
          <>
            <hr className="seo-spec-divider" />
            <SectionTitle title="Compliance & Environment" />
            <dl className="seo-spec-grid">
              {complianceSpecs.map((spec) => (
                <div key={spec.label} className="seo-spec-item">
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
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
        {includeDatasheet && mpn && slug && datasheetUrls?.length ? (
          <>
            <hr className="seo-spec-divider" />
            <div id="datasheet" className="seo-page-section-anchor">
              <SectionTitle title="Datasheet" />
              <DatasheetFileCard
                mpn={mpn}
                datasheetUrls={datasheetUrls}
                datasheetSizeBytes={datasheetSizeBytes}
                aiHref={datasheetAiUrl(mpn, slug)}
              />
            </div>
          </>
        ) : null}
      </UICard>
    </section>
  )
}
