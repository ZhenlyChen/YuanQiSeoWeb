import { SEO_SITE_ORIGIN } from '@/lib/site'
import { seoRobotsDisallowPaths } from '@/lib/seo-robots-disallow-paths'

export function buildRobotsTxtBody(options?: {
  siteOrigin?: string
  sitemapUrls?: string[]
  includeLlmsComment?: boolean
}): string {
  const siteOrigin = options?.siteOrigin ?? SEO_SITE_ORIGIN
  const disallow = seoRobotsDisallowPaths()
  const sitemapUrls =
    options?.sitemapUrls ??
    [
      `${siteOrigin}/sitemap/0.xml`,
      `${siteOrigin}/sitemap/1.xml`,
      `${siteOrigin}/sitemap/2.xml`,
    ]

  const lines = [
    '# https://www.robotstxt.org/robotstxt.html',
    'User-agent: *',
    'Allow: /',
    ...disallow.map((path) => `Disallow: ${path}`),
    '',
    ...sitemapUrls.map((url) => `Sitemap: ${url}`),
  ]

  if (options?.includeLlmsComment !== false) {
    lines.push(
      '',
      '# LLM agent index',
      `# llms.txt: ${siteOrigin}/llms.txt`,
    )
  }

  return `${lines.join('\n')}\n`
}
