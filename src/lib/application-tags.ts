export type ApplicationIconId =
  | 'industrial'
  | 'motor'
  | 'consumer'
  | 'iot'
  | 'instrumentation'
  | 'robotics'
  | 'power'
  | 'embedded'
  | 'automotive'
  | 'generic'

export type ApplicationTagInput = string | { label: string; icon?: ApplicationIconId }

export type NormalizedApplicationTag = {
  label: string
  icon: ApplicationIconId
}

const LONG_LABEL_SHORT: Record<string, { label: string; icon: ApplicationIconId }> = {
  'Motor control and power-stage gate drivers': { label: 'Motor control', icon: 'motor' },
  'Industrial I/O and PLC-style edge nodes': { label: 'Industrial I/O', icon: 'industrial' },
  'Consumer appliances with modest UI/control logic': { label: 'Consumer', icon: 'consumer' },
}

function inferIcon(text: string): ApplicationIconId {
  const t = text.toLowerCase()
  if (/motor|drive|gate driver|power-stage/.test(t)) return 'motor'
  if (/industrial|plc|factory|automation/.test(t)) return 'industrial'
  if (/consumer|appliance|home/.test(t)) return 'consumer'
  if (/iot|sensor|wireless|cloud/.test(t)) return 'iot'
  if (/instrument|measure|meter|test/.test(t)) return 'instrumentation'
  if (/robot/.test(t)) return 'robotics'
  if (/power|supply|converter/.test(t)) return 'power'
  if (/automotive|vehicle|ev\b/.test(t)) return 'automotive'
  if (/embed|mcu|firmware|control board/.test(t)) return 'embedded'
  return 'generic'
}

function shortenLabel(text: string): string {
  const trimmed = text.trim()
  if (LONG_LABEL_SHORT[trimmed]) return LONG_LABEL_SHORT[trimmed].label
  const words = trimmed.split(/\s+/)
  if (words.length <= 3 && trimmed.length <= 28) return trimmed
  return words.slice(0, 2).join(' ')
}

export function normalizeApplicationTag(input: ApplicationTagInput): NormalizedApplicationTag {
  if (typeof input === 'object' && input !== null && 'label' in input) {
    const label = input.label.trim()
    return {
      label,
      icon: input.icon ?? inferIcon(label),
    }
  }
  const text = String(input).trim()
  const preset = LONG_LABEL_SHORT[text]
  if (preset) return preset
  return {
    label: shortenLabel(text),
    icon: inferIcon(text),
  }
}

export function normalizeApplicationTags(inputs: ApplicationTagInput[]): NormalizedApplicationTag[] {
  return inputs.map(normalizeApplicationTag)
}
