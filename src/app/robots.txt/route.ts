import { buildRobotsTxtBody } from '@/lib/seo-robots-text'
import { SEO_SITE_ORIGIN } from '@/lib/site'

export function GET() {
  const webflowSitemap = process.env.WEBFLOW_SITEMAP_URL?.trim()
  const pseoSitemaps = [
    `${SEO_SITE_ORIGIN}/sitemap/0.xml`,
    `${SEO_SITE_ORIGIN}/sitemap/1.xml`,
    `${SEO_SITE_ORIGIN}/sitemap/2.xml`,
  ]
  const sitemapUrls = webflowSitemap ? [webflowSitemap, ...pseoSitemaps] : pseoSitemaps

  return new Response(buildRobotsTxtBody({ sitemapUrls }), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
