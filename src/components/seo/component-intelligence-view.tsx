import { AiVerdictCard } from '@/components/seo/ai-verdict-card'
import { AlternativeList } from '@/components/seo/alternative-list'
import { ContextualLinksBar } from '@/components/seo/contextual-links-bar'
import { DecisionInsightsTabs } from '@/components/seo/decision-insights-tabs'
import { KeySpecsSnapshot } from '@/components/seo/key-specs-snapshot'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarBomNotes } from '@/components/seo/sidebar-bom-notes'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { SidebarSourcingHelp } from '@/components/seo/sidebar-sourcing-help'
import { SidebarToolGrid, buildComponentToolGrid } from '@/components/seo/sidebar-tool-grid'
import { partImageForMpn } from '@/lib/part-images'
import { signUpUrl } from '@/lib/tool-urls'
import type { ComponentIntelligencePage } from '@/types/seo-intelligence'

export function ComponentIntelligenceView({ page }: { page: ComponentIntelligencePage }) {
  const compareHref = page.compareLinks[0]?.href ?? `/alternatives/${page.slug}`
  const keySpecsWithCompliance = [
    ...page.keySpecs,
    ...(page.compliance?.rohs ? [{ label: 'RoHS', value: page.compliance.rohs }] : []),
    ...(page.compliance?.reach ? [{ label: 'REACH', value: page.compliance.reach }] : []),
    ...(page.compliance?.msl ? [{ label: 'MSL', value: page.compliance.msl }] : []),
  ]
  const relatedLinks = [
    page.relatedManufacturer,
    page.relatedCategory,
    { label: `${page.mpn} alternatives`, href: `/alternatives/${page.slug}` },
    ...page.compareLinks,
    ...page.relatedAnswers,
  ]

  return (
    <>
      <PageHeader h1={page.meta.h1} h1SecondLine={page.meta.h1SecondLine} />

      <PageLayout
        main={
          <>
            <section className="seo-top-summary-card">
              <div className="seo-model-visual seo-model-visual--embedded">
                <div className="seo-model-visual__image-wrap">
                  <img src={partImageForMpn(page.mpn)} alt={`${page.mpn} package`} className="seo-model-visual__image" />
                </div>
                <div className="seo-model-visual__meta">
                  <p className="seo-model-visual__name">{page.mpn}</p>
                  <p className="seo-model-visual__desc">{page.categoryLabel}</p>
                  <div className="seo-model-visual__tags">
                    <span className="seo-app-tag">Package: {page.package}</span>
                    <span className="seo-app-tag">{page.manufacturer}</span>
                  </div>
                </div>
              </div>

              <p className="seo-direct-answer seo-direct-answer--embedded" id="short-answer">
                {page.shortAnswer}
              </p>

              <ContextualLinksBar
                slug={page.slug}
                mpn={page.mpn}
                compareHref={compareHref}
                categoryHref={page.relatedCategory.href}
                categoryLabel={page.relatedCategory.label}
                manufacturerHref={page.relatedManufacturer.href}
                manufacturerLabel={page.manufacturer}
              />
            </section>

            <AiVerdictCard
              verdict={page.aiVerdict}
              sourcingContext="Multiple alternatives available"
            />
            <KeySpecsSnapshot
              specs={keySpecsWithCompliance}
              applicationTags={page.applications.goodFit}
              mpn={page.mpn}
              slug={page.slug}
            />
            <AlternativeList
              items={page.alternatives}
              title="Alternative components"
              viewAllHref={`/alternatives/${page.slug}`}
              layout="card"
              gated
              slug={page.slug}
              mpn={page.mpn}
              gatedCtaHref={signUpUrl(page.slug)}
            />

            <DecisionInsightsTabs
              designConsiderations={page.designConsiderations}
              notRecommended={page.applications.notRecommended}
              commonPitfalls={page.commonPitfalls}
            />

            <QaBlocks items={page.faq} />
          </>
        }
        sidebar={
          <>
            <SidebarToolGrid tools={buildComponentToolGrid(page)} />
            <SidebarBomNotes notes={page.bomSourcing} />
            <SidebarSourcingHelp slug={page.slug} />
            <SidebarRelatedLinks links={relatedLinks} />
          </>
        }
      />
    </>
  )
}
