import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { EntityLinkList } from '@/components/seo/entity-link-list'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { SectionTitle } from '@/components/seo/section-title'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata, categoryFinderSeoMeta } from '@/lib/seo-meta'

type FinderCategory = {
  label: string
  subtitle: string
  shortAnswer: string
  popularParts: { label: string; href: string }[]
  compareLinks: { label: string; href: string }[]
  guideLinks: { label: string; href: string }[]
}

const FINDER_BY_SLUG: Record<string, FinderCategory> = {
  mcu: {
    label: 'MCU',
    subtitle: 'Controller selection surface',
    shortAnswer:
      'Use this MCU finder to shortlist parts by ecosystem, package constraints, and sourcing risk before you commit a BOM line.',
    popularParts: [
      { label: 'STM32F103C8T6 component intelligence', href: '/parts/stm32f103c8t6' },
      { label: 'GD32F103C8T6 comparison context', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
      { label: 'Wearable MCU answer guide', href: '/answers/best-mcu-for-wearable-device' },
    ],
    compareLinks: [
      { label: 'STM32F103C8T6 vs GD32F103C8T6', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
      { label: 'STM32F103C8T6 vs STM32F103CBT6', href: '/compare/stm32f103c8t6-vs-stm32f103cbt6' },
    ],
    guideLinks: [
      { label: 'STMicroelectronics manufacturer intelligence', href: '/manufacturers/stmicroelectronics' },
      { label: 'Alternatives for STM32F103C8T6', href: '/alternatives/stm32f103c8t6' },
    ],
  },
  'battery-charger': {
    label: 'Battery Charger IC',
    subtitle: 'Power-path and charging selection',
    shortAnswer:
      'Use this finder to evaluate battery charger options by charge profile, firmware integration effort, and thermal behavior.',
    popularParts: [
      { label: 'BQ24195L alternatives and replacement analysis', href: '/alternatives/bq24195l' },
      { label: 'BQ24195L vs BQ24196 compare view', href: '/compare/bq24195l-vs-bq24196' },
    ],
    compareLinks: [{ label: 'BQ24195L vs BQ24196', href: '/compare/bq24195l-vs-bq24196' }],
    guideLinks: [{ label: 'Battery charger question-based guide', href: '/answers/best-mcu-for-wearable-device' }],
  },
  mosfet: {
    label: 'MOSFET',
    subtitle: 'Switching and thermal tradeoff finder',
    shortAnswer:
      'Use this finder to shortlist MOSFET options with focus on Rds(on), gate drive compatibility, and package thermal margin.',
    popularParts: [{ label: 'STMicroelectronics manufacturer intelligence', href: '/manufacturers/stmicroelectronics' }],
    compareLinks: [{ label: 'Compare MCU alternatives (sample route)', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' }],
    guideLinks: [{ label: 'Engineering answer guide', href: '/answers/best-mcu-for-wearable-device' }],
  },
  sensor: {
    label: 'Sensor',
    subtitle: 'Signal chain and supply-aware selection',
    shortAnswer:
      'Use this finder to evaluate sensor options by interface, temperature window, and long-term supply continuity.',
    popularParts: [{ label: 'STMicroelectronics manufacturer intelligence', href: '/manufacturers/stmicroelectronics' }],
    compareLinks: [{ label: 'Compare MCU alternatives (sample route)', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' }],
    guideLinks: [{ label: 'Wearable answer guide', href: '/answers/best-mcu-for-wearable-device' }],
  },
}

type PageProps = {
  params: Promise<{ locale: string; l1: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const category = FINDER_BY_SLUG[l1]
  if (!category) {
    return { title: 'Category Finder Not Found | PartGenie' }
  }
  return buildPageMetadata(
    await categoryFinderSeoMeta({ categoryLabel: category.label, slug: l1 }),
    locale,
  )
}

export default async function CategoryFinderPage({ params }: PageProps) {
  const { l1 } = await params
  const category = FINDER_BY_SLUG[l1]
  if (!category) notFound()

  return (
    <SeoPageShell breadcrumbs={[{ label: 'Categories' }, { label: category.label }, { label: 'Finder' }]}>
      <PageHeader
        h1={`${category.label} Component Finder`}
        subtitle={{ manufacturer: 'PartGenie', category: category.subtitle }}
      />

      <p className="seo-direct-answer seo-direct-answer--gradient">{category.shortAnswer}</p>

      <PageLayout
        main={
          <>
            <EntityLinkList
              title="Popular pages"
              intro="Curated starting points for engineering decisions in this category."
              links={category.popularParts}
            />
            <section className="seo-section">
              <SectionTitle title="Comparison shortcuts" icon="specs" />
              <ul className="seo-link-list">
                {category.compareLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </>
        }
        sidebar={<SidebarRelatedLinks title="Related guides" links={category.guideLinks} />}
      />
    </SeoPageShell>
  )
}
