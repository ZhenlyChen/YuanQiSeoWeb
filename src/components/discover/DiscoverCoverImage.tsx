'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

type LoadState = 'loading' | 'loaded' | 'error'

function resolveImageState(img: HTMLImageElement | null): LoadState | null {
  if (!img?.complete) return null
  return img.naturalWidth > 0 ? 'loaded' : 'error'
}

function CoverSkeleton({ className }: { className?: string }) {
  return <div className={clsx('discover-cover-skeleton absolute inset-0', className)} aria-hidden />
}

export function DiscoverCoverImage({ src, className }: { src?: string; className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [state, setState] = useState<LoadState>(src ? 'loading' : 'error')

  useEffect(() => {
    if (!src) {
      setState('error')
      return
    }
    setState('loading')
    const resolved = resolveImageState(imgRef.current)
    if (resolved) setState(resolved)
  }, [src])

  const setImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node
      if (!node || !src) return
      const resolved = resolveImageState(node)
      if (resolved) setState(resolved)
    },
    [src],
  )

  const showSkeleton = state === 'loading'

  return (
    <div className={clsx('group/cover relative overflow-hidden bg-[#F2F4F7]', className)}>
      {showSkeleton && <CoverSkeleton />}
      {src && state !== 'error' && (
        <img
          ref={setImgRef}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={clsx(
            'h-full w-full origin-center object-cover transition-[opacity_200ms_ease,transform_600ms_ease-in-out]',
            state === 'loaded'
              ? 'opacity-100 group-hover/cover:scale-[1.03]'
              : 'absolute inset-0 opacity-0',
          )}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}
    </div>
  )
}
