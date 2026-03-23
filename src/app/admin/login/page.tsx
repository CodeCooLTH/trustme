'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Shield, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">SafePay Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">เข้าสู่ระบบจัดการ</p>
        </div>

        <Button
          onClick={() => signIn('facebook', { callbackUrl: '/admin/dashboard' })}
          className="w-full h-12 text-base bg-[#1877F2] hover:bg-[#166FE5]"
          size="lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          เข้าสู่ระบบ
        </Button>

        {/* Dev login */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-center text-muted-foreground mb-3">Dev Login</p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn('dev-login', { facebookId: 'admin-system', callbackUrl: '/admin/dashboard' })}
          >
            <Lock className="h-4 w-4 mr-2" />
            Admin (dev)
          </Button>
        </div>
      </div>
    </div>
  )
}
