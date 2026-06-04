'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/seo/section-title'

type ApplicationTagLayer = {
  scenarioType: string
  constraintCondition: string
}

type ActiveTab = 'tags' | 'best' | 'avoid'

export function DesignFitTabs({
  applicationTagLayers,
  goodFit,
  notRecommended,
}: {
  applicationTagLayers: ApplicationTagLayer[]
  goodFit: string[]
  notRecommended: string[]
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tags')

  return (
    <section className="seo-section">
      <div className="seo-card">
        <SectionTitle title="Design fit at a glance" icon="fit" />
        <div className="seo-content-tabs" role="tablist" aria-label="Design fit tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tags'}
          className={`seo-content-tabs__btn ${activeTab === 'tags' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Application tags
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'best'}
          className={`seo-content-tabs__btn ${activeTab === 'best' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('best')}
        >
          Best used for
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'avoid'}
          className={`seo-content-tabs__btn ${activeTab === 'avoid' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('avoid')}
        >
          Not recommended
        </button>
        </div>
        <div className="seo-card__panel">
        {activeTab === 'tags' ? (
          <div className="seo-app-tag-grid">
            {applicationTagLayers.map((tag) => (
              <div key={`${tag.scenarioType}-${tag.constraintCondition}`} className="seo-app-tag-stack">
                <span className="seo-app-tag seo-app-tag--scenario">{tag.scenarioType}</span>
                <span className="seo-app-tag seo-app-tag--constraint">{tag.constraintCondition}</span>
              </div>
            ))}
          </div>
        ) : activeTab === 'best' ? (
          <ul className="seo-compact-list">
            {goodFit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <ul className="seo-compact-list">
            {notRecommended.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </section>
  )
}
