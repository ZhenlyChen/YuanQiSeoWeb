'use client'

import { useState } from 'react'
import { partImageForMpn, resolvePartImageUrl } from '@/lib/part-images'

export function ComponentChipThumb({ imageUrl, mpn }: { imageUrl?: string; mpn: string }) {
  const [failed, setFailed] = useState(false)
  const src = failed ? partImageForMpn(mpn) : resolvePartImageUrl(mpn, imageUrl ? [imageUrl] : undefined)

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border-[1px] border-solid border-[#E4E7EC] bg-white p-0.5">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </span>
  )
}
