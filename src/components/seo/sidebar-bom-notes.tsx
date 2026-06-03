import type { BomSourcingNotes } from '@/types/seo-intelligence'
import { UICard } from '@/components/ui/ui-card'

function statusDot(level: 'active' | 'medium' | 'high') {
  return <span className={`seo-status-dot seo-status-dot--${level}`} aria-hidden="true" />
}

export function SidebarBomNotes({ notes }: { notes: BomSourcingNotes }) {
  return (
    <UICard className="seo-sidebar-card">
      <h2 className="seo-sidebar-card__title">BOM & sourcing notes</h2>
      <dl className="seo-sidebar-notes">
        <div>
          <dt>Lifecycle status</dt>
          <dd>
            {statusDot('active')}
            {notes.lifecycle}
          </dd>
        </div>
        <div>
          <dt>Single-source risk</dt>
          <dd>{notes.supplyRisk}</dd>
        </div>
        <div>
          <dt>Replacement readiness</dt>
          <dd>{notes.replacementReadiness}</dd>
        </div>
      </dl>
    </UICard>
  )
}
