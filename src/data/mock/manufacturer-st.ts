import type { ManufacturerIntelligencePage } from '@/types/seo-intelligence'
import { manufacturerSeoMetaSync } from '@/lib/seo-meta'

export const mockManufacturerSt: ManufacturerIntelligencePage = {
  pageType: 'manufacturer',
  slug: 'stmicroelectronics',
  name: 'STMicroelectronics',
  shortName: 'ST',
  manufacturerId: 'MFG_003343',
  representativeMpn: 'STM32F103C8T6',
  logoUrl: '/manufacturers/stmicroelectronics.svg',
  meta: manufacturerSeoMetaSync({ name: 'STMicroelectronics', slug: 'stmicroelectronics' }),
  breadcrumbs: [
    { label: 'Manufacturers', href: '/manufacturers' },
    { label: 'STMicroelectronics' },
  ],
  shortAnswer:
    'STMicroelectronics is a major supplier of MCUs, power discretes, MEMS, and automotive-grade ICs. Engineers choose ST for ecosystem depth and long product lifecycles, but should still map pin-compatible and functional alternatives for BOM resilience.',
  summary:
    'This hub highlights curated ST families and high-intent parts — not a full manufacturer catalog. Use PartGenie to compare replacements, review lifecycle risk, and analyze ST parts inside your BOM.',
  catalogCategories: [
    {
      label: 'MCU',
      partCount: 8420,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Embedded',
    },
    {
      label: 'Power discrete',
      partCount: 3100,
      categoryL1: 'Discrete Semiconductor Products',
      categoryL2: 'Transistors',
    },
    {
      label: 'MEMS sensors',
      partCount: 890,
      categoryL1: 'Sensors, Transducers',
      categoryL2: 'Motion Sensors',
    },
    {
      label: 'Automotive IC',
      partCount: 1240,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Specialized ICs',
    },
    {
      label: 'Analog & mixed-signal',
      partCount: 4510,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Linear',
    },
    {
      label: 'Motor drivers',
      partCount: 680,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Power Management (PMIC)',
    },
    {
      label: 'RF & connectivity',
      partCount: 520,
      categoryL1: 'RF and Wireless',
    },
    {
      label: 'EEPROM & memory',
      partCount: 410,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Memory',
    },
    {
      label: 'Timing & clocks',
      partCount: 290,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Clock/Timing',
    },
    {
      label: 'Interface transceivers',
      partCount: 360,
      categoryL1: 'Integrated Circuits (ICs)',
      categoryL2: 'Interface',
    },
  ],
  mostSearchedParts: [
    { mpn: 'STM32F103C8T6', category: 'MCU', href: '/parts/stm32f103c8t6', interest: 100, changePercent: 28 },
    { mpn: 'STM32F407VGT6', category: 'MCU', href: '/parts/stm32f407vgt6', interest: 74, changePercent: 15 },
    { mpn: 'STM32H743VIT6', category: 'MCU', href: '/parts/stm32h743vit6', interest: 58, changePercent: 42 },
    { mpn: 'LIS3DH', category: 'Accelerometer', href: '/parts/lis3dh', interest: 41, changePercent: -12 },
    { mpn: 'STM32G071KBU6', category: 'MCU', href: '/parts/stm32g071kbu6', interest: 33, changePercent: 8 },
    { mpn: 'STPS745G', category: 'Rectifier', href: '/parts/stps745g', interest: 26, changePercent: -5 },
    { mpn: 'LIS3DHTR', category: 'Accelerometer', href: '/parts/lis3dhtr', interest: 19, changePercent: 3 },
    { mpn: 'STM32F030F4P6', category: 'MCU', href: '/parts/stm32f030f4p6', interest: 17, changePercent: 6 },
    { mpn: 'VL53L0X', category: 'Time-of-flight sensor', href: '/parts/vl53l0x', interest: 14, changePercent: -3 },
    { mpn: 'L298N', category: 'Motor driver', href: '/parts/l298n', interest: 12, changePercent: 11 },
  ],
  popularAlternatives: [
    { label: 'Alternatives to STM32F103C8T6', href: '/alternatives/stm32f103c8t6' },
    { label: 'Compare STM32F103C8T6 vs GD32F103C8T6', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
  ],
  comparableManufacturers: [
    {
      label: 'GigaDevice',
      shortName: 'GD',
      subtitle: 'GD32 · MCU',
      slug: 'gigadevice',
      href: '/manufacturers/gigadevice',
    },
    {
      label: 'Microchip',
      shortName: 'M',
      subtitle: 'PIC · MCU & analog',
      slug: 'microchip',
      href: '/manufacturers/microchip',
    },
    {
      label: 'NXP Semiconductors',
      shortName: 'NXP',
      subtitle: 'MCU · Automotive',
      slug: 'nxp',
      href: '/manufacturers/nxp',
    },
  ],
  supplyInsights: [
    {
      title: 'Lifecycle & alternates',
      summary: 'Legacy BOM continuity and approved swaps',
      icon: 'lifecycle',
      notes: [
        'STM32 legacy parts remain in many BOMs — maintain approved alternates with documented match types.',
      ],
    },
    {
      title: 'Purchasing pitfalls',
      summary: 'Grade suffixes and orderable part numbers',
      icon: 'alertCircle',
      notes: [
        'Automotive and industrial grades use distinct orderable suffixes; purchasing swaps are a common pitfall.',
      ],
    },
    {
      title: 'Sourcing channels',
      summary: 'Franchised distributor guidance',
      icon: 'globe',
      notes: ['Franchised distributors remain the lowest-risk channel for critical programs.'],
    },
  ],
  queryIntelligence: [
    {
      question: 'Can STM32F103 be replaced by GD32F103?',
      answerHref: '/compare/stm32f103c8t6-vs-gd32f103c8t6',
    },
    {
      question: 'Which STM32 is best for low power?',
      answerHref: '/answers/best-mcu-for-wearable-device',
    },
    {
      question: 'What is an alternative to L298N?',
      chatQuery: 'What is an alternative to L298N?',
    },
    {
      question: 'Can I use STM32 for motor control?',
      chatQuery: 'Can I use STM32 for motor control?',
    },
    {
      question: 'Which STM32 package is easiest to source?',
      chatQuery: 'Which STM32 package is easiest to source?',
    },
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
