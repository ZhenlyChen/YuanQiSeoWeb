'use client'

import { useState } from 'react'
import { InsightCtaCard } from '@/components/seo/insight-cta-card'
import { SectionTitle } from '@/components/seo/section-title'
import { SeoContentModal } from '@/components/seo/seo-content-modal'
import type { ApplicationFitRow } from '@/types/seo-intelligence'

type GuidanceModal = 'application' | 'regional' | null

const ICON_PATHS = {
  layoutGrid:
    'M9 3.5H4.5M9 9.5V4.5M4.5 9.5V4.5M19.5 3.5H14.5M19.5 9.5V14.5M14.5 9.5V4.5M9 14.5H4.5M9 19.5V14.5M4.5 19.5V14.5M19.5 14.5H14.5M19.5 19.5V14.5M14.5 19.5V14.5',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9',
} as const

function countLabel(count: number, singular: string, plural: string) {
  if (count === 0) return `No ${plural} yet`
  return `${count} ${count === 1 ? singular : plural}`
}

function ApplicationModalContent({ items }: { items: ApplicationFitRow[] }) {
  return (
    <>
      {items.map((row) => (
        <div key={row.scenario} className="seo-pitfall">
          <strong>{row.scenario}</strong>
          <p>{row.guidance}</p>
        </div>
      ))}
    </>
  )
}

function RegionalModalContent({ notes }: { notes: string[] }) {
  return (
    <ul className="seo-compact-list">
      {notes.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  )
}

export function AlternativeGuidanceInsights({
  applicationFit,
  regionalNotes,
}: {
  applicationFit: ApplicationFitRow[]
  regionalNotes: string[]
}) {
  const [openModal, setOpenModal] = useState<GuidanceModal>(null)

  return (
    <section className="seo-section seo-section--flat seo-insights-tabs">
      <div className="seo-section-block">
        <SectionTitle title="Application & sourcing insights" />
        <div className="seo-insight-cta-grid">
          <InsightCtaCard
            title="Application compatibility"
            subtitle={countLabel(applicationFit.length, 'deployment scenario', 'deployment scenarios')}
            iconPath={ICON_PATHS.layoutGrid}
            onClick={() => setOpenModal('application')}
          />
          <InsightCtaCard
            title="Authorized / regional alternatives"
            subtitle={countLabel(regionalNotes.length, 'sourcing note', 'sourcing notes')}
            iconPath={ICON_PATHS.globe}
            onClick={() => setOpenModal('regional')}
          />
        </div>

        <SeoContentModal
          open={openModal === 'application'}
          title="Application compatibility"
          onClose={() => setOpenModal(null)}
        >
          <ApplicationModalContent items={applicationFit} />
        </SeoContentModal>

        <SeoContentModal
          open={openModal === 'regional'}
          title="Authorized / regional alternatives"
          onClose={() => setOpenModal(null)}
        >
          <RegionalModalContent notes={regionalNotes} />
        </SeoContentModal>
      </div>
    </section>
  )
}
