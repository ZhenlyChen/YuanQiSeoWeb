import Link from 'next/link'
import type { BreadcrumbItem } from '@/types/seo-intelligence'

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <Link href="https://www.partgenie.ai/">Home</Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          <span aria-hidden="true">/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
