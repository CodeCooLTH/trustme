'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export function Topbar({ userName }: { userName?: string }) {
  const { data: session } = useSession()
  const displayName = userName || session?.user?.name

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-8">
      <div className="lg:hidden">
        <Link href="/" className="text-lg font-bold text-blue-600">SafePay</Link>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <Link href="/notifications" className="relative text-gray-500 hover:text-gray-700">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Link>
        {displayName && (
          <span className="text-sm text-gray-700">{displayName}</span>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          ออกจากระบบ
        </button>
      </div>
    </header>
  )
}
