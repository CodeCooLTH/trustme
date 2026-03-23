'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/cn'
import { PanelLeftClose, PanelLeft, Bell, LogOut, User, ChevronUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  badge?: number
}

interface SidebarProps {
  items: NavItem[]
  title: string
}

export function Sidebar({ items, title }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  const userName = session?.user?.name || 'ผู้ใช้'

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border transition-all duration-200 z-30',
        collapsed ? 'lg:w-16' : 'lg:w-60'
      )}>
        {/* Header */}
        <div className="flex items-center h-12 px-4 border-b border-border shrink-0">
          {!collapsed && (
            <Link href="/" className="text-base font-bold text-primary truncate">{title}</Link>
          )}
          <div className="flex-1" />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer: User menu */}
        <div className="border-t border-border shrink-0 relative">
          {/* User menu popup */}
          {userMenuOpen && !collapsed && (
            <div className="absolute bottom-full left-2 right-2 mb-1 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
              <Link
                href="/seller/notifications"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <Bell className="h-4 w-4" />
                แจ้งเตือน
              </Link>
              <Link
                href="/seller/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                ตั้งค่าโปรไฟล์
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" />
                ออกจากระบบ
              </button>
            </div>
          )}

          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={cn(
              'w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors',
              collapsed && 'justify-center'
            )}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
              {userName.charAt(0)}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                  <p className="text-[11px] text-muted-foreground">ผู้ขาย</p>
                </div>
                <ChevronUp className={cn('h-4 w-4 text-muted-foreground transition-transform', userMenuOpen && 'rotate-180')} />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-card border-t border-border z-40">
        <div className="flex justify-around py-1.5">
          {items.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1 text-xs rounded-md transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
