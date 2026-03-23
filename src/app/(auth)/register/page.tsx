'use client'
import { signIn } from 'next-auth/react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <Card>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">สมัครสมาชิก SafePay</h1>
        <p className="mt-2 text-gray-500">เลือกประเภทบัญชีของคุณ</p>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
          className="w-full rounded-xl border-2 border-gray-200 p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <div className="font-semibold text-gray-900">🛒 ผู้ซื้อ (Buyer)</div>
          <p className="mt-1 text-sm text-gray-500">ซื้อสินค้าอย่างปลอดภัยผ่านระบบ Escrow</p>
        </button>

        <button
          onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
          className="w-full rounded-xl border-2 border-gray-200 p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <div className="font-semibold text-gray-900">🏪 ผู้ขาย (Seller)</div>
          <p className="mt-1 text-sm text-gray-500">ขายสินค้าพร้อมระบบค้ำประกัน</p>
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        มีบัญชีอยู่แล้ว? <Link href="/login" className="text-blue-600 hover:underline">เข้าสู่ระบบ</Link>
      </p>
    </Card>
  )
}
