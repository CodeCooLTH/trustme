'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Shield, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SellerLoginPage() {
  return (
    <div className="space-y-8">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <Shield className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">SafePay</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">เข้าสู่ระบบผู้ขาย</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          จัดการดีลและออเดอร์ของคุณ
        </p>
      </div>

      {/* Facebook Login */}
      <div className="space-y-3">
        <Button
          onClick={() => signIn('facebook', { callbackUrl: '/seller/dashboard' })}
          className="w-full bg-[#1877F2] hover:bg-[#166FE5] h-12 text-base"
          size="lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          เข้าสู่ระบบด้วย Facebook
        </Button>

        {/* Dev Login */}
        {process.env.NODE_ENV === 'development' && (
          <Button
            variant="outline"
            onClick={() => signIn('credentials', { facebookId: 'demo-seller', callbackUrl: '/seller/dashboard' })}
            className="w-full h-10 text-sm"
          >
            Dev Login (demo-seller)
          </Button>
        )}
      </div>

      {/* Trust indicators */}
      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-3">
          <Lock className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">ข้อมูลของคุณถูกเข้ารหัสและปลอดภัย เราไม่เก็บรหัสผ่าน Facebook ของคุณ</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">ระบบ Escrow ค้ำประกันทุกธุรกรรม เงินจะถูกพักไว้จนกว่าผู้ซื้อจะยืนยันรับสินค้า</p>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-border pt-6 space-y-3">
        <p className="text-sm text-center text-muted-foreground">
          กลับไปที่{' '}
          <Link href="http://safepay.local" className="text-primary font-medium hover:underline">
            safepay.local
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          การเข้าสู่ระบบถือว่าคุณยอมรับ{' '}
          <span className="text-primary cursor-pointer hover:underline">เงื่อนไขการใช้งาน</span>
          {' '}และ{' '}
          <span className="text-primary cursor-pointer hover:underline">นโยบายความเป็นส่วนตัว</span>
        </p>
      </div>
    </div>
  )
}
