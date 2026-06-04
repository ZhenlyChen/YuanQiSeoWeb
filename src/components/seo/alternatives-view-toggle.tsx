'use client'

import Link from 'next/link'
import { ComponentToolIcon } from '@/components/seo/untitled-ui-line-icon'

export type AlternativesViewMode = 'list' | 'graph'

function ViewToggleIcon({ mode }: { mode: AlternativesViewMode }) {
  return (
    <ComponentToolIcon
      name={mode === 'graph' ? 'layoutGrid' : 'list'}
      size={16}
      className="seo-view-toggle__icon-svg"
    />
  )
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
