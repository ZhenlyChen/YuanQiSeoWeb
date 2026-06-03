import { cn } from '@/lib/cn'

type UIButtonVariant = 'primary' | 'secondary' | 'dark'
type UIButtonSize = 'sm' | 'md'

type UIButtonProps = {
  children: React.ReactNode
  href: string
  variant?: UIButtonVariant
  size?: UIButtonSize
  className?: string
}

export function UIButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
}: UIButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'ui-button',
        `ui-button--${variant}`,
        size === 'sm' ? 'ui-button--sm' : 'ui-button--md',
        className,
      )}
    >
      {children}
    </a>
  )
}
