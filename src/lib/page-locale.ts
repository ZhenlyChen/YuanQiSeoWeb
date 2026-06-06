import { routing, type AppLocale } from '@/i18n/routing'

export function parseAppLocale(locale: string): AppLocale {
  if (routing.locales.includes(locale as AppLocale)) {
    return locale as AppLocale
  }
  return routing.defaultLocale
}
