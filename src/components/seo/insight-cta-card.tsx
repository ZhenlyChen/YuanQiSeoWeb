'use client'

import { UntitledUiLineIcon } from '@/components/seo/untitled-ui-line-icon'

export function InsightCtaCard({
  title,
  subtitle,
  iconPath,
  onClick,
}: {
  title: string
  subtitle: string
  iconPath: string
  onClick: () => void
}) {
  return (
    <button type="button" className="seo-insight-cta" onClick={onClick}>
      <span className="seo-insight-cta__icon" aria-hidden="true">
        <UntitledUiLineIcon path={iconPath} size={24} />
      </span>
      <span className="seo-insight-cta__copy">
        <span className="seo-insight-cta__title">{title}</span>
        <span className="seo-insight-cta__subtitle">{subtitle}</span>
      </span>
    </button>
  )
}
