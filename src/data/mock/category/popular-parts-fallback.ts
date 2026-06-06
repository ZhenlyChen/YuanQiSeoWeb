import type { CategoryPopularPartRow } from '@/types/seo-intelligence'

function partSlug(mpn: string): string {
  return mpn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const ANALOG_POWER_POPULAR_PARTS: CategoryPopularPartRow[] = [
  {
    mpn: 'LM358',
    manufacturer: 'Texas Instruments',
    category: 'Dual Op Amp',
    keySpecs: '3–32 V · 700 kHz · SOIC-8',
    commonUse: 'General-purpose signal conditioning and buffering',
    partHref: '/parts/lm358',
    alternativeHref: '/alternatives/lm358',
  },
  {
    mpn: 'TL431',
    manufacturer: 'Texas Instruments',
    category: 'Voltage Reference',
    keySpecs: 'Adjustable shunt · 2.5 V ref',
    commonUse: 'Feedback reference in isolated power supplies',
    partHref: '/parts/tl431',
    alternativeHref: '/alternatives/tl431',
  },
  {
    mpn: 'MCP6002',
    manufacturer: 'Microchip',
    category: 'Rail-to-Rail Op Amp',
    keySpecs: '1 MHz · 1.8–6 V · MSOP-8',
    commonUse: 'Battery-powered sensor front ends',
    partHref: '/parts/mcp6002',
    alternativeHref: '/alternatives/mcp6002',
  },
  {
    mpn: 'AD8628',
    manufacturer: 'Analog Devices',
    category: 'Zero-Drift Op Amp',
    keySpecs: '0.05 µV/°C · 5 V · SOT-23-5',
    commonUse: 'Precision weigh-scale and bridge amplifiers',
    partHref: '/parts/ad8628',
    alternativeHref: '/alternatives/ad8628',
  },
  {
    mpn: 'LM393',
    manufacturer: 'Texas Instruments',
    category: 'Comparator',
    keySpecs: 'Dual · open-collector · 2–36 V',
    commonUse: 'Threshold detection and window comparators',
    partHref: '/parts/lm393',
    alternativeHref: '/alternatives/lm393',
  },
  {
    mpn: 'REF3030',
    manufacturer: 'Texas Instruments',
    category: 'Voltage Reference',
    keySpecs: '3.0 V · 50 ppm/°C · SOT-23',
    commonUse: 'ADC reference for measurement chains',
    partHref: '/parts/ref3030',
    alternativeHref: '/alternatives/ref3030',
  },
  {
    mpn: 'INA826',
    manufacturer: 'Texas Instruments',
    category: 'Instrumentation Amp',
    keySpecs: 'Low noise · RFI filtered · MSOP-8',
    commonUse: 'Industrial sensor and strain-gauge inputs',
    partHref: '/parts/ina826',
    alternativeHref: '/alternatives/ina826',
  },
  {
    mpn: 'ADG452',
    manufacturer: 'Analog Devices',
    category: 'Analog Switch',
    keySpecs: '4:1 mux · ±15 V · TSSOP-16',
    commonUse: 'Multiplexing slow analog acquisition channels',
    partHref: '/parts/adg452',
    alternativeHref: '/alternatives/adg452',
  },
  {
    mpn: 'MCP4725',
    manufacturer: 'Microchip',
    category: 'DAC',
    keySpecs: '12-bit · I2C · SOT-23-6',
    commonUse: 'Bias trimming and setpoint control',
    partHref: '/parts/mcp4725',
    alternativeHref: '/alternatives/mcp4725',
  },
  {
    mpn: 'TPS7A4700',
    manufacturer: 'Texas Instruments',
    category: 'LDO',
    keySpecs: 'Ultra-low noise · 1 A · adjustable',
    commonUse: 'Clean analog rails for ADC and op-amp front ends',
    partHref: '/parts/tps7a4700',
    alternativeHref: '/alternatives/tps7a4700',
  },
]

function genericPopularParts(categoryName: string): CategoryPopularPartRow[] {
  const seeds = [
    ['Example A', 'Reference design starting point'],
    ['Example B', 'Common pin-compatible path'],
    ['Example C', 'Low-power variant'],
    ['Example D', 'Industrial temperature option'],
    ['Example E', 'Automotive-qualified option'],
    ['Example F', 'Second-source candidate'],
    ['Example G', 'Compact package option'],
    ['Example H', 'High-voltage rated option'],
    ['Example I', 'Low-noise variant'],
    ['Example J', 'Cost-down alternative'],
  ] as const

  return seeds.map(([, use], index) => {
    const mpn = `${categoryName.replace(/[^a-zA-Z0-9]+/g, '').slice(0, 6).toUpperCase()}-${index + 1}`
    return {
      mpn,
      manufacturer: 'Various',
      category: categoryName,
      keySpecs: 'Curated placeholder · specs TBD',
      commonUse: use,
      partHref: `/parts/${partSlug(mpn)}`,
    }
  })
}

/** Ten curated rows for degraded category hubs without published intelligence pages. */
export function buildCategoryPopularPartsFallback(l1Slug: string, categoryName: string): CategoryPopularPartRow[] {
  if (l1Slug === 'analog-power') {
    return ANALOG_POWER_POPULAR_PARTS
  }

  return genericPopularParts(categoryName)
}
