'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import { styled } from '@mui/material/styles'
import type { TimelineProps } from '@mui/lab/Timeline'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Timeline component — based on ShippingActivityCard.tsx
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    },
    '& .MuiTimelineContent-root:last-child': {
      paddingBottom: 0
    },
    '&:nth-last-child(2) .MuiTimelineConnector-root': {
      backgroundColor: 'transparent',
      borderInlineStart: '1px dashed var(--mui-palette-divider)'
    },
    '& .MuiTimelineConnector-root': {
      backgroundColor: 'var(--mui-palette-primary-main)'
    }
  }
})

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface ShipmentTracking {
  id: string
  provider: string
  trackingNo: string
  createdAt: string
}

interface Review {
  id: string
  rating: number
  comment?: string | null
}

interface Order {
  id: string
  publicToken: string
  totalAmount: number
  status: string
  type: string
  createdAt: string
  buyerContact?: string | null
  items: OrderItem[]
  shipmentTracking?: ShipmentTracking[]
  review?: Review | null
}

const STATUS_MAP: Record<string, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  CREATED: { label: 'รอยืนยัน', color: 'default' },
  CONFIRMED: { label: 'ยืนยันแล้ว', color: 'info' },
  SHIPPED: { label: 'กำลังจัดส่ง', color: 'warning' },
  COMPLETED: { label: 'สำเร็จ', color: 'success' },
  CANCELLED: { label: 'ยกเลิก', color: 'error' }
}

interface OrderDetailDrawerProps {
  open: boolean
  order: Order | null
  onClose: () => void
  onRefresh: () => void
}

