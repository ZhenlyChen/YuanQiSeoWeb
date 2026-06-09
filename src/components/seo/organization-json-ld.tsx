import { organizationJsonLd, jsonLdScript } from '@/lib/json-ld'
import type { AppLocale } from '@/i18n/routing'

export function OrganizationJsonLd({ locale }: { locale: AppLocale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd(locale)) }}
    />
  )
}
