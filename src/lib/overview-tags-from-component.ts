function stringField(source: Record<string, unknown> | undefined, key: string): string {
  const value = source?.[key]
  return typeof value === 'string' ? value.trim() : ''
}

function isKeyAttribute(value: unknown): boolean {
  return value === 1 || value === '1' || value === true
}

function manufacturerName(component: Record<string, unknown>): string {
  const mfg = component.manufacturer_info
  if (mfg && typeof mfg === 'object' && !Array.isArray(mfg)) {
    const info = mfg as Record<string, unknown>
    return stringField(info, 'name_en') || stringField(info, 'name')
  }
  return ''
}

function categoryChipLabel(category: string): string {
  const parts = category
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  return parts[parts.length - 1] ?? category
}

function attributeChip(attr: Record<string, unknown>): string {
  const name = stringField(attr, 'name')
  const value = stringField(attr, 'value')
  if (!value) return ''
  if (!name || value.toLowerCase().includes(name.toLowerCase())) return value
  return `${name}: ${value}`
}

/** Build header chips from basic-enrich ES document fields (package, mfg, category, key attributes). */
export function buildOverviewTagsFromEsComponent(component: Record<string, unknown>): string[] {
  const tags: string[] = []
  const seen = new Set<string>()

  const push = (tag: string) => {
    const normalized = tag.trim()
    if (!normalized) return
    const key = normalized.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    tags.push(normalized)
  }

  const packageName = stringField(component, 'package')
  if (packageName) push(`Package: ${packageName}`)

  const manufacturer = manufacturerName(component)
  if (manufacturer) push(manufacturer)

  const category = stringField(component, 'category_str') || stringField(component, 'category')
  if (category) push(categoryChipLabel(category))

  const attributes = component.attributes
  if (Array.isArray(attributes)) {
    for (const item of attributes) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue
      const attr = item as Record<string, unknown>
      if (!isKeyAttribute(attr.is_key)) continue
      push(attributeChip(attr))
      if (tags.length >= 8) break
    }
  }

  return tags.slice(0, 8)
}
