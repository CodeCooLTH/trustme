'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Shield, Lock, CheckCircle } from 'lucide-react'

const avatars = [
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', alt: 'ผู้ใช้งาน' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', alt: 'ผู้ใช้งาน' },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', alt: 'ผู้ใช้งาน' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', alt: 'ผู้ใช้งาน' },
]

export default function LoginPage() {
  return (
    <div className="space-y-8">
      {/* Logo — mobile only */}
      <div className="lg:hidden flex items-center justify-center gap-2">
        <Shield className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">SafePay</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">เข้าสู่ระบบ</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          เข้าสู่ระบบเพื่อติดตามและจัดการออเดอร์ของคุณ
        </p>
      </div>

      {/* Facebook Login */}
      <div className="space-y-3">
        <Button
          onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
          className="w-full bg-[#1877F2] hover:bg-[#166FE5] h-12 text-base"
          size="lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          เข้าสู่ระบบด้วย Facebook
        </Button>

        {/* Dev login — development only */}
        {process.env.NODE_ENV === 'development' && (
          <Button
            onClick={() => signIn('credentials', { username: 'demo-buyer', password: 'demo', callbackUrl: '/dashboard' })}
            variant="outline"
            className="w-full h-12 text-base"
            size="lg"
          >
            Dev: เข้าสู่ระบบเป็น demo-buyer
          </Button>
        )}
      </div>

      {/* Trust badge strip */}
      <div className="flex items-center justify-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5 text-green-700" />
          <span className="text-xs text-green-700 font-medium">SafePay คุ้มครอง</span>
        </div>
        <div className="h-3.5 w-px bg-green-200" />
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-green-700" />
          <span className="text-xs text-green-700 font-medium">ข้อมูลเข้ารหัส</span>
        </div>
      </div>

      {/* Avatar stack + social proof */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex -space-x-2">
          {avatars.map((avatar, i) => (
            <Image
              key={i}
              src={avatar.src}
              alt={avatar.alt}
              width={28}
              height={28}
              className="rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          ผู้ใช้ <span className="font-semibold text-foreground">10,000+</span> คนไว้วางใจ
        </p>
      </div>

      {/* Trust indicators */}
      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-3">
          <Lock className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">ข้อมูลของคุณถูกเข้ารหัสและปลอดภัย เราไม่เก็บรหัสผ่าน Facebook ของคุณ</p>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">SafePay ค้ำประกันทุกธุรกรรม เงินจะถูกพักไว้จนกว่าคุณจะได้รับสินค้า</p>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-border pt-6 space-y-3">
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
