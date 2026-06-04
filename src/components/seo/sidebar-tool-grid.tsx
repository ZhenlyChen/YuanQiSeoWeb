import Link from 'next/link'
import type { ComponentIntelligencePage } from '@/types/seo-intelligence'

export type SidebarToolCard = {
  label: string
  href: string
  badge?: string
  icon: 'alternatives' | 'compare' | 'finder' | 'guides'
}

function ToolIcon({ icon }: { icon: SidebarToolCard['icon'] }) {
  switch (icon) {
    case 'alternatives':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8 7h8M8 12h8M8 17h5M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'compare':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 5v14M17 5v14M4 9h6M14 9h6M4 15h6M14 15h6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'finder':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'guides':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3zM5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9L5 17zM19 17l.9 2.1L22 20l-2.1.9L19 23l-.9-2.1L16 20l2.1-.9L19 17z"
            fill="currentColor"
          />
        </svg>
      )
  }
}

function ToolCard({ tool }: { tool: SidebarToolCard }) {
  const className = 'seo-tool-grid__card'

  const content = (
    <>
      <span className="seo-tool-grid__icon">
        <ToolIcon icon={tool.icon} />
      </span>
      <span className="seo-tool-grid__label">{tool.label}</span>
      {tool.badge ? <span className="seo-tool-grid__badge">{tool.badge}</span> : null}
    </>
  )

  if (tool.href.startsWith('http')) {
    return (
      <a href={tool.href} className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link href={tool.href} className={className}>
      {content}
    </Link>
  )
}

export function buildComponentToolGrid(page: ComponentIntelligencePage): SidebarToolCard[] {
  const compareHref = page.compareLinks[0]?.href ?? `/alternatives/${page.slug}`
  const guideHref = page.relatedAnswers[0]?.href ?? page.relatedCategory.href

  return [
    {
      label: 'Alternatives',
      href: `/alternatives/${page.slug}`,
      badge: `${page.alternatives.length} options`,
      icon: 'alternatives',
    },
    {
      label: 'Compare',
      href: compareHref,
      badge: page.compareLinks.length > 1 ? `${page.compareLinks.length} pages` : 'Side by side',
      icon: 'compare',
    },
    {
      label: 'Category Finder',
      href: page.relatedCategory.href,
      badge: page.categorySlug.toUpperCase(),
      icon: 'finder',
    },
    {
      label: 'Selection Guides',
      href: guideHref,
      badge: `${page.relatedAnswers.length} guides`,
      icon: 'guides',
    },
  ]
}

export function SidebarToolGrid({ tools }: { tools: SidebarToolCard[] }) {
  return (
    <div className="seo-tool-grid">
      {tools.slice(0, 4).map((tool) => (
        <ToolCard key={`${tool.label}-${tool.href}`} tool={tool} />
      ))}
    </div>
  )
}
