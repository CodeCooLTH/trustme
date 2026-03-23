'use client'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function PublicDealLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top bar — thin, like e-commerce */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[640px] mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <Shield className="h-5 w-5 text-[#ee4d2d]" />
            <span className="text-base font-bold text-gray-900">SafePay</span>
          </Link>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Shield className="h-3 w-3 text-green-500" />
            <span>Escrow Protected</span>
          </div>
        </div>
      </header>
      <main className="max-w-[640px] mx-auto">
        {children}
      </main>
    </div>
  )
}
