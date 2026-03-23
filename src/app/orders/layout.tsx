'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Shield, LogOut, User, Package } from 'lucide-react'

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold text-foreground">SafePay</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/orders" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Package className="h-4 w-4" />
            <span>ออเดอร์ของฉัน</span>
          </Link>
          {session?.user?.name && (
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {session.user.name}
            </span>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
