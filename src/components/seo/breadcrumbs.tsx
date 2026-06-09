'use client'

import { useLocale } from 'next-intl'
import { cn } from '@/lib/cn'
import { normalizeBreadcrumbItems } from '@/lib/breadcrumb-items'
import { routing } from '@/i18n/routing'
import type { BreadcrumbItem } from '@/types/seo-intelligence'

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

function localizedInternalHref(href: string, locale: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (routing.localePrefix === 'as-needed' && locale === routing.defaultLocale) return href
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href
  return `/${locale}${href}`
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  const locale = useLocale()
  const crumbs = normalizeBreadcrumbItems(items)

  return (
    <nav className={cn('seo-breadcrumbs', className)} aria-label="Breadcrumb">
      <a href="https://www.partgenie.ai/">Home</a>
      {crumbs.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            isExternalHref(item.href) ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <a href={localizedInternalHref(item.href, locale)}>{item.label}</a>
            )
          ) : (
            <span className="seo-breadcrumbs__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