const OrderDetailDrawer = ({ open, order, onClose, onRefresh }: OrderDetailDrawerProps) => {
  // States
  const [shipProvider, setShipProvider] = useState('')
  const [shipTrackingNo, setShipTrackingNo] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')
  const [showShipForm, setShowShipForm] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!order) return null

  const statusInfo = STATUS_MAP[order.status] || { label: order.status, color: 'default' as const }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/o/${order.publicToken}`

    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShip = async () => {
    if (!shipProvider.trim() || !shipTrackingNo.trim()) {
      setActionError('กรุณากรอกข้อมูลขนส่งให้ครบ')

      return
    }

    setActionError('')
    setActionLoading(true)

    try {
      const res = await fetch(`/api/orders/${order.publicToken}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: shipProvider.trim(), trackingNo: shipTrackingNo.trim() })
      })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.error || 'ไม่สามารถอัปเดตสถานะได้')
      }

      setShowShipForm(false)
      setShipProvider('')
      setShipTrackingNo('')
      onRefresh()
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setActionLoading(false)
    }
  }

  const handleComplete = async () => {
    setActionError('')
    setActionLoading(true)

    try {
      const res = await fetch(`/api/orders/${order.publicToken}/complete`, { method: 'POST' })

      if (!res.ok) {
        const data = await res.json()

        throw new Error(data.error || 'ไม่สามารถอัปเดตสถานะได้')
      }

      onRefresh()
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setActionLoading(false)
    }
  }

  // Build timeline events
  const timelineEvents: { title: string; description: string; date: string; active: boolean }[] = [
    {
      title: 'สร้างคำสั่งซื้อ',
      description: 'คำสั่งซื้อถูกสร้างขึ้น',
      date: new Date(order.createdAt).toLocaleString('th-TH'),
      active: true
    }
  ]

  if (order.status !== 'CREATED') {
    timelineEvents.push({
      title: 'ผู้ซื้อยืนยัน',
      description: order.buyerContact ? `ยืนยันโดย ${order.buyerContact}` : 'ผู้ซื้อยืนยันคำสั่งซื้อแล้ว',
      date: '',
      active: true
    })
  }

  if (order.shipmentTracking && order.shipmentTracking.length > 0) {
    const tracking = order.shipmentTracking[0]

    timelineEvents.push({
      title: 'จัดส่งสินค้า',
      description: `${tracking.provider}: ${tracking.trackingNo}`,
      date: new Date(tracking.createdAt).toLocaleString('th-TH'),
      active: true
    })
  }

  if (order.status === 'COMPLETED') {
    timelineEvents.push({
      title: 'สำเร็จ',
      description: 'คำสั่งซื้อเสร็จสมบูรณ์',
      date: '',
      active: true
    })
  }

  if (order.status === 'CANCELLED') {
    timelineEvents.push({
      title: 'ยกเลิก',
      description: 'คำสั่งซื้อถูกยกเลิก',
      date: '',
      active: true
    })
  }

  // What comes next?
  if (order.status === 'CREATED') {
    timelineEvents.push({ title: 'รอผู้ซื้อยืนยัน', description: 'รอการยืนยันจากผู้ซื้อ', date: '', active: false })
  } else if (order.status === 'CONFIRMED' && order.type === 'PHYSICAL') {
    timelineEvents.push({ title: 'รอจัดส่ง', description: 'รอผู้ขายจัดส่งสินค้า', date: '', active: false })
  } else if (order.status === 'CONFIRMED' || order.status === 'SHIPPED') {
    timelineEvents.push({ title: 'รอยืนยันสำเร็จ', description: 'รอผู้ขายยืนยันว่าเสร็จสิ้น', date: '', active: false })
  }

  const canShip = order.status === 'CONFIRMED' && order.type === 'PHYSICAL'
  const canComplete =
    order.status === 'SHIPPED' || (order.status === 'CONFIRMED' && order.type !== 'PHYSICAL')

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 480 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>รายละเอียดคำสั่งซื้อ</Typography>
        <IconButton onClick={onClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />

      <div className='p-6 flex flex-col gap-6 overflow-y-auto'>
        {/* Status + Public Link */}
        <div className='flex items-center justify-between'>
          <Chip label={statusInfo.label} color={statusInfo.color} variant='tonal' size='small' />
          <Button size='small' variant='tonal' color='secondary' onClick={handleCopyLink} startIcon={<i className='tabler-link' />}>
            {copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}
          </Button>
        </div>

        {/* Buyer Info — based on CustomerDetailsCard.tsx */}
        <Card variant='outlined'>
          <CardContent className='flex flex-col gap-4'>
            <Typography className='font-medium' color='text.primary'>
              ข้อมูลผู้ซื้อ
            </Typography>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-4'>
                <Typography className='min-is-[100px]' variant='body2'>
                  ผู้ซื้อ:
                </Typography>
                <Typography variant='body2' color='text.primary'>
                  {order.buyerContact || 'ยังไม่ยืนยัน'}
                </Typography>
              </div>
              <div className='flex items-center gap-4'>
                <Typography className='min-is-[100px]' variant='body2'>
                  ประเภท:
                </Typography>
                <Typography variant='body2' color='text.primary'>
                  {ORDER_TYPE_MAP[order.type] || order.type}
                </Typography>
              </div>
              <div className='flex items-center gap-4'>
                <Typography className='min-is-[100px]' variant='body2'>
                  วันที่สร้าง:
                </Typography>
                <Typography variant='body2' color='text.primary'>
                  {new Date(order.createdAt).toLocaleString('th-TH')}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items — based on OrderDetailsCard.tsx */}
        <Card variant='outlined'>
          <CardHeader title='รายการสินค้า' titleTypographyProps={{ variant: 'h6' }} />
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>รวม</th>
                </tr>
              </thead>
              <tbody className='border-be'>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Typography color='text.primary' className='font-medium'>
                        {item.name}
                      </Typography>
                    </td>
                    <td>
                      <Typography>฿{item.price.toLocaleString('th-TH')}</Typography>
                    </td>
                    <td>
                      <Typography>{item.quantity}</Typography>
                    </td>
                    <td>
                      <Typography>฿{(item.price * item.quantity).toLocaleString('th-TH')}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CardContent className='flex justify-end'>
            <div>
              <div className='flex items-center gap-12'>
                <Typography color='text.primary' className='font-medium min-is-[100px]'>
                  ยอดรวม:
                </Typography>
                <Typography color='text.primary' className='font-medium'>
                  ฿{order.totalAmount.toLocaleString('th-TH')}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline — based on ShippingActivityCard.tsx */}
        <Card variant='outlined'>
          <CardHeader title='สถานะคำสั่งซื้อ' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Timeline>
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={event.active ? 'primary' : 'secondary'} />
                    {index < timelineEvents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                      <Typography color='text.primary' className='font-medium'>
                        {event.title}
                      </Typography>
                      {event.date && <Typography variant='caption'>{event.date}</Typography>}
                    </div>
                    <Typography className='mbe-2'>{event.description}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>

        {/* Review */}
        {order.review && (
          <Card variant='outlined'>
            <CardHeader title='รีวิวจากผู้ซื้อ' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <div className='flex items-center gap-2 mbe-2'>
                {[1, 2, 3, 4, 5].map(star => (
                  <i
                    key={star}
                    className={`tabler-star-filled text-xl ${star <= order.review!.rating ? 'text-warning' : 'text-textDisabled'}`}
                  />
                ))}
                <Typography variant='body2' color='text.secondary'>
                  ({order.review.rating}/5)
                </Typography>
              </div>
              {order.review.comment && (
                <Typography variant='body2' color='text.secondary'>
                  {order.review.comment}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Error */}
        {actionError && <Alert severity='error'>{actionError}</Alert>}

        {/* Action Buttons */}
        {canShip && !showShipForm && (
          <Button
            fullWidth
            variant='contained'
            onClick={() => setShowShipForm(true)}
            startIcon={<i className='tabler-truck-delivery' />}
          >
            จัดส่งสินค้า
          </Button>
        )}

        {canShip && showShipForm && (
          <Card variant='outlined'>
            <CardContent className='flex flex-col gap-4'>
              <Typography className='font-medium' color='text.primary'>
                ข้อมูลการจัดส่ง
              </Typography>
              <CustomTextField
                fullWidth
                label='บริษัทขนส่ง'
                placeholder='เช่น Kerry, Flash, Thailand Post'
                value={shipProvider}
                onChange={e => setShipProvider(e.target.value)}
              />
              <CustomTextField
                fullWidth
                label='หมายเลขพัสดุ'
                placeholder='กรอกหมายเลขติดตามพัสดุ'
                value={shipTrackingNo}
                onChange={e => setShipTrackingNo(e.target.value)}
              />
              <div className='flex gap-4'>
                <Button
                  variant='tonal'
                  color='secondary'
                  onClick={() => setShowShipForm(false)}
                  className='flex-1'
                >
                  ยกเลิก
                </Button>
                <Button
                  variant='contained'
                  onClick={handleShip}
                  disabled={actionLoading}
                  startIcon={actionLoading ? <CircularProgress size={18} color='inherit' /> : <i className='tabler-truck-delivery' />}
                  className='flex-1'
                >
                  {actionLoading ? 'กำลังบันทึก...' : 'ยืนยันจัดส่ง'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {canComplete && (
          <Button
            fullWidth
            variant='contained'
            color='success'
            onClick={handleComplete}
            disabled={actionLoading}
            startIcon={
              actionLoading ? (
                <CircularProgress size={18} color='inherit' />
              ) : (
                <i className='tabler-circle-check' />
              )
            }
          >
            {actionLoading ? 'กำลังอัปเดต...' : 'ยืนยันสำเร็จ'}
          </Button>
        )}
      </div>
    </Drawer>
  )
}

const ORDER_TYPE_MAP: Record<string, string> = {
  PHYSICAL: 'สินค้าจริง',
  DIGITAL: 'ดิจิทัล',
  SERVICE: 'บริการ'
}

export default OrderDetailDrawer
