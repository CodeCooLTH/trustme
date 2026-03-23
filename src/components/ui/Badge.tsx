import * as React from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'outline' | 'secondary'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-green-600/10 text-green-700 border-green-600/20',
  warning: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  outline: 'bg-transparent text-foreground border-border',
  secondary: 'bg-secondary text-secondary-foreground border-secondary',
}

function Badge({ className, variant = 'default', children }: {
  className?: string
  variant?: BadgeVariant
  children: React.ReactNode
}) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeVariant }
