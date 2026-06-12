'use client'

import clsx from 'clsx'

export function DiscoverFilterChip({
  selected,
  label,
  onClick,
  className,
  variant = 'filter',
}: {
  selected: boolean
  label: string
  onClick: () => void
  className?: string
  /** filter = catalog/param chips; profile = onboarding role/industry pills */
  variant?: 'filter' | 'profile'
}) {
  if (variant === 'profile') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
          selected
            ? 'border-[#101828] bg-[#101828] text-white'
            : 'border-[#E4E7EC] bg-[#F9FAFB] text-[#344054] hover:border-[#D0D5DD] hover:bg-white',
          className,
        )}
      >
        {selected && (
          <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3.5 8.5 6.5 11.5 12.5 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span>{label}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex shrink-0 items-center whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] transition-all duration-200',
        selected
          ? 'border-[#2CA5B5] bg-white text-[#2CA5B5]'
          : 'border-[#D0D5DD] bg-white text-[#667085] hover:border-[#2CA5B5] hover:text-[#207883] hover:shadow-sm',
        className,
      )}
    >
      {label}
    </button>
  )
}
