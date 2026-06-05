import type { ButtonHTMLAttributes, ReactNode } from 'react'

type SeoPrimaryCtaProps = {
  children: ReactNode
  className?: string
  block?: boolean
}

function ctaClassName(className?: string, block?: boolean) {
  return ['seo-primary-cta', block ? 'seo-primary-cta--block' : null, className]
    .filter(Boolean)
    .join(' ')
}

export function SeoPrimaryCtaLink({
  href,
  children,
  className,
  block,
  target,
  rel,
}: SeoPrimaryCtaProps & {
  href: string
  target?: string
  rel?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={ctaClassName(className, block)}
    >
      {children}
    </a>
  )
}

export function SeoPrimaryCtaButton({
  children,
  className,
  block,
  type = 'button',
  ...props
}: SeoPrimaryCtaProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={ctaClassName(className, block)} {...props}>
      {children}
    </button>
  )
}
