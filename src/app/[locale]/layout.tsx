import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { OrganizationJsonLd } from '@/components/seo/organization-json-ld'
import { routing, type AppLocale } from '@/i18n/routing'
import {
  SEO_DEFAULT_OG_IMAGE,
  SEO_SITE_ORIGIN,
  SEO_THEME_COLOR,
} from '@/lib/site'
import { openGraphAlternateLocale, openGraphLocale } from '@/lib/localized-path'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seoMeta' })

  return {
    metadataBase: new URL(SEO_SITE_ORIGIN),
    title: {
      default: t('defaultTitle'),
      template: '%s | PartGenie',
    },
    description: t('defaultDescription'),
    applicationName: 'PartGenie',
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      shortcut: ['/favicon.svg'],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      siteName: 'PartGenie',
      locale: openGraphLocale(locale as AppLocale),
      alternateLocale: [openGraphAlternateLocale(locale as AppLocale)],
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: [{ url: SEO_DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'PartGenie' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: [SEO_DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const viewport = {
  themeColor: SEO_THEME_COLOR,
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
      <OrganizationJsonLd locale={locale as AppLocale} />
    </>
  )
}
