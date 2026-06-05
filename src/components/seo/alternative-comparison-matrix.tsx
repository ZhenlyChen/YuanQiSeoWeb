import { SectionTitle } from '@/components/seo/section-title'
import type {
  CompatibilityRow,
  FeatureCompareRow,
} from '@/types/seo-intelligence'

function compatRiskCell(row: CompatibilityRow) {
  if (row.notes) return `${row.topAlternative} — ${row.notes}`
  return row.topAlternative
}

export function AlternativeComparisonMatrix({
  compatibilityRows,
  featureRows,
  headers,
}: {
  compatibilityRows: CompatibilityRow[]
  featureRows: FeatureCompareRow[]
  headers: { original: string; alt1: string; alt2: string; alt3: string }
}) {
  return (
    <section className="seo-section seo-section--flat seo-alt-comparison-matrix">
      <div className="seo-section-block">
        <SectionTitle title="Alternative comparison matrix" />
        <div className="seo-alt-table-wrap seo-alt-table-wrap--matrix">
          <table className="seo-table seo-table--webapp seo-alt-comparison-matrix__table">
            <thead>
              <tr>
                <th scope="col" className="seo-alt-comparison-matrix__sticky-col">
                  Feature / factor
                </th>
                <th scope="col">{headers.original}</th>
                <th scope="col">{headers.alt1}</th>
                <th scope="col">{headers.alt2}</th>
                <th scope="col">{headers.alt3}</th>
                <th scope="col" className="seo-alt-comparison-matrix__compat-col">
                  Compatibility / risk
                </th>
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row) => (
                <tr key={`feature-${row.feature}`}>
                  <th scope="row" className="seo-alt-comparison-matrix__sticky-col">
                    {row.feature}
                  </th>
                  <td>{row.original}</td>
                  <td>{row.alt1}</td>
                  <td>{row.alt2}</td>
                  <td>{row.alt3}</td>
                  <td className="seo-alt-comparison-matrix__compat-col">—</td>
                </tr>
              ))}
              {compatibilityRows.map((row) => (
                <tr key={`compat-${row.factor}`}>
                  <th scope="row" className="seo-alt-comparison-matrix__sticky-col">
                    {row.factor}
                  </th>
                  <td>{row.original}</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td className="seo-alt-comparison-matrix__compat-col">{compatRiskCell(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
