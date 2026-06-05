import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { BreadcrumbItem } from '@/types/seo-intelligence'

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={cn('seo-breadcrumbs', className)} aria-label="Breadcrumb">
      <Link href="https://www.partgenie.ai/">Home</Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="seo-breadcrumbs__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
