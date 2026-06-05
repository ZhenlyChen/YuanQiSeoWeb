import type { NextConfig } from 'next'

const apiProxyOrigin =
  process.env.YUANQI_API_BASE?.replace(/\/api\/v1\/?$/, '') || 'http://127.0.0.1:8080'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiProxyOrigin}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
