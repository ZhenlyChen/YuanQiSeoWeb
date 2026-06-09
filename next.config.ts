import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { MARKETING_CATEGORY_L1_REDIRECTS } from './src/data/category-marketing-redirects'
import { routing } from './src/i18n/routing'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const apiProxyOrigin =
  process.env.YUANQI_API_BASE?.replace(/\/api\/v1\/?$/, '') || 'http://127.0.0.1:8080'

function categoryMarketingRedirects() {
  const redirects: Awaited<ReturnType<NonNullable<NextConfig['redirects']>>> = []

  for (const locale of routing.locales) {
    for (const [fromSlug, toSlug] of Object.entries(MARKETING_CATEGORY_L1_REDIRECTS)) {
      if (fromSlug === toSlug) continue
      redirects.push({
        source: `/${locale}/categories/${fromSlug}`,
        destination: `/${locale}/categories/${toSlug}`,
        permanent: true,
      })
      redirects.push({
        source: `/${locale}/categories/${fromSlug}/:l2*`,
        destination: `/${locale}/categories/${toSlug}/:l2*`,
        permanent: true,
      })
    }
  }

  return redirects
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiProxyOrigin}/api/v1/:path*`,
      },
    ]
  },
  async redirects() {
    return categoryMarketingRedirects()
  },
}

export default withNextIntl(nextConfig)
