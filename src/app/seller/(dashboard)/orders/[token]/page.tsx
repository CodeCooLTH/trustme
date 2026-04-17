import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getShopByUserId } from '@/services/shop.service'
import { getOrderByToken } from '@/services/order.service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import OrderActions from './components/OrderActions'
import CopyLinkButton from './components/CopyLinkButton'

export const metadata: Metadata = { title: 'รายละเอียดออเดอร์' }

const STATUS_META: Record<string, { label: string; cls: string }> = {
  CREATED: { label: 'รอยืนยัน', cls: 'bg-warning/10 text-warning' },
  CONFIRMED: { label: 'ยืนยันแล้ว', cls: 'bg-info/10 text-info' },
  SHIPPED: { label: 'จัดส่งแล้ว', cls: 'bg-primary/10 text-primary' },
  COMPLETED: { label: 'สำเร็จ', cls: 'bg-success/10 text-success' },
  CANCELLED: { label: 'ยกเลิก', cls: 'bg-danger/10 text-danger' },
}

const TYPE_META: Record<string, { label: string; icon: string; cls: string }> = {
  PHYSICAL: { label: 'สินค้าจับต้องได้', icon: 'mdi:package-variant-closed', cls: 'bg-primary/10 text-primary' },
  DIGITAL: { label: 'ดิจิทัล', icon: 'mdi:cloud-download-outline', cls: 'bg-info/10 text-info' },
  SERVICE: { label: 'บริการ', icon: 'mdi:wrench-outline', cls: 'bg-success/10 text-success' },
}

function maskContact(c: string) {
  if (!c || c.length <= 4) return c || '—'
  return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
}

