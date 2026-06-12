'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { SeoLocaleSwitcher } from '@/components/seo/seo-locale-switcher'
import { SeoNavUserActions } from '@/components/seo/seo-nav-user-actions'
import { ComponentToolIcon } from '@/components/seo/untitled-ui-line-icon'
import type { AppLocale } from '@/i18n/routing'
import { buildNavLinks, getNavLabelsFromTranslations, NAV_LOGO_SRC, type NavLink } from '@/lib/nav-links'
import { MARKETING_ORIGIN } from '@/lib/tool-urls'

type NavDropdownAlign = 'left' | 'center' | 'right'

function ChevronDown({ open, size = 16 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`seo-site-navbar__chevron${open ? ' seo-site-navbar__chevron--open' : ''}`}
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

function NavDropdown({
  label,
  links,
  openKey,
  activeKey,
  onOpen,
  onCancelClose,
  onScheduleClose,
  align = 'center',
}: {
  label: string
  links: NavLink[]
  openKey: string
  activeKey: string | null
  onOpen: (key: string | null) => void
  onCancelClose: () => void
  onScheduleClose: () => void
  align?: NavDropdownAlign
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isOpen = activeKey === openKey
  const close = useCallback(() => {
    if (activeKey === openKey) onOpen(null)
  }, [activeKey, openKey, onOpen])
  useClickOutside(ref, close, isOpen)

  const handleMouseEnter = useCallback(() => {
    onCancelClose()
    onOpen(openKey)
  }, [onCancelClose, onOpen, openKey])

  return (
    <div
      ref={ref}
      className="seo-site-navbar__dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onScheduleClose}
    >
      <button
        type="button"
        className="seo-site-navbar__dropdown-trigger"
        aria-expanded={isOpen}
        onClick={() => {
          onCancelClose()
          if (!isOpen) onOpen(openKey)
        }}
      >
        {label}
        <ChevronDown open={isOpen} />
      </button>
      {isOpen ? (
        <div
          className={`seo-site-navbar__dropdown-panel${
            align === 'left'
              ? ' seo-site-navbar__dropdown-panel--align-left'
              : align === 'right'
                ? ' seo-site-navbar__dropdown-panel--align-right'
                : ''
          }`}
          role="menu"
        >
          <div className="seo-site-navbar__dropdown-panel-surface">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="seo-site-navbar__dropdown-link" role="menuitem">
                {link.icon ? (
                  <span className="seo-site-navbar__dropdown-link-icon" aria-hidden="true">
                    <ComponentToolIcon name={link.icon} size={20} />
                  </span>
                ) : null}
                <span className="seo-site-navbar__dropdown-link-label">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MobileDropdown({
  label,
  links,
  openKey,
  activeKey,
  onToggle,
}: {
  label: string
  links: NavLink[]
  openKey: string
  activeKey: string | null
  onToggle: (key: string) => void
}) {
  const isOpen = activeKey === openKey
  return (
    <div className="seo-site-navbar__mobile-dropdown">
      <button
        type="button"
        className="seo-site-navbar__mobile-dropdown-trigger"
        aria-expanded={isOpen}
        onClick={() => onToggle(openKey)}
      >
        {label}
        <ChevronDown open={isOpen} />
      </button>
      {isOpen ? (
        <div className="seo-site-navbar__mobile-dropdown-panel">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="seo-site-navbar__mobile-link">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function SeoSiteNavbar({ ctaSlug = 'seo-header' }: { ctaSlug?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null)
  const desktopCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t = useTranslations('nav')
  const tShell = useTranslations('shell')
  const locale = useLocale() as AppLocale
  const nav = buildNavLinks(ctaSlug, getNavLabelsFromTranslations(t), locale)

  const cancelDesktopDropdownClose = useCallback(() => {
    if (desktopCloseTimerRef.current) {
      clearTimeout(desktopCloseTimerRef.current)
      desktopCloseTimerRef.current = null
    }
  }, [])

  const scheduleDesktopDropdownClose = useCallback(() => {
    cancelDesktopDropdownClose()
    desktopCloseTimerRef.current = setTimeout(() => setActiveDesktopDropdown(null), 150)
  }, [cancelDesktopDropdownClose])

  const openDesktopDropdown = useCallback(
    (key: string | null) => {
      cancelDesktopDropdownClose()
      setActiveDesktopDropdown(key)
    },
    [cancelDesktopDropdownClose],
  )

  useEffect(() => () => cancelDesktopDropdownClose(), [cancelDesktopDropdownClose])

  const toggleMobileDropdown = useCallback((key: string) => {
    setActiveMobileDropdown((prev) => (prev === key ? null : key))
  }, [])

  const dropdownProps = {
    activeKey: activeDesktopDropdown,
    onOpen: openDesktopDropdown,
    onCancelClose: cancelDesktopDropdownClose,
    onScheduleClose: scheduleDesktopDropdownClose,
  }

  return (
    <header className="seo-site-navbar">
      <div className="seo-site-navbar__bar">
        <div className="seo-site-navbar__inner">
          <a href={MARKETING_ORIGIN} className="seo-site-navbar__brand">
            <img src={NAV_LOGO_SRC} alt="PartGenie" className="seo-site-navbar__brand-logo" />
          </a>

          <div className="seo-site-navbar__desktop" aria-label={tShell('primaryNav')}>
            <NavDropdown label={t('tools')} links={nav.tools} openKey="tools" {...dropdownProps} />
            <a
              href={nav.pricing.href}
              className="seo-site-navbar__link"
              onMouseEnter={() => openDesktopDropdown(null)}
            >
              {nav.pricing.label}
            </a>
            <NavDropdown label={t('compare')} links={nav.compare} openKey="compare" {...dropdownProps} />
            <a
              href={nav.insights.href}
              className="seo-site-navbar__link"
              onMouseEnter={() => openDesktopDropdown(null)}
            >
              {nav.insights.label}
            </a>
            <NavDropdown label={t('resources')} links={nav.resources} openKey="resources" {...dropdownProps} />
          </div>

          <div className="seo-site-navbar__actions">
            <SeoLocaleSwitcher variant="navbar" />
            <SeoNavUserActions ctaSlug={ctaSlug} />
          </div>

          <button
            type="button"
            className={`seo-site-navbar__menu-btn${mobileMenuOpen ? ' seo-site-navbar__menu-btn--open' : ''}`}
            aria-label={tShell('toggleMenu')}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((open) => {
                if (open) setActiveMobileDropdown(null)
                return !open
              })
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="seo-site-navbar__mobile-panel">
          <MobileDropdown
            label={t('tools')}
            links={nav.tools}
            openKey="tools"
            activeKey={activeMobileDropdown}
            onToggle={toggleMobileDropdown}
          />
          <a href={nav.pricing.href} className="seo-site-navbar__mobile-link seo-site-navbar__mobile-link--top">
            {nav.pricing.label}
          </a>
          <MobileDropdown
            label={t('compare')}
            links={nav.compare}
            openKey="compare"
            activeKey={activeMobileDropdown}
            onToggle={toggleMobileDropdown}
          />
          <a href={nav.insights.href} className="seo-site-navbar__mobile-link seo-site-navbar__mobile-link--top">
            {nav.insights.label}
          </a>
          <MobileDropdown
            label={t('resources')}
            links={nav.resources}
            openKey="resources"
            activeKey={activeMobileDropdown}
            onToggle={toggleMobileDropdown}
          />
          <SeoNavUserActions ctaSlug={ctaSlug} block className="seo-site-navbar__mobile-cta" />
          <SeoLocaleSwitcher variant="mobile" />
        </div>
      ) : null}
    </header>
  )
}
