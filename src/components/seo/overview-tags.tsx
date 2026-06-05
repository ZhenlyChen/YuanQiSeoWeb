type OverviewTagFallback = {
  package?: string
  manufacturer?: string
  category?: string
}

export function resolveOverviewTags(
  tags: string[] | undefined,
  fallback?: OverviewTagFallback,
): string[] {
  if (tags?.length) return tags

  return [
    ...(fallback?.package ? [`Package: ${fallback.package}`] : []),
    ...(fallback?.manufacturer ? [fallback.manufacturer] : []),
    ...(fallback?.category ? [fallback.category] : []),
  ]
}

export function OverviewTags({
  tags,
  className,
}: {
  tags: string[]
  className?: string
}) {
  if (tags.length === 0) return null

  return (
    <div className={className ?? 'seo-overview-tags'}>
      {tags.map((tag) => (
        <span key={tag} className="seo-app-tag">
          {tag}
        </span>
      ))}
    </div>
  )
}
