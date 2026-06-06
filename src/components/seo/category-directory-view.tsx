'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { DirectoryAzBar } from '@/components/seo/directory-az-bar'
import { DirectoryLetterSection } from '@/components/seo/directory-letter-section'
import { CategoryDirectoryHero } from '@/components/seo/category-directory-hero'
import { CategoryDirectoryList } from '@/components/seo/category-directory-list'
import { groupCategoriesByLetter, getCategoryDirectoryHeroMarqueeItems } from '@/lib/category-directory'
import type { CategoryDirectoryItem } from '@/types/seo-intelligence'

export function CategoryDirectoryView({
  items,
  totalInDatabase,
}: {
  items: CategoryDirectoryItem[]
  totalInDatabase: number
}) {
  const t = useTranslations('categories')
  const marqueeItems = getCategoryDirectoryHeroMarqueeItems(items)
  const letterGroups = groupCategoriesByLetter(items)
  const availableLetters = useMemo(
    () => new Set(letterGroups.map((group) => group.letter)),
    [letterGroups],
  )

  return (
    <div className="seo-cat-dir-page">
      <CategoryDirectoryHero totalInDatabase={totalInDatabase} marqueeItems={marqueeItems} />

      <div className="seo-cat-dir-layout">
        <DirectoryAzBar
          ariaLabel={t('directory.browseByLetter')}
          title={t('directory.categoriesByTitle')}
          availableLetters={availableLetters}
          letterHref={(letter) => `#cat-letter-${letter === '#' ? '0-9' : letter}`}
        />

        <div className="seo-cat-dir-main">
          {letterGroups.map((group) => (
            <DirectoryLetterSection key={group.letter} letter={group.letter}>
              <CategoryDirectoryList items={group.items} />
            </DirectoryLetterSection>
          ))}
        </div>
      </div>
    </div>
  )
}
