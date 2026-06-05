'use client'

import { useEffect, useState } from 'react'
import { fetchCurrentUser, type SeoNavUser } from '@/lib/auth-api'

export function useSeoNavUser() {
  const [user, setUser] = useState<SeoNavUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetchCurrentUser()
      .then((nextUser) => {
        if (!cancelled) {
          setUser(nextUser)
          setIsReady(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null)
          setIsReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    user,
    isLoggedIn: Boolean(user),
    isReady,
  }
}
