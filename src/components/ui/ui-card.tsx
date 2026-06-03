import { cn } from '@/lib/cn'

type UICardProps = {
  children: React.ReactNode
  className?: string
  tone?: 'default' | 'subtle'
}

export function UICard({ children, className, tone = 'default' }: UICardProps) {
  return <div className={cn('ui-card', tone === 'subtle' && 'ui-card--subtle', className)}>{children}</div>
}
