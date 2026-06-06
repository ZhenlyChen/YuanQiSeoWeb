import type { ComponentIntelligencePage } from '@/types/seo-intelligence'
import { componentSeoMetaSync } from '@/lib/seo-meta'

const MPN = 'STM32F103C8T6'
const SLUG = 'stm32f103c8t6'

export const mockComponentStm32: ComponentIntelligencePage = {
  pageType: 'component',
  slug: SLUG,
  mpn: MPN,
  manufacturer: 'STMicroelectronics',
  manufacturerSlug: 'stmicroelectronics',
  category: '32-bit MCU',
  categoryLabel: '32-bit ARM Cortex-M3 Microcontroller',
  categorySlug: 'mcu',
  package: 'LQFP-48',
  overviewTags: [
    'Package: LQFP-48',
    'STMicroelectronics',
    'Cortex-M3',
    '72 MHz',
    '64 KB Flash',
    'Arm MCU',
    'Industrial I/O',
    'Pin-compatible alternates',
  ],
  meta: componentSeoMetaSync({
    mpn: MPN,
    manufacturer: 'STMicroelectronics',
    category: '32-bit ARM Cortex-M3 MCU',
    slug: SLUG,
  }),
  subtitle: {
    manufacturer: 'STMicroelectronics',
    manufacturerHref: '/manufacturers/stmicroelectronics',
    category: '32-bit ARM Cortex-M3 Microcontroller',
    categoryHref: '/categories/mcu/finder',
    package: 'LQFP-48',
  },
  breadcrumbs: [
    { label: 'STMicroelectronics', href: '/manufacturers/stmicroelectronics' },
    { label: '32-bit ARM Cortex-M3 Microcontroller', href: '/categories/mcu/finder' },
    { label: MPN },
  ],
  shortAnswer:
    'STM32F103C8T6 is a 32-bit Arm Cortex-M3 MCU from STMicroelectronics, commonly used in embedded control, motor control, and low-cost industrial devices. It is a good fit when you need a mature MCU ecosystem and widely available tools, but engineers should review memory size, package availability, and possible GD32 or CH32 alternatives before locking the design.',
  aiVerdict: {
    bestFor: [
      'Low-cost embedded control and motor-drive boards',
      'Designs that rely on STM32 HAL / CMSIS ecosystem',
      'Prototypes needing a well-documented Cortex-M3 part',
    ],
    avoidIf: [
      'You need more than 64 KB flash or advanced security features',
      'Long-term supply must be guaranteed without redesign review',
      'Firmware cannot be re-validated for pin-compatible clones',
    ],
    checkBeforeUse: [
      'Confirm flash/RAM headroom for your stack and OTA plan',
      'Verify package suffix and temperature grade on the BOM line',
      'Review debug/programming interface (SWD) and reset strapping',
    ],
    replacementDifficulty: 'medium',
    sourcingRisk: 'medium',
  },
  keySpecs: [
    { label: 'Core', value: 'Arm Cortex-M3 @ 72 MHz' },
    { label: 'Flash', value: '64 KB' },
    { label: 'SRAM', value: '20 KB' },
    { label: 'Package', value: 'LQFP-48' },
    { label: 'I/O', value: '37' },
    { label: 'Operating voltage', value: '2.0–3.6 V' },
  ],
  applications: {
    goodFit: [
      { label: 'Motor control', icon: 'motor' },
      { label: 'Industrial I/O', icon: 'industrial' },
      { label: 'Consumer', icon: 'consumer' },
    ],
    notRecommended: [
      'Secure boot / payment terminals requiring modern trust zone',
      'Always-on cloud edge with large TLS stacks in limited RAM',
    ],
  },
  designConsiderations: [
    'Decouple VDDA/VSSA and place a stable 3.3 V rail for ADC reference when used.',
    'Reserve SWD header and BOOT0 strap access for production programming.',
    'Plan crystal or HSE bypass per clock accuracy needs; HSE startup time affects wake latency.',
    'If migrating from GD32, re-verify USART/I2C timing and flash wait states in firmware.',
  ],
  commonPitfalls: [
    {
      title: 'Package suffix and reel codes',
      detail:
        'LQFP-48 variants differ by tape/reel and environmental grade. Purchasing may swap suffixes that change moisture sensitivity or lead finish.',
    },
    {
      title: 'Pin-compatible but register-different clones',
      detail:
        'GD32F103 and CH32F103 families are often pin-compatible yet differ in peripheral reset values, flash latency tables, and errata.',
    },
    {
      title: '64 KB flash ceiling',
      detail:
        'Bootloader + RTOS + connectivity stacks can exceed 64 KB quickly. Validate map file before committing to this density grade.',
    },
  ],
  alternatives: [
    {
      mpn: 'GD32F103C8T6',
      manufacturer: 'GigaDevice',
      matchType: 'pin-compatible',
      reason: 'Common pin-compatible drop-in path; requires firmware re-validation.',
      riskLevel: 'medium',
      href: '/alternatives/stm32f103c8t6',
    },
    {
      mpn: 'STM32F103CBT6',
      manufacturer: 'STMicroelectronics',
      matchType: 'functional',
      reason: 'Same family with higher flash density in similar packages.',
      riskLevel: 'low',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'STM32G071KBU6',
      manufacturer: 'STMicroelectronics',
      matchType: 'functional',
      reason: 'Modern M0+ option for redesigns needing better power and peripherals.',
      riskLevel: 'high',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'CH32F103C8T6',
      manufacturer: 'WCH',
      matchType: 'pin-compatible',
      reason: 'Low-cost pin-compatible path; validate clock trees and peripheral register maps.',
      riskLevel: 'medium',
      href: '/alternatives/stm32f103c8t6',
    },
    {
      mpn: 'AT32F403ACCU7',
      manufacturer: 'Artery',
      matchType: 'pin-compatible',
      reason: 'Higher-performance M4 drop-in candidate for teams already validating Artery toolchains.',
      riskLevel: 'medium',
      href: '/alternatives/stm32f103c8t6',
    },
    {
      mpn: 'STM32F103RBT6',
      manufacturer: 'STMicroelectronics',
      matchType: 'functional',
      reason: 'Same F103 family with 128 KB flash in LQFP-64 for firmware headroom.',
      riskLevel: 'low',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'GD32F303CCT6',
      manufacturer: 'GigaDevice',
      matchType: 'functional',
      reason: 'F303-class upgrade path when redesigning for higher clock and richer analog peripherals.',
      riskLevel: 'medium',
      href: '/alternatives/stm32f103c8t6',
    },
    {
      mpn: 'STM32F401CCU6',
      manufacturer: 'STMicroelectronics',
      matchType: 'functional',
      reason: 'Cortex-M4 migration option for teams moving off F103 for DSP and USB performance.',
      riskLevel: 'high',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'APM32F103C8T6',
      manufacturer: 'Geehy',
      matchType: 'pin-compatible',
      reason: 'Another pin-compatible F103-class line; confirm flash programming and debug probe support.',
      riskLevel: 'medium',
      href: '/alternatives/stm32f103c8t6',
    },
  ],
  compareLinks: [
    {
      label: 'Compare STM32F103C8T6 vs GD32F103C8T6',
      href: '/compare/stm32f103c8t6-vs-gd32f103c8t6',
    },
    {
      label: 'Compare STM32F103C8T6 vs STM32F103CBT6',
      href: '/compare/stm32f103c8t6-vs-stm32f103cbt6',
    },
  ],
  bomSourcing: {
    lifecycle: 'Mature / active with long tail demand',
    supplyRisk: 'Medium — strong demand on clones and legacy designs',
    replacementReadiness: 'Build a pin-compatible and functional shortlist before EOL notices',
    bullets: [
      'Check lifecycle status on your distributor line card quarterly.',
      'Document approved alternates in the BOM with match type and firmware impact.',
      'Avoid single-source firmware dependencies on proprietary peripherals.',
    ],
  },
  decisionMatrix: [
    { question: 'Best for', recommendation: 'Cost-sensitive control boards using STM32 tooling' },
    {
      question: 'Avoid if',
      recommendation: 'You cannot re-test firmware on pin-compatible clones',
    },
    {
      question: 'Check before use',
      recommendation: 'Flash size, package suffix, temperature grade, debug access',
    },
    { question: 'Replacement difficulty', recommendation: 'Medium' },
    { question: 'Sourcing risk', recommendation: 'Medium' },
  ],
  faq: [
    {
      question: 'What is STM32F103C8T6?',
      answer:
        'It is a mainstream STM32F1 Cortex-M3 microcontroller in 64 KB flash configuration, widely used in embedded control products.',
    },
    {
      question: 'What is STM32F103C8T6 used for?',
      answer:
        'Typical uses include motor control, industrial I/O, appliances, and maker boards where STM32 ecosystem familiarity matters.',
    },
    {
      question: 'What are common alternatives to STM32F103C8T6?',
      answer:
        'Engineers often evaluate GD32F103 pin-compatible lines, higher-density STM32F103 variants, or newer STM32G0 parts for redesigns.',
    },
    {
      question: 'Can STM32F103C8T6 be used in a new design?',
      answer:
        'Yes for cost-driven designs, but document alternates and confirm memory and lifecycle requirements early.',
    },
    {
      question: 'What should engineers check before using STM32F103C8T6?',
      answer:
        'Review flash/RAM budget, package suffix, temperature grade, and whether firmware assumes STM-specific peripheral behavior.',
    },
  ],
  relatedAnswers: [
    {
      label: 'Best MCU for wearable device: selection guide',
      href: '/answers/best-mcu-for-wearable-device',
    },
    {
      label: 'How to choose an MCU for motor control',
      href: '/answers/best-mcu-for-wearable-device',
    },
  ],
  relatedCategory: {
    label: 'MCU component finder',
    href: '/categories/mcu/finder',
  },
  relatedManufacturer: {
    label: 'STMicroelectronics component intelligence',
    href: '/manufacturers/stmicroelectronics',
  },
  identity: {
    codeNorm: 'STM32F103C8T6',
    codeYuanqi: 'C8734',
    manufacturerNorm: 'STMICROELECTRONICS',
    identityKey: 'STMICROELECTRONICS::STM32F103C8T6',
    codeOther: ['STM32F103C8', 'STM32F103C8T6TR'],
  },
  sourceQuality: {
    datasheetStatus: 'downloaded',
    datasheetTextQuality: 'good',
    enrichmentVersion: 'partgenie_enrichment_v3',
    usedSources: ['datasheet_content', 'manufacturer_page', 'lcsc_distributor_page'],
    requiresHumanReview: false,
  },
  compliance: {
    rohs: 'Compliant',
    reach: 'Compliant',
    msl: 'MSL 3',
    eccn: 'EAR99',
    htsus: '8542.31.0000',
  },
  mechanical: {
    pinCount: 48,
    pinPitchMm: 0.5,
    pinType: 'SMD',
    lengthMm: 7.0,
    widthMm: 7.0,
    heightMm: 1.4,
  },
  media: {
    datasheetUrls: ['https://www.st.com/resource/en/datasheet/stm32f103c8.pdf'],
    datasheetSizeBytes: 819_200,
    productUrls: ['https://www.lcsc.com/product-detail/C8734.html'],
    imgUrls: ['/images/parts/chip-main.png'],
  },
  sourcingSnapshot: {
    vendorCount: 3,
    stockStatus: 'In Stock',
    minUnitPrice: 1.18,
    priceCurrency: 'USD',
    packagingOptions: ['Tray', 'Tape & Reel'],
  },
  substituteSummary: {
    dropInCount: 1,
    functionalCount: 2,
    alternateCount: 4,
    requiresValidation: true,
  },
}
