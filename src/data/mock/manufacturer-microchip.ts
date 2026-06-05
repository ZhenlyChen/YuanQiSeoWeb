import { createMinimalManufacturerMock } from '@/data/mock/manufacturer-minimal'

export const mockManufacturerMicrochip = createMinimalManufacturerMock({
  slug: 'microchip',
  name: 'Microchip Technology',
  shortName: 'Microchip',
  subtitle: 'MCU · Analog · Connectivity',
  shortAnswer:
    'Microchip offers broad 8/16/32-bit MCU and analog portfolios with strong legacy part support for long-life industrial designs.',
  categories: [
    { label: 'MCU', partCount: 5400, categoryL1: 'Integrated Circuits (ICs)', categoryL2: 'Embedded' },
    { label: 'Analog & power', partCount: 3200 },
  ],
})
