import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { SeoUnavailableContext } from '@/lib/seo-not-found'

function detailRow(label: string, value?: string) {
  if (!value) return null
  return (
    <div className="seo-unavailable__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export async function SeoUnavailableScreen({ context }: { context?: SeoUnavailableContext | null }) {
  const t = await getTranslations('seoUnavailable')

  if (!context) {
    return (
      <main className="seo-unavailable">
        <h1 className="seo-unavailable__title">{t('fallbackTitle')}</h1>
        <p className="seo-unavailable__lead">{t('fallbackBody')}</p>
        <Link href="/" className="seo-unavailable__link">
          {t('homeLink')}
        </Link>
      </main>
    )
  }

  const kindLabel = t(`kinds.${context.kind}`)
  const title = t(`titles.${context.reason}`, { kind: kindLabel })
  const body = t(`bodies.${context.reason}`)

  return (
    <main className="seo-unavailable">
      <p className="seo-unavailable__eyebrow">{kindLabel}</p>
      <h1 className="seo-unavailable__title">{title}</h1>
      <p className="seo-unavailable__lead">{body}</p>

      <dl className="seo-unavailable__details">
        {detailRow(t('reasonLabel'), context.reason)}
        {detailRow(t('slugLabel'), context.slug)}
        {detailRow(t('pathLabel'), context.path)}
        {detailRow(t('localeLabel'), context.locale)}
        {detailRow(t('pageTypeLabel'), context.pageType)}
        {detailRow(t('expectedPageTypeLabel'), context.expectedPageType)}
        {detailRow(t('statusLabel'), context.status)}
        {detailRow(t('entityKeyLabel'), context.entityKey)}
      </dl>

      <p className="seo-unavailable__hint">
        <strong>{t('hintLabel')}:</strong> {context.hint ?? t('defaultHint')}
      </p>

      <Link href="/" className="seo-unavailable__link">
        {t('homeLink')}
      </Link>
    </main>
  )
}
