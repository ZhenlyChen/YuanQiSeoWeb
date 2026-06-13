'use client'

import Link from 'next/link'
import type { AppLocale } from '@/i18n/routing'
import { resolvePopularPartHref } from '@/lib/category-hot-parts'
import { resolveSeoCategoryLabel } from '@/lib/category-locale-label'
import { datasheetAiUrl, partFinderUrl } from '@/lib/tool-urls'
import type { CategoryPopularPartRow } from '@/types/seo-intelligence'

export function CategoryPopularPartsTable({
  title,
  intro,
  rows,
  catalogCtaLabel,
  slug = 'category-hub',
  locale,
  categoryFallback,
}: {
  title: string
  intro: string
  rows: CategoryPopularPartRow[]
  catalogCtaLabel: string
  slug?: string
  locale?: AppLocale
  categoryFallback?: string
}) {
  return (
    <section className="seo-page-section seo-page-section-anchor">
      <div className="seo-card">
        <h2 className="seo-card__title">{title}</h2>
        <p className="seo-section__lead">{intro}</p>
        {rows.length > 0 ? (
          <div className="seo-cat-parts-table-wrap">
            <table className="seo-cat-parts-table">
              <thead>
                <tr>
                  <th scope="col">Part Number</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Category</th>
                  <th scope="col">Key Specs</th>
                  <th scope="col">Common Use</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const partHref = resolvePopularPartHref(row)
                  return (
                  <tr key={`${partHref}-${row.mpn}`}>
                    <td>
                      <Link href={partHref} className="seo-cat-parts-table__mpn">
                        {row.mpn}
                      </Link>
                    </td>
                    <td>{row.manufacturer}</td>
                    <td>{resolveSeoCategoryLabel(row.category, locale, categoryFallback)}</td>
                    <td>{row.keySpecs}</td>
                    <td>{row.commonUse}</td>
                    <td>
                      <div className="seo-cat-parts-table__actions">
                        <Link href={partHref}>View intelligence</Link>
                        {row.alternativeHref ? <Link href={row.alternativeHref}>Find alternatives</Link> : null}
                        {row.compareHref ? <Link href={row.compareHref}>Compare</Link> : null}
                        <a
                          href={datasheetAiUrl(row.mpn, slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ask PartGenie
                        </a>
                      </div>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="seo-section__lead">Curated examples will appear here as intelligence pages are published.</p>
        )}
        <div className="seo-cat-parts-table__footer">
          <a
            href={partFinderUrl(slug)}
            className="seo-primary-cta seo-primary-cta--compact"
            target="_blank"
            rel="noopener noreferrer"
          >
            {catalogCtaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
