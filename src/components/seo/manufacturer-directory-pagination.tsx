'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { DirectoryQueryHref } from '@/lib/manufacturer-directory-href'

export function ManufacturerDirectoryPagination({
  page,
  pageSize,
  total,
  buildPageHref,
}: {
  page: number
  pageSize: number
  total: number
  buildPageHref: (page: number) => DirectoryQueryHref
}) {
  const t = useTranslations('directory')
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (totalPages <= 1) return null

  return (
    <nav className="seo-mfg-dir-pagination" aria-label={t('paginationLabel')}>
      <div className="seo-mfg-dir-pagination__controls">
        {page > 1 ? (
          <Link href={buildPageHref(page - 1)} className="seo-mfg-dir-pagination__button">
            {t('previous')}
          </Link>
        ) : (
          <span className="seo-mfg-dir-pagination__button seo-mfg-dir-pagination__button--disabled">
            {t('previous')}
          </span>
        )}
        <span className="seo-mfg-dir-pagination__status">
          {t('pageStatus', { page, totalPages })}
        </span>
        {page < totalPages ? (
          <Link href={buildPageHref(page + 1)} className="seo-mfg-dir-pagination__button">
            {t('next')}
          </Link>
        ) : (
          <span className="seo-mfg-dir-pagination__button seo-mfg-dir-pagination__button--disabled">
            {t('next')}
          </span>
        )}
      </div>
    </nav>
  )
}
