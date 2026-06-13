import { notFound } from 'next/navigation'
import type { AppLocale } from '@/i18n/routing'

export type SeoPageKind =
  | 'part'
  | 'alternative'
  | 'manufacturer'
  | 'category_hub'
  | 'compare'
  | 'answer'
  | 'insights'
  | 'finder'
  | 'generic'

export type SeoUnavailableReason =
  | 'not_published'
  | 'not_found'
  | 'category_degraded'
  | 'wrong_page_type'
  | 'invalid_slug'
  | 'api_error'

export type SeoUnavailableContext = {
  kind: SeoPageKind
  reason: SeoUnavailableReason
  slug?: string
  locale?: AppLocale | string
  path?: string
  pageType?: string
  status?: string
  entityKey?: string
  expectedPageType?: string
  hint?: string
}

let pendingContext: SeoUnavailableContext | null = null

export function seoNotFound(context: SeoUnavailableContext): never {
  pendingContext = context
  notFound()
}

export function consumeSeoUnavailableContext(): SeoUnavailableContext | null {
  const context = pendingContext
  pendingContext = null
  return context
}
