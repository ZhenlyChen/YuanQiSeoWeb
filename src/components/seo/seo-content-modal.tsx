'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { UntitledUiLineIcon } from '@/components/seo/untitled-ui-line-icon'

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

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
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
