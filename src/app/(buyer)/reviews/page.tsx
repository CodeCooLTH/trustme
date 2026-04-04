'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface ReviewData {
  id: string
  rating: number
  comment?: string | null
  createdAt: string
}

interface Shop {
  name: string
}

interface OrderWithReview {
  id: string
  publicToken: string
  shop: Shop
  review: ReviewData | null
}

export default function BuyerReviewsPage() {
  const [orders, setOrders] = useState<OrderWithReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/orders?role=buyer')
        const data = await res.json()

        setOrders(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  const reviewedOrders = orders.filter(o => o.review !== null)

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        รีวิวของฉัน
      </Typography>

      {reviewedOrders.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color='text.secondary' textAlign='center' py={4}>
              ยังไม่มีรีวิว
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={3}>
          {reviewedOrders.map(order => (
            <Card key={order.id} variant='outlined'>
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
                    <Typography variant='subtitle1' fontWeight='medium'>
                      {order.shop?.name ?? '—'}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {order.review ? new Date(order.review.createdAt).toLocaleDateString('th-TH') : ''}
                    </Typography>
                  </Stack>
                  <Rating value={order.review?.rating ?? 0} readOnly size='small' />
                  {order.review?.comment && (
                    <Typography variant='body2' color='text.secondary'>
                      {order.review.comment}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  )
}
