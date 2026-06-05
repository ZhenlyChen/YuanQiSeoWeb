import Link from 'next/link'

export function ManufacturerDirectoryPagination({
  page,
  pageSize,
  total,
  buildPageHref,
}: {
  page: number
  pageSize: number
  total: number
  buildPageHref: (page: number) => string
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (totalPages <= 1) return null

  return (
    <nav className="seo-mfg-dir-pagination" aria-label="Manufacturer directory pages">
      <div className="seo-mfg-dir-pagination__controls">
        {page > 1 ? (
          <Link href={buildPageHref(page - 1)} className="seo-mfg-dir-pagination__button">
            Previous
          </Link>
        ) : (
          <span className="seo-mfg-dir-pagination__button seo-mfg-dir-pagination__button--disabled">
            Previous
          </span>
        )}
        <span className="seo-mfg-dir-pagination__status">
          Page {page} of {totalPages}
        </span>
        {page < totalPages ? (
          <Link href={buildPageHref(page + 1)} className="seo-mfg-dir-pagination__button">
            Next
          </Link>
        ) : (
          <span className="seo-mfg-dir-pagination__button seo-mfg-dir-pagination__button--disabled">
            Next
          </span>
        )}
      </div>
    </nav>
  )
}
