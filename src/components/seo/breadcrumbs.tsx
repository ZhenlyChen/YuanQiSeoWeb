import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import type { BreadcrumbItem } from '@/types/seo-intelligence'

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={cn('seo-breadcrumbs', className)} aria-label="Breadcrumb">
      <a href="https://www.partgenie.ai/">Home</a>
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
