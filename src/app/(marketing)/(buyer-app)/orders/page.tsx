import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { getOrdersByBuyer } from '@/services/order.service'

import { LinkButton, LinkChip } from '@/app/(marketing)/_components/mui-link'

export const metadata: Metadata = { title: 'คำสั่งซื้อของฉัน' }

const STATUS_LABEL: Record<string, string> = {
  CREATED: 'รอยืนยัน',
  CONFIRMED: 'ยืนยันแล้ว',
  SHIPPED: 'จัดส่งแล้ว',
  COMPLETED: 'สำเร็จ',
  CANCELLED: 'ยกเลิก',
}

const STATUS_COLOR: Record<string, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  CREATED: 'warning',
  CONFIRMED: 'info',
  SHIPPED: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
}

const FILTERS: Array<{ key: string; label: string }> = [
  { key: 'ALL', label: 'ทั้งหมด' },
  { key: 'CREATED', label: 'รอยืนยัน' },
  { key: 'CONFIRMED', label: 'ยืนยันแล้ว' },
  { key: 'SHIPPED', label: 'จัดส่งแล้ว' },
  { key: 'COMPLETED', label: 'สำเร็จ' },
  { key: 'CANCELLED', label: 'ยกเลิก' },
]

const baht = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  minimumFractionDigits: 0,
})

const dateFmt = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/orders')

  const userId = (session.user as { id: string }).id
  const { status = 'ALL' } = await searchParams

  const all = await getOrdersByBuyer(userId)
  const filtered = status === 'ALL' ? all : all.filter((o) => o.status === status)

  return (
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-6xl flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-3 flex-wrap'>
          <div>
            <Typography variant='h5'>คำสั่งซื้อของฉัน</Typography>
            <Typography color='text.secondary' className='text-sm'>
              รวม {all.length} รายการ
            </Typography>
          </div>
          <LinkButton
            href='/dashboard'
            variant='outlined'
            startIcon={<i className='tabler-arrow-left' />}
          >
            กลับหน้าหลัก
          </LinkButton>
        </div>

        <Card>
          <CardContent>
            <div className='flex flex-wrap gap-2 mb-4'>
              {FILTERS.map((f) => {
                const active = status === f.key
                return (
                  <LinkChip
                    key={f.key}
                    href={f.key === 'ALL' ? '/orders' : `/orders?status=${f.key}`}
                    label={f.label}
                    color={active ? 'primary' : 'default'}
                    variant={active ? 'filled' : 'outlined'}
                  />
                )
              })}
            </div>

            {filtered.length === 0 ? (
              <Typography color='text.secondary' className='text-sm py-12 text-center'>
                ไม่มีคำสั่งซื้อในหมวดนี้
              </Typography>
            ) : (
              <TableContainer>
                <Table size='medium'>
                  <TableHead>
                    <TableRow>
                      <TableCell>สินค้า</TableCell>
                      <TableCell>ร้าน</TableCell>
                      <TableCell align='right'>ยอดรวม</TableCell>
                      <TableCell>สถานะ</TableCell>
                      <TableCell>วันที่</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.map((o) => {
                      const firstItem = o.items[0]
                      return (
                        <TableRow key={o.id} hover>
                          <TableCell>
                            <Typography className='text-sm font-medium'>
                              {firstItem?.name ?? 'คำสั่งซื้อ'}
                            </Typography>
                            {o.items.length > 1 && (
                              <Typography color='text.secondary' className='text-xs'>
                                + อีก {o.items.length - 1} รายการ
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography className='text-sm'>{o.shop.shopName}</Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography className='text-sm font-medium'>
                              {baht.format(Number(o.totalAmount))}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size='small'
                              color={STATUS_COLOR[o.status] ?? 'default'}
                              label={STATUS_LABEL[o.status] ?? o.status}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography color='text.secondary' className='text-sm'>
                              {dateFmt.format(o.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <LinkButton
                              href={`/o/${o.publicToken}`}
                              variant='text'
                              size='small'
                              endIcon={<i className='tabler-chevron-right' />}
                            >
                              ดู
                            </LinkButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
