type SectionTitleIcon =
  | 'verdict'
  | 'specs'
  | 'compat'
  | 'risk'
  | 'fit'
  | 'design'
  | 'sourcing'
  | 'faq'
  | 'links'
  | 'alternatives'

function IconGlyph({ icon }: { icon: SectionTitleIcon }) {
  if (icon === 'verdict') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2.5l6 2v4.5c0 4-2.6 6.9-6 8.5-3.4-1.6-6-4.5-6-8.5V4.5l6-2z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (icon === 'specs') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6.5 7.5h7M6.5 10h7M6.5 12.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'compat') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7.5 4.5h-3v3M12.5 15.5h3v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 7.5a5.5 5.5 0 019.4-2.7M15 12.5a5.5 5.5 0 01-9.4 2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'risk') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3l7 12H3L10 3z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 8v3.5M10 13.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'fit') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="2.2" fill="currentColor" />
      </svg>
    )
  }
  if (icon === 'design') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5h12v10H4z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (icon === 'sourcing') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M6 6.5h8M6 10h8M6 13.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 3.5h12v13H4z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (icon === 'faq') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.8 8a1.8 1.8 0 113 1.4c-.9.4-1.3.9-1.3 1.8M10.5 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'links') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8 7l4 6M12 7L8 13" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.5" y="3.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 10h10M10 5v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function SectionTitle({ title, icon }: { title: string; icon: SectionTitleIcon }) {
  return (
    <h2 className="seo-section__title">
      <span className="seo-title-icon" aria-hidden="true">
        <IconGlyph icon={icon} />
      </span>
      <span>{title}</span>
    </h2>
  )
}
