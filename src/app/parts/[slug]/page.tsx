import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PartCta } from '@/components/part-cta'
import { fetchSeoPage } from '@/lib/seo-api'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string; locale?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const sp = await searchParams
  const page = await fetchSeoPage(slug, {
    locale: sp.locale,
    previewToken: sp.preview,
  })
  if (!page) {
    return { title: 'Part not found | PartGenie' }
  }
  return {
    title: page.title,
    description: page.description,
    robots: page.robots,
    openGraph: {
      title: page.title,
      description: page.description,
      images: page.ogImage ? [page.ogImage] : undefined,
    },
  }
}

export default async function PartPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sp = await searchParams
  const isPreview = Boolean(sp.preview)
  const page = await fetchSeoPage(slug, {
    locale: sp.locale,
    previewToken: sp.preview,
  })

  if (!page) {
    notFound()
  }

  const code = String(page.component?.code ?? slug)
  const summary = String(page.component?.summary ?? page.description ?? '')
  const manufacturer =
    (page.component?.manufacturer_info as { name_en?: string } | undefined)?.name_en ?? ''

  return (
    <main>
      {isPreview ? (
        <div className="preview-banner">Preview mode — draft content, not indexed</div>
      ) : null}
      <article className="hero">
        <p style={{ color: '#667085', fontSize: '0.875rem', margin: 0 }}>{manufacturer}</p>
        <h1 style={{ margin: '0.25rem 0 0', fontSize: '1.75rem' }}>{code}</h1>
        {summary ? <p className="summary">{summary}</p> : null}

        <dl className="meta-grid">
          <div>
            <dt>Status</dt>
            <dd>{page.status}</dd>
          </div>
          <div>
            <dt>Locale</dt>
            <dd>{page.locale}</dd>
          </div>
          <div>
            <dt>Canonical</dt>
            <dd>{page.canonicalPath}</dd>
          </div>
        </dl>

        <PartCta slug={slug} code={code} />
      </article>
    </main>
  )
}
