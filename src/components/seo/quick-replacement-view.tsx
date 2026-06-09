import { AiSummaryHeading } from '@/components/seo/ai-verdict-card'
import { UntitledUiLineIcon } from '@/components/seo/untitled-ui-line-icon'
import { UIBadge } from '@/components/ui/ui-badge'
import { UICard } from '@/components/ui/ui-card'
import type { ReplacementVerdict, RiskAnalysisItem } from '@/types/seo-intelligence'

const RISK_ICON_PATHS = {
  electrical: 'M13 2 3 14h7l-1 8 10-12h-7l1-8z',
  package:
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
  firmware:
    'M9 2v2m6-2v2M9 20v2m6-2v2m5-13h2m-2 5h2M2 9h2m-2 5h2m4.8 6h6.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 17.72 20 16.88 20 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C17.72 4 16.88 4 15.2 4H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 6.28 4 7.12 4 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C6.28 20 7.12 20 8.8 20Zm1.8-5h2.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C15 14.24 15 13.96 15 13.4v-2.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C14.24 9 13.96 9 13.4 9h-2.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C9 9.76 9 10.04 9 10.6v2.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C9.76 15 10.04 15 10.6 15Z',
  sourcing:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9',
} as const

function riskBadgeTone(level: RiskAnalysisItem['level']) {
  if (level === 'high') return 'danger' as const
  if (level === 'medium') return 'warning' as const
  return 'success' as const
}

function riskIconPath(category: string) {
  const normalized = category.toLowerCase()
  if (normalized.includes('electrical')) return RISK_ICON_PATHS.electrical
  if (normalized.includes('package')) return RISK_ICON_PATHS.package
  if (normalized.includes('firmware')) return RISK_ICON_PATHS.firmware
  if (normalized.includes('sourcing')) return RISK_ICON_PATHS.sourcing
  return RISK_ICON_PATHS.electrical
}

export function QuickReplacementView({
  verdict,
  riskAnalysis,
}: {
  verdict: ReplacementVerdict
  riskAnalysis: RiskAnalysisItem[]
}) {
  return (
    <section className="seo-section">
      <UICard className="seo-card seo-replacement-card">
        <AiSummaryHeading title="AI replacement insight" />
        <div className="seo-replacement-panels">
          <div className="seo-replacement-panel seo-replacement-panel--risks">
            <div className="seo-risk-grid seo-risk-grid--flat">
              {riskAnalysis.map((risk) => (
                <div key={risk.category} className="seo-risk-grid__item">
                  <h4 className="seo-risk-grid__title">
                    <span className="seo-risk-grid__title-main">
                      <span className="seo-risk-grid__icon" aria-hidden="true">
                        <UntitledUiLineIcon path={riskIconPath(risk.category)} size={18} />
                      </span>
                      <span>{risk.category}</span>
                    </span>
                    <UIBadge tone={riskBadgeTone(risk.level)}>{risk.level}</UIBadge>
                  </h4>
                  <p>{risk.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="seo-spec-divider seo-replacement-divider" aria-hidden="true" />

          <div className="seo-replacement-panel seo-replacement-panel--verdict">
            <h3 className="seo-subheading">Can it be replaced directly?</h3>
            <p className="seo-replacement-panel__copy">{verdict.directReplacementAnswer}</p>
            <h3 className="seo-subheading">Best replacement path</h3>
            <p className="seo-replacement-panel__copy">{verdict.bestReplacementType}</p>
            <h3 className="seo-subheading">Main risk</h3>
            <p className="seo-replacement-panel__copy">{verdict.mainRisk}</p>
          </div>
        </div>
      </UICard>
    </section>
  )
}
