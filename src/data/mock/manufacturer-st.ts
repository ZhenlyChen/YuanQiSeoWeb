import type { ManufacturerIntelligencePage } from '@/types/seo-intelligence'
import { manufacturerSeoMeta } from '@/lib/seo-meta'

export const mockManufacturerSt: ManufacturerIntelligencePage = {
  pageType: 'manufacturer',
  slug: 'stmicroelectronics',
  name: 'STMicroelectronics',
  meta: manufacturerSeoMeta({ name: 'STMicroelectronics', slug: 'stmicroelectronics' }),
  breadcrumbs: [
    { label: 'Manufacturers', href: '/manufacturers/stmicroelectronics' },
    { label: 'STMicroelectronics' },
  ],
  shortAnswer:
    'STMicroelectronics is a major supplier of MCUs, power discretes, MEMS, and automotive-grade ICs. Engineers choose ST for ecosystem depth and long product lifecycles, but should still map pin-compatible and functional alternatives for BOM resilience.',
  summary:
    'This hub highlights curated ST families and high-intent parts — not a full manufacturer catalog. Use PartGenie to compare replacements, review lifecycle risk, and analyze ST parts inside your BOM.',
  popularFamilies: [
    { name: 'STM32 MCUs', description: 'Cortex-M portfolio from ultra-low-power to high-performance' },
    { name: 'STPOWER', description: 'MOSFETs, IGBTs, and rectifiers for power conversion' },
    { name: 'MEMS sensors', description: 'Accelerometers, IMUs, and environmental sensing' },
  ],
  mostSearchedParts: [
    { label: 'STM32F103C8T6 component intelligence', href: '/parts/stm32f103c8t6' },
    { label: 'STM32F407VGT6 component intelligence', href: '/parts/stm32f103c8t6' },
    { label: 'STM32H743VIT6 component intelligence', href: '/parts/stm32f103c8t6' },
    { label: 'LIS3DH accelerometer intelligence', href: '/parts/stm32f103c8t6' },
  ],
  popularAlternatives: [
    { label: 'Alternatives to STM32F103C8T6', href: '/alternatives/stm32f103c8t6' },
    { label: 'Compare STM32F103C8T6 vs GD32F103C8T6', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
  ],
  comparableManufacturers: [
    { label: 'GigaDevice (GD32)', href: '/manufacturers/stmicroelectronics' },
    { label: 'Microchip', href: '/manufacturers/stmicroelectronics' },
    { label: 'NXP Semiconductors', href: '/manufacturers/stmicroelectronics' },
  ],
  categoryBreakdown: [
    { label: 'MCU component finder', href: '/categories/mcu/finder' },
    { label: 'Power discrete finder', href: '/categories/mosfet/finder' },
    { label: 'MEMS sensor finder', href: '/categories/sensor/finder' },
  ],
  supplyNotes: [
    'STM32 legacy parts remain in many BOMs — maintain approved alternates with documented match types.',
    'Automotive and industrial grades use distinct orderable suffixes; purchasing swaps are a common pitfall.',
    'Franchised distributors remain the lowest-risk channel for critical programs.',
  ],
  curatedCatalog: [
    { label: 'STM32F103C8T6', href: '/parts/stm32f103c8t6' },
    { label: 'STM32F103CBT6', href: '/parts/stm32f103c8t6' },
    { label: 'STM32G071KBU6', href: '/parts/stm32f103c8t6' },
    { label: 'STM32H743VIT6', href: '/parts/stm32f103c8t6' },
    { label: 'STM32L476RG', href: '/parts/stm32f103c8t6' },
    { label: 'STPS745G', href: '/parts/stm32f103c8t6' },
    { label: 'STL100N8F7', href: '/parts/stm32f103c8t6' },
    { label: 'LIS3DHTR', href: '/parts/stm32f103c8t6' },
  ],
  faq: [
    {
      question: 'Is this a full STMicroelectronics catalog?',
      answer:
        'No. PartGenie publishes curated intelligence pages for high-value parts and decision paths, not every orderable ST SKU.',
    },
    {
      question: 'How should I evaluate alternatives to ST parts?',
      answer:
        'Start with match type (exact, pin-compatible, functional), then review firmware, package, lifecycle, and sourcing channels before approving a swap.',
    },
  ],
}
