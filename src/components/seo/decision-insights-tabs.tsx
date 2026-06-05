'use client'

import { useState } from 'react'
import { InsightCtaCard } from '@/components/seo/insight-cta-card'
import { SectionTitle } from '@/components/seo/section-title'
import { SeoContentModal } from '@/components/seo/seo-content-modal'
import type { CommonPitfall } from '@/types/seo-intelligence'

type InsightModal = 'design' | 'risk' | null

const UNTITLED_PATHS = {
  file06:
    'M14 2.27V6.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.11.494.11 1.054.11h4.13M16 13H8m8 4H8m2-8H8m6-7H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 4.28 4 5.12 4 6.8v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C6.28 22 7.12 22 8.8 22h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 19.72 20 18.88 20 17.2V8l-6-6Z',
  alertCircle: 'M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z',
} as const

function DesignModalContent({ items }: { items: string[] }) {
  return (
    <ul className="seo-compact-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function RiskModalContent({
  notRecommended,
  commonPitfalls,
}: {
  notRecommended: string[]
  commonPitfalls: CommonPitfall[]
}) {
  return (
    <>
      <h4 className="seo-content-modal__subheading">Not recommended for</h4>
      <ul className="seo-compact-list">
        {notRecommended.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h4 className="seo-content-modal__subheading">Common pitfalls</h4>
      {commonPitfalls.map((pitfall) => (
        <div key={pitfall.title} className="seo-pitfall">
          <strong>{pitfall.title}</strong>
          <p>{pitfall.detail}</p>
        </div>
      ))}
    </>
  )
}

export function DecisionInsightsTabs({
  designConsiderations,
  notRecommended,
  commonPitfalls,
}: {
  designConsiderations: string[]
  notRecommended: string[]
  commonPitfalls: CommonPitfall[]
}) {
  const [openModal, setOpenModal] = useState<InsightModal>(null)

  const designCount = designConsiderations.length
  const riskCount = notRecommended.length + commonPitfalls.length

  return (
    <section className="seo-section seo-section--flat seo-insights-tabs">
      <div className="seo-section-block">
        <SectionTitle title="Design and risk insights" icon="risk" />
        <div className="seo-insight-cta-grid">
          <InsightCtaCard
            title="Design considerations"
            subtitle={
              designCount > 0
                ? `${designCount} layout and firmware note${designCount === 1 ? '' : 's'}`
                : 'No design notes yet'
            }
            iconPath={UNTITLED_PATHS.file06}
            onClick={() => setOpenModal('design')}
          />
          <InsightCtaCard
            title="Risk & pitfalls"
            subtitle={
              riskCount > 0
                ? `${riskCount} risk and pitfall item${riskCount === 1 ? '' : 's'}`
                : 'No risk notes yet'
            }
            iconPath={UNTITLED_PATHS.alertCircle}
            onClick={() => setOpenModal('risk')}
          />
        </div>

        <SeoContentModal
          open={openModal === 'design'}
          title="Design considerations"
          onClose={() => setOpenModal(null)}
        >
          <DesignModalContent items={designConsiderations} />
        </SeoContentModal>

        <SeoContentModal
          open={openModal === 'risk'}
          title="Risk & pitfalls"
          onClose={() => setOpenModal(null)}
        >
          <RiskModalContent notRecommended={notRecommended} commonPitfalls={commonPitfalls} />
        </SeoContentModal>
      </div>
    </section>
  )
}
