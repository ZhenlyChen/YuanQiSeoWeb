'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { UntitledUiLineIcon } from '@/components/seo/untitled-ui-line-icon'

const SCROLL_LOCK_CLASS = 'seo-scroll-locked'
const SCROLL_LOCK_PADDING_VAR = '--seo-scroll-lock-padding'

function lockPageScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  const padding = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '0px'

  document.documentElement.style.setProperty(SCROLL_LOCK_PADDING_VAR, padding)
  document.body.classList.add(SCROLL_LOCK_CLASS)

  return () => {
    document.body.classList.remove(SCROLL_LOCK_CLASS)
    document.documentElement.style.removeProperty(SCROLL_LOCK_PADDING_VAR)
  }
}

export function SeoContentModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const unlockPageScroll = lockPageScroll()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    const focusTimer = window.requestAnimationFrame(() => {
      panelRef.current?.focus({ preventScroll: true })
    })

    return () => {
      window.cancelAnimationFrame(focusTimer)
      unlockPageScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="seo-content-modal-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        className="seo-content-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="seo-content-modal__header">
          <h3 id={titleId} className="seo-content-modal__title">
            {title}
          </h3>
          <button type="button" className="seo-content-modal__close" onClick={onClose} aria-label="Close">
            <UntitledUiLineIcon
              path="M18 6L6 18M6 6l12 12"
              size={20}
              strokeWidth={2}
            />
          </button>
        </div>
        <div className="seo-content-modal__body">{children}</div>
      </div>
    </div>
  )
}
