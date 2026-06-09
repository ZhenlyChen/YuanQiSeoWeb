'use client'

import { useState } from 'react'
import type { CategoryIconId } from '@/types/seo-intelligence'

const common = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function CategoryIconSvg({ iconId, className }: { iconId: CategoryIconId; className?: string }) {
  const svg = (() => {
    switch (iconId) {
      case 'mcu':
        return (
          <svg {...common}>
            <rect x="7" y="7" width="10" height="10" rx="1.5" />
            <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        )
      case 'power-management':
        return (
          <svg {...common}>
            <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />
          </svg>
        )
      case 'power-discrete':
        return (
          <svg {...common}>
            <rect x="4" y="8" width="16" height="8" rx="1.5" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        )
      case 'mems-sensors':
        return (
          <svg {...common}>
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            <path d="m5.6 5.6 1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
          </svg>
        )
      case 'data-converters':
        return (
          <svg {...common}>
            <path d="M4 16V8M8 16V5M12 16v-6M16 16V7M20 16v-9" />
          </svg>
        )
      case 'rf-wireless':
        return (
          <svg {...common}>
            <path d="M8 16a4 4 0 0 1 8 0" />
            <path d="M5 13a7 7 0 0 1 14 0" />
            <circle cx="12" cy="17" r="1" />
          </svg>
        )
      case 'automotive':
        return (
          <svg {...common}>
            <path d="M5 17h14l-1-5H6l-1 5z" />
            <circle cx="7.5" cy="17.5" r="1.5" />
            <circle cx="16.5" cy="17.5" r="1.5" />
            <path d="M6 12h12" />
          </svg>
        )
      case 'connectivity':
        return (
          <svg {...common}>
            <rect x="3" y="8" width="8" height="8" rx="1.5" />
            <rect x="13" y="8" width="8" height="8" rx="1.5" />
            <path d="M11 12h2" />
          </svg>
        )
      case 'memory':
        return (
          <svg {...common}>
            <rect x="4" y="6" width="16" height="12" rx="1.5" />
            <path d="M8 10v4M12 10v4M16 10v4" />
          </svg>
        )
      case 'passives':
        return (
          <svg {...common}>
            <path d="M6 12h12" />
            <rect x="8" y="9" width="8" height="6" rx="1" />
          </svg>
        )
      case 'connectors':
        return (
          <svg {...common}>
            <path d="M8 8h8v8H8z" />
            <path d="M10 5v3M14 5v3M10 16v3M14 16v3M5 10h3M5 14h3M16 10h3M16 14h3" />
          </svg>
        )
      case 'fpga-logic':
        return (
          <svg {...common}>
            <rect x="5" y="5" width="14" height="14" rx="2" />
            <path d="M9 9h6v6H9z" />
            <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
          </svg>
        )
      default:
        return (
          <svg {...common}>
            <path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0l-7.17-7.17a2 2 0 0 1 0-2.83l7.17-7.17a2 2 0 0 1 2.83 0l7.3 7.3a2 2 0 0 1 0 2.83z" />
            <circle cx="7.5" cy="7.5" r="1" />
          </svg>
        )
    }
  })()

  return <span className={className}>{svg}</span>
}

export function CategoryIcon({
  iconId,
  iconUrl,
  className,
}: {
  iconId: CategoryIconId
  iconUrl?: string
  className?: string
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const resolvedIconUrl = iconUrl?.trim()

  if (resolvedIconUrl && !imageFailed) {
    const imageClassName = ['seo-category-icon-image', className].filter(Boolean).join(' ')
    return (
      <img
        src={resolvedIconUrl}
        alt=""
        className={imageClassName}
        aria-hidden="true"
        draggable={false}
        onError={() => setImageFailed(true)}
      />
    )
  }

  return <CategoryIconSvg iconId={iconId} className={className} />
}
