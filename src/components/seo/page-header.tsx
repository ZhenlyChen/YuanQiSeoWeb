import Link from 'next/link'
import type { PageSubtitle } from '@/types/seo-intelligence'

export function PageHeader({
  h1,
  subtitle,
  actions,
  headingFont = 'default',
}: {
  h1: string
  subtitle?: PageSubtitle
  actions?: React.ReactNode
  headingFont?: 'default' | 'mozilla'
}) {
  return (
    <header className="seo-page-header">
      <div className="seo-page-header__text">
        <h1 className={`seo-page-header__h1${headingFont === 'mozilla' ? ' seo-page-header__h1--mozilla' : ''}`}>
          {h1}
        </h1>
        {subtitle ? (
          <p className="seo-page-header__subtitle">
            {subtitle.manufacturerHref ? (
              <Link href={subtitle.manufacturerHref}>{subtitle.manufacturer}</Link>
            ) : (
              <span>{subtitle.manufacturer}</span>
            )}
            <span className="seo-page-header__dot" aria-hidden="true">
              •
            </span>
            {subtitle.categoryHref ? (
              <Link href={subtitle.categoryHref}>{subtitle.category}</Link>
            ) : (
              <span>{subtitle.category}</span>
            )}
            {subtitle.package ? (
              <>
                <span className="seo-page-header__dot" aria-hidden="true">
                  •
                </span>
                <span>{subtitle.package}</span>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
      {actions ? <div className="seo-page-header__actions">{actions}</div> : null}
    </header>
  )
}
