import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { CategoryIcon } from '@/components/seo/category-icon'
import { CategoryQueryCarousel } from '@/components/seo/category-query-carousel'
import { resolveCategoryIconUrl } from '@/lib/category-icons'
import { getL1Category } from '@/lib/category-taxonomy'
import type { BreadcrumbItem, CategoryHubPage, CategoryIconId } from '@/types/seo-intelligence'

export function CategoryHeroBanner({ page }: { page: CategoryHubPage }) {
  const l1 = getL1Category(page.l1Slug)
  const iconId: CategoryIconId = l1?.iconId ?? 'passives'
  const iconUrl = resolveCategoryIconUrl(page.l1Slug, l1?.iconUrl)

  return (
    <section className="seo-cat-hero" aria-label={`${page.name} overview`}>
      <div className="seo-cat-hero__split" aria-hidden="true" />
      <div className="seo-cat-hero__layout">
        <div className="seo-cat-hero__icon-slot">
          <div
            className={[
              'seo-cat-hero__icon-card',
              iconUrl ? 'seo-cat-hero__icon-card--image' : '',
            ].filter(Boolean).join(' ')}
          >
            <CategoryIcon iconId={iconId} iconUrl={iconUrl} className="seo-cat-hero__icon" />
          </div>
        </div>
        <div className="seo-cat-hero__copy">
          <div className="seo-cat-hero__copy-inner">
            <Breadcrumbs items={page.breadcrumbs as BreadcrumbItem[]} className="seo-breadcrumbs--cat-hero" />
            <h1 className="seo-cat-hero__title">{page.meta.h1}</h1>
            <p className="seo-cat-hero__subtitle">{page.heroSubheading}</p>
          </div>
        </div>
      </div>
      <CategoryQueryCarousel page={page} />
    </section>
  )
}
