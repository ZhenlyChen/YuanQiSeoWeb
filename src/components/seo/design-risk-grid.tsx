'use client'

import { useState } from 'react'
import { InsightCtaCard } from '@/components/seo/insight-cta-card'
import { SeoContentModal } from '@/components/seo/seo-content-modal'

const RISK_ICON_PATHS = {
  electrical: 'M13 2 3 14h7l-1 8 10-12h-7l1-8z',
  package:
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
  lifecycle:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9',
  alert: 'M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z',
} as const

function riskIconPath(title: string) {
  const normalized = title.toLowerCase()
  if (normalized.includes('electrical')) return RISK_ICON_PATHS.electrical
  if (normalized.includes('package') || normalized.includes('footprint')) return RISK_ICON_PATHS.package
  if (normalized.includes('lifecycle') || normalized.includes('sourcing')) return RISK_ICON_PATHS.lifecycle
  return RISK_ICON_PATHS.alert
}

export function DesignRiskGrid({ items }: { items: Array<{ title: string; detail: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openItem = openIndex != null ? items[openIndex] : null

  return (
    <>
      <div className="seo-insight-cta-grid seo-cat-risks-grid">
        {items.map((item, index) => (
          <InsightCtaCard
            key={item.title}
            title={item.title}
            subtitle={item.detail}
            iconPath={riskIconPath(item.title)}
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>

      <SeoContentModal
        open={openItem != null}
        title={openItem?.title ?? ''}
        onClose={() => setOpenIndex(null)}
      >
        {openItem ? (
          <div className="seo-pitfall">
            <p>{openItem.detail}</p>
          </div>
        ) : null}
      </SeoContentModal>
    </>
  )
}
