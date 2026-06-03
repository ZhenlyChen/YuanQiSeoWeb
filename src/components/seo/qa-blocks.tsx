 'use client'

import { useId, useState } from 'react'
import type { FaqItem } from '@/types/seo-intelligence'
import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'

export function QaBlocks({ items, title = 'Engineering Q&A' }: { items: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const idPrefix = useId()

  return (
    <section className="seo-section">
      <SectionTitle title={title} icon="faq" />
      <UICard className="seo-card seo-faq">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `${idPrefix}-faq-panel-${index}`

          return (
            <article key={item.question} className={`seo-faq-item${isOpen ? ' seo-faq-item--open' : ''}`}>
              <button
                type="button"
                className="seo-faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
              >
                <span className="seo-faq__question">{item.question}</span>
                <span className="seo-faq__icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen ? (
                <div id={panelId} className="seo-faq__panel">
                  <p>{item.answer}</p>
                </div>
              ) : null}
            </article>
          )
        })}
      </UICard>
    </section>
  )
}
