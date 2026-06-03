import { cn } from '@/lib/cn'

type UIInputProps = {
  id: string
  name: string
  placeholder?: string
  className?: string
  type?: 'search' | 'text'
}

export function UIInput({ id, name, placeholder, className, type = 'text' }: UIInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={cn('ui-input', className)}
    />
  )
}
