import type { Metadata } from 'next'
import {
  CompetitorCompareRoute,
  competitorCompareMetadata,
} from '@/lib/render-competitor-compare-page'

const slug = 'partgenie-vs-findchips'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return competitorCompareMetadata({ localeParam: locale, slug })
}

export default async function PartGenieVsFindchipsPage({ params }: PageProps) {
  const { locale } = await params
  return <CompetitorCompareRoute localeParam={locale} slug={slug} />
}
