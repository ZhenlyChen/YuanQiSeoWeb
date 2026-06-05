import { buildManufacturerRelatedTools } from '@/lib/manufacturer-tool-links'
import type { ComponentIntelligencePage, ManufacturerIntelligencePage } from '@/types/seo-intelligence'
import { ComponentToolIcon } from '@/components/seo/untitled-ui-line-icon'
import {
  buildComponentToolCtaLinks,
  type ComponentToolCtaLink,
} from '@/lib/component-tool-cta-links'

export type SidebarToolCard = {
  label: string
  href: string
  icon: ComponentToolCtaLink['icon']
}

function ToolCard({ tool }: { tool: SidebarToolCard }) {
  const content = (
    <>
      <span className="seo-tool-grid__icon">
        <ComponentToolIcon name={tool.icon} size={24} />
      </span>
      <span className="seo-tool-grid__label">{tool.label}</span>
    </>
  )

  return (
    <a href={tool.href} className="seo-tool-grid__card" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  )
}

export function buildSidebarToolCards(slug: string, mpn: string): SidebarToolCard[] {
  return buildComponentToolCtaLinks(slug, mpn).map((link) => ({
    label: link.shortLabel,
    href: link.href,
    icon: link.icon,
  }))
}

export function buildComponentToolGrid(page: ComponentIntelligencePage): SidebarToolCard[] {
  return buildSidebarToolCards(page.slug, page.mpn)
}

export function buildManufacturerToolGrid(page: ManufacturerIntelligencePage): SidebarToolCard[] {
  return buildManufacturerRelatedTools(page).map((tool) => ({
    label: tool.label,
    href: tool.href,
    icon: tool.icon,
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
