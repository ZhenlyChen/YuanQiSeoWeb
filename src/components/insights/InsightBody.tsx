type Props = {
  html: string
}

/** Render sanitized insight body (ingest/enrich pipelines strip scripts & event handlers). */
export function InsightBody({ html }: Props) {
  const trimmed = html?.trim()
  if (!trimmed) return null

  return (
    <div
      className="insight-body mt-8 space-y-4 text-lg leading-relaxed text-[var(--pg-color-text-secondary)] [&_a]:text-[#207883] [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--pg-color-text-primary)] [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_ul]:my-4 [&_ul]:space-y-2"
      dangerouslySetInnerHTML={{ __html: trimmed }}
    />
  )
}
