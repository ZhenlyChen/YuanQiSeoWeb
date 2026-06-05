import { APP_ORIGIN } from '@/lib/tool-urls'

export type SeoNavUser = {
  nickname: string
  avatar: string
  initial: string
}

type ApiResponse<T> = { code: number; data: T; msg: string }

type UserCurrentDto = {
  nickname?: string
  avatar?: string
}

export function getPublicApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_YUANQI_API_BASE?.trim()
  if (configured) {
    return configured.replace(/\/?$/, '/')
  }

  if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
    return `${window.location.origin}/api/v1/`
  }

  return `${APP_ORIGIN}/api/v1/`
}

function toNavUser(user: UserCurrentDto): SeoNavUser {
  const nickname = user.nickname?.trim() || 'User'
  return {
    nickname,
    avatar: user.avatar?.trim() || '',
    initial: nickname.charAt(0).toUpperCase(),
  }
}

export async function fetchCurrentUser(): Promise<SeoNavUser | null> {
  try {
    const response = await fetch(`${getPublicApiBase()}user/current`, {
      credentials: 'include',
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const json = (await response.json()) as ApiResponse<UserCurrentDto>
    if (json.code !== 200 || !json.data) {
      return null
    }

    return toNavUser(json.data)
  } catch {
    return null
  }
}
