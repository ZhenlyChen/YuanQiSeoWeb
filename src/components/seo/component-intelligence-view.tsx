import Link from 'next/link'
import { AiVerdictCard } from '@/components/seo/ai-verdict-card'
import { DecisionInsightsTabs } from '@/components/seo/decision-insights-tabs'
import { KeySpecsSnapshot } from '@/components/seo/key-specs-snapshot'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { SidebarBomNotes } from '@/components/seo/sidebar-bom-notes'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { SidebarSourcingHelp } from '@/components/seo/sidebar-sourcing-help'
import { AlternativeList } from '@/components/seo/alternative-list'
import { partImageForMpn } from '@/lib/part-images'
import { openPartUrl } from '@/lib/tool-urls'
import type { ComponentIntelligencePage } from '@/types/seo-intelligence'

type ApplicationTagLayer = {
  scenarioType: string
  constraintCondition: string
}

function buildApplicationTagLayers(items: string[]): ApplicationTagLayer[] {
  return items.slice(0, 6).map((item) => {
    const cleaned = item.replace(/\.$/, '')
    const splitMatch = cleaned.match(/^(.*?)(?:\s+(with|requiring|under|for)\s+)(.+)$/i)

    if (!splitMatch) {
      return {
        scenarioType: cleaned,
        constraintCondition: 'standard cost and reliability constraints',
      }
    }

    const [, scenarioType, connector, tail] = splitMatch
    const constraintCondition =
      connector.toLowerCase() === 'for' ? `${connector.toLowerCase()} ${tail}` : `${connector.toLowerCase()} ${tail}`

    return { scenarioType: scenarioType.trim(), constraintCondition: constraintCondition.trim() }
  })
}

export function ComponentIntelligenceView({ page }: { page: ComponentIntelligencePage }) {
  const applicationTagLayers = buildApplicationTagLayers(page.applications.goodFit)
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
    ...page.relatedAnswers,
  ]

  return (
    <>
      <PageHeader h1={page.meta.h1} />

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
            </section>

            <AiVerdictCard
              verdict={page.aiVerdict}
              sourcingContext="Multiple alternatives available"
            />
            <KeySpecsSnapshot specs={keySpecsWithCompliance} mpn={page.mpn} slug={page.slug} />
            <AlternativeList
              items={page.alternatives}
              title="Alternative components"
              viewAllHref={`/alternatives/${page.slug}`}
              layout="card"
              gated
              gatedCtaHref={openPartUrl(page.slug)}
            />

            <DecisionInsightsTabs
              applicationTagLayers={applicationTagLayers}
              designConsiderations={page.designConsiderations}
              notRecommended={page.applications.notRecommended}
              commonPitfalls={page.commonPitfalls}
            />

            <QaBlocks items={page.faq} />
          </>
        }
        sidebar={
          <>
            <SidebarBomNotes notes={page.bomSourcing} />
            <SidebarSourcingHelp slug={page.slug} />
            <SidebarRelatedLinks links={relatedLinks} />
          </>
        }
      />
    </>
  )
}
