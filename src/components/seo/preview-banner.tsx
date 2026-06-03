export function PreviewBanner({ message }: { message?: string }) {
  return (
    <div className="seo-preview-banner" role="status">
      {message ??
        'Design preview — mock intelligence content for review. Not connected to live SEO API.'}
    </div>
  )
}
