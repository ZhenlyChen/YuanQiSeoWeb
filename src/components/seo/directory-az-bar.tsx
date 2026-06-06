'use client'

import { cn } from '@/lib/cn'
import { DIRECTORY_AZ_LETTERS, DIRECTORY_AZ_NUMERIC } from '@/lib/manufacturer-directory'

function letterAnchorId(letter: string): string {
  return letter === '#' ? DIRECTORY_AZ_NUMERIC : letter
}

function scrollToLetterSection(letter: string) {
  const anchor = letterAnchorId(letter)
  const target = document.getElementById(`cat-letter-${anchor}`)
  if (!target) return false

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#cat-letter-${anchor}`)
  return true
}

export function DirectoryAzBar({
  ariaLabel,
  title,
  activeLetter,
  availableLetters,
  letterHref,
}: {
  ariaLabel: string
  title: string
  activeLetter?: string
  availableLetters?: ReadonlySet<string>
  letterHref: (letter: string) => string
}) {
  const normalizedActive = activeLetter?.toLowerCase()
  const isActive = (letter: string) => {
    if (!normalizedActive) return false
    if (letter === '#') {
      return normalizedActive === '0-9' || normalizedActive === '#'
    }
    return normalizedActive === letter.toLowerCase()
  }

  const isAvailable = (letter: string) => {
    if (!availableLetters) return true
    const key = letter === '#' ? '#' : letter
    return availableLetters.has(key)
  }

  const handleLetterClick = (letter: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAvailable(letter)) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    scrollToLetterSection(letter)
  }

  const renderLink = (letter: string, label: string) => {
    const available = isAvailable(letter)

    return (
      <a
        key={letter}
        href={letterHref(letter)}
        className={cn(
          'seo-cat-dir-az__link',
          isActive(letter) && 'seo-cat-dir-az__link--active',
          !available && 'seo-cat-dir-az__link--disabled',
        )}
        aria-disabled={available ? undefined : true}
        tabIndex={available ? undefined : -1}
        onClick={(event) => handleLetterClick(letter, event)}
      >
        {label}
      </a>
    )
  }

  return (
    <section className="seo-cat-dir-az" aria-labelledby="seo-cat-dir-az-title">
      <h2 id="seo-cat-dir-az-title" className="seo-cat-dir-divider seo-cat-dir-az__divider">
        <span>{title}</span>
      </h2>
      <nav className="seo-cat-dir-az__nav" aria-label={ariaLabel}>
        {renderLink('#', DIRECTORY_AZ_NUMERIC)}
        {DIRECTORY_AZ_LETTERS.map((letter) => renderLink(letter, letter))}
      </nav>
    </section>
  )
}
