/** Public SEO site origin (partgenie.ai pSEO pages). */
export const SEO_SITE_ORIGIN = 'https://partgenie.ai'

export const SEO_DEFAULT_OG_IMAGE =
  'https://web-static.partgenie.ai/img/partgenie.png'

/** Same placeholder as YuanQiWeb `AppConst.cdnBaseUrl + /img/default_component.png`. */
export const WEBAPP_DEFAULT_COMPONENT_IMAGE =
  'https://web-static.partgenie.ai/img/default_component.png'

export const SEO_DEFAULT_TITLE = 'PartGenie | Electronic Component Specs & Sourcing'

export const SEO_DEFAULT_DESCRIPTION =
  'PartGenie helps engineers find electronic component specs, datasheets, and in-stock alternatives — powered by AI sourcing from weeks to minutes.'

export const SEO_THEME_COLOR = '#22808d'

export async function getSeoDefaultTitle(): Promise<string> {
  try {
    const { getTranslations } = await import('next-intl/server')
    const t = await getTranslations('seoMeta')
    return t('defaultTitle')
  } catch {
    return SEO_DEFAULT_TITLE
  }
}

export async function getSeoDefaultDescription(): Promise<string> {
  try {
    const { getTranslations } = await import('next-intl/server')
    const t = await getTranslations('seoMeta')
    return t('defaultDescription')
  } catch {
    return SEO_DEFAULT_DESCRIPTION
  }
}
