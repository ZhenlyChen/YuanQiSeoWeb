'use client'

import { useId } from 'react'

/** Figma stars-02 — brand gradient stroke (#207883 → #22808D). */
export function Stars02Icon({
  className,
  size = 20,
}: {
  className?: string
  size?: number
}) {
  const uid = useId().replace(/:/g, '')
  const gradientId = `stars02-grad-${uid}`
  const clipId = `stars02-clip-${uid}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M3.75033 18.3327V14.166M3.75033 5.83268V1.66602M1.66699 3.74935H5.83366M1.66699 16.2493H5.83366M10.8337 2.49935L9.38851 6.25673C9.1535 6.86776 9.036 7.17327 8.85327 7.43025C8.69132 7.65801 8.49232 7.85701 8.26456 8.01896C8.00758 8.20169 7.70207 8.31919 7.09104 8.5542L3.33366 9.99935L7.09105 11.4445C7.70207 11.6795 8.00758 11.797 8.26456 11.9797C8.49232 12.1417 8.69132 12.3407 8.85327 12.5684C9.036 12.8254 9.1535 13.1309 9.38851 13.742L10.8337 17.4993L12.2788 13.742C12.5138 13.1309 12.6313 12.8254 12.8141 12.5684C12.976 12.3407 13.175 12.1417 13.4028 11.9797C13.6597 11.797 13.9653 11.6795 14.5763 11.4445L18.3337 9.99935L14.5763 8.5542C13.9652 8.31919 13.6597 8.20169 13.4028 8.01896C13.175 7.85701 12.976 7.65801 12.8141 7.43025C12.6313 7.17327 12.5138 6.86776 12.2788 6.25673L10.8337 2.49935Z"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.66"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1="1.66699"
          y1="1.66602"
          x2="18.3337"
          y2="1.66602"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#207883" />
          <stop offset="1" stopColor="#22808D" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
