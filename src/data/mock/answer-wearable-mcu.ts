import type { QueryAnswerPage } from '@/types/seo-intelligence'
import { answerSeoMetaSync } from '@/lib/seo-meta'

export const mockAnswerWearableMcu: QueryAnswerPage = {
  pageType: 'answer',
  slug: 'best-mcu-for-wearable-device',
  useCase: 'wearable device',
  category: 'MCU',
  meta: answerSeoMetaSync({
    useCase: 'wearable device',
    category: 'MCU',
    slug: 'best-mcu-for-wearable-device',
  }),
  breadcrumbs: [
    { label: 'Guides', href: '/dev/seo-previews' },
    { label: 'Best MCU for wearable device' },
  ],
  shortAnswer:
    'For a wearable device, start with an ultra-low-power Cortex-M0+ or M33 MCU if your priority is battery life and small package options. Consider STM32L4 or nRF52-class SoCs if you need integrated Bluetooth; use a higher-performance M4 only when display, DSP, or multi-sensor fusion demands it.',
  directAnswer:
    'Most wearables should default to a low-power MCU in WLCSP or small QFN, with sleep current dominating the architecture decision. Add a discrete radio only when the wireless stack outgrows the MCU vendor ecosystem you already use.',
  recommendedComponents: [
    {
      mpn: 'STM32L476RG',
      manufacturer: 'STMicroelectronics',
      why: 'Strong low-power modes, rich peripherals, mature toolchain for sensor fusion wearables.',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'nRF52840',
      manufacturer: 'Nordic Semiconductor',
      why: 'Integrated Bluetooth LE when the product is connectivity-first.',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'STM32U585AI',
      manufacturer: 'STMicroelectronics',
      why: 'TrustZone and security features for health-data wearables.',
      href: '/parts/stm32f103c8t6',
    },
  ],
  selectionCriteria: [
    'Sleep and stop-mode current with your wake duty cycle',
    'Package size, RF keep-out, and antenna placement',
    'Required sensors buses (I2C/I3C/SPI) and DMA budget',
    'Wireless integration: integrated SoC vs MCU + module',
    'Toolchain, OTA, and security requirements',
  ],
  tradeoffs: [
    {
      title: 'Integrated radio vs discrete module',
      detail:
        'SoCs simplify BOM but lock firmware to vendor stacks; modules add cost yet de-risk RF certification.',
    },
    {
      title: 'Cortex-M0+ vs M4',
      detail: 'M0+ wins on power; M4 helps graphics and DSP but increases flash/RAM needs.',
    },
  ],
  suggestedBom: [
    { mpn: 'STM32L476RG', role: 'Main MCU', notes: 'Ultra-low-power active profile' },
    { mpn: 'LIS2DH12', role: 'Accelerometer', notes: 'Motion wake and step counting' },
    { mpn: 'MAX30102', role: 'Optical sensor', notes: 'HR/SpO2 if health wearable' },
  ],
  alternatives: [
    { label: 'Alternatives to STM32L476RG', href: '/alternatives/stm32f103c8t6' },
    { label: 'MCU component finder', href: '/categories/mcu/finder' },
  ],
  whenToAvoid: [
    'STM32F103-class parts when sleep current dominates — they are not optimized for wearables.',
    'Large LQFP packages when board area is below 12 mm × 12 mm.',
    'Uncertified radio modules without antenna keep-out planning.',
  ],
  relatedComponents: [
    { label: 'STM32F103C8T6 (reference legacy MCU)', href: '/parts/stm32f103c8t6' },
    { label: 'STMicroelectronics hub', href: '/manufacturers/stmicroelectronics' },
  ],
  categoryFinderLink: {
    label: 'Continue in MCU Part Finder',
    href: '/categories/mcu/finder',
  },
  faq: [
    {
      question: 'What is the best MCU for a wearable device?',
      answer:
        'Start with ultra-low-power MCUs (STM32L4, nRF52, or similar) matched to your wireless and security needs; avoid legacy high-leakage parts unless cost dominates.',
    },
    {
      question: 'Should I use an SoC with Bluetooth built in?',
      answer:
        'Yes for BLE-first products with tight area constraints; use MCU + module when you need modular certification or multi-radio flexibility.',
    },
  ],
}
