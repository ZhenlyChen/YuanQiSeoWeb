export type SubscribeNewsletterResult = {
  ok: boolean
  message: string
}

type ApiResponse<T> = { code: number; data: T; msg: string }

export async function subscribeNewsletter(
  email: string,
  options?: { locale?: string; pageUrl?: string },
): Promise<SubscribeNewsletterResult> {
  const response = await fetch('/api/v1/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      source: 'seo_footer',
      locale: options?.locale ?? 'en',
      pageUrl: options?.pageUrl ?? (typeof window !== 'undefined' ? window.location.href : ''),
      company: '',
    }),
  })

  const json = (await response.json().catch(() => null)) as ApiResponse<SubscribeNewsletterResult> | null

  if (!json || json.code !== 200 || !json.data?.ok) {
    if (json?.msg === 'invalid_email') {
      throw new Error('Please enter a valid email address.')
    }
    throw new Error('Subscription failed. Please try again later.')
  }

  return json.data
}
