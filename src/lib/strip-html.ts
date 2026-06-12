/** Strip HTML tags for feed card previews. */
export function stripHtml(raw: string): string {
  return (raw || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
