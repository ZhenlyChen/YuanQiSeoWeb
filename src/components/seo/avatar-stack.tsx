const DEFAULT_AVATARS = [
  '/seo/avatar-stack/1.jpg',
  '/seo/avatar-stack/2.jpg',
  '/seo/avatar-stack/3.jpg',
] as const

type AvatarStackProps = {
  /** Diameter in px (Figma: 24). */
  size?: number
  className?: string
  avatars?: readonly string[]
}

export function AvatarStack({
  size = 24,
  className = '',
  avatars = DEFAULT_AVATARS,
}: AvatarStackProps) {
  const rootClass = ['seo-avatar-stack', className].filter(Boolean).join(' ')

  return (
    <div
      className={rootClass}
      role="img"
      aria-label="PartGenie sourcing experts"
      style={{ ['--seo-avatar-size' as string]: `${size}px` }}
    >
      {avatars.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          className="seo-avatar-stack__item"
          style={{ zIndex: index + 1 }}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  )
}
