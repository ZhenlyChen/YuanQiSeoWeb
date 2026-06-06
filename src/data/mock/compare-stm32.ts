import type { CompareIntelligencePage } from '@/types/seo-intelligence'
import { compareSeoMetaSync } from '@/lib/seo-meta'

export const mockCompareStm32Gd32: CompareIntelligencePage = {
  pageType: 'compare',
  slug: 'stm32f103c8t6-vs-gd32f103c8t6',
  partA: {
    mpn: 'STM32F103C8T6',
    manufacturer: 'STMicroelectronics',
    slug: 'stm32f103c8t6',
  },
  partB: {
    mpn: 'GD32F103C8T6',
    manufacturer: 'GigaDevice',
    slug: 'gd32f103c8t6',
  },
  meta: compareSeoMetaSync({
    mpnA: 'STM32F103C8T6',
    mpnB: 'GD32F103C8T6',
    mfgA: 'STMicroelectronics',
    mfgB: 'GigaDevice',
    slug: 'stm32f103c8t6-vs-gd32f103c8t6',
  }),
  dropInReplacement: false,
  dropInWarning:
    'STM32F103C8T6 and GD32F103C8T6 share LQFP-48 pinouts in many designs, but they should not be treated as drop-in replacements until clock tree, flash wait states, peripheral reset values, and firmware behavior are verified on your PCB.',
  breadcrumbs: [
    { label: 'Compare' },
    { label: 'STM32F103C8T6 vs GD32F103C8T6' },
  ],
  shortAnswer:
    'Choose STM32F103C8T6 if you need the reference STM32 ecosystem, errata familiarity, and distributor line-card stability. Choose GD32F103C8T6 if you need a pin-compatible path with competitive cost, but plan firmware re-validation. They should not be treated as drop-in replacements until clock, flash latency, and peripheral behavior are verified on hardware.',
  chooseAIf: [
    'Your toolchain, HAL, and field support assume STM32F1',
    'Customer qualification lists name STMicroelectronics explicitly',
    'You want the broadest distributor documentation trail',
  ],
  chooseBIf: [
    'You must preserve LQFP-48 pinout with cost pressure',
    'You can run regression tests on USART, SPI, timers, and flash',
    'Regional supply favors GigaDevice franchised channels',
  ],
  doNotReplaceIf: [
    'Firmware uses undocumented STM-only behaviors or tight timing on ADC/DMA',
    'You cannot re-run EMC and safety certification on the assembly',
    'Bootloader size assumptions depend on STM flash page geometry',
  ],
  specComparison: [
    { spec: 'Core', partA: 'Cortex-M3 72 MHz', partB: 'Cortex-M3 108 MHz (typ.)', winner: 'b' },
    { spec: 'Flash', partA: '64 KB', partB: '64 KB', winner: 'tie' },
    { spec: 'Package', partA: 'LQFP-48', partB: 'LQFP-48', winner: 'tie' },
    { spec: 'Ecosystem', partA: 'STM32Cube / wide community', partB: 'GD32 SDK / growing', winner: 'a' },
    { spec: 'Sourcing', partA: 'Global franchised stock', partB: 'Strong in APAC channels', winner: 'context' },
  ],
  pinPackageNotes: [
    'LQFP-48 pinouts are marketed as compatible; verify NRST, BOOT0, and VDDA routing on your schematic.',
    'Crystal load capacitors may need tuning if core frequency differs at runtime.',
    'Debug connectors should remain SWD with matching pin order.',
  ],
  applicationFit: [
    {
      application: 'Motor control',
      better: 'either',
      reason: 'Both can work after timer and ADC re-calibration; prefer STM32 if certification references ST silicon.',
    },
    {
      application: 'Cost-reduced mass production',
      better: 'b',
      reason: 'GD32 often wins on BOM cost when firmware regression budget exists.',
    },
    {
      application: 'Medical / regulated',
      better: 'a',
      reason: 'Prefer the manufacturer with your QMS approved vendor list.',
    },
  ],
  designTradeoffs: [
    'STM32 offers predictable errata history; GD32 may offer higher core clock in the same package.',
    'Migrating ST → GD usually requires flash wait-state and startup code updates.',
    'Supply diversification improves with two qualified silicon sources, at the cost of dual firmware test matrices.',
  ],
  sourcingNotes: [
    'STM32F103C8T6 remains in high search volume; allocate safety stock before line-card changes.',
    'GD32 channels may offer faster lead times in some regions — validate authenticity and reel codes.',
  ],
  alternativesToBoth: [
    {
      mpn: 'STM32F103CBT6',
      manufacturer: 'STMicroelectronics',
      matchType: 'functional',
      reason: 'Higher flash in family for redesign headroom.',
      href: '/parts/stm32f103c8t6',
    },
    {
      mpn: 'STM32G071KBU6',
      manufacturer: 'STMicroelectronics',
      matchType: 'functional',
      reason: 'Modern low-power MCU if pin compatibility is not required.',
      href: '/parts/stm32f103c8t6',
    },
  ],
  relatedQueries: [
    {
      label: 'Find alternatives to STM32F103C8T6',
      href: '/alternatives/stm32f103c8t6',
    },
    {
      label: 'STM32F103C8T6 component intelligence',
      href: '/parts/stm32f103c8t6',
    },
    {
      label: 'Best MCU for wearable device',
      href: '/answers/best-mcu-for-wearable-device',
    },
  ],
  faq: [
    {
      question: 'What is the main difference between STM32F103C8T6 and GD32F103C8T6?',
      answer:
        'They target the same applications and package, but differ in vendor ecosystem, typical core frequency, peripheral implementation details, and firmware validation requirements.',
    },
    {
      question: 'Are STM32F103C8T6 and GD32F103C8T6 pin-compatible?',
      answer:
        'Pinouts are largely aligned for LQFP-48 designs, but drop-in use still requires hardware and firmware verification.',
    },
    {
      question: 'Which part is easier to source?',
      answer:
        'STM32 has broad global franchised availability; GD32 can be advantageous in specific regional channels — compare your approved distributors.',
    },
  ],
}
