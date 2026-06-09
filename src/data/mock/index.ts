import { mockAlternativeBq24195l } from '@/data/mock/alternative-bq24195l'
import { mockAnswerWearableMcu } from '@/data/mock/answer-wearable-mcu'
import { mockCompareStm32Gd32 } from '@/data/mock/compare-stm32'
import { mockComponentStm32 } from '@/data/mock/component-stm32f103c8t6'
import { mockManufacturerSt } from '@/data/mock/manufacturer-st'
import { mockManufacturerGigadevice } from '@/data/mock/manufacturer-gigadevice'
import { mockManufacturerMicrochip } from '@/data/mock/manufacturer-microchip'
import { mockManufacturerNxp } from '@/data/mock/manufacturer-nxp'
import { getMockManufacturerDirectoryPage } from '@/data/mock/manufacturer-directory'
import { alternativeSeoMetaSync } from '@/lib/seo-meta'
import type {
  AlternativeIntelligencePage,
  CompareIntelligencePage,
  ComponentIntelligencePage,
  ManufacturerIntelligencePage,
  QueryAnswerPage,
} from '@/types/seo-intelligence'

export function getMockComponentPage(slug: string): ComponentIntelligencePage | null {
  const key = slug.toLowerCase()
  if (key === 'stm32f103c8t6') return mockComponentStm32
  return null
}

export function getMockAlternativePage(mpn: string): AlternativeIntelligencePage | null {
  const key = mpn.toLowerCase()
  if (key === 'bq24195l') return mockAlternativeBq24195l
  if (key === 'stm32f103c8t6') {
    return {
      ...mockAlternativeBq24195l,
      slug: 'stm32f103c8t6',
      mpn: 'STM32F103C8T6',
      manufacturer: 'STMicroelectronics',
      category: '32-bit ARM Cortex-M3 Microcontroller',
      meta: alternativeSeoMetaSync({
        mpn: 'STM32F103C8T6',
        manufacturer: 'STMicroelectronics',
        category: '32-bit MCU',
        slug: 'stm32f103c8t6',
      }),
      subtitle: {
        manufacturer: 'STMicroelectronics',
        manufacturerHref: '/manufacturers/stmicroelectronics',
        category: '32-bit ARM Cortex-M3 Microcontroller',
        package: 'LQFP-48',
      },
      overviewTags: mockComponentStm32.overviewTags,
      breadcrumbs: [
        { label: 'STM32F103C8T6', href: '/parts/stm32f103c8t6' },
        { label: 'Alternatives' },
      ],
      originalPartHref: '/parts/stm32f103c8t6',
      alternatives: mockComponentStm32.alternatives.map((alt) => ({
        ...alt,
        compareHref:
          alt.mpn === 'GD32F103C8T6'
            ? '/compare/stm32f103c8t6-vs-gd32f103c8t6'
            : undefined,
        compatibility:
          alt.mpn === 'GD32F103C8T6'
            ? {
                package: 'match',
                pinout: 'match',
                voltage: 'match',
                temperature: 'match',
                interface: 'partial',
                lifecycle: 'match',
                application: 'match',
              }
            : {
                package: 'partial',
                pinout: 'partial',
                voltage: 'match',
                temperature: 'match',
                interface: 'match',
                lifecycle: 'match',
                application: 'match',
              },
      })),
      compareLinks: mockComponentStm32.compareLinks,
      shortAnswer:
        'The best alternative to STM32F103C8T6 depends on whether you need pin-compatible cost reduction (GD32/CH32 paths) or a functional upgrade within STM32. Existing PCBs should prioritize pinout and firmware verification.',
      replacementVerdict: {
        canReplaceDirectly: false,
        directReplacementAnswer:
          'Direct replacement is not recommended without pinout and firmware verification on the target PCB.',
        bestReplacementType: 'Pin-compatible or functional within verified firmware matrix',
        mainRisk: 'Register maps and clock trees differ on clone MCUs',
        summary: 'Document match type and re-run hardware validation before mass substitution.',
      },
    }
  }
  return null
}

export function getMockComparePage(slug: string): CompareIntelligencePage | null {
  const key = slug.toLowerCase()
  if (key === 'stm32f103c8t6-vs-gd32f103c8t6') return mockCompareStm32Gd32
  return null
}

export function getMockManufacturerPage(slug: string): ManufacturerIntelligencePage | null {
  const key = slug.toLowerCase()
  if (key === 'stmicroelectronics') return mockManufacturerSt
  if (key === 'gigadevice') return mockManufacturerGigadevice
  if (key === 'microchip') return mockManufacturerMicrochip
  if (key === 'nxp') return mockManufacturerNxp
  return null
}

export function getMockManufacturerDirectory() {
  return getMockManufacturerDirectoryPage()
}

export { getMockCategoryDirectoryPage, getMockCategoryHubPage } from '@/data/mock/category'

export function getMockAnswerPage(slug: string): QueryAnswerPage | null {
  const key = slug.toLowerCase()
  if (key === 'best-mcu-for-wearable-device') return mockAnswerWearableMcu
  return null
}

export const MOCK_PREVIEW_PAGES = [
  {
    type: 'Category Directory',
    href: '/categories',
    description: 'Browse component categories A–Z — hub links to category intelligence pages',
  },
  {
    type: 'Category Hub (Power Management)',
    href: '/categories/power-management',
    description: 'Power Management — selection guide, alternatives, risks, sourcing',
  },
  {
    type: 'Category Hub (MCU)',
    href: '/categories/mcu',
    description: 'MCU — ARM paths, STM32 examples, alternatives context',
  },
  {
    type: 'Category Hub L2 (DC-DC)',
    href: '/categories/power-management/dc-dc-converters',
    description: 'DC-DC Converters — buck selection and replacement searches',
  },
  {
    type: 'Component Intelligence',
    href: '/parts/stm32f103c8t6',
    description: 'STM32F103C8T6 — AI verdict, specs, pitfalls, alternatives',
  },
  {
    type: 'Alternative',
    href: '/alternatives/bq24195l',
    description: 'BQ24195L — replacement verdict, compatibility matrix, risks',
  },
  {
    type: 'Alternative (STM32)',
    href: '/alternatives/stm32f103c8t6',
    description: 'STM32F103C8T6 — cross references linked from component page',
  },
  {
    type: 'Compare',
    href: '/compare/stm32f103c8t6-vs-gd32f103c8t6',
    description: 'STM32 vs GD32 — verdict-first comparison',
  },
  {
    type: 'Manufacturer Directory',
    href: '/manufacturers',
    description: 'Browse manufacturers by category and A–Z — hub links to intelligence pages',
  },
  {
    type: 'Manufacturer',
    href: '/manufacturers/stmicroelectronics',
    description: 'STMicroelectronics — curated hub, not full catalog',
  },
  {
    type: 'Query Answer',
    href: '/answers/best-mcu-for-wearable-device',
    description: 'Best MCU for wearable — AEO direct answer',
  },
] as const
