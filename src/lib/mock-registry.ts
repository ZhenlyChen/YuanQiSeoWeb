/** Slugs served from static mock fixtures (Phase 2A design samples). */
export const MOCK_COMPONENT_SLUGS = new Set(['stm32f103c8t6'])
export const MOCK_ALTERNATIVE_SLUGS = new Set(['bq24195l'])
export const MOCK_COMPARE_SLUGS = new Set(['stm32f103c8t6-vs-gd32f103c8t6'])
export const MOCK_MANUFACTURER_SLUGS = new Set(['stmicroelectronics'])
export const MOCK_ANSWER_SLUGS = new Set(['best-mcu-for-wearable-device'])

export function isMockComponentSlug(slug: string): boolean {
  return MOCK_COMPONENT_SLUGS.has(slug.toLowerCase())
}
