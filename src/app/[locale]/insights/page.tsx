import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { InsightsHubClient } from '@/components/seo/insights-hub-client'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { fetchDiscoverCategories, fetchDiscoverFeed, fetchDiscoverTrending } from '@/lib/discover-api'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadataFromApi } from '@/lib/seo-meta'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = parseAppLocale(localeParam)
  const t = await getTranslations({ locale, namespace: 'insights' })
  return buildPageMetadataFromApi(
    {
      title: t('metaTitle'),
      description: t('metaDescription'),
      canonicalPath: `/${locale}/insights`,
      slug: 'insights',
      locale,
    },
  )
}

export default async function InsightsHubPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = parseAppLocale(localeParam)
  const t = await getTranslations({ locale, namespace: 'insights' })

  const [feedResult, trending, categoriesResult] = await Promise.all([
    fetchDiscoverFeed(),
    fetchDiscoverTrending(),
    fetchDiscoverCategories(),
  ])
  const feed = feedResult?.items ?? []

  const itemList = {
    name: t('title'),
    items: feed
      .filter((item) => item.industry?.insightSlug && item.industry.headline)
      .map((item) => ({
        name: item.industry!.headline,
        url: `/${locale}/insights/${item.industry!.insightSlug}`,
      })),
  }

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: t('breadcrumbHome'), href: `/${locale}` },
        { label: t('title') },
      ]}
      locale={locale}
      pageContext={{ slug: 'insights', kind: 'insights' }}
      hideBreadcrumbs
      itemList={itemList.items.length > 0 ? itemList : undefined}
    >
      <InsightsHubClient
        locale={locale}
        feed={feed}
        trending={trending}
        categories={categoriesResult?.labels ?? []}
        initialHasMore={Boolean(feedResult?.hasMore)}
        initialNextCursor={feedResult?.nextCursor ?? ''}
      />
    </SeoPageShell>
  )
}
