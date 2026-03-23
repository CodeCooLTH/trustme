import * as React from 'react'
import { cn } from '@/lib/cn'
import { Loader2 } from 'lucide-react'

function Spinner({ className, size = 'default' }: { className?: string; size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = { sm: 'h-4 w-4', default: 'h-6 w-6', lg: 'h-8 w-8' }
  return <Loader2 className={cn('animate-spin text-muted-foreground', sizeClasses[size], className)} />
}

function PageLoading({ text = 'กำลังโหลด...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('h-4 rounded-md bg-muted animate-pulse', className)} />
}

export { Spinner, PageLoading, SkeletonLine }
