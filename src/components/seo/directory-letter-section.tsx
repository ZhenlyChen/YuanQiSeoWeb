import type { ReactNode } from 'react'

export function DirectoryLetterSection({
  letter,
  children,
}: {
  letter: string
  children: ReactNode
}) {
  const anchor = letter === '#' ? '0-9' : letter
  const glyph = letter === '#' ? '0–9' : letter

  return (
    <section
      id={`cat-letter-${anchor}`}
      className="seo-cat-dir-letter"
      aria-labelledby={`cat-letter-title-${anchor}`}
    >
      <h2 id={`cat-letter-title-${anchor}`} className="seo-cat-dir-letter__glyph">
        <a href={`#cat-letter-${anchor}`}>{glyph}</a>
      </h2>
      <div className="seo-cat-dir-letter__cards">{children}</div>
    </section>
  )
}
