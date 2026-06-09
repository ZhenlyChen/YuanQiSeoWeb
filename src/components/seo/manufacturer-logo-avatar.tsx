'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

export function ManufacturerLogoAvatar({
  logo,
  monogram,
  alt = '',
  imgClassName,
  monogramClassName,
}: {
  logo?: string
  monogram: string
  alt?: string
  imgClassName?: string
  monogramClassName?: string
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [logo])

  const monogramNode = (
    <span className={cn(monogramClassName)} aria-hidden={alt ? true : undefined}>
      {monogram}
    </span>
  )

  if (!logo || failed) {
    return monogramNode
  }

  return (
    <span className="seo-mfg-logo-avatar">
      <span
        className={cn(monogramClassName, loaded && 'seo-mfg-logo-avatar__layer--hidden')}
        aria-hidden={loaded || alt ? true : undefined}
      >
        {monogram}
      </span>
      <img
        src={logo}
        alt={alt}
        className={cn(imgClassName, !loaded && 'seo-mfg-logo-avatar__layer--hidden')}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </span>
  )
}
