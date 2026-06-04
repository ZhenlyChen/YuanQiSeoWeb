'use client'

import { useState } from 'react'
import type { CommonPitfall } from '@/types/seo-intelligence'

type ActiveTab = 'design' | 'risk'

function TabIcon({ tab }: { tab: ActiveTab }) {
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
  designConsiderations,
  notRecommended,
  commonPitfalls,
}: {
  designConsiderations: string[]
  notRecommended: string[]
  commonPitfalls: CommonPitfall[]
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('design')

  return (
    <section className="seo-section seo-insights-tabs">
      <div className="seo-content-tabs seo-content-tabs--untitled" role="tablist" aria-label="Decision insight tabs">
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
        {activeTab === 'design' ? (
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
