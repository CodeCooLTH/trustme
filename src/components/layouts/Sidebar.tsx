'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: string
}

export function Sidebar({ items, title }: { items: NavItem[]; title: string }) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold text-blue-600">{title}</Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          {items.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 text-xs ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
