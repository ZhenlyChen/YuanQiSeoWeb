'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ComponentSectionNavItem } from '@/lib/component-section-nav-items'

export type { ComponentSectionNavItem } from '@/lib/component-section-nav-items'

export function ComponentSectionNav({ items }: { items: ComponentSectionNavItem[] }) {
  const scrollItems = useMemo(() => items.filter((item) => !item.href), [items])
  const [activeId, setActiveId] = useState(scrollItems[0]?.id ?? '')

  useEffect(() => {
    const elements = scrollItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-134px 0px -58% 0px', threshold: [0, 0.12, 0.35] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [scrollItems])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setActiveId(id)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <nav className="seo-section-nav" aria-label="Page sections">
      <div className="seo-section-nav__inner">
        <div className="seo-section-nav__tabs" role="tablist">
          {items.map((item) => {
            const isActive = !item.href && item.id === activeId
            const className = `seo-section-nav__tab${isActive ? ' seo-section-nav__tab--active' : ''}`

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className={className} role="tab">
                  {item.label}
                </Link>
              )
            }

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={className}
                onClick={() => scrollTo(item.id)}>
                {item.label}
                {item.badge != null ? (
                  <span className="seo-section-nav__badge">{item.badge}</span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
