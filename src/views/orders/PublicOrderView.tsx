'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TrustScoreBadge from '@/components/trust-score-badge'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Types
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

const STATUS_MAP: Record<string, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
  CREATED: { label: 'รอยืนยัน', color: 'warning' },
  CONFIRMED: { label: 'ยืนยันแล้ว', color: 'info' },
  SHIPPED: { label: 'จัดส่งแล้ว', color: 'info' },
  COMPLETED: { label: 'สำเร็จ', color: 'success' },
  CANCELLED: { label: 'ยกเลิกแล้ว', color: 'error' }
}

type OtpStep = 'idle' | 'otp-sent' | 'loading' | 'confirmed'
type ReviewStep = 'idle' | 'submitting' | 'done'

const PublicOrderView = () => {
  const params = useParams()
  const token = params?.token as string

  // Order state
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
        body: JSON.stringify({ contact: phone.trim(), type: 'PHONE' })
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
        body: JSON.stringify({ contact: phone.trim(), contactType: 'PHONE', otp: otp.trim() })
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
        body: JSON.stringify({ rating, comment: comment.trim() || null, reviewerContact: phone.trim() || null })
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
  const statusInfo = order ? STATUS_MAP[order.status] || { label: order.status, color: 'default' as const } : null
  const canConfirm = order?.status === 'CREATED'
  const canReview = (order?.status === 'COMPLETED' || order?.status === 'CONFIRMED') && !order?.review

  // Loading
  if (fetchLoading) {
    return (
      <div className='flex justify-center items-center min-bs-[100vh]'>
        <CircularProgress />
      </div>
    )
  }

  // Error
  if (fetchError || !order) {
    return (
      <div className='min-bs-[100vh] bg-backgroundDefault'>
        <div className='border-be bg-backgroundPaper plb-4 pli-6'>
          <Typography variant='h6' className='font-bold' color='primary.main'>
            SafePay
          </Typography>
        </div>
        <div className='flex justify-center items-center p-6'>
          <Alert severity='error' className='max-is-[600px] is-full'>
            {fetchError || 'ไม่พบคำสั่งซื้อ กรุณาตรวจสอบลิงก์อีกครั้ง'}
          </Alert>
        </div>
      </div>
    )
  }

  const seller = order.shop?.user

  return (
    <div className='min-bs-[100vh] bg-backgroundDefault'>
      {/* Header */}
      <div className='border-be bg-backgroundPaper plb-4 pli-6'>
        <Typography variant='h6' className='font-bold' color='primary.main'>
          SafePay
        </Typography>
      </div>

      {/* Content — based on PreviewCard.tsx layout */}
      <div className='flex justify-center p-6'>
        <Grid container spacing={6} className='max-is-[900px]'>
          {/* Main Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card className='previewCard'>
              <CardContent className='sm:!p-12'>
                <Grid container spacing={6}>
                  {/* Header Section — based on PreviewCard header */}
                  <Grid size={{ xs: 12 }}>
                    <div className='p-6 bg-actionHover rounded'>
                      <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                        {/* Seller Info */}
                        <div className='flex flex-col gap-6'>
                          {seller && (
                            <div className='flex items-center gap-3'>
                              {order.shop.logoUrl ? (
                                <Avatar src={order.shop.logoUrl} alt={order.shop.shopName} sx={{ width: 48, height: 48 }} />
                              ) : (
                                <Avatar sx={{ width: 48, height: 48, bgcolor: 'var(--mui-palette-primary-main)', fontSize: '1.25rem' }}>
                                  {order.shop.shopName.charAt(0).toUpperCase()}
                                </Avatar>
                              )}
                              <div>
                                <Typography color='text.primary' className='font-medium'>
                                  {order.shop.shopName}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                  @{seller.username}
                                </Typography>
                              </div>
                            </div>
                          )}
                          {seller && <TrustScoreBadge score={seller.trustScore} />}
                          {/* Badges */}
                          {seller?.userBadges && seller.userBadges.length > 0 && (
                            <div className='flex gap-2 flex-wrap'>
                              {seller.userBadges.map((ub, idx) => (
                                <Chip
                                  key={idx}
                                  label={ub.badge.name}
                                  size='small'
                                  variant='tonal'
                                  color='primary'
                                  icon={<span>{ub.badge.icon}</span>}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Order Info */}
                        <div className='flex flex-col gap-6'>
                          <div className='flex items-center gap-2'>
                            <Typography variant='h5'>คำสั่งซื้อ</Typography>
                            {statusInfo && (
                              <Chip label={statusInfo.label} color={statusInfo.color} size='small' variant='tonal' />
                            )}
                          </div>
                          <div className='flex flex-col gap-1'>
                            <Typography color='text.primary'>
                              สร้างเมื่อ{' '}
                              {new Date(order.createdAt).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  {/* Items Table — based on PreviewCard items table */}
                  <Grid size={{ xs: 12 }}>
                    <div className='overflow-x-auto border rounded'>
                      <table className={tableStyles.table}>
                        <thead className='border-bs-0'>
                          <tr>
                            <th className='!bg-transparent'>สินค้า</th>
                            <th className='!bg-transparent'>จำนวน</th>
                            <th className='!bg-transparent'>ราคา/ชิ้น</th>
                            <th className='!bg-transparent'>รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <Typography color='text.primary' className='font-medium'>
                                  {item.name}
                                </Typography>
                                {item.description && (
                                  <Typography variant='body2' color='text.secondary'>
                                    {item.description}
                                  </Typography>
                                )}
                              </td>
                              <td>
                                <Typography color='text.primary'>{item.qty}</Typography>
                              </td>
                              <td>
                                <Typography color='text.primary'>
                                  ฿{item.price.toLocaleString('th-TH')}
                                </Typography>
                              </td>
                              <td>
                                <Typography color='text.primary'>
                                  ฿{(item.qty * item.price).toLocaleString('th-TH')}
                                </Typography>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Grid>

                  {/* Total — based on PreviewCard total section */}
                  <Grid size={{ xs: 12 }}>
                    <div className='flex justify-end'>
                      <div className='min-is-[200px]'>
                        <Divider className='mlb-2' />
                        <div className='flex items-center justify-between'>
                          <Typography className='font-medium'>ยอดรวมทั้งหมด:</Typography>
                          <Typography variant='h6' className='font-medium' color='primary.main'>
                            ฿{order.totalAmount.toLocaleString('th-TH')}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Divider className='border-dashed' />
                  </Grid>

                  {/* Existing Review */}
                  {order.review && (
                    <Grid size={{ xs: 12 }}>
                      <Typography className='font-medium mbe-2' color='text.primary'>
                        รีวิวของคุณ
                      </Typography>
                      <div className='flex items-center gap-2 mbe-2'>
                        <Rating value={order.review.rating} readOnly precision={0.1} size='small' />
                        <Typography variant='body2' color='text.secondary'>
                          ({order.review.rating}/5)
                        </Typography>
                      </div>
                      {order.review.comment && (
                        <Typography variant='body2' color='text.secondary'>
                          {order.review.comment}
                        </Typography>
                      )}
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar — based on PreviewActions.tsx */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={6}>
              {/* OTP Confirm Section */}
              {canConfirm && (
                <Grid size={{ xs: 12 }}>
                  <Card>
                    <CardContent className='flex flex-col gap-4'>
                      <Typography className='font-medium' color='text.primary'>
                        ยืนยันคำสั่งซื้อ
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        กรุณายืนยันตัวตนด้วยเบอร์โทรศัพท์
                      </Typography>

                      {otpError && <Alert severity='error'>{otpError}</Alert>}

                      <CustomTextField
                        fullWidth
                        label='เบอร์โทรศัพท์ผู้ซื้อ'
                        placeholder='เช่น 0812345678'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        disabled={otpStep === 'otp-sent' || isOtpLoading}
                        type='tel'
                        slotProps={{ input: { inputProps: { maxLength: 10 } } }}
                      />

                      {otpStep !== 'otp-sent' && (
                        <Button
                          fullWidth
                          variant='contained'
                          onClick={handleSendOtp}
                          disabled={isOtpLoading || !phone.trim()}
                          startIcon={
                            isOtpLoading ? (
                              <CircularProgress size={18} color='inherit' />
                            ) : (
                              <i className='tabler-send' />
                            )
                          }
                        >
                          {isOtpLoading ? 'กำลังส่ง OTP...' : 'ส่ง OTP'}
                        </Button>
                      )}

                      {otpStep === 'otp-sent' && (
                        <>
                          <Alert severity='info'>ส่ง OTP ไปที่ {phone} แล้ว</Alert>
                          <CustomTextField
                            fullWidth
                            label='รหัส OTP'
                            placeholder='กรอกรหัส OTP 6 หลัก'
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            type='number'
                            slotProps={{ input: { inputProps: { maxLength: 6 } } }}
                          />
                          <Button
                            fullWidth
                            variant='contained'
                            color='success'
                            onClick={handleConfirmOrder}
                            disabled={isOtpLoading || !otp.trim()}
                            startIcon={
                              isOtpLoading ? (
                                <CircularProgress size={18} color='inherit' />
                              ) : (
                                <i className='tabler-circle-check' />
                              )
                            }
                          >
                            {isOtpLoading ? 'กำลังยืนยัน...' : 'ยืนยันรับสินค้า'}
                          </Button>
                          <Button
                            fullWidth
                            variant='tonal'
                            color='secondary'
                            onClick={() => {
                              setOtpStep('idle')
                              setOtp('')
                            }}
                          >
                            เปลี่ยนเบอร์
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Confirmed Success */}
              {otpStep === 'confirmed' && (
                <Grid size={{ xs: 12 }}>
                  <Alert severity='success'>ยืนยันคำสั่งซื้อสำเร็จแล้ว ขอบคุณที่ใช้บริการ SafePay!</Alert>
                </Grid>
              )}

              {/* Review Section */}
              {canReview && (
                <Grid size={{ xs: 12 }}>
                  <Card>
                    <CardContent className='flex flex-col gap-4'>
                      <Typography className='font-medium' color='text.primary'>
                        ให้คะแนนและรีวิวผู้ขาย
                      </Typography>

                      {reviewError && <Alert severity='error'>{reviewError}</Alert>}

                      {reviewStep === 'done' ? (
                        <Alert severity='success'>ส่งรีวิวเรียบร้อยแล้ว ขอบคุณ!</Alert>
                      ) : (
                        <>
                          <div>
                            <Typography variant='body2' color='text.secondary' className='mbe-1'>
                              คะแนน
                            </Typography>
                            <Rating
                              value={rating}
                              onChange={(_, newValue) => setRating(newValue ?? 0)}
                              precision={1}
                            />
                          </div>
                          <CustomTextField
                            fullWidth
                            label='ความคิดเห็น (ไม่บังคับ)'
                            placeholder='แชร์ประสบการณ์การซื้อของคุณ...'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            multiline
                            rows={3}
                          />
                          <Button
                            fullWidth
                            variant='contained'
                            onClick={handleSubmitReview}
                            disabled={reviewStep === 'submitting' || rating === 0}
                            startIcon={
                              reviewStep === 'submitting' ? (
                                <CircularProgress size={18} color='inherit' />
                              ) : (
                                <i className='tabler-star' />
                              )
                            }
                          >
                            {reviewStep === 'submitting' ? 'กำลังส่งรีวิว...' : 'ส่งรีวิว'}
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Order status info card when not in action */}
              {!canConfirm && !canReview && !order.review && (
                <Grid size={{ xs: 12 }}>
                  <Card>
                    <CardContent className='flex flex-col gap-4'>
                      <Typography className='font-medium' color='text.primary'>
                        สถานะคำสั่งซื้อ
                      </Typography>
                      {statusInfo && (
                        <Chip label={statusInfo.label} color={statusInfo.color} variant='tonal' />
                      )}
                      {order.buyerContact && (
                        <Typography variant='body2' color='text.secondary'>
                          ยืนยันโดย {order.buyerContact}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default PublicOrderView
