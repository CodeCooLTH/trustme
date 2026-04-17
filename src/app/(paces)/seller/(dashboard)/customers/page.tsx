import PageBreadcrumb from '@/components/PageBreadcrumb'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getShopByUserId } from '@/services/shop.service'
import { getServerSession } from 'next-auth'
import Icon from '@/components/wrappers/Icon'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { CustomerRow } from './components/data'
import CustomerTable from './components/CustomerTable'
import StatStrip from '../_shared/StatStrip'

export const metadata: Metadata = { title: 'ลูกค้า' }

function maskContact(c: string | null | undefined): string {
  if (!c || c.length <= 4) return c ?? '—'
  return '•'.repeat(Math.max(0, c.length - 4)) + c.slice(-4)
}

export default async function CustomersPage() {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user
  if (!user) return null

  let shop: { id: string } | null = null
  try {
    shop = await getShopByUserId(user.id)
  } catch {
    shop = null
  }

  if (!shop) {
    return (
      <div className="card p-10 rounded-xl text-center max-w-2xl mx-auto">
        <Icon icon="building-store" className="size-16 text-warning mx-auto mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">ยังไม่มีร้านค้า</h2>
        <p className="text-default-400 mb-6">ต้องสร้างร้านก่อนจึงจะดูลูกค้าได้</p>
        <Link
          href="/shop"
          className="btn bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover inline-flex items-center gap-2"
        >
          <Icon icon="plus" />
          สร้างร้านค้า
        </Link>
      </div>
    )
  }

  let orders: any[] = []
  try {
    orders = await prisma.order.findMany({
      where: { shopId: shop.id },
      include: {
        items: true,
        buyer: { select: { id: true, username: true, displayName: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    orders = []
  }

  // Aggregate orders into customer rows
  const map = new Map<string, CustomerRow>()
  for (const o of orders) {
    const key = o.buyerUserId ?? o.buyerContact ?? 'unknown'
    const existing = map.get(key)
    const itemTotal = o.items.reduce(
      (s: number, i: any) => s + Number(i.price ?? 0) * (i.qty ?? 1),
      0
    )
    const isCompleted = o.status === 'COMPLETED'
    if (existing) {
      existing.totalOrders += 1
      if (isCompleted) existing.totalSpent += itemTotal
      if (new Date(o.createdAt).getTime() > existing.lastOrderRaw) {
        existing.lastOrderRaw = new Date(o.createdAt).getTime()
        existing.lastOrderDate = new Date(o.createdAt).toLocaleDateString('th-TH')
      }
    } else {
      const isReg = !!o.buyer
      const name = isReg
        ? (o.buyer?.displayName ?? 'สมาชิก')
        : maskContact(o.buyerContact)
      map.set(key, {
        key,
        displayName: name,
        initial: (name || '?').charAt(0).toUpperCase(),
        contact: maskContact(o.buyerContact),
        isRegistered: isReg,
        username: o.buyer?.username ?? null,
        totalOrders: 1,
        totalSpent: isCompleted ? itemTotal : 0,
        lastOrderDate: new Date(o.createdAt).toLocaleDateString('th-TH'),
        lastOrderRaw: new Date(o.createdAt).getTime(),
      })
    }
  }

  const customers = Array.from(map.values()).sort((a, b) => b.lastOrderRaw - a.lastOrderRaw)

  const stripItems = [
    { title: 'ลูกค้าทั้งหมด', value: customers.length,                                                  change: 0, icon: 'users',      iconClass: 'bg-primary/15 text-primary' },
    { title: 'สมาชิก',         value: customers.filter((c) => c.isRegistered).length,                    change: 0, icon: 'user-check', iconClass: 'bg-success/15 text-success' },
    { title: 'ยอดซื้อรวม',     value: customers.reduce((s, c) => s + c.totalSpent, 0), prefix: '฿',    change: 0, icon: 'cash',       iconClass: 'bg-info/15 text-info' },
  ]

  return (
    <>
      <PageBreadcrumb title="ผู้ซื้อ" trail={[{ label: 'Buyer' }]} />
      <div className="mb-base">
        <StatStrip items={stripItems} />
      </div>
      <CustomerTable customers={customers} />
    </>
  )
}
