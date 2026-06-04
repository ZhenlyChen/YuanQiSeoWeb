'use client'

import Link from 'next/link'

export type AlternativesViewMode = 'list' | 'graph'

const ICON_SIZE = 20

function GraphViewIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      className="seo-view-toggle__icon-svg"
      aria-hidden="true"
    >
      <path
        d="M16.6666 16.6667V10.8333M9.99992 16.6667V8.33333M3.33325 16.6667L3.33325 13.3333M11.1721 4.18959L15.4792 5.80473M8.99889 4.50077L4.33344 7.99986M17.5505 5.36612C18.0386 5.85427 18.0386 6.64573 17.5505 7.13388C17.0623 7.62204 16.2709 7.62204 15.7827 7.13388C15.2945 6.64573 15.2945 5.85427 15.7827 5.36612C16.2709 4.87796 17.0623 4.87796 17.5505 5.36612ZM4.21714 7.86612C4.70529 8.35427 4.70529 9.14573 4.21714 9.63388C3.72898 10.122 2.93752 10.122 2.44937 9.63388C1.96121 9.14573 1.96121 8.35427 2.44937 7.86612C2.93752 7.37796 3.72898 7.37796 4.21714 7.86612ZM10.8838 2.86612C11.372 3.35427 11.372 4.14573 10.8838 4.63388C10.3956 5.12204 9.60419 5.12204 9.11603 4.63388C8.62788 4.14573 8.62788 3.35427 9.11603 2.86612C9.60419 2.37796 10.3956 2.37796 10.8838 2.86612Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ListViewIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      className="seo-view-toggle__icon-svg"
      aria-hidden="true"
    >
      <path
        d="M17.5 10.0001L7.5 10.0001M17.5 5.00008L7.5 5.00008M17.5 15.0001L7.5 15.0001M4.16667 10.0001C4.16667 10.4603 3.79357 10.8334 3.33333 10.8334C2.8731 10.8334 2.5 10.4603 2.5 10.0001C2.5 9.53984 2.8731 9.16675 3.33333 9.16675C3.79357 9.16675 4.16667 9.53984 4.16667 10.0001ZM4.16667 5.00008C4.16667 5.46032 3.79357 5.83341 3.33333 5.83341C2.8731 5.83341 2.5 5.46032 2.5 5.00008C2.5 4.53984 2.8731 4.16675 3.33333 4.16675C3.79357 4.16675 4.16667 4.53984 4.16667 5.00008ZM4.16667 15.0001C4.16667 15.4603 3.79357 15.8334 3.33333 15.8334C2.8731 15.8334 2.5 15.4603 2.5 15.0001C2.5 14.5398 2.8731 14.1667 3.33333 14.1667C3.79357 14.1667 4.16667 14.5398 4.16667 15.0001Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ViewToggleIcon({ mode }: { mode: AlternativesViewMode }) {
  return mode === 'graph' ? <GraphViewIcon /> : <ListViewIcon />
}

const VIEW_LABELS: Record<AlternativesViewMode, string> = {
  graph: 'Graph view',
  list: 'List view',
}

export function AlternativesViewToggle({
  active,
  onChange,
  slug,
}: {
  active: AlternativesViewMode
  onChange?: (mode: AlternativesViewMode) => void
  slug?: string
  /** @deprecated Icons only; ignored */
  listLabel?: string
  /** @deprecated Icons only */
  graphLabel?: string
}) {
  const modes: AlternativesViewMode[] = ['graph', 'list']

  if (slug) {
    return (
      <div className="seo-view-toggle seo-view-toggle--icon" role="group" aria-label="View mode">
        {modes.map((mode) => {
          const href = mode === 'graph' ? `/alternatives/${slug}?view=graph` : `/alternatives/${slug}`
          const isActive = active === mode
          return (
            <Link
              key={mode}
              href={href}
              className={`seo-view-toggle__btn ${isActive ? 'seo-view-toggle__btn--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={VIEW_LABELS[mode]}
              title={VIEW_LABELS[mode]}
            >
              <ViewToggleIcon mode={mode} />
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="seo-view-toggle seo-view-toggle--icon" role="group" aria-label="View mode">
      {modes.map((mode) => {
        const isActive = active === mode
        return (
          <button
            key={mode}
            type="button"
            className={`seo-view-toggle__btn ${isActive ? 'seo-view-toggle__btn--active' : ''}`}
            aria-pressed={isActive}
            aria-label={VIEW_LABELS[mode]}
            title={VIEW_LABELS[mode]}
            onClick={() => onChange?.(mode)}
          >
            <ViewToggleIcon mode={mode} />
          </button>
        )
      })}
    </div>
  )
}
