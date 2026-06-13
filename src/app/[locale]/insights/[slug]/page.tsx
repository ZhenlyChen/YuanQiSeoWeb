import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { DiscoverCoverImage } from '@/components/discover/DiscoverCoverImage'
import { DiscoverPublishedAt } from '@/components/discover/DiscoverPublishedAt'
import { DiscoverSourceLabel } from '@/components/discover/DiscoverSourceLabel'
import { InsightBody } from '@/components/insights/InsightBody'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { fetchDiscoverFeed, fetchDiscoverItemBySlug } from '@/lib/discover-api'
import { InsightDiscoverMore } from '@/components/insights/InsightDiscoverMore'
import { formatDiscoverCategoryLabel } from '@/lib/discover-label'
import { localizePath } from '@/lib/localized-path'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadataFromApi, resolvePreviewRobots } from '@/lib/seo-meta'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams
  const item = await fetchDiscoverItemBySlug(slug, { previewToken: sp.preview })
  if (!item) {
    return { title: 'Insight | PartGenie', robots: { index: false, follow: false } }
  }
  return buildPageMetadataFromApi({
    title: item.headline,
    description: item.summary,
    canonicalPath: `/${locale}/insights/${slug}`,
    slug,
    locale,
    robots: resolvePreviewRobots(sp.preview),
  })
}

export default async function InsightDetailPage({ params, searchParams }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = parseAppLocale(localeParam)
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'insights' })
  const [item, feedResult] = await Promise.all([
    fetchDiscoverItemBySlug(slug, { previewToken: sp.preview }),
    fetchDiscoverFeed(),
  ])
  if (!item) notFound()

  const discoverMoreItems = (feedResult?.items ?? []).filter(
    (entry) => entry.industry?.insightSlug && entry.industry.insightSlug !== slug,
  ).slice(0, 3)

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: t('breadcrumbHome'), href: `/${locale}` },
        { label: t('title'), href: `/${locale}/insights` },
        { label: item.headline },
      ]}
      locale={locale}
      showPreviewBanner={Boolean(sp.preview)}
      previewBannerMessage={sp.preview ? t('previewBanner') : undefined}
      pageContext={{ slug, kind: 'insight' }}
      hideBreadcrumbs
    >
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <div className="mb-10">
          <Link
            href={localizePath('/insights', locale)}
            className="inline-flex rounded-lg border border-[var(--pg-color-border-secondary)] px-4 py-2 text-sm font-medium transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB] hover:text-[#101828]"
          >
            {t('backToFeed')}
          </Link>
        </div>
        <div className="flex w-full items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-[#207883]">
            {formatDiscoverCategoryLabel(item.categoryLabel || t('industrySignal'))}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-[var(--pg-color-text-primary)]">{item.headline}</h1>
        {item.coverImageUrl && (
          <DiscoverCoverImage
            src={item.coverImageUrl}
            className="mt-5 aspect-[16/9] w-full rounded-lg"
          />
        )}
        {(item.sourceName || item.sourceUrl || item.publishedAt) && (
          <div className="mt-2 flex w-full items-center justify-between gap-3">
            {(item.sourceName || item.sourceUrl) ? (
              <DiscoverSourceLabel
                name={item.sourceName}
                sourceUrl={item.sourceUrl}
                className="min-w-0 text-sm text-[var(--pg-color-text-tertiary)]"
                linkClassName="font-medium hover:text-[#207883] hover:underline"
              />
            ) : (
              <span />
            )}
            <DiscoverPublishedAt publishedAt={item.publishedAt} />
          </div>
        )}
        <p className="mt-6 text-lg leading-relaxed text-[var(--pg-color-text-secondary)]">{item.summary}</p>
        <InsightBody html={item.bodyHtml || ''} />

        {item.relatedComponents && item.relatedComponents.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--pg-color-text-tertiary)]">
              {t('relatedComponents')}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.relatedComponents.map((c) => (
                <li
                  key={c.mpn}
                  className="rounded-full border border-[var(--pg-color-border-secondary)] px-3 py-1 text-sm"
                >
                  {c.mpn}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {discoverMoreItems.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-10 md:px-6">
          <InsightDiscoverMore locale={locale} items={discoverMoreItems} />
        </div>
      )}
    </SeoPageShell>
  )
}
