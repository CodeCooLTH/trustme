'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Link from 'next/link'
import TrustScoreBadge from '@/components/trust-score-badge'
import StarRating from '@/components/star-rating'

interface OrderItem {
  id: string
  name: string
  description?: string | null
  qty: number
  price: number
}

interface SellerBadge {
  name: string
  icon: string
  nameEN: string
  type: string
}

interface Seller {
  id: string
  displayName: string
  username: string
  trustScore: number
  userBadges: Array<{ badge: SellerBadge }>
}

interface Shop {
  shopName: string
  logoUrl?: string | null
  user: Seller
}

interface Review {
  id: string
  rating: number
  comment?: string | null
}

interface Order {
  id: string
  publicToken: string
  status: string
  type: string
  totalAmount: number
  buyerContact?: string | null
  items: OrderItem[]
  shop: Shop
  review?: Review | null
  createdAt: string
}

const STATUS_LABELS: Record<string, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  CREATED: { label: 'รอยืนยัน', color: 'warning' },
  CONFIRMED: { label: 'ยืนยันแล้ว', color: 'info' },
  SHIPPED: { label: 'จัดส่งแล้ว', color: 'info' },
  COMPLETED: { label: 'สำเร็จ', color: 'success' },
  CANCELLED: { label: 'ยกเลิกแล้ว', color: 'error' },
}

type OtpStep = 'idle' | 'otp-sent' | 'loading' | 'confirmed'
type ReviewStep = 'idle' | 'submitting' | 'done'

