'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Shield, ShieldCheck, Lock, User, Truck, CreditCard,
  Camera, Star, Clock, Package, MessageSquare,
  AlertTriangle, CheckCircle, Copy, Share2, ChevronRight,
  MapPin, Phone, Store, ArrowRight, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/cn'

/* ── Mock Data ── */
const mockPublicOrders: Record<string, any> = {
  'abc-def-1234': {
    productName: 'iPhone 15 Pro Max 256GB',
    description: 'สีไทเทเนียม สภาพ 99% ครบกล่อง อุปกรณ์แท้ทุกชิ้น ไม่มีรอยตก ใช้งานปกติทุกอย่าง Face ID ปกติ แบตเตอรี่ 96%',
    price: 35000, status: 'PAYMENT_RECEIVED',
    category: 'สมาร์ทโฟน',
    condition: 'มือสอง สภาพ 99%',
    warranty: 'ประกันศูนย์เหลือ 6 เดือน',
    includes: ['ตัวเครื่อง', 'กล่อง', 'สาย USB-C', 'เคส', 'ฟิล์มกระจก'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, rating: 4.8, reviews: 28, joinedAt: '2025-06-15' },
    shippingMethod: 'Kerry Express',
    bankAccount: { bank: 'กสิกรไทย', accountNo: '012-345-6789', accountName: 'บจก. เซฟเพย์' },
    buyer: { name: 'สมหญิง ซื้อเก่ง' },
    payment: { status: 'APPROVED', amount: 35000, verifiedAt: '2026-03-22T12:00:00Z' },
    shipment: null,
    createdAt: '2026-03-22T10:00:00Z',
  },
  'ghi-jkl-5678': {
    productName: 'MacBook Air M3 15"',
    description: 'RAM 16GB SSD 512GB สี Midnight ใช้งาน 3 เดือน สภาพ 98% ไม่มีรอย ประกันเหลือ 9 เดือน',
    price: 42000, status: 'SHIPPING',
    category: 'โน้ตบุ๊ก',
    condition: 'มือสอง สภาพ 98%',
    warranty: 'ประกันเหลือ 9 เดือน',
    includes: ['เครื่อง', 'กล่อง', 'สายชาร์จ', 'Adapter 35W'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, rating: 4.8, reviews: 28, joinedAt: '2025-06-15' },
    shippingMethod: 'Flash Express',
    buyer: { name: 'วิภา รักช้อป' },
    payment: { status: 'APPROVED', amount: 42000, verifiedAt: '2026-03-21T16:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'TH123456789', status: 'IN_TRANSIT', shippedAt: '2026-03-22T09:00:00Z' },
    createdAt: '2026-03-21T14:30:00Z',
  },
  'mno-pqr-9012': {
    productName: 'AirPods Pro 2 (USB-C)',
    description: 'ของใหม่ ยังไม่แกะซีล ประกันศูนย์ Apple 1 ปีเต็ม ซื้อจาก iStudio',
    price: 7500, status: 'COMPLETED',
    category: 'หูฟัง',
    condition: 'ใหม่ ไม่แกะซีล',
    warranty: 'ประกันศูนย์ 1 ปี',
    includes: ['ตัวหูฟัง', 'เคสชาร์จ', 'หูซิลิโคน 3 ขนาด', 'สาย USB-C'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, rating: 4.8, reviews: 28, joinedAt: '2025-06-15' },
    shippingMethod: 'ไปรษณีย์ไทย',
    buyer: { name: 'ธนพล นักสะสม' },
    payment: { status: 'APPROVED', amount: 7500, verifiedAt: '2026-03-20T10:00:00Z' },
    shipment: { provider: 'ไปรษณีย์ไทย', trackingNo: 'EF987654321TH', status: 'DELIVERED', shippedAt: '2026-03-20T14:00:00Z', deliveredAt: '2026-03-21T10:00:00Z' },
    createdAt: '2026-03-20T09:15:00Z', completedAt: '2026-03-21T15:00:00Z',
  },
  'stu-vwx-3456': {
    productName: 'iPad Air 6 128GB WiFi',
    description: 'สี Starlight ใหม่แกะกล่อง ประกันศูนย์ 1 ปี ซื้อจาก Apple Store ยังไม่ลงทะเบียน Apple ID',
    price: 22900, status: 'PENDING_PAYMENT',
    category: 'แท็บเล็ต',
    condition: 'ใหม่แกะกล่อง',
    warranty: 'ประกันศูนย์ 1 ปี',
    includes: ['ตัวเครื่อง', 'สาย USB-C', 'Adapter', 'ใบเสร็จ Apple Store'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, rating: 4.8, reviews: 28, joinedAt: '2025-06-15' },
    shippingMethod: 'Kerry Express',
    bankAccount: { bank: 'กสิกรไทย', accountNo: '012-345-6789', accountName: 'บจก. เซฟเพย์' },
    buyer: null, payment: null, shipment: null,
    createdAt: '2026-03-23T08:00:00Z',
  },
  'yza-bcd-7890': {
    productName: 'Apple Watch Ultra 2',
    description: 'สภาพ 95% สาย Alpine Loop + สาย Trail Loop + สาย Ocean Band กล่องครบ ประกันเหลือ 5 เดือน',
    price: 28900, status: 'DELIVERED',
    category: 'สมาร์ทวอทช์',
    condition: 'มือสอง สภาพ 95%',
    warranty: 'ประกันเหลือ 5 เดือน',
    includes: ['ตัวเครื่อง', 'สาย 3 เส้น', 'กล่อง', 'สายชาร์จ'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, rating: 4.8, reviews: 28, joinedAt: '2025-06-15' },
    shippingMethod: 'J&T Express',
    buyer: { name: 'ภาคิน สายเทค' },
    payment: { status: 'APPROVED', amount: 28900, verifiedAt: '2026-03-19T18:00:00Z' },
    shipment: { provider: 'J&T Express', trackingNo: 'JT001122334455', status: 'DELIVERED', shippedAt: '2026-03-20T08:00:00Z', deliveredAt: '2026-03-21T14:00:00Z' },
    confirmDeadline: '2026-03-24T14:00:00Z',
    createdAt: '2026-03-19T16:45:00Z',
  },
  'efg-hij-1122': {
    productName: 'Samsung Galaxy S24 Ultra',
    description: 'สี Titanium Gray 256GB ประกันเหลือ 8 เดือน มีรอยการใช้งานนิดหน่อย หน้าจอไม่มีรอย',
    price: 32000, status: 'DISPUTE',
    category: 'สมาร์ทโฟน',
    condition: 'มือสอง สภาพ 90%',
    warranty: 'ประกันเหลือ 8 เดือน',
    includes: ['ตัวเครื่อง', 'เคส Spigen', 'ฟิล์ม', 'สายชาร์จ'],
    seller: { name: 'สมชาย ขายดี', slug: 'somchai-shop', points: 45, deals: 12, successRate: 94, rating: 4.8, reviews: 28, joinedAt: '2025-06-15' },
    shippingMethod: 'Flash Express',
    buyer: { name: 'สมศรี มีปัญหา' },
    payment: { status: 'APPROVED', amount: 32000, verifiedAt: '2026-03-18T13:00:00Z' },
    shipment: { provider: 'Flash Express', trackingNo: 'FL998877665544', status: 'DELIVERED' },
    dispute: { reason: 'สินค้าไม่ตรงตามที่โพสต์ มีรอยขีดข่วนมากกว่าที่บอก', status: 'OPEN', createdAt: '2026-03-19T14:00:00Z' },
    createdAt: '2026-03-18T11:20:00Z',
  },
}

/* ── Status Steps ── */
const statusSteps = [
  { key: 'PENDING_PAYMENT', label: 'รอชำระ', icon: CreditCard },
  { key: 'PAYMENT_RECEIVED', label: 'ชำระแล้ว', icon: CheckCircle },
  { key: 'SHIPPING', label: 'จัดส่ง', icon: Truck },
  { key: 'DELIVERED', label: 'ส่งถึง', icon: Package },
  { key: 'COMPLETED', label: 'สำเร็จ', icon: Sparkles },
]

const statusOrder: Record<string, number> = {}
statusSteps.forEach((s, i) => { statusOrder[s.key] = i })

/* ── Color map ── */
const productColors: Record<string, string> = {
  'สมาร์ทโฟน': 'from-blue-400 to-indigo-500',
  'โน้ตบุ๊ก': 'from-gray-600 to-gray-800',
  'หูฟัง': 'from-purple-400 to-pink-500',
  'แท็บเล็ต': 'from-sky-400 to-cyan-500',
  'สมาร์ทวอทช์': 'from-orange-400 to-red-500',
}

export default function PublicDealPage() {
  const params = useParams()
  const token = params.token as string
  const sellerSlug = params.sellerSlug as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)

  useEffect(() => {
    fetch(`/api/orders/${token}`)
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.productName) setOrder(res.data)
        else setOrder(mockPublicOrders[token] || null)
      })
      .catch(() => setOrder(mockPublicOrders[token] || null))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="h-8 w-8 border-3 border-gray-200 border-t-[#ee4d2d] rounded-full animate-spin" />
    </div>
  )

  if (!order) return (
    <div className="text-center py-20 px-4">
      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-800">ไม่พบสินค้า</h2>
      <p className="text-sm text-gray-500 mt-1">ลิงก์อาจหมดอายุหรือไม่ถูกต้อง</p>
    </div>
  )

  const isPending = order.status === 'PENDING_PAYMENT'
  const seller = order.seller || { name: sellerSlug, points: 0 }
  const currentStep = statusOrder[order.status] ?? -1
  const isTerminal = ['DISPUTE', 'CANCELLED', 'REFUNDED', 'RELEASED'].includes(order.status)
  const gradient = productColors[order.category] || 'from-gray-400 to-gray-600'

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://safepay.local:3000/${sellerSlug}/deals/${token}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pb-8">

      {/* ═══ Product Hero ═══ */}
      <div className={cn('bg-gradient-to-br', gradient, 'relative overflow-hidden')}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative px-4 pt-8 pb-6">
          {/* Category tag */}
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full mb-4">
            <Package className="h-3 w-3" />
            {order.category || 'สินค้า'}
          </div>

          {/* Product image area */}
          <div className="flex justify-center py-6">
            <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
              <Package className="h-20 w-20 text-white/60" />
            </div>
          </div>

          {/* Price */}
          <div className="text-center">
            <p className="text-white/70 text-sm">ราคา</p>
            <p className="text-white text-4xl font-bold mt-0.5">฿{Number(order.price).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ═══ Product Info — white card overlapping hero ═══ */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4">
            <h1 className="text-lg font-bold text-gray-900 leading-snug">{order.productName}</h1>

            <div className="flex flex-wrap gap-2 mt-2.5">
              {order.condition && (
                <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium">{order.condition}</span>
              )}
              {order.warranty && (
                <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-md font-medium">{order.warranty}</span>
              )}
              <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium flex items-center gap-0.5">
                <Truck className="h-3 w-3" /> {order.shippingMethod}
              </span>
            </div>

            {/* Description */}
            <p className={cn('text-sm text-gray-600 mt-3 leading-relaxed', !showFullDesc && 'line-clamp-2')}>
              {order.description}
            </p>
            {order.description.length > 80 && (
              <button onClick={() => setShowFullDesc(!showFullDesc)} className="text-[#ee4d2d] text-xs font-medium mt-1">
                {showFullDesc ? 'ย่อ' : 'อ่านเพิ่มเติม'}
              </button>
            )}

            {/* Includes */}
            {order.includes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-1.5">สิ่งที่ได้รับ</p>
                <div className="flex flex-wrap gap-1.5">
                  {order.includes.map((item: string) => (
                    <span key={item} className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Escrow badge */}
          <div className="px-4 py-2.5 bg-green-50 border-t border-green-100 flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-green-800">SafePay Escrow ค้ำประกัน</span>
              <span className="text-[11px] text-green-600 ml-1">— เงินปลอดภัยจนกว่าจะได้รับสินค้า</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Progress Stepper ═══ */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, idx) => {
              const Icon = step.icon
              const done = idx <= currentStep && !isTerminal
              const active = idx === currentStep && !isTerminal
              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'h-9 w-9 rounded-full flex items-center justify-center transition-all',
                      done ? 'bg-[#ee4d2d] text-white shadow-md shadow-[#ee4d2d]/30' :
                      'bg-gray-100 text-gray-400'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className={cn(
                      'text-[10px] mt-1.5 font-medium text-center',
                      done ? 'text-[#ee4d2d]' : 'text-gray-400'
                    )}>
                      {step.label}
                    </span>
                  </div>
                  {idx < statusSteps.length - 1 && (
                    <div className={cn(
                      'flex-1 h-0.5 mx-1.5 mt-[-14px] rounded-full',
                      idx < currentStep && !isTerminal ? 'bg-[#ee4d2d]' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              )
            })}
          </div>

          {isTerminal && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs font-medium text-red-600">
                {order.status === 'DISPUTE' ? 'มีข้อพิพาท — อยู่ระหว่างพิจารณา' :
                 order.status === 'REFUNDED' ? 'คืนเงินให้ผู้ซื้อแล้ว' :
                 order.status === 'RELEASED' ? 'ปล่อยเงินให้ผู้ขายแล้ว' : 'ยกเลิก'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Seller Card ═══ */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#ee4d2d] flex items-center justify-center text-white text-lg font-bold shrink-0">
              {seller.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-gray-900">{seller.name}</p>
                <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-gray-700">{seller.rating || '4.8'}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-gray-500">{seller.reviews || 0} รีวิว</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-gray-500">{seller.deals || 0} ดีล</span>
              </div>
            </div>
            <button className="text-[#ee4d2d] border border-[#ee4d2d] rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-[#ee4d2d]/5 transition-colors">
              ดูร้าน
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">{seller.successRate || 0}%</p>
              <p className="text-[10px] text-gray-400">อัตราสำเร็จ</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">{seller.points}</p>
              <p className="text-[10px] text-gray-400">คะแนน</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">&lt; 1 ชม.</p>
              <p className="text-[10px] text-gray-400">ตอบกลับ</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Payment Section (PENDING) ═══ */}
      {isPending && order.bankAccount && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#fff8f5] px-4 py-3 border-b border-[#ffd5c8]">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#ee4d2d]" />
                <span className="font-semibold text-[#ee4d2d]">ชำระเงิน</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">โอนเงินไปที่บัญชีด้านล่าง แล้วอัพโหลดสลิป</p>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">ธนาคาร</span>
                  <span className="text-sm font-semibold text-gray-900">{order.bankAccount.bank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">เลขบัญชี</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-bold text-gray-900 font-mono tracking-widest">{order.bankAccount.accountNo}</span>
                    <button onClick={() => { navigator.clipboard.writeText(order.bankAccount.accountNo) }} className="text-[#ee4d2d]">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">ชื่อบัญชี</span>
                  <span className="text-sm font-semibold text-gray-900">{order.bankAccount.accountName}</span>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-gray-200">
                  <span className="text-xs text-gray-500">ยอดโอน</span>
                  <span className="text-xl font-bold text-[#ee4d2d]">฿{Number(order.price).toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#ee4d2d] hover:bg-[#d73211] text-white rounded-xl py-3.5 font-semibold text-base flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#ee4d2d]/25 active:scale-[0.98]">
                <Camera className="h-5 w-5" />
                อัพโหลดสลิปการโอน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Payment Confirmed ═══ */}
      {order.payment?.status === 'APPROVED' && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">ชำระเงินแล้ว</p>
                <p className="text-xs text-gray-500">฿{Number(order.payment.amount).toLocaleString()} • {new Date(order.payment.verifiedAt).toLocaleString('th-TH')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Shipping ═══ */}
      {order.shipment && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#ee4d2d]" />
                <span className="font-semibold text-gray-900">ข้อมูลจัดส่ง</span>
              </div>
              <span className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                order.shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              )}>
                {order.shipment.status === 'DELIVERED' ? 'ส่งถึงแล้ว' : 'กำลังจัดส่ง'}
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">ขนส่ง</span>
                <span className="font-medium text-gray-900">{order.shipment.provider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Tracking</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-semibold text-gray-900">{order.shipment.trackingNo}</span>
                  <button onClick={() => navigator.clipboard.writeText(order.shipment.trackingNo)} className="text-[#ee4d2d]">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Action: Confirm / Dispute (DELIVERED) ═══ */}
      {order.status === 'DELIVERED' && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-gray-900">สินค้าส่งถึงแล้ว</span>
            </div>
            <p className="text-sm text-gray-600">ตรวจสอบสินค้าแล้วกดยืนยัน หรือเปิดข้อพิพาทหากมีปัญหา</p>

            {order.confirmDeadline && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span className="text-[11px] text-amber-700">ยืนยันภายใน {new Date(order.confirmDeadline).toLocaleString('th-TH')}</span>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 bg-[#ee4d2d] text-white rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-[#ee4d2d]/25 active:scale-[0.98] transition-transform">
                <CheckCircle className="h-4 w-4" /> ยืนยันรับสินค้า
              </button>
              <button className="px-4 border border-gray-300 rounded-xl py-3 text-sm text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all">
                ข้อพิพาท
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Completed ═══ */}
      {order.status === 'COMPLETED' && (
        <div className="px-4 mt-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-green-900 text-base">ดีลสำเร็จ!</p>
                <p className="text-sm text-green-700">ขอบคุณที่ใช้บริการ SafePay</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Dispute ═══ */}
      {order.dispute && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-semibold text-red-700">ข้อพิพาท</span>
              <span className="text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{order.dispute.status}</span>
            </div>
            <p className="text-sm text-gray-700">{order.dispute.reason}</p>
          </div>
        </div>
      )}

      {/* ═══ Share + Trust ═══ */}
      <div className="px-4 mt-6 space-y-3">
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 bg-white border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
          </button>
          <button className="flex-1 bg-white border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-[0.98] transition-all">
            <Share2 className="h-4 w-4" /> แชร์
          </button>
        </div>

        {/* Trust bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3">
          <div className="flex items-center justify-around text-[10px] text-gray-400">
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-green-500" />
              <span>เงินปลอดภัย</span>
            </div>
            <div className="h-3 w-px bg-gray-200" />
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-green-500" />
              <span>ยืนยันตัวตน</span>
            </div>
            <div className="h-3 w-px bg-gray-200" />
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-green-500" />
              <span>ระบบข้อพิพาท</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
