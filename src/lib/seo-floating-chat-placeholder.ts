import type { SeoPageContext } from '@/components/seo/seo-site-chrome'

export function getFloatingChatPlaceholder(pageContext?: SeoPageContext): string {
  const kind = pageContext?.kind
  const mpn = pageContext?.mpn?.trim()
  const manufacturer = pageContext?.manufacturer?.trim()

  if (kind === 'manufacturer' && manufacturer) {
    return `Try "STM32 alternatives" or ask about ${manufacturer} parts and sourcing`
  }

  if (kind === 'alternative' && mpn) {
    return `Ask about ${mpn} alternatives, compare options, or design fit`
  }

  if (kind === 'part' && mpn) {
    return `Try "${mpn} datasheet" or ask a design question`
  }

  if (kind === 'compare' && mpn) {
    return `Ask how ${mpn} compare on specs, package, and drop-in fit`
  }

  if (mpn) {
    return `Ask about ${mpn} alternatives, compare options, or design fit`
  }

  return 'Ask PartGenie about components, alternatives, or BOM risk'
}

export function getFloatingChatInitialQuery(pageContext?: SeoPageContext): string {
  const mpn = pageContext?.mpn?.trim()
  if (!mpn) return ''

  if (pageContext?.kind === 'alternative') {
    return `${mpn} alternatives and replacement risk`
  }

  return ''
}
