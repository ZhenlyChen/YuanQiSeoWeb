'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

export type SeoSelectOption<T extends string = string> = {
  value: T
  label: string
}

function SelectChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn('seo-select__chevron', open && 'seo-select__chevron--open')}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return

    function onDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [ref, handler, enabled])
}

export function SeoSelect<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: {
  value: T
  options: SeoSelectOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value)),
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selected = options.find((option) => option.value === value) ?? options[0]

  const close = useCallback(() => setOpen(false), [])
  useClickOutside(rootRef, close, open)

  useEffect(() => {
    const index = options.findIndex((option) => option.value === value)
    if (index >= 0) setActiveIndex(index)
  }, [options, value])

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((current) => (current + 1) % options.length)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((current) => (current - 1 + options.length) % options.length)
        return
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const option = options[activeIndex]
        if (option) {
          onChange(option.value)
          close()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, close, onChange, open, options])

  return (
    <div ref={rootRef} className={cn('seo-select', className)}>
      <button
        type="button"
        className={cn('seo-select__trigger', open && 'seo-select__trigger--open')}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="seo-select__value">{selected.label}</span>
        <SelectChevron open={open} />
      </button>

      {open ? (
        <div className="seo-select__panel" role="presentation">
          <ul id={listboxId} className="seo-select__list" role="listbox" aria-label={ariaLabel}>
            {options.map((option, index) => {
              const isSelected = option.value === value
              const isActive = index === activeIndex

              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      'seo-select__option',
                      isSelected && 'seo-select__option--selected',
                      isActive && 'seo-select__option--active',
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onChange(option.value)
                      close()
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
