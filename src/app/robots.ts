import type { MetadataRoute } from 'next'
import { SEO_SITE_ORIGIN } from '@/lib/site'

/**
 * Direct Pages / staging: list pSEO sub-sitemaps only.
 * Production partgenie.ai should serve robots via CF Worker (see docs/CF_SITEMAP_ROBOTS_ROUTING.md).
 */
export default function robots(): MetadataRoute.Robots {
  const pseoSitemaps = [
    `${SEO_SITE_ORIGIN}/sitemap/0.xml`,
    `${SEO_SITE_ORIGIN}/sitemap/1.xml`,
    `${SEO_SITE_ORIGIN}/sitemap/2.xml`,
  ]

  const webflowSitemap = process.env.WEBFLOW_SITEMAP_URL?.trim()
  const sitemap = webflowSitemap ? [webflowSitemap, ...pseoSitemaps] : pseoSitemaps

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dev/', '/dev/seo-previews'],
    },
    sitemap,
  }
}
