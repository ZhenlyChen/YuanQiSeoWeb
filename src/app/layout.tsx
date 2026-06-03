import type { Metadata } from 'next'
import { Inter_Tight, Mozilla_Headline } from 'next/font/google'
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_OG_IMAGE,
  SEO_DEFAULT_TITLE,
  SEO_SITE_ORIGIN,
  SEO_THEME_COLOR,
} from '@/lib/site'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
})

const mozillaHeadline = Mozilla_Headline({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mozilla-headline',
})

export const metadata: Metadata = {
  metadataBase: new URL(SEO_SITE_ORIGIN),
  title: {
    default: SEO_DEFAULT_TITLE,
    template: '%s | PartGenie',
  },
  description: SEO_DEFAULT_DESCRIPTION,
  applicationName: 'PartGenie',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'PartGenie',
    locale: 'en_US',
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [{ url: SEO_DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'PartGenie' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [SEO_DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: SEO_THEME_COLOR,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${mozillaHeadline.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter-tight), var(--pg-font-sans)' }}>{children}</body>
    </html>
  )
}
