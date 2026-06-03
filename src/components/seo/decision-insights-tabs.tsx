'use client'

import { useState } from 'react'
import type { CommonPitfall } from '@/types/seo-intelligence'

type ApplicationTagLayer = {
  scenarioType: string
  constraintCondition: string
}

type ActiveTab = 'application' | 'design' | 'risk'

function TabIcon({ tab }: { tab: ActiveTab }) {
  if (tab === 'application') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="seo-content-tabs__icon">
        <path
          d="M4.5 5.5h11v2h-11zm0 3.5h11v2h-11zm0 3.5h7v2h-7z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  if (tab === 'design') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="seo-content-tabs__icon">
        <path
          d="M3.75 4.5a1.75 1.75 0 0 1 1.75-1.75h9a1.75 1.75 0 0 1 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75h-9a1.75 1.75 0 0 1-1.75-1.75zm2 .25v10.5h8.5V4.75zm1.5 1.5h5v1.5h-5zm0 2.75h5.5v1.5h-5.5z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="seo-content-tabs__icon">
      <path
        d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15m0 4.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2m-1.25 4.5a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1V14h-2.5z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function DecisionInsightsTabs({
  applicationTagLayers,
  designConsiderations,
  notRecommended,
  commonPitfalls,
}: {
  applicationTagLayers: ApplicationTagLayer[]
  designConsiderations: string[]
  notRecommended: string[]
  commonPitfalls: CommonPitfall[]
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('application')

  return (
    <section className="seo-section seo-insights-tabs">
      <div className="seo-content-tabs seo-content-tabs--untitled" role="tablist" aria-label="Decision insight tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'application'}
          className={`seo-content-tabs__btn ${activeTab === 'application' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('application')}
        >
          <TabIcon tab="application" />
          Application tags
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'design'}
          className={`seo-content-tabs__btn ${activeTab === 'design' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          <TabIcon tab="design" />
          Design considerations
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'risk'}
          className={`seo-content-tabs__btn ${activeTab === 'risk' ? 'seo-content-tabs__btn--active' : ''}`}
          onClick={() => setActiveTab('risk')}
        >
          <TabIcon tab="risk" />
          Risk & pitfalls
        </button>
      </div>

      <div className="seo-card seo-insights-tabs__panel">
        {activeTab === 'application' ? (
          <div className="seo-app-tag-grid">
            {applicationTagLayers.map((tag) => (
              <div key={`${tag.scenarioType}-${tag.constraintCondition}`} className="seo-app-tag-stack">
                <span className="seo-app-tag seo-app-tag--scenario">{tag.scenarioType}</span>
                <span className="seo-app-tag seo-app-tag--constraint">{tag.constraintCondition}</span>
              </div>
            ))}
          </div>
        ) : activeTab === 'design' ? (
          <ul className="seo-compact-list">
            {designConsiderations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <>
            <h3 className="seo-subheading">Not recommended for</h3>
            <ul className="seo-compact-list">
              {notRecommended.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="seo-subheading">Common pitfalls</h3>
            {commonPitfalls.map((pitfall) => (
              <div key={pitfall.title} className="seo-pitfall">
                <strong>{pitfall.title}</strong>
                <p>{pitfall.detail}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
