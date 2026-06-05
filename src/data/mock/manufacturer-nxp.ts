import { createMinimalManufacturerMock } from '@/data/mock/manufacturer-minimal'

export const mockManufacturerNxp = createMinimalManufacturerMock({
  slug: 'nxp',
  name: 'NXP Semiconductors',
  shortName: 'NXP',
  subtitle: 'Automotive · MCU · Connectivity',
  shortAnswer:
    'NXP is a major automotive and industrial connectivity supplier with secure MCU and radar portfolios.',
  categories: [
    { label: 'Automotive', partCount: 4100 },
    { label: 'MCU', partCount: 3800, categoryL1: 'Integrated Circuits (ICs)', categoryL2: 'Embedded' },
    { label: 'Connectivity', partCount: 2100 },
  ],
})
