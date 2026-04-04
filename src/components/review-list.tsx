'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'

interface Review {
  id: string
  rating: number
  comment?: string | null
  reviewerContact?: string | null
  createdAt: string
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <Typography color="text.secondary">ยังไม่มีรีวิว</Typography>
  }

  return (
    <Stack spacing={2}>
      {reviews.map(review => (
        <Card key={review.id} variant="outlined">
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">
                {new Date(review.createdAt).toLocaleDateString('th-TH')}
              </Typography>
            </Stack>
            {review.comment && (
              <Typography variant="body2">{review.comment}</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}
