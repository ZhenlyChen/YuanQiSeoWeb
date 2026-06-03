const DEFAULT_PART_IMAGE = '/images/parts/chip-main.png'
const ALT_PART_IMAGE = '/images/parts/chip-alt-overlay.png'

export function partImageForMpn(mpn: string): string {
  const normalized = mpn.toUpperCase()

  if (normalized.includes('GD32') || normalized.includes('CH32')) {
    return ALT_PART_IMAGE
  }

  if (normalized.includes('STM32') || normalized.includes('BQ') || normalized.includes('STPS')) {
    return DEFAULT_PART_IMAGE
  }

  return DEFAULT_PART_IMAGE
}
