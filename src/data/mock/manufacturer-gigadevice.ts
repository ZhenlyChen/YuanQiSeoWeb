import { createMinimalManufacturerMock } from '@/data/mock/manufacturer-minimal'

export const mockManufacturerGigadevice = createMinimalManufacturerMock({
  slug: 'gigadevice',
  name: 'GigaDevice',
  subtitle: 'MCU · Memory',
  shortAnswer:
    'GigaDevice is frequently evaluated for GD32 MCU paths as pin-compatible or cost-down alternatives to STM32-class designs.',
  categories: [
    { label: 'MCU', partCount: 1200, categoryL1: 'Integrated Circuits (ICs)', categoryL2: 'Embedded' },
    { label: 'Memory', partCount: 800 },
  ],
})
