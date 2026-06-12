import './globals.css'
import { Inter_Tight, Mozilla_Headline } from 'next/font/google'
import { getLocale } from 'next-intl/server'

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
})

const mozillaHeadline = Mozilla_Headline({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mozilla-headline',
  weight: ['400', '600', '700'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let locale = 'en'
  try {
    locale = await getLocale()
  } catch {
    // API routes, sitemap, etc. — fall back to default locale
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${interTight.variable} ${mozillaHeadline.variable}`}
    >
      <body
        suppressHydrationWarning
        style={{ fontFamily: 'var(--font-inter-tight), var(--pg-font-sans)' }}
      >
        {children}
      </body>
    </html>
  )
}
