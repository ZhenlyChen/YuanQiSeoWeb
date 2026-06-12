'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

function imageIsReady(img: HTMLImageElement | null): boolean {
  return Boolean(img?.complete && img.naturalWidth > 0)
}

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
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [logo])

  // Next.js may preload the logo before hydration; onLoad won't fire for cached images.
  useEffect(() => {
    if (imageIsReady(imgRef.current)) {
      setLoaded(true)
    }
  }, [logo])

  const handleImgRef = (node: HTMLImageElement | null) => {
    imgRef.current = node
    if (imageIsReady(node)) {
      setLoaded(true)
    }
  }

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
        ref={handleImgRef}
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
