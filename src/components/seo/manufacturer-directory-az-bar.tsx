'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { DIRECTORY_AZ_LETTERS, DIRECTORY_AZ_NUMERIC } from '@/lib/manufacturer-directory'

export function ManufacturerDirectoryAzBar({
  activeLetter,
  categoryL1,
}: {
  activeLetter?: string
  categoryL1?: string
}) {
  const t = useTranslations('directory')

  const letterHref = (letter: string) => {
    const segment = letter === '#' ? '0-9' : letter.toLowerCase()
    const base = `/manufacturers/letter/${segment}`
    if (categoryL1) {
      return `${base}?category=${encodeURIComponent(categoryL1)}`
    }
    return base
  }

  const normalizedActive = activeLetter?.toLowerCase()
  const isActive = (letter: string) => {
    if (!normalizedActive) return false
    if (letter === '#') {
      return normalizedActive === '0-9' || normalizedActive === '#'
    }
    return normalizedActive === letter.toLowerCase()
  }

  return (
    <section className="seo-mfg-dir-az-footer" aria-labelledby="seo-mfg-dir-az-footer-title">
      <h2 id="seo-mfg-dir-az-footer-title" className="seo-mfg-dir-divider seo-mfg-dir-az-footer__divider">
        <span>{t('manufacturersByTitle')}</span>
      </h2>
      <nav className="seo-mfg-dir-az-footer__nav" aria-label={t('browseByLetter')}>
        <Link
          href={letterHref('#')}
          className={cn(
            'seo-mfg-dir-az-footer__link',
            isActive('#') && 'seo-mfg-dir-az-footer__link--active',
          )}
          aria-current={isActive('#') ? 'page' : undefined}
        >
          {DIRECTORY_AZ_NUMERIC}
        </Link>
        {DIRECTORY_AZ_LETTERS.map((letter) => (
          <Link
            key={letter}
            href={letterHref(letter)}
            className={cn(
              'seo-mfg-dir-az-footer__link',
              isActive(letter) && 'seo-mfg-dir-az-footer__link--active',
            )}
            aria-current={isActive(letter) ? 'page' : undefined}
          >
            {letter}
          </Link>
        ))}
      </nav>
    </section>
  )
}
