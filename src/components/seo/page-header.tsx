import Link from 'next/link'
import type { PageSubtitle } from '@/types/seo-intelligence'

export function PageHeader({
  h1,
  h1SecondLine,
  subtitle,
  actions,
}: {
  h1: string
  h1SecondLine?: string
  subtitle?: PageSubtitle
  actions?: React.ReactNode
}) {
  return (
    <header className="seo-page-header">
      <div className="seo-page-header__inner">
        <div className={`seo-page-header__text${subtitle ? '' : ' seo-page-header__text--title-only'}`}>
          <h1 className="seo-page-header__h1">
            <span className="seo-page-header__h1-line">{h1}</span>
            {h1SecondLine ? (
              <>
                <br />
                <span className="seo-page-header__h1-line">{h1SecondLine}</span>
              </>
            ) : null}
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
      </div>
    </header>
  )
}