function formatAmount(amount: unknown) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(Number(amount))
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          icon={n <= rating ? 'mdi:star' : 'mdi:star-outline'}
          width={16}
          height={16}
          className={n <= rating ? 'text-warning' : 'text-default-300'}
        />
      ))}
      <span className="ml-1 text-sm text-default-600">({rating}/5)</span>
    </div>
  )
}

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { token } = await params

  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) redirect('/auth/sign-in')

  let shop: any = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  if (!shop) redirect('/orders')

  let order: any = null
  try {
    order = await getOrderByToken(token)
  } catch {
    order = null
  }

  // Guard: order must exist and belong to this shop
  if (!order || order.shopId !== shop.id) redirect('/orders')

  const s = STATUS_META[order.status] ?? { label: order.status, cls: 'bg-default-100 text-default-700' }
  const t = TYPE_META[order.type] ?? { label: order.type, icon: 'mdi:help-circle-outline', cls: 'bg-default-100 text-default-700' }
  const tokenPrefix = order.publicToken ? order.publicToken.slice(0, 8) : order.id.slice(0, 8)

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-default-400 mb-4">
        <Link href="/orders" className="hover:text-primary transition-colors">ออเดอร์</Link>
        <Icon icon="mdi:chevron-right" width={16} height={16} />
        <span className="text-dark font-medium font-mono">#{tokenPrefix}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/orders"
          className="btn btn-icon border border-default-300 bg-card hover:bg-default-50 text-default-600"
        >
          <Icon icon="mdi:arrow-left" width={18} height={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-dark font-mono">#{tokenPrefix}</h1>
          <p className="text-default-400 mt-0.5 text-sm">
            สร้างเมื่อ {order.createdAt ? new Date(order.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — main details */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Status Card */}
          <div className="card rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-default-400 text-xs font-medium uppercase tracking-wider mb-1">สถานะ</div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${s.cls}`}>
                  {s.label}
                </span>
              </div>
              <div className="text-right">
                <div className="text-default-400 text-xs font-medium uppercase tracking-wider mb-1">ประเภท</div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${t.cls}`}>
                  <Icon icon={t.icon} width={14} height={14} />
                  {t.label}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div className="card rounded-xl p-5">
            <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
              <Icon icon="mdi:account-outline" width={18} height={18} className="text-default-400" />
              ข้อมูลผู้ซื้อ
            </h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-default-400">ช่องทางติดต่อ</span>
                <span className="text-dark font-medium">
                  {order.buyerContact ? maskContact(order.buyerContact) : '—'}
                </span>
              </div>
              {order.buyer && (
                <div className="flex justify-between">
                  <span className="text-default-400">ชื่อผู้ใช้</span>
                  <span className="text-dark font-medium">{order.buyer.displayName || order.buyer.username || '—'}</span>
                </div>
              )}
              {!order.buyerContact && (
                <p className="text-default-400 text-xs mt-1">ยังไม่มีผู้ซื้อยืนยัน</p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="card rounded-xl overflow-hidden">
            <div className="p-5 border-b border-default-100">
              <h2 className="text-base font-semibold text-dark flex items-center gap-2">
                <Icon icon="mdi:format-list-bulleted" width={18} height={18} className="text-default-400" />
                รายการสินค้า
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-default-400 text-left border-b border-default-100 bg-default-50">
                    <th className="px-5 py-3 font-medium">ชื่อสินค้า</th>
                    <th className="px-5 py-3 font-medium text-center">จำนวน</th>
                    <th className="px-5 py-3 font-medium text-right">ราคา/ชิ้น</th>
                    <th className="px-5 py-3 font-medium text-right">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.items ?? []).map((item: any) => (
                    <tr key={item.id} className="border-b border-default-100 last:border-0">
                      <td className="px-5 py-3">
                        <div className="font-medium text-dark">{item.name}</div>
                        {item.description && (
                          <div className="text-default-400 text-xs mt-0.5">{item.description}</div>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center text-default-700">{item.qty}</td>
                      <td className="px-5 py-3 text-right text-default-700">{formatAmount(item.price)}</td>
                      <td className="px-5 py-3 text-right font-semibold text-dark">
                        {formatAmount(Number(item.price) * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-default-200 bg-default-50">
                    <td colSpan={3} className="px-5 py-3 text-right font-semibold text-dark">ยอดรวมทั้งหมด</td>
                    <td className="px-5 py-3 text-right font-bold text-primary text-base">{formatAmount(order.totalAmount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Tracking Card — shown only when SHIPPED + PHYSICAL */}
          {order.status === 'SHIPPED' && order.type === 'PHYSICAL' && order.shipmentTracking && (
            <div className="card rounded-xl p-5">
              <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
                <Icon icon="mdi:truck-fast-outline" width={18} height={18} className="text-default-400" />
                ข้อมูลการจัดส่ง
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-default-400">ขนส่ง</span>
                  <span className="text-dark font-medium">{order.shipmentTracking.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-400">เลขพัสดุ</span>
                  <span className="text-dark font-mono font-medium">{order.shipmentTracking.trackingNo}</span>
                </div>
              </div>
            </div>
          )}

          {/* Review Card */}
          {order.review && (
            <div className="card rounded-xl p-5">
              <h2 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
                <Icon icon="mdi:star-outline" width={18} height={18} className="text-default-400" />
                รีวิวจากผู้ซื้อ
              </h2>
              <StarRating rating={order.review.rating} />
              {order.review.comment && (
                <p className="text-default-700 text-sm mt-3 leading-relaxed">{order.review.comment}</p>
              )}
            </div>
          )}
        </div>

        {/* Right column — actions + public link */}
        <div className="flex flex-col gap-6">

          {/* Actions Panel */}
          <div className="card rounded-xl p-5">
            <h2 className="text-base font-semibold text-dark mb-4">การดำเนินการ</h2>
            <OrderActions order={{ publicToken: order.publicToken, status: order.status, type: order.type }} />
          </div>

          {/* Public Link */}
          <div className="card rounded-xl p-5">
            <h2 className="text-base font-semibold text-dark mb-3 flex items-center gap-2">
              <Icon icon="mdi:link-variant" width={18} height={18} className="text-default-400" />
              ลิงก์สำหรับผู้ซื้อ
            </h2>
            <p className="text-default-400 text-xs mb-3">ส่งลิงก์นี้ให้ผู้ซื้อเพื่อยืนยันและรีวิวออเดอร์</p>
            <CopyLinkButton publicToken={order.publicToken} />
          </div>

        </div>
      </div>
    </>
  )
}
