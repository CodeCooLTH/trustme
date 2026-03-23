'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'คุณวิภา',
    role: 'ผู้ซื้อ',
    text: 'เคยโดนโกงจากการซื้อของออนไลน์ ตั้งแต่ใช้ SafePay ไม่ต้องกังวลอีกเลย เงินถูกพักไว้จนกว่าจะได้ของจริง',
    rating: 5,
  },
  {
    name: 'คุณธนพล',
    role: 'ผู้ขาย',
    text: 'ลูกค้าไว้ใจมากขึ้น ยอดขายเพิ่มขึ้น 40% หลังจากใช้ SafePay เป็นตัวกลาง ระบบใช้ง่ายมาก',
    rating: 5,
  },
  {
    name: 'คุณสมศรี',
    role: 'ผู้ซื้อ',
    text: 'ซื้อมือถือมือสองราคาหลักหมื่น เมื่อก่อนไม่กล้าโอนเลย แต่มี SafePay ค้ำประกัน สบายใจมาก',
    rating: 5,
  },
  {
    name: 'คุณภาคิน',
    role: 'ผู้ขาย',
    text: 'ส่งลิงก์ SafePay ให้ลูกค้า ลูกค้าเห็นว่ามีระบบ Escrow ก็ตัดสินใจซื้อทันที ปิดการขายได้เร็วขึ้น',
    rating: 5,
  },
]

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[current]

  return (
    <div className="relative">
      <Quote className="h-8 w-8 text-blue-400/30 mb-4" />

      <div className="min-h-[120px] transition-all duration-500">
        <p className="text-blue-50 text-base leading-relaxed">
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500/30 border border-blue-400/30 flex items-center justify-center text-sm font-bold">
            {t.name.charAt(3)}
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{t.name}</p>
            <p className="text-blue-200 text-xs">{t.role}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === current ? 'w-6 bg-white' : 'w-1.5 bg-blue-400/40'
            )}
          />
        ))}
      </div>
    </div>
  )
}
