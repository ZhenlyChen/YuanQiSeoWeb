'use client'

import { useState } from 'react'
import { InsightCtaCard } from '@/components/seo/insight-cta-card'
import { SectionTitle } from '@/components/seo/section-title'
import { SeoContentModal } from '@/components/seo/seo-content-modal'
import type { SupplyChainInsightGroup } from '@/types/seo-intelligence'

const ICON_PATHS = {
  lifecycle:
    'M14 2.27V6.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.11.494.11 1.054.11h4.13M16 13H8m8 4H8m2-8H8m6-7H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 4.28 4 5.12 4 6.8v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C6.28 22 7.12 22 8.8 22h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 19.72 20 18.88 20 17.2V8l-6-6Z',
  alertCircle: 'M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9',
} as const

function countLabel(count: number, singular: string, plural: string) {
  if (count === 0) return `No ${plural} yet`
  return `${count} ${count === 1 ? singular : plural}`
}

function SupplyModalContent({ group }: { group: SupplyChainInsightGroup }) {
  return (
    <ul className="seo-compact-list">
      {group.notes.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  )
}

export function ManufacturerSupplyInsights({
  groups,
}: {
  groups: SupplyChainInsightGroup[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (groups.length === 0) {
    return null
  }

  return (
    <section className="seo-section seo-section--flat seo-insights-tabs">
      <div className="seo-section-block">
        <SectionTitle title="Supply chain / lifecycle notes" />
        <div className="seo-insight-cta-grid">
          {groups.map((group, index) => (
            <InsightCtaCard
              key={group.title}
              title={group.title}
              subtitle={group.summary || countLabel(group.notes.length, 'note', 'notes')}
              iconPath={ICON_PATHS[group.icon]}
              onClick={() => setOpenIndex(index)}
            />
          ))}
        </div>

        {groups.map((group, index) => (
          <SeoContentModal
            key={group.title}
            open={openIndex === index}
            title={group.title}
            onClose={() => setOpenIndex(null)}
          >
            <SupplyModalContent group={group} />
          </SeoContentModal>
        ))}
      </div>
    </section>
  )
}
