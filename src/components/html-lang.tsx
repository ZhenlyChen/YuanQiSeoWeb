'use client'

import { useLocale } from 'next-intl'
import { useEffect } from 'react'

/** Sync <html lang> with active next-intl locale (root layout owns the html element). */
export function HtmlLang() {
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
