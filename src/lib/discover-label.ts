export function formatDiscoverCategoryLabel(label?: string | null): string {
  const trimmed = (label ?? '').trim()
  if (!trimmed) return ''
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}
