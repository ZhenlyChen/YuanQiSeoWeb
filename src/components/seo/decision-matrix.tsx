import type { DecisionMatrixRow } from '@/types/seo-intelligence'
import { UICard } from '@/components/ui/ui-card'

export function DecisionMatrix({ rows, title = 'Decision matrix' }: { rows: DecisionMatrixRow[]; title?: string }) {
  return (
    <section className="seo-section">
      <UICard className="seo-card">
        <h2 className="seo-card__title">{title}</h2>
        <table className="seo-table">
          <thead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">PartGenie recommendation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.question}>
                <th scope="row">{row.question}</th>
                <td>{row.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </UICard>
    </section>
  )
}
