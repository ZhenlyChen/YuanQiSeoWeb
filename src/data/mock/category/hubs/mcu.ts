import { categoryHubSeoMetaSync } from '@/data/mock/category/shared'
import { buildSubcategoryCards, categoryFinderPath } from '@/lib/category-taxonomy'
import { MARKETING_TOOL_PAGES } from '@/lib/tool-urls'
import type { CategoryHubPage } from '@/types/seo-intelligence'

const L1 = 'mcu' as const

export const mockCategoryHubMcu: CategoryHubPage = {
  pageType: 'category',
  level: 'l1',
  slug: L1,
  l1Slug: L1,
  name: 'MCU',
  meta: categoryHubSeoMetaSync({ name: 'MCU', l1Slug: L1 }),
  breadcrumbs: [{ label: 'Categories', href: '/categories' }, { label: 'MCU' }],
  heroSubheading:
    'Explore MCU components by specifications, applications, alternatives, and sourcing risk. PartGenie helps engineers find parts, compare tradeoffs, and review replacement options before design or procurement decisions.',
  primaryCtaLabel: 'Find MCU Components',
  secondaryCtaLabel: 'Find Alternatives',
  searchPlaceholder: 'Describe what you need, enter a part number, or paste a BOM row',
  queryChips: [
    { label: 'Low-power MCU for wearable device', href: '/answers/best-mcu-for-wearable-device' },
    { label: 'STM32F103 pin-compatible replacement', chatQuery: 'Pin-compatible replacement for STM32F103C8T6' },
    { label: 'Cortex-M4 MCU with USB and 512KB flash', chatQuery: 'Cortex-M4 MCU USB 512KB flash' },
    { label: 'Compare STM32 vs GD32 for cost down', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
  ],
  quickAnswer:
    'Microcontrollers integrate CPU, memory, and peripherals for embedded control in consumer, industrial, automotive, and IoT products. Engineers compare core architecture, flash/RAM, package, peripheral mix, toolchain support, and long-term availability when selecting an MCU. Alternatives and sourcing risk matter because pin-compatible clones still differ in register maps, clock trees, and certification paths.',
  howToChooseIntro:
    'Start by narrowing the electrical, mechanical, and application requirements. The right MCU is usually the one that fits the design constraints with the lowest replacement, sourcing, and qualification risk.',
  howToChooseCards: [
    { title: 'Electrical Requirements', detail: 'Match core speed, memory, analog peripherals, and I/O count to the product feature set.' },
    { title: 'Package and Footprint', detail: 'Confirm pin count, pitch, and thermal constraints before locking PCB placement.' },
    { title: 'Interface and Control', detail: 'Review required buses, crypto, wireless companion interfaces, and debug connectors.' },
    { title: 'Application Fit', detail: 'Wearable, motor control, and automotive builds impose different power and safety constraints.' },
    { title: 'Lifecycle and Availability', detail: 'Prefer MCUs with clear roadmap support and documented second-source options.' },
    { title: 'Replacement Risk', detail: 'Treat pin-compatible clones as redesign candidates until firmware and hardware validation pass.' },
  ],
  subcategoriesSectionTitle: 'Explore MCU Subcategories',
  subcategoriesIntro:
    'Browse common subcategories to find parts, compare specifications, and discover alternative components.',
  subcategories: buildSubcategoryCards(L1),
  popularPartsIntro:
    'These parts are commonly searched, compared, or used as starting points for design and replacement workflows.',
  popularParts: [
    {
      mpn: 'STM32F103C8T6',
      manufacturer: 'STMicroelectronics',
      category: 'ARM Cortex-M3',
      keySpecs: '72 MHz · 64 KB flash · LQFP-48',
      commonUse: 'General-purpose control and IoT gateways',
      partHref: '/parts/stm32f103c8t6',
      alternativeHref: '/alternatives/stm32f103c8t6',
      compareHref: '/compare/stm32f103c8t6-vs-gd32f103c8t6',
    },
    {
      mpn: 'GD32F103C8T6',
      manufacturer: 'GigaDevice',
      category: 'ARM Cortex-M3',
      keySpecs: '108 MHz · 64 KB flash · LQFP-48',
      commonUse: 'Pin-compatible STM32 alternative path',
      partHref: '/parts/gd32f103c8t6',
      alternativeHref: '/alternatives/gd32f103c8t6',
      compareHref: '/compare/stm32f103c8t6-vs-gd32f103c8t6',
    },
    {
      mpn: 'ESP32-C3',
      manufacturer: 'Espressif',
      category: 'RISC-V Wireless MCU',
      keySpecs: 'Wi-Fi + BLE · 400 KB SRAM',
      commonUse: 'Connected sensor and appliance controllers',
      partHref: '/parts/esp32-c3',
      alternativeHref: '/alternatives/esp32-c3',
    },
  ],
  popularPartsCatalogCta: 'Search Full MCU Catalog in PartGenie',
  alternativeIntro:
    'Many engineers reach this category when they need a replacement MCU, second source, or migration path between vendor ecosystems.',
  alternativeLinks: [
    { label: 'Alternatives to STM32F103C8T6', href: '/alternatives/stm32f103c8t6' },
    { label: 'Compare STM32F103C8T6 vs GD32F103C8T6', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
    { label: 'Best MCU for wearable devices', href: '/answers/best-mcu-for-wearable-device' },
    { label: 'Find pin-compatible ARM MCU alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
  ],
  alternativeCtaLabel: 'Find Alternatives with AI',
  designRisksIntro:
    'MCUs may share package diagrams but still require firmware, clock, and peripheral review before replacement.',
  designRisks: [
    { title: 'Package and Footprint Risk', detail: 'Pin-compatible packages can hide different default pin mux assignments.' },
    { title: 'Electrical Rating Risk', detail: 'Operating voltage range and ADC reference behavior may differ across vendors.' },
    { title: 'Control and Firmware Risk', detail: 'Register maps, boot modes, and debug access differ on clone MCUs.' },
    { title: 'Thermal Risk', detail: 'Higher clock options increase core power and may exceed original thermal budget.' },
    { title: 'Lifecycle Risk', detail: 'Popular entry MCUs may be NRND while community designs still reference them.' },
    { title: 'Qualification Risk', detail: 'Automotive and medical programs require re-validation even for pin-compatible swaps.' },
  ],
  designRiskCtaLabel: 'Ask Datasheet AI to Review a Part',
  sourcingIntro:
    'MCU category selection affects BOM health through single-source firmware dependencies, distributor coverage, and migration cost.',
  sourcingBullets: [
    'Identify MCU lines without credible second source before mass production',
    'Check lifecycle status on mature Cortex-M3 entry parts',
    'Document pin-compatible clone validation requirements for sourcing',
    'Build replacement shortlists before EOL notices force redesigns',
    'Review BOM rows with toolchain and firmware dependencies',
  ],
  sourcingCtaLabel: 'Analyze a BOM',
  manufacturersIntro:
    'Explore manufacturers commonly associated with MCU designs and migration paths.',
  manufacturers: [
    {
      name: 'STMicroelectronics',
      slug: 'stmicroelectronics',
      knownFor: 'STM32 ecosystem and automotive MCUs',
      popularFamilies: 'STM32F, STM32G, STM32U',
      href: '/manufacturers/stmicroelectronics',
    },
    {
      name: 'GigaDevice',
      slug: 'gigadevice',
      knownFor: 'GD32 pin-compatible portfolio',
      popularFamilies: 'GD32F, GD32E',
      href: '/manufacturers/gigadevice',
    },
    {
      name: 'Microchip',
      slug: 'microchip',
      knownFor: 'PIC and SAM MCU families',
      popularFamilies: 'PIC32, SAM D',
      href: '/manufacturers/microchip',
    },
    {
      name: 'NXP Semiconductors',
      slug: 'nxp',
      knownFor: 'Automotive and secure MCUs',
      popularFamilies: 'Kinetis, LPC, i.MX RT',
      href: '/manufacturers/nxp',
    },
  ],
  intelligenceCtaTitle: 'Find the Right MCU Faster',
  intelligenceCtaCopy:
    'PartGenie turns part numbers, BOM rows, datasheets, and plain-language requirements into structured MCU recommendations with alternatives and sourcing context.',
  intelligenceCtaButtons: [
    { label: 'Find Components', href: MARKETING_TOOL_PAGES.componentFinder },
    { label: 'Find Alternatives', href: MARKETING_TOOL_PAGES.alternativeFinder },
    { label: 'Analyze BOM', href: MARKETING_TOOL_PAGES.bomAnalyzer },
    { label: 'Chat with Datasheet', href: MARKETING_TOOL_PAGES.datasheetAi },
  ],
  faq: [
    {
      question: 'What is an MCU component?',
      answer:
        'An MCU combines processor, memory, and peripherals on one chip for embedded control tasks in products ranging from wearables to industrial controllers.',
    },
    {
      question: 'How do I choose the right MCU component?',
      answer:
        'Define performance, memory, peripherals, package, toolchain, and lifecycle requirements before comparing specific part numbers.',
    },
    {
      question: 'Can PartGenie find alternatives in this category?',
      answer:
        'Yes. PartGenie highlights exact, pin-compatible, functional, and partial MCU alternatives with visible replacement risk labels.',
    },
    {
      question: 'Can I search by specs instead of a part number?',
      answer:
        'Yes. Describe core, memory, package, or connectivity needs and PartGenie maps them to candidate MCUs.',
    },
    {
      question: 'Do I need to verify alternatives with datasheets?',
      answer:
        'Yes. Pin-compatible claims require clock, peripheral, and firmware verification before production approval.',
    },
    {
      question: 'Can this help with BOM review?',
      answer:
        'Yes. The BOM assistant flags MCU rows with lifecycle, single-source, and firmware migration risk.',
    },
  ],
  internalLinks: [
    { label: 'Browse all component categories', href: '/categories' },
    { label: 'Explore ARM MCU subcategory', href: '/categories/mcu/arm-mcus' },
    { label: 'View STM32F103C8T6 component intelligence', href: '/parts/stm32f103c8t6' },
    { label: 'Find alternatives to STM32F103C8T6', href: '/alternatives/stm32f103c8t6' },
    { label: 'Explore STMicroelectronics manufacturer intelligence', href: '/manufacturers/stmicroelectronics' },
    { label: 'MCU category finder', href: categoryFinderPath(L1) },
  ],
  mostSearchedParts: [
    { mpn: 'STM32F103C8T6', href: '/parts/stm32f103c8t6', category: 'ARM Cortex-M3', interest: 98 },
    { mpn: 'GD32F103C8T6', href: '/parts/gd32f103c8t6', category: 'ARM Cortex-M3', interest: 86 },
    { mpn: 'ESP32-C3', href: '/parts/esp32-c3', category: 'Wireless MCU', interest: 79 },
  ],
  sidebarRelatedLinks: [
    { label: 'MCU Finder', href: categoryFinderPath(L1) },
    { label: 'Best MCU for wearable devices', href: '/answers/best-mcu-for-wearable-device' },
    { label: 'STM32 vs GD32 comparison', href: '/compare/stm32f103c8t6-vs-gd32f103c8t6' },
    { label: 'Manufacturers in MCU', href: '/manufacturers/category/mcu' },
  ],
}
