import { Inter_Tight, Mozilla_Headline } from 'next/font/google'
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
  weight: ['400', '600', '700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${interTight.variable} ${mozillaHeadline.variable}`}>
      <body suppressHydrationWarning style={{ fontFamily: 'var(--font-inter-tight), var(--pg-font-sans)' }}>
        {children}
      </body>
    </html>
  )
}
