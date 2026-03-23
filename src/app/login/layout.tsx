'use client'
import Image from 'next/image'
import { Shield, ShieldCheck, Lock, Landmark, CreditCard, LockKeyhole, CircleCheckBig } from 'lucide-react'
import { TestimonialSlider } from '@/components/auth/TestimonialSlider'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — branding + testimonials */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex-col justify-between p-10 xl:p-12 shrink-0 relative overflow-hidden">
        {/* Hero background image */}
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
          alt=""
          fill
          sizes="540px"
          className="object-cover opacity-12 pointer-events-none"
          priority
        />

        <div className="relative z-10 h-14 flex items-center">
          <div className="flex items-center gap-2.5">
            <Shield className="h-7 w-7" />
            <span className="text-xl font-bold tracking-tight">SafePay</span>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div>
            <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
              ซื้อขายออนไลน์<br />
              อย่างปลอดภัย<br />
              <span className="text-blue-200">ด้วย SafePay</span>
            </h1>
            <p className="text-blue-100 mt-4 max-w-sm leading-relaxed">
              ระบบตัวกลางพักเงินที่ได้รับความไว้วางใจ ผู้ซื้อมั่นใจว่าได้ของ ผู้ขายมั่นใจว่าได้เงิน
            </p>
          </div>

          {/* SafePay Flow Card */}
          <div className="bg-white/8 border border-white/12 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-4">
              SafePay ปกป้องเงินคุณอย่างไร
            </p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 text-center">
                <div className="w-11 h-11 bg-green-400/15 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="h-5 w-5 text-green-300" />
                </div>
                <p className="text-xs font-semibold">ผู้ซื้อชำระเงิน</p>
              </div>
              <span className="text-blue-300 text-lg shrink-0">→</span>
              <div className="flex-1 text-center">
                <div className="w-11 h-11 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <LockKeyhole className="h-5 w-5 text-blue-200" />
                </div>
                <p className="text-xs font-semibold">SafePay ล็อคเงิน</p>
              </div>
              <span className="text-blue-300 text-lg shrink-0">→</span>
              <div className="flex-1 text-center">
                <div className="w-11 h-11 bg-green-400/15 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CircleCheckBig className="h-5 w-5 text-green-300" />
                </div>
                <p className="text-xs font-semibold">ได้ของ → ปล่อยเงิน</p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-2">
                <ShieldCheck className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">เงินปลอดภัย</p>
                <p className="text-xs text-blue-200">พักไว้จนกว่าได้ของ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-2">
                <Lock className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">ข้อมูลเข้ารหัส</p>
                <p className="text-xs text-blue-200">ปลอดภัย 100%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-2">
                <Landmark className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">โอนผ่านแบงค์</p>
                <p className="text-xs text-blue-200">THB เท่านั้น</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="border-t border-blue-500/30 pt-8">
            <TestimonialSlider />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 text-sm relative z-10">
          <div>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-blue-300 text-xs">ปลอดภัย</p>
          </div>
          <div className="h-8 w-px bg-blue-500/30" />
          <div>
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-blue-300 text-xs">ติดตามได้</p>
          </div>
          <div className="h-8 w-px bg-blue-500/30" />
          <div>
            <p className="text-2xl font-bold">0฿</p>
            <p className="text-blue-300 text-xs">ค่าธรรมเนียม</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
