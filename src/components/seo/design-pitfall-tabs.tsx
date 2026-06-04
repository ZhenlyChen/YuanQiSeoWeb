'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/seo/section-title'
import type { CommonPitfall } from '@/types/seo-intelligence'

type ActiveTab = 'design' | 'pitfall'

export function DesignPitfallTabs({
  designConsiderations,
  commonPitfalls,
}: {
  designConsiderations: string[]
  commonPitfalls: CommonPitfall[]
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('design')

  return (
    <section className="seo-section">
      <div className="seo-card">
        <SectionTitle title="Design and risk insights" icon={activeTab === 'design' ? 'design' : 'risk'} />
        <div className="seo-content-tabs" role="tablist" aria-label="Design and pitfall tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'design'}
          className={`seo-content-tabs__btn ${activeTab === 'design' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          Design considerations
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'pitfall'}
          className={`seo-content-tabs__btn ${activeTab === 'pitfall' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('pitfall')}
        >
          Common pitfalls
        </button>
        </div>
        <div className="seo-card__panel">
        {activeTab === 'design' ? (
          <ul className="seo-compact-list">
            {designConsiderations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          commonPitfalls.map((pitfall) => (
            <div key={pitfall.title} className="seo-pitfall">
              <strong>{pitfall.title}</strong>
              <p>{pitfall.detail}</p>
            </div>
          ))
        )}
        </div>
      </div>
    </section>
  )
}
