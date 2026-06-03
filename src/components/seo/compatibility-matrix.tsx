import type { CompatibilityRow } from '@/types/seo-intelligence'
import { SectionTitle } from '@/components/seo/section-title'
import { UICard } from '@/components/ui/ui-card'

export function CompatibilityMatrix({ rows }: { rows: CompatibilityRow[] }) {
  return (
    <section className="seo-section">
      <SectionTitle title="Compatibility matrix" icon="compat" />
      <UICard className="seo-card">
        <table className="seo-table">
          <thead>
            <tr>
              <th scope="col">Factor</th>
              <th scope="col">Original</th>
              <th scope="col">Top alternative path</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.factor}>
                <th scope="row">{row.factor}</th>
                <td>{row.original}</td>
                <td>{row.topAlternative}</td>
                <td>{row.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </UICard>
    </section>
  )
}
