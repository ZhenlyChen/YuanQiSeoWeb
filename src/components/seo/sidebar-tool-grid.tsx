import type { ComponentIntelligencePage } from '@/types/seo-intelligence'
import { ComponentToolIcon } from '@/components/seo/untitled-ui-line-icon'
import {
  buildComponentToolCtaLinks,
  type ComponentToolCtaLink,
} from '@/lib/component-tool-cta-links'

export type SidebarToolCard = {
  label: string
  href: string
  badge?: string
  icon: ComponentToolCtaLink['icon']
}

function ToolCard({ tool }: { tool: SidebarToolCard }) {
  const content = (
    <>
      <span className="seo-tool-grid__icon">
        <ComponentToolIcon name={tool.icon} size={24} />
      </span>
      <span className="seo-tool-grid__label">{tool.label}</span>
      {tool.badge ? <span className="seo-tool-grid__badge">{tool.badge}</span> : null}
    </>
  )

  return (
    <a href={tool.href} className="seo-tool-grid__card" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  )
}

export function buildComponentToolGrid(page: ComponentIntelligencePage): SidebarToolCard[] {
  return buildComponentToolCtaLinks(page.slug, page.mpn, page.alternatives.length).map((link) => ({
    label: link.shortLabel,
    href: link.href,
    badge: link.badge,
    icon: link.icon,
  }))
}

export function SidebarToolGrid({ tools }: { tools: SidebarToolCard[] }) {
  return (
    <div className="seo-tool-grid">
      {tools.map((tool) => (
        <ToolCard key={`${tool.label}-${tool.href}`} tool={tool} />
      ))}
    </div>
  )
}
