import type { ApplicationIconId } from '@/lib/application-tags'

export function ApplicationTagIcon({ id }: { id: ApplicationIconId }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (id) {
    case 'industrial':
      return (
        <svg {...common}>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    case 'motor':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
          <path d="m5.6 5.6 1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
        </svg>
      )
    case 'consumer':
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="11" rx="1.5" />
          <path d="M9 19h6" />
        </svg>
      )
    case 'iot':
      return (
        <svg {...common}>
          <path d="M7 16a5 5 0 0 1 10 0" />
          <path d="M12 11V6M9.5 8 12 6l2.5 2" />
        </svg>
      )
    case 'instrumentation':
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="2.5" />
          <circle cx="15" cy="12" r="2.5" />
          <path d="M11.5 12h1" />
        </svg>
      )
    case 'robotics':
      return (
        <svg {...common}>
          <path d="M6 18V9l4-3 4 3v9" />
          <path d="M10 6V4h4v2" />
          <path d="M8 14h8" />
        </svg>
      )
    case 'power':
      return (
        <svg {...common}>
          <path d="M13 3 8 13h5l-1 8 6-12h-5z" />
        </svg>
      )
    case 'embedded':
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h6M9 12h4M9 15h5" />
        </svg>
      )
    case 'automotive':
      return (
        <svg {...common}>
          <path d="M5 15h14l-1.5-4.5H6.5z" />
          <circle cx="8" cy="15" r="1.5" />
          <circle cx="16" cy="15" r="1.5" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      )
  }
}
