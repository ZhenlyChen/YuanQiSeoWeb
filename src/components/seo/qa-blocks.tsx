'use client'

import { useId, useState } from 'react'
import { SectionTitle } from '@/components/seo/section-title'
import type { FaqItem } from '@/types/seo-intelligence'

export function QaBlocks({ items, title = 'Questions & answers' }: { items: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const idPrefix = useId()

  return (
    <section className="seo-section seo-section--flat seo-faq-section">
      <div className="seo-section-block">
        <SectionTitle title={title} />
        <div className="seo-faq">
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
                  <span className={`seo-faq__icon-mark seo-faq__icon-mark--plus${isOpen ? ' is-hidden' : ''}`}>+</span>
                  <span className={`seo-faq__icon-mark seo-faq__icon-mark--close${isOpen ? '' : ' is-hidden'}`}>×</span>
                </span>
              </button>
              <div
                id={panelId}
                className="seo-faq__panel"
                role="region"
                aria-hidden={!isOpen}
                inert={!isOpen ? true : undefined}
              >
                <div className="seo-faq__panel-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </article>
          )
        })}
        </div>
      </div>
    </section>
  )
}
