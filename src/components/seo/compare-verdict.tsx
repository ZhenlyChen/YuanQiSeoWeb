import { UICard } from '@/components/ui/ui-card'
import { SectionTitle } from '@/components/seo/section-title'

export function CompareVerdict({
  chooseAIf,
  chooseBIf,
  doNotReplaceIf,
  partALabel,
  partBLabel,
}: {
  chooseAIf: string[]
  chooseBIf: string[]
  doNotReplaceIf: string[]
  partALabel: string
  partBLabel: string
}) {
  return (
    <section className="seo-section">
      <UICard className="seo-card">
        <SectionTitle title="Quick verdict" icon="verdict" />
        <div className="seo-compare-verdict">
          <div className="seo-compare-verdict__col">
            <h3>Choose {partALabel} if</h3>
            <ul>
              {chooseAIf.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="seo-compare-verdict__col">
            <h3>Choose {partBLabel} if</h3>
            <ul>
              {chooseBIf.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 'var(--pg-space-6)' }}>
          <h3 style={{ fontSize: '1rem', margin: '0 0 var(--pg-space-3)' }}>Do not replace directly if</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--pg-color-text-secondary)' }}>
            {doNotReplaceIf.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </UICard>
    </section>
  )
}
