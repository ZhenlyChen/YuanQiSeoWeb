'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { CategoryChoiceCard } from '@/types/seo-intelligence'

function StepIndicator({ state }: { state: 'complete' | 'active' | 'pending' }) {
  if (state === 'complete') {
    return (
      <span className="seo-cat-progress__indicator seo-cat-progress__indicator--complete" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2.5 6.2 4.8 8.5 9.5 3.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }

  if (state === 'active') {
    return (
      <span className="seo-cat-progress__indicator seo-cat-progress__indicator--active" aria-hidden="true">
        <span className="seo-cat-progress__indicator-dot" />
      </span>
    )
  }

  return <span className="seo-cat-progress__indicator seo-cat-progress__indicator--pending" aria-hidden="true" />
}

function getActivationY() {
  return window.innerHeight * 0.58
}

function resolveProgressState(elements: HTMLElement[]) {
  if (elements.length === 0) {
    return { activeIndex: 0, lineFills: [] as number[] }
  }

  const activationY = getActivationY()
  let activeIndex = 0

  elements.forEach((element, index) => {
    if (element.getBoundingClientRect().top <= activationY) {
      activeIndex = index
    }
  })

  const lineFills = elements.map((_, index) => {
    if (index >= elements.length - 1) return 0

    if (index < activeIndex) return 1
    if (index > activeIndex) return 0

    const currentRect = elements[index].getBoundingClientRect()
    const nextRect = elements[index + 1].getBoundingClientRect()

    // Drawable connector: current dot bottom through step gap to next dot center.
    const lineStart = currentRect.top + 20
    const lineEnd = nextRect.top + 10

    if (lineEnd <= lineStart) return 0
    if (activationY <= lineStart) return 0
    if (activationY >= lineEnd) return 1

    return (activationY - lineStart) / (lineEnd - lineStart)
  })

  return { activeIndex, lineFills }
}

export function CategoryChoiceCards({
  title,
  intro,
  cards,
}: {
  title: string
  intro: string
  cards: CategoryChoiceCard[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lineFills, setLineFills] = useState<number[]>(() => cards.map(() => 0))
  const [reducedMotion, setReducedMotion] = useState(false)
  const stepRefs = useRef<Array<HTMLElement | null>>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    stepRefs.current.length = cards.length
  }, [cards.length])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    function applyPreference() {
      const prefersReduced = media.matches
      setReducedMotion(prefersReduced)
      if (prefersReduced) {
        setActiveIndex(Math.max(cards.length - 1, 0))
        setLineFills(cards.map((_, index) => (index < cards.length - 1 ? 1 : 0)))
      }
    }

    applyPreference()
    media.addEventListener('change', applyPreference)
    return () => media.removeEventListener('change', applyPreference)
  }, [cards.length])

  useEffect(() => {
    if (reducedMotion) return

    function syncProgress() {
      const elements = stepRefs.current.filter((el): el is HTMLElement => el != null)
      const next = resolveProgressState(elements)
      setActiveIndex(next.activeIndex)
      setLineFills(next.lineFills)
    }

    function scheduleSync() {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        syncProgress()
      })
    }

    scheduleSync()
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync)

    return () => {
      window.removeEventListener('scroll', scheduleSync)
      window.removeEventListener('resize', scheduleSync)
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [cards.length, reducedMotion])

  return (
    <section className="seo-page-section seo-page-section-anchor seo-cat-progress">
      <h2 className="seo-card__title">{title}</h2>
      <p className="seo-section__lead">{intro}</p>

      <ol className="seo-cat-progress__list">
          {cards.map((card, index) => {
            const state =
              index < activeIndex ? 'complete' : index === activeIndex ? 'active' : ('pending' as const)
            const lineFill = lineFills[index] ?? 0
            const showDetail = reducedMotion ? true : index === activeIndex

            return (
              <li
                key={card.title}
                ref={(node) => {
                  stepRefs.current[index] = node
                }}
                data-step-index={index}
                className={`seo-cat-progress__step seo-cat-progress__step--${state}`}
              >
                <div className="seo-cat-progress__rail" aria-hidden="true">
                  <StepIndicator state={state} />
                  {index < cards.length - 1 ? (
                    <span
                      className="seo-cat-progress__line"
                      style={
                        {
                          '--seo-cat-progress-line-fill': `${Math.round(lineFill * 1000) / 10}%`,
                        } as CSSProperties
                      }
                    />
                  ) : null}
                </div>

                <div className="seo-cat-progress__content">
                  <h3 className="seo-cat-progress__step-title">{card.title}</h3>
                  {showDetail ? (
                    <div className="seo-cat-progress__panel seo-cat-progress__panel--open">
                      <p className="seo-cat-progress__step-detail">{card.detail}</p>
                    </div>
                  ) : null}
                </div>
              </li>
            )
          })}
      </ol>
    </section>
  )
}
