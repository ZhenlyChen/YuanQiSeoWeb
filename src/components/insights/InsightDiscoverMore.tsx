import { getTranslations } from 'next-intl/server'
import { IndustrySignalCard } from '@/components/discover/IndustrySignalCard'
import type { PublicDiscoverFeedItem } from '@/lib/discover-api'
import type { AppLocale } from '@/i18n/routing'

export async function InsightDiscoverMore({
  locale,
  items,
}: {
  locale: AppLocale
  items: PublicDiscoverFeedItem[]
}) {
  if (items.length === 0) return null

  const t = await getTranslations({ locale, namespace: 'insights' })

  return (
    <section className="mt-14 border-t border-[var(--pg-color-border-secondary)] pt-10">
      <h2 className="text-xl font-medium text-[var(--pg-color-text-primary)] [font-family:var(--seo-heading-font)]">
        {t('discoverMore')}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((entry) =>
          entry.industry ? (
            <li key={entry.industry.insightSlug} className="min-w-0">
              <IndustrySignalCard
                item={entry.industry}
                locale={locale}
                layout="grid"
                publishedAt={entry.publishedAt}
              />
            </li>
          ) : null,
        )}
      </ul>
    </section>
  )
}
