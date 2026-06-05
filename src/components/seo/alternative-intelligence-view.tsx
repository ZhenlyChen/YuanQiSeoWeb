import { AlternativeComparisonMatrix } from '@/components/seo/alternative-comparison-matrix'
import { AlternativeGuidanceInsights } from '@/components/seo/alternative-guidance-insights'
import { AlternativeRichList } from '@/components/seo/alternative-rich-list'
import { resolveOverviewTags } from '@/components/seo/overview-tags'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { QaBlocks } from '@/components/seo/qa-blocks'
import { QuickReplacementView } from '@/components/seo/quick-replacement-view'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { SidebarSourcingHelp } from '@/components/seo/sidebar-sourcing-help'
import { buildSidebarToolCards, SidebarToolGrid } from '@/components/seo/sidebar-tool-grid'
import { signUpUrl } from '@/lib/tool-urls'
import type { AlternativeIntelligencePage } from '@/types/seo-intelligence'

export function AlternativeIntelligenceView({ page }: { page: AlternativeIntelligencePage }) {
  return (
    <div className="seo-page-split">
      <PageHeader
        h1={page.meta.h1}
        overviewTags={resolveOverviewTags(page.overviewTags, {
          package: page.subtitle.package,
          manufacturer: page.subtitle.manufacturer,
          category: page.subtitle.category,
        })}
      />

      <PageLayout
        main={
          <>
            <p className="seo-direct-answer seo-direct-answer--gradient">{page.shortAnswer}</p>
            <QuickReplacementView verdict={page.replacementVerdict} riskAnalysis={page.riskAnalysis} />

            <AlternativeRichList
              items={page.alternatives}
              showViewToggle
              slug={page.slug}
              mpn={page.mpn}
              gated
              gatedCtaHref={signUpUrl(page.slug)}
            />
            <AlternativeComparisonMatrix
              compatibilityRows={page.compatibilityMatrix}
              featureRows={page.featureComparison}
              headers={page.featureComparisonHeaders}
            />

            <AlternativeGuidanceInsights
              applicationFit={page.applicationFit}
              regionalNotes={page.regionalNotes}
            />

            <QaBlocks items={page.faq} />
          </>
        }
        sidebar={
          <>
            <SidebarToolGrid tools={buildSidebarToolCards(page.slug, page.mpn)} />
            <SidebarSourcingHelp slug={page.slug} mpn={page.mpn} />
            <SidebarRelatedLinks
              links={[
                { label: `${page.mpn} component intelligence`, href: page.originalPartHref },
                ...page.compareLinks,
              ]}
            />
          </>
        }
      />
    </div>
  )
}
