'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/cn'
import { Bell, LogOut, User } from 'lucide-react'

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between h-14 px-4 lg:px-6 border-b border-border bg-card shrink-0">
      <div className="lg:hidden">
        <Link href="/" className="text-lg font-bold text-primary">SafePay</Link>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <Link
          href="/notifications"
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Bell className="h-4 w-4" />
        </Link>
        {session?.user?.name && (
          <div className="flex items-center gap-2 px-2 py-1 rounded-md text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{session.user.name}</span>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-destructive transition-colors"
          title="ออกจากระบบ"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