export default function PublicOrderPage() {
  const params = useParams()
  const token = params?.token as string

  const [order, setOrder] = useState<Order | null>(null)
  const [fetchError, setFetchError] = useState('')
  const [fetchLoading, setFetchLoading] = useState(true)

  // OTP confirm flow
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpStep, setOtpStep] = useState<OtpStep>('idle')
  const [otpError, setOtpError] = useState('')

  // Review flow
  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState('')
  const [reviewStep, setReviewStep] = useState<ReviewStep>('idle')
  const [reviewError, setReviewError] = useState('')

  const fetchOrder = useCallback(async () => {
    if (!token) return
    setFetchLoading(true)
    setFetchError('')
    try {
      const res = await fetch(`/api/orders/${token}`)
      if (!res.ok) {
        const data = await res.json()
        setFetchError(data.error || 'ไม่พบคำสั่งซื้อ')
        return
      }
      const data: Order = await res.json()
      setOrder(data)
    } catch {
      setFetchError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
    } finally {
      setFetchLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setOtpError('กรุณากรอกเบอร์โทรศัพท์')
      return
    }
    setOtpError('')
    setOtpStep('loading')
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone.trim(), type: 'PHONE' }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ไม่สามารถส่ง OTP ได้')
      }
      setOtpStep('otp-sent')
    } catch (err: any) {
      setOtpError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
      setOtpStep('idle')
    }
  }

  const handleConfirmOrder = async () => {
    if (!otp.trim()) {
      setOtpError('กรุณากรอก OTP')
      return
    }
    setOtpError('')
    setOtpStep('loading')
    try {
      const res = await fetch(`/api/orders/${token}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: phone.trim(), contactType: 'PHONE', otp: otp.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ยืนยันคำสั่งซื้อไม่สำเร็จ')
      }
      setOtpStep('confirmed')
      await fetchOrder()
    } catch (err: any) {
      setOtpError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
      setOtpStep('otp-sent')
    }
  }

  const handleSubmitReview = async () => {
    if (rating === 0) {
      setReviewError('กรุณาให้คะแนนดาว')
      return
    }
    setReviewError('')
    setReviewStep('submitting')
    try {
      const res = await fetch(`/api/orders/${token}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment: comment.trim() || null, reviewerContact: phone.trim() || null }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ส่งรีวิวไม่สำเร็จ')
      }
      setReviewStep('done')
      await fetchOrder()
    } catch (err: any) {
      setReviewError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
      setReviewStep('idle')
    }
  }

  const isOtpLoading = otpStep === 'loading'
  const statusInfo = order ? (STATUS_LABELS[order.status] || { label: order.status, color: 'default' as const }) : null
  const canConfirm = order?.status === 'CREATED'
  const canReview = (order?.status === 'COMPLETED' || order?.status === 'CONFIRMED') && !order?.review

  if (fetchLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (fetchError || !order) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Box
          component="header"
          sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
        >
          <Typography
            component={Link}
            href="/"
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ textDecoration: 'none' }}
          >
            SafePay
          </Typography>
        </Box>
        <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 6 }}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {fetchError || 'ไม่พบคำสั่งซื้อ กรุณาตรวจสอบลิงก์อีกครั้ง'}
          </Alert>
        </Container>
      </Box>
    )
  }

  const seller = order.shop?.user

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Typography
          component={Link}
          href="/"
          variant="h6"
          fontWeight="bold"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          SafePay
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Stack spacing={4}>
          {/* Order Header */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography variant="h5" fontWeight="bold">
                คำสั่งซื้อ
              </Typography>
              {statusInfo && (
                <Chip label={statusInfo.label} color={statusInfo.color} size="small" />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              สร้างเมื่อ {new Date(order.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>

          {/* Seller Info */}
          {seller && (
            <Card sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  ข้อมูลผู้ขาย
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {order.shop.logoUrl ? (
                    <Avatar src={order.shop.logoUrl} alt={order.shop.shopName} sx={{ width: 56, height: 56 }} />
                  ) : (
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                      {order.shop.shopName.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {order.shop.shopName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      @{seller.username}
                    </Typography>
                    <TrustScoreBadge score={seller.trustScore} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Order Items */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                รายการสินค้า
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>สินค้า</TableCell>
                    <TableCell align="center">จำนวน</TableCell>
                    <TableCell align="right">ราคา/ชิ้น</TableCell>
                    <TableCell align="right">รวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {item.name}
                        </Typography>
                        {item.description && (
                          <Typography variant="caption" color="text.secondary">
                            {item.description}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">{item.qty}</TableCell>
                      <TableCell align="right">
                        {item.price.toLocaleString('th-TH')} ฿
                      </TableCell>
                      <TableCell align="right">
                        {(item.qty * item.price).toLocaleString('th-TH')} ฿
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  ยอดรวมทั้งหมด:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {order.totalAmount.toLocaleString('th-TH')} ฿
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* OTP Confirm Section */}
          {canConfirm && (
            <Card sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  ยืนยันคำสั่งซื้อ
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  กรุณายืนยันตัวตนด้วยเบอร์โทรศัพท์เพื่อยืนยันการรับสินค้า
                </Typography>

                {otpError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {otpError}
                  </Alert>
                )}

                <Stack spacing={2}>
                  <TextField
                    label="เบอร์โทรศัพท์ผู้ซื้อ"
                    placeholder="เช่น 0812345678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    disabled={otpStep === 'otp-sent' || isOtpLoading}
                    fullWidth
                    type="tel"
                    inputProps={{ maxLength: 10 }}
                  />

                  {otpStep !== 'otp-sent' && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleSendOtp}
                      disabled={isOtpLoading || !phone.trim()}
                      startIcon={isOtpLoading ? <CircularProgress size={18} color="inherit" /> : null}
                    >
                      {isOtpLoading ? 'กำลังส่ง OTP...' : 'ส่ง OTP เพื่อยืนยัน'}
                    </Button>
                  )}

                  {otpStep === 'otp-sent' && (
                    <>
                      <Alert severity="info" sx={{ py: 0.5 }}>
                        ส่ง OTP ไปที่ {phone} แล้ว
                      </Alert>
                      <TextField
                        label="รหัส OTP"
                        placeholder="กรอกรหัส OTP 6 หลัก"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        fullWidth
                        type="number"
                        inputProps={{ maxLength: 6 }}
                      />
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="text"
                          onClick={() => {
                            setOtpStep('idle')
                            setOtp('')
                          }}
                          sx={{ flex: 1 }}
                        >
                          เปลี่ยนเบอร์
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          color="success"
                          onClick={handleConfirmOrder}
                          disabled={isOtpLoading || !otp.trim()}
                          startIcon={isOtpLoading ? <CircularProgress size={18} color="inherit" /> : null}
                          sx={{ flex: 2 }}
                        >
                          {isOtpLoading ? 'กำลังยืนยัน...' : 'ยืนยันรับสินค้า'}
                        </Button>
                      </Stack>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Status Info after confirm */}
          {otpStep === 'confirmed' && (
            <Alert severity="success">
              ยืนยันคำสั่งซื้อสำเร็จแล้ว ขอบคุณที่ใช้บริการ SafePay!
            </Alert>
          )}

          {/* Review Section */}
          {canReview && (
            <Card sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  ให้คะแนนและรีวิวผู้ขาย
                </Typography>

                {reviewError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {reviewError}
                  </Alert>
                )}

                {reviewStep === 'done' ? (
                  <Alert severity="success">ส่งรีวิวเรียบร้อยแล้ว ขอบคุณสำหรับความคิดเห็น!</Alert>
                ) : (
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        คะแนน
                      </Typography>
                      <StarRating value={rating} readOnly={false} onChange={v => setRating(v ?? 0)} showValue />
                    </Box>
                    <TextField
                      label="ความคิดเห็น (ไม่บังคับ)"
                      placeholder="แชร์ประสบการณ์การซื้อของคุณ..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      fullWidth
                      multiline
                      rows={3}
                    />
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSubmitReview}
                      disabled={reviewStep === 'submitting' || rating === 0}
                      startIcon={reviewStep === 'submitting' ? <CircularProgress size={18} color="inherit" /> : null}
                    >
                      {reviewStep === 'submitting' ? 'กำลังส่งรีวิว...' : 'ส่งรีวิว'}
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          )}

          {/* Existing Review */}
          {order.review && (
            <Card sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  รีวิวของคุณ
                </Typography>
                <StarRating value={order.review.rating} readOnly showValue />
                {order.review.comment && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {order.review.comment}
                  </Typography>
                )}
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
