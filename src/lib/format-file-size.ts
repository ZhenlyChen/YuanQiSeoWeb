/** Human-readable file size (matches PartGenie webapp display). */
export function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) {
    const kb = size / 1024
    return Number.isInteger(kb) ? `${kb} KB` : `${Math.round(kb)} KB`
  }
  const mb = size / (1024 * 1024)
  return Number.isInteger(mb) ? `${mb} MB` : `${mb.toFixed(1)} MB`
}
