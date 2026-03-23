'use client'
import * as React from 'react'
import { cn } from '@/lib/cn'

interface HeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function Header({ title, description, actions, className }: HeaderProps) {
  return (
    <div className={cn('flex items-center justify-between h-14 px-4 lg:px-6 border-b border-border bg-card shrink-0', className)}>
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
        {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0 ml-4">{actions}</div>}
    </div>
  )
}
