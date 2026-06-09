import { directoryLetterForName } from '@/lib/manufacturer-directory'
import type { CategoryIconId, CategorySubcategoryCard } from '@/types/seo-intelligence'

export type CategoryL2Definition = {
  slug: string
  name: string
  shortDescription: string
  iconId?: CategoryIconId
  iconUrl?: string
}

export type CategoryL1Definition = {
  slug: string
  name: string
  description: string
  iconId: CategoryIconId
  iconUrl?: string
  sortRank: number
  partCount: number
  published: boolean
  l2: CategoryL2Definition[]
}

const L1_TAXONOMY: CategoryL1Definition[] = [
  {
    slug: 'mcu',
    name: 'MCU',
    description: 'Microcontrollers for embedded control, connectivity, and signal processing designs.',
    iconId: 'mcu',
    sortRank: 1,
    partCount: 8420,
    published: true,
    l2: [
      { slug: 'arm-mcus', name: 'ARM MCUs', shortDescription: 'Cortex-M and Cortex-A based MCUs for general embedded systems.' },
      { slug: '8-bit-mcus', name: '8-bit MCUs', shortDescription: 'Low-cost control MCUs for simple sensing and actuator tasks.' },
      { slug: '32-bit-mcus', name: '32-bit MCUs', shortDescription: 'Higher-performance MCUs with richer peripherals and memory.' },
      { slug: 'wireless-mcus', name: 'Wireless MCUs', shortDescription: 'MCUs with integrated radio for IoT and connectivity products.' },
    ],
  },
  {
    slug: 'power-management',
    name: 'Power Management',
    description: 'Regulators, converters, and PMICs that define rail stability, efficiency, and BOM risk.',
    iconId: 'power-management',
    sortRank: 2,
    partCount: 6120,
    published: true,
    l2: [
      { slug: 'dc-dc-converters', name: 'DC-DC Converters', shortDescription: 'Buck, boost, and buck-boost rails for point-of-load power.' },
      { slug: 'ldo-regulators', name: 'LDO Regulators', shortDescription: 'Low-noise linear rails for sensitive analog and RF blocks.' },
      { slug: 'battery-management', name: 'Battery Management', shortDescription: 'Chargers, fuel gauges, and protection for portable designs.' },
      { slug: 'voltage-supervisors', name: 'Voltage Supervisors', shortDescription: 'Reset, sequencing, and monitoring for reliable power-up.' },
    ],
  },
  {
    slug: 'connectors',
    name: 'Connectors',
    description: 'Board-to-board, wire-to-board, and circular interconnect for mechanical and signal integrity.',
    iconId: 'connectors',
    sortRank: 3,
    partCount: 4890,
    published: true,
    l2: [
      { slug: 'circular-connectors', name: 'Circular Connectors', shortDescription: 'Rugged circular interfaces for industrial and automotive harnesses.' },
      { slug: 'board-to-board', name: 'Board-to-Board', shortDescription: 'Stacking and mezzanine connectors for compact PCB assemblies.' },
      { slug: 'wire-to-board', name: 'Wire-to-Board', shortDescription: 'Terminal and header systems for field wiring and serviceability.' },
      { slug: 'usb-connectors', name: 'USB Connectors', shortDescription: 'USB-C and legacy USB connectors for host and device ports.' },
    ],
  },
  {
    slug: 'power-discrete',
    name: 'Power Discrete',
    description: 'MOSFETs, IGBTs, and diodes for switching, protection, and high-current paths.',
    iconId: 'power-discrete',
    sortRank: 4,
    partCount: 5310,
    published: true,
    l2: [
      { slug: 'mosfets', name: 'MOSFETs', shortDescription: 'N-channel and P-channel FETs for DC switching and load control.' },
      { slug: 'igbts', name: 'IGBTs', shortDescription: 'High-voltage switching devices for motor drives and power stages.' },
      { slug: 'power-diodes', name: 'Power Diodes', shortDescription: 'Rectifier and Schottky diodes for OR-ing and freewheeling paths.' },
    ],
  },
  {
    slug: 'mems-sensors',
    name: 'MEMS & Sensors',
    description: 'Motion, environmental, and magnetic sensing for industrial, consumer, and automotive systems.',
    iconId: 'mems-sensors',
    sortRank: 5,
    partCount: 2980,
    published: true,
    l2: [
      { slug: 'motion-sensors', name: 'Motion Sensors', shortDescription: 'Accelerometers, gyroscopes, and IMUs for orientation tracking.' },
      { slug: 'environmental-sensors', name: 'Environmental Sensors', shortDescription: 'Temperature, humidity, and pressure sensing for monitoring products.' },
      { slug: 'magnetic-sensors', name: 'Magnetic Sensors', shortDescription: 'Hall and magnetometers for position and current sensing.' },
    ],
  },
  {
    slug: 'analog-power',
    name: 'Analog & Power ICs',
    description: 'Signal chain, amplification, and mixed analog functions alongside power support circuits.',
    iconId: 'power-management',
    iconUrl: '/category-icons/analog-power-ic.png',
    sortRank: 6,
    partCount: 4520,
    published: true,
    l2: [
      {
        slug: 'operational-amplifiers',
        name: 'Operational Amplifiers',
        shortDescription: 'Precision and general-purpose op amps for conditioning paths.',
        iconId: 'data-converters',
        iconUrl: '/category-icons/operational-amplifiers.png',
      },
      {
        slug: 'voltage-references',
        name: 'Voltage References',
        shortDescription: 'Stable references for ADC, DAC, and measurement front ends.',
        iconId: 'passives',
      },
      {
        slug: 'linear-regulators',
        name: 'Linear Regulators',
        shortDescription: 'Analog-focused LDO and reference regulator families.',
        iconId: 'power-management',
      },
    ],
  },
  {
    slug: 'data-converters',
    name: 'Data Converters',
    description: 'ADCs and DACs that set resolution, latency, and interface constraints in measurement chains.',
    iconId: 'data-converters',
    sortRank: 7,
    partCount: 2140,
    published: true,
    l2: [
      { slug: 'adc', name: 'ADCs', shortDescription: 'Analog-to-digital converters for instrumentation and control loops.' },
      { slug: 'dac', name: 'DACs', shortDescription: 'Digital-to-analog outputs for actuation and waveform generation.' },
    ],
  },
  {
    slug: 'rf-wireless',
    name: 'RF & Wireless',
    description: 'Transceivers, front-end modules, and timing devices for connected radio products.',
    iconId: 'rf-wireless',
    sortRank: 8,
    partCount: 1870,
    published: true,
    l2: [
      { slug: 'wifi-modules', name: 'Wi-Fi Modules', shortDescription: 'Integrated Wi-Fi radios and modules for connected devices.' },
      { slug: 'bluetooth-modules', name: 'Bluetooth Modules', shortDescription: 'BLE and classic Bluetooth modules for short-range links.' },
      { slug: 'rf-transceivers', name: 'RF Transceivers', shortDescription: 'Sub-GHz and licensed-band transceivers for custom radio designs.' },
    ],
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    description: 'AEC-Q qualified and automotive-grade parts for powertrain, body, and ADAS subsystems.',
    iconId: 'automotive',
    sortRank: 9,
    partCount: 3260,
    published: true,
    l2: [
      { slug: 'automotive-mcu', name: 'Automotive MCUs', shortDescription: 'Safety-aware MCUs for body, gateway, and zone controllers.' },
      { slug: 'automotive-power', name: 'Automotive Power', shortDescription: 'PMIC and regulator families qualified for automotive rails.' },
    ],
  },
  {
    slug: 'connectivity',
    name: 'Connectivity',
    description: 'Ethernet, USB, and industrial fieldbus components for wired product interfaces.',
    iconId: 'connectivity',
    sortRank: 10,
    partCount: 2410,
    published: true,
    l2: [
      { slug: 'ethernet-phy', name: 'Ethernet PHY', shortDescription: 'Physical layer devices for wired network ports.' },
      { slug: 'usb-controllers', name: 'USB Controllers', shortDescription: 'USB hub and host/device controller ICs.' },
    ],
  },
  {
    slug: 'memory',
    name: 'Memory',
    description: 'Flash, EEPROM, and RAM devices that affect boot, firmware update, and data retention.',
    iconId: 'memory',
    sortRank: 11,
    partCount: 1980,
    published: true,
    l2: [
      { slug: 'nor-flash', name: 'NOR Flash', shortDescription: 'Execute-in-place flash for firmware and boot storage.' },
      { slug: 'eeprom', name: 'EEPROM', shortDescription: 'Non-volatile configuration and calibration storage.' },
    ],
  },
  {
    slug: 'passives',
    name: 'Passives',
    description: 'Capacitors, resistors, and magnetics that shape EMI, ripple, and reliability margins.',
    iconId: 'passives',
    sortRank: 12,
    partCount: 9120,
    published: true,
    l2: [
      { slug: 'mlcc-capacitors', name: 'MLCC Capacitors', shortDescription: 'Ceramic capacitors for decoupling and filtering networks.' },
      { slug: 'inductors', name: 'Inductors', shortDescription: 'Power inductors for converters and EMI filtering.' },
    ],
  },
  {
    slug: 'fpga-logic',
    name: 'FPGA & Logic',
    description: 'FPGAs, CPLDs, and glue logic for interface aggregation and acceleration paths.',
    iconId: 'fpga-logic',
    sortRank: 13,
    partCount: 1540,
    published: true,
    l2: [
      { slug: 'fpgas', name: 'FPGAs', shortDescription: 'Programmable logic for custom interfaces and acceleration.' },
      { slug: 'cplds', name: 'CPLDs', shortDescription: 'Low-latency glue logic for pin muxing and control planes.' },
    ],
  },
]

export function getL1Categories(): CategoryL1Definition[] {
  return [...L1_TAXONOMY].sort((a, b) => a.sortRank - b.sortRank)
}

export function getL1Category(slug: string): CategoryL1Definition | undefined {
  return L1_TAXONOMY.find((item) => item.slug === slug)
}

export function getL2Categories(l1Slug: string): CategoryL2Definition[] {
  return getL1Category(l1Slug)?.l2 ?? []
}

export function getL2Category(l1Slug: string, l2Slug: string): CategoryL2Definition | undefined {
  return getL2Categories(l1Slug).find((item) => item.slug === l2Slug)
}

export function resolveSubcategoryIconId(l1Slug: string, l2Slug: string): CategoryIconId {
  const l1 = getL1Category(l1Slug)
  const l2 = getL2Category(l1Slug, l2Slug)
  return l2?.iconId ?? l1?.iconId ?? 'mcu'
}

export function buildSubcategoryCards(l1Slug: string, excludeL2Slug?: string): CategorySubcategoryCard[] {
  return getL2Categories(l1Slug)
    .filter((item) => item.slug !== excludeL2Slug)
    .map((item) => ({
      name: item.name,
      slug: item.slug,
      description: item.shortDescription,
      href: categoryHubPath(l1Slug, item.slug),
      iconId: resolveSubcategoryIconId(l1Slug, item.slug),
      iconUrl: item.iconUrl,
    }))
}

export function directoryLetterForCategory(name: string): string {
  return directoryLetterForName(name)
}

export function categoryHubPath(l1Slug: string, l2Slug?: string): string {
  if (l2Slug) return `/categories/${l1Slug}/${l2Slug}`
  return `/categories/${l1Slug}`
}

export function categoryFinderPath(l1Slug: string): string {
  return `/categories/${l1Slug}/finder`
}

export function buildRelatedL1CategoryLinks(excludeL1Slug: string, limit = 5) {
  return getL1Categories()
    .filter((item) => item.published && item.slug !== excludeL1Slug)
    .slice(0, limit)
    .map((item) => ({
      label: item.name,
      href: categoryHubPath(item.slug),
    }))
}
