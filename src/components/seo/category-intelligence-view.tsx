'use client'

import { useLocale, useTranslations } from 'next-intl'
import { DesignRiskGrid } from '@/components/seo/design-risk-grid'
import { CategoryHeroBanner } from '@/components/seo/category-hero-banner'
import { CategoryChoiceCards } from '@/components/seo/category-choice-cards'
import { CategorySubcategoryCards } from '@/components/seo/category-subcategory-cards'
import { ComponentSectionNav } from '@/components/seo/component-section-nav'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { SidebarToolGrid } from '@/components/seo/sidebar-tool-grid'
import { Stars02Icon } from '@/components/seo/stars-02-icon'
import { TopSearchedPartsTable } from '@/components/seo/top-searched-parts-table'
import { TypewriterText } from '@/components/seo/typewriter-text'
import { buildCategorySectionNavItems } from '@/lib/category-section-nav-items'
import { buildRelatedL1CategoryLinks } from '@/lib/category-taxonomy'
import { resolveCategoryHotParts } from '@/lib/category-hot-parts'
import { buildCategoryToolGrid } from '@/lib/category-tool-links'
import type { AppLocale } from '@/i18n/routing'
import type { CategoryHubPage } from '@/types/seo-intelligence'
import Link from 'next/link'

function CategoryRiskCards({
  title,
  cards,
}: {
  title: string
  cards: CategoryHubPage['designRisks']
}) {
  return (
    <section id="risks" className="seo-page-section seo-page-section-anchor seo-cat-risks-section">
      <h2 className="seo-card__title">{title}</h2>
      <DesignRiskGrid items={cards} />
    </section>
  )
}

function CategoryManufacturersSection({
  title,
  intro,
  manufacturers,
}: {
  title: string
  intro: string
  manufacturers: CategoryHubPage['manufacturers']
}) {
  if (manufacturers.length === 0) return null

  return (
    <section id="manufacturers" className="seo-page-section seo-page-section-anchor">
      <div className="seo-card">
        <h2 className="seo-card__title">{title}</h2>
        <p className="seo-section__lead">{intro}</p>
        <div className="seo-cat-mfg-grid">
          {manufacturers.map((manufacturer) => (
            <article key={manufacturer.slug} className="seo-cat-mfg-card">
              <h3 className="seo-cat-mfg-card__title">
                <Link href={manufacturer.href}>{manufacturer.name}</Link>
              </h3>
              <p className="seo-cat-mfg-card__known-for">
                <strong>Known for:</strong> {manufacturer.knownFor}
              </p>
              <p className="seo-cat-mfg-card__families">
                <strong>Popular families:</strong> {manufacturer.popularFamilies}
              </p>
              <Link href={manufacturer.href} className="seo-cat-mfg-card__cta">
                View manufacturer intelligence
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CategoryIntelligenceView({ page }: { page: CategoryHubPage }) {
  const t = useTranslations('categories')
  const locale = useLocale() as AppLocale

  const chooseTitle = t('hub.howToChooseTitle', { categoryName: page.name })
  const subcatTitle = page.subcategoriesSectionTitle
  const partsTitle = t('hub.popularPartsTitle', { categoryName: page.name })
  const risksTitle = t('hub.designRisksTitle')
  const mfgTitle = t('hub.manufacturersTitle', { categoryName: page.name })
  const faqTitle = t('hub.faqTitle')

  return (
    <div className="seo-page-body seo-page-body--category">
      <CategoryHeroBanner page={page} />
      <ComponentSectionNav items={buildCategorySectionNavItems(page)} />
      <div className="seo-page-split seo-page-split--category">
        <PageLayout
          main={
            <>
              <div
                id="overview"
                className="seo-page-section seo-page-section-anchor seo-direct-answer seo-direct-answer--gradient seo-direct-answer--manufacturer"
              >
                <h2 className="seo-card__title seo-ai-summary__title">
                  <Stars02Icon className="seo-ai-summary__icon" />
                  {t('hub.quickAnswerTitle', { categoryName: page.name })}
                </h2>
                <TypewriterText text={page.quickAnswer} className="seo-direct-answer__body" />
              </div>

              <div id="choose">
                <CategoryChoiceCards title={chooseTitle} intro={page.howToChooseIntro} cards={page.howToChooseCards} />
              </div>

              <div id="subcategories">
                <CategorySubcategoryCards
                  title={subcatTitle}
                  cards={page.subcategories}
                />
              </div>

              <div id="parts">
                <div className="seo-page-section seo-page-section-anchor">
                  <TopSearchedPartsTable
                    slug={page.slug}
                    title={partsTitle}
                    items={resolveCategoryHotParts(page)}
                    variant="category"
                    locale={locale}
                    categoryFallback={page.name}
                  />
                </div>
              </div>

              <CategoryRiskCards title={risksTitle} cards={page.designRisks} />

              <CategoryManufacturersSection
                title={mfgTitle}
                intro={page.manufacturersIntro}
                manufacturers={page.manufacturers}
              />

              <div id="faq" className="seo-page-section seo-page-section-anchor">
                <QaBlocks items={page.faq} title={faqTitle} />
              </div>
            </>
          }
          sidebar={
            <>
              <SidebarToolGrid tools={buildCategoryToolGrid(page)} />
              <SidebarRelatedLinks
                links={buildRelatedL1CategoryLinks(page.l1Slug)}
                title={t('hub.relatedLinksTitle')}
              />
            </>
          }
        />
      </div>
    </div>
  )
}
