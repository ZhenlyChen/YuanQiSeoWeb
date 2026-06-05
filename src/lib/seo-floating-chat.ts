export const SEO_FLOATING_CHAT_FILL_EVENT = 'seo:floating-chat-fill'

export type SeoFloatingChatFillDetail = {
  query: string
  activate?: boolean
}

export function buildCompareChatQuery(sourceMpn: string, targetMpn: string) {
  return `Compare ${sourceMpn} & ${targetMpn}`
}

export function fillSeoFloatingChat(query: string, options?: { activate?: boolean }) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(
    new CustomEvent<SeoFloatingChatFillDetail>(SEO_FLOATING_CHAT_FILL_EVENT, {
      detail: { query, activate: options?.activate ?? true },
    }),
  )
}
