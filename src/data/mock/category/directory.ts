import { buildCategoryDirectoryItems } from '@/lib/category-directory'
import { categoryDirectorySeoMetaSync } from '@/data/mock/category/shared'
import type { CategoryDirectoryPage } from '@/types/seo-intelligence'

export function getMockCategoryDirectoryPage(): CategoryDirectoryPage {
  const items = buildCategoryDirectoryItems()
  return {
    pageType: 'category_directory',
    meta: categoryDirectorySeoMetaSync(),
    items,
    totalInDatabase: items.reduce((sum, item) => sum + item.partCount, 0),
  }
}
