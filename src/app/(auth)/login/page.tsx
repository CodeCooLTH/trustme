'use client'
import { signIn } from 'next-auth/react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleDevLogin = async (facebookId: string) => {
    setLoading(facebookId)
    await signIn('dev-login', {
      facebookId,
      callbackUrl: facebookId === 'admin-system' ? '/admin/dashboard' : '/dashboard',
    })
  }

  return (
    <Card>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">SafePay</h1>
        <p className="mt-2 text-gray-500">ระบบ Escrow สำหรับซื้อขายออนไลน์</p>
      </div>

      <div className="mt-8 space-y-4">
        <Button
          onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
          className="w-full bg-[#1877F2] hover:bg-[#166FE5]"
          size="lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          เข้าสู่ระบบด้วย Facebook
        </Button>
      </div>

      {/* Dev Login */}
      <div className="mt-8 border-t pt-6">
        <p className="text-center text-xs text-gray-400 mb-4">Demo Login (สำหรับทดสอบ)</p>
        <div className="space-y-2">
          <button
            onClick={() => handleDevLogin('demo-seller')}
            disabled={!!loading}
            className="w-full rounded-lg border-2 border-gray-200 p-3 text-left hover:border-green-500 hover:bg-green-50 transition-colors disabled:opacity-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900">🏪 ผู้ขาย</span>
                <span className="text-sm text-gray-500 ml-2">สมชาย ขายดี</span>
              </div>
              {loading === 'demo-seller' && <span className="text-xs text-gray-400">กำลังเข้าสู่ระบบ...</span>}
            </div>
          </button>

          <button
            onClick={() => handleDevLogin('demo-buyer')}
            disabled={!!loading}
            className="w-full rounded-lg border-2 border-gray-200 p-3 text-left hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900">🛒 ผู้ซื้อ</span>
                <span className="text-sm text-gray-500 ml-2">สมหญิง ซื้อเก่ง</span>
              </div>
              {loading === 'demo-buyer' && <span className="text-xs text-gray-400">กำลังเข้าสู่ระบบ...</span>}
            </div>
          </button>

          <button
            onClick={() => handleDevLogin('admin-system')}
            disabled={!!loading}
            className="w-full rounded-lg border-2 border-gray-200 p-3 text-left hover:border-purple-500 hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-900">🛡️ แอดมิน</span>
                <span className="text-sm text-gray-500 ml-2">System Admin</span>
              </div>
              {loading === 'admin-system' && <span className="text-xs text-gray-400">กำลังเข้าสู่ระบบ...</span>}
            </div>
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        การเข้าสู่ระบบถือว่าคุณยอมรับเงื่อนไขการใช้งาน
      </p>
    </Card>
  )
}
