import { cn } from '@/lib/cn'

type UIBadgeTone = 'neutral' | 'success' | 'info' | 'warning' | 'danger'

type UIBadgeProps = {
  children: React.ReactNode
  tone?: UIBadgeTone
  className?: string
}

export function UIBadge({ children, tone = 'neutral', className }: UIBadgeProps) {
  return <span className={cn('ui-badge', `ui-badge--${tone}`, className)}>{children}</span>
}
