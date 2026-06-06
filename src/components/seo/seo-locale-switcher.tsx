'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { NAV_LOCALES } from '@/lib/nav-links'

function ChevronDown({ open, size = 16 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`seo-locale-switcher__chevron${open ? ' seo-locale-switcher__chevron--open' : ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlobeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
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

export function SeoLocaleSwitcher({
  variant = 'navbar',
}: {
  variant?: 'navbar' | 'footer' | 'mobile'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const close = useCallback(() => setOpen(false), [])
  useClickOutside(ref, close, open)
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const tNav = useTranslations('nav')
  const tShell = useTranslations('shell')
  const currentLocale = NAV_LOCALES.find((item) => item.tag === locale) ?? NAV_LOCALES[0]

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => setOpen(false), 150)
  }, [cancelClose])

  const openOnHover = useCallback(() => {
    cancelClose()
    setOpen(true)
  }, [cancelClose])

  useEffect(() => () => cancelClose(), [cancelClose])

  if (variant === 'mobile') {
    return (
      <div className="seo-locale-switcher seo-locale-switcher--mobile">
        <p className="seo-locale-switcher__mobile-label">{tShell('language')}</p>
        {NAV_LOCALES.map((item) => (
          <Link
            key={item.tag}
            href={pathname}
            locale={item.tag}
            className={`seo-locale-switcher__mobile-link${
              item.tag === currentLocale.tag ? ' seo-locale-switcher__mobile-link--active' : ''
            }`}
          >
            <GlobeIcon />
            {tNav(item.fullLabelKey)}
            {item.tag === currentLocale.tag ? (
              <span className="seo-locale-switcher__badge">{tShell('active')}</span>
            ) : null}
          </Link>
        ))}
      </div>
    )
  }

  const isFooter = variant === 'footer'
  const isNavbar = variant === 'navbar'

  return (
    <div
      ref={ref}
      className={`seo-locale-switcher seo-locale-switcher--${variant}`}
      onMouseEnter={isNavbar ? openOnHover : undefined}
      onMouseLeave={isNavbar ? scheduleClose : undefined}
    >
      <button
        type="button"
        className="seo-locale-switcher__trigger"
        aria-label={tShell('switchLanguage')}
        aria-expanded={open}
        onClick={() => {
          if (isNavbar) {
            cancelClose()
            if (!open) setOpen(true)
            return
          }
          setOpen((value) => !value)
        }}
      >
        <GlobeIcon size={isFooter ? 16 : 18} />
        <span>{isFooter ? tNav(currentLocale.fullLabelKey) : currentLocale.label}</span>
        <ChevronDown open={open} size={isFooter ? 14 : 16} />
      </button>
      {open ? (
        <div
          className={`seo-locale-switcher__panel${isFooter ? ' seo-locale-switcher__panel--up' : ''}`}
          role="menu"
        >
          <div className="seo-locale-switcher__panel-surface">
            {NAV_LOCALES.map((item) => (
              <Link
                key={item.tag}
                href={pathname}
                locale={item.tag}
                className={`seo-locale-switcher__link${
                  item.tag === currentLocale.tag ? ' seo-locale-switcher__link--active' : ''
                }`}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {tNav(item.fullLabelKey)}
                {item.tag === currentLocale.tag ? <CheckIcon /> : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
