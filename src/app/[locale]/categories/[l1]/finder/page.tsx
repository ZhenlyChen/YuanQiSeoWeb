import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { EntityLinkList } from '@/components/seo/entity-link-list'
import { PageHeader } from '@/components/seo/page-header'
import { PageLayout } from '@/components/seo/page-layout'
import { SectionTitle } from '@/components/seo/section-title'
import { SeoPageShell } from '@/components/seo/seo-page-shell'
import { SidebarRelatedLinks } from '@/components/seo/sidebar-related-links'
import { getL1Category } from '@/lib/category-taxonomy'
import { parseAppLocale } from '@/lib/page-locale'
import { buildPageMetadata, categoryFinderSeoMeta } from '@/lib/seo-meta'

type FinderCategory = {
  label: string
  subtitle: string
  shortAnswer: string
  popularParts: { label: string; href: string }[]
  compareLinks: { label: string; href: string }[]
  guideLinks: { label: string; href: string }[]
  faq: { question: string; answer: string }[]
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
    faq: [
      {
        question: 'How should I use the MCU finder?',
        answer:
          'Start with your package, ecosystem, and sourcing constraints, then open linked intelligence pages for shortlisted MCUs.',
      },
      {
        question: 'Does the finder replace datasheet review?',
        answer:
          'No. Use it to narrow candidates quickly, then verify electrical parameters and lifecycle status in datasheets and PartGenie.',
      },
    ],
  },
}

type PageProps = {
  params: Promise<{ locale: string; l1: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const l1Category = getL1Category(l1)
  const category = FINDER_BY_SLUG[l1]
  if (!l1Category || !category) {
    return { title: 'Category Finder Not Found | PartGenie', robots: { index: false, follow: false } }
  }
  return buildPageMetadata(
    await categoryFinderSeoMeta({ categoryLabel: category.label, slug: l1 }),
    locale,
  )
}

export default async function CategoryFinderPage({ params }: PageProps) {
  const { locale: localeParam, l1 } = await params
  const locale = parseAppLocale(localeParam)
  const t = await getTranslations('categories')
  const l1Category = getL1Category(l1)
  const category = FINDER_BY_SLUG[l1]
  if (!l1Category || !category) notFound()

  return (
    <SeoPageShell
      locale={locale}
      breadcrumbs={[
        { label: t('directory.categories'), href: '/categories' },
        { label: l1Category.name, href: `/categories/${l1}` },
        { label: t('finder.title') },
      ]}
      faq={category.faq}
      pageContext={{ slug: `${l1}-finder`, kind: 'category' }}
    >
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
