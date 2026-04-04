'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import ReviewList from '@/components/review-list'

interface Review {
  id: string
  rating: number
  comment?: string | null
  reviewerContact?: string | null
  createdAt: string
}

export default function SellerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        // Fetch seller orders and extract reviews
        const res = await fetch('/api/orders?role=seller')
        const orders = await res.json()

        if (Array.isArray(orders)) {
          const allReviews: Review[] = orders
            .filter((o: any) => o.review)
            .map((o: any) => ({
              id: o.review.id,
              rating: o.review.rating,
              comment: o.review.comment,
              reviewerContact: o.buyerContact ?? null,
              createdAt: o.review.createdAt,
            }))

          setReviews(allReviews)
        }
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h4' mb={4}>
        รีวิวที่ได้รับ
      </Typography>

      {reviews.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color='text.secondary' textAlign='center' py={4}>
              ยังไม่มีรีวิว
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </Box>
  )
}
