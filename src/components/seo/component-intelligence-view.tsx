import { AiSummaryHeading, AiVerdictCard } from '@/components/seo/ai-verdict-card'
import { OverviewTags, resolveOverviewTags } from '@/components/seo/overview-tags'
import { AlternativeList } from '@/components/seo/alternative-list'
import { ComponentSectionNav } from '@/components/seo/component-section-nav'
import { buildComponentSectionNavItems } from '@/lib/component-section-nav-items'
import { DecisionInsightsTabs } from '@/components/seo/decision-insights-tabs'
import { KeySpecsSnapshot } from '@/components/seo/key-specs-snapshot'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { SidebarSourcingHelp } from '@/components/seo/sidebar-sourcing-help'
import { SidebarToolGrid, buildComponentToolGrid } from '@/components/seo/sidebar-tool-grid'
import { partImageForMpn } from '@/lib/part-images'
import { signUpUrl } from '@/lib/tool-urls'
import type { ComponentIntelligencePage } from '@/types/seo-intelligence'

export function ComponentIntelligenceView({ page }: { page: ComponentIntelligencePage }) {
  const relatedLinks = [
    page.relatedManufacturer,
    page.relatedCategory,
    { label: `${page.mpn} alternatives`, href: `/alternatives/${page.slug}` },
    ...page.compareLinks,
    ...page.relatedAnswers,
  ]
  const hasDatasheet = Boolean(page.media.datasheetUrls?.length)
  const sectionNavItems = buildComponentSectionNavItems({
    alternativesCount: page.alternatives.length,
    hasApplications: page.applications.goodFit.length > 0,
    hasDatasheet,
  })

  return (
    <>
      <PageHeader h1={page.meta.h1} h1SecondLine={page.meta.h1SecondLine} />

      <div className="seo-page-body">
        <ComponentSectionNav items={sectionNavItems} />
        <PageLayout
        main={
          <>
            <section id="overview" className="seo-page-section seo-top-summary-card">
              <AiSummaryHeading />
              <div className="seo-overview-hero">
                <div className="seo-model-visual seo-model-visual--embedded">
                  <div className="seo-model-visual__image-wrap">
                    <img
                      src={partImageForMpn(page.mpn)}
                      alt={`${page.mpn} package`}
                      className="seo-model-visual__image"
                    />
                  </div>
                  <div className="seo-model-visual__header">
                    <p className="seo-model-visual__name">{page.mpn}</p>
                    <p className="seo-model-visual__desc">{page.categoryLabel}</p>
                    <OverviewTags
                      tags={resolveOverviewTags(page.overviewTags, {
                        package: page.package,
                        manufacturer: page.manufacturer,
                      })}
                      className="seo-model-visual__tags"
                    />
                  </div>
                </div>

                <p
                  className="seo-direct-answer seo-direct-answer--embedded seo-direct-answer--overview"
                  id="short-answer">
                  {page.shortAnswer}
                </p>
              </div>
              <AiVerdictCard
                verdict={page.aiVerdict}
                sourcingContext="Multiple alternatives available"
                hideHeading
                hideFooter
              />
            </section>
            <div id="specifications" className="seo-page-section">
              <KeySpecsSnapshot
                specs={page.keySpecs}
                compliance={page.compliance}
                applicationTags={page.applications.goodFit}
                mpn={page.mpn}
                slug={page.slug}
                datasheetUrls={page.media.datasheetUrls}
                datasheetSizeBytes={page.media.datasheetSizeBytes}
              />
            </div>
            <div id="alternatives" className="seo-page-section">
            <AlternativeList
              items={page.alternatives}
              title="Alternative components"
              showViewToggle
              gated
              slug={page.slug}
              mpn={page.mpn}
              gatedCtaHref={signUpUrl(page.slug)}
            />
            </div>

            <div id="design" className="seo-page-section">
              <DecisionInsightsTabs
                designConsiderations={page.designConsiderations}
                notRecommended={page.applications.notRecommended}
                commonPitfalls={page.commonPitfalls}
              />
            </div>

            <div id="resources" className="seo-page-section">
              <QaBlocks items={page.faq} />
            </div>
          </>
        }
        sidebar={
          <>
            <SidebarToolGrid tools={buildComponentToolGrid(page)} />
            <SidebarSourcingHelp slug={page.slug} />
            <SidebarRelatedLinks links={relatedLinks} />
          </>
        }
        />
      </div>
    </>
  )
}
