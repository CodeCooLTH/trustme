'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'

import CustomTextField from '@core/components/mui/TextField'

type Props = { token: string }

export default function ReviewForm({ token }: Props) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!rating) {
      toast.error('กรุณาให้คะแนน 1-5 ดาว')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${token}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment: comment.trim() || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'ส่งรีวิวไม่สำเร็จ')
        return
      }
      toast.success('ขอบคุณสำหรับรีวิว!')
      window.location.reload()
    } finally {
      setLoading(false)
    }
  }

  const display = hoverRating || rating

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <Typography variant='h6'>รีวิวร้านค้า</Typography>
        <Typography color='text.secondary' className='text-sm'>
          ประสบการณ์การซื้อครั้งนี้เป็นอย่างไร
        </Typography>

        <form onSubmit={onSubmit} noValidate className='flex flex-col gap-4'>
          <div className='flex items-center justify-center gap-1'>
            {[1, 2, 3, 4, 5].map((i) => (
              <IconButton
                key={i}
                type='button'
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                size='large'
              >
                <i
                  className={
                    i <= display
                      ? 'tabler-star-filled text-[var(--mui-palette-warning-main)] text-3xl'
                      : 'tabler-star text-[var(--mui-palette-text-disabled)] text-3xl'
                  }
                />
              </IconButton>
            ))}
          </div>

          <CustomTextField
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            label='ความคิดเห็น (ไม่บังคับ)'
            placeholder='แชร์ประสบการณ์ของคุณ…'
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 500))}
            helperText={`${comment.length}/500`}
          />

          <Button type='submit' variant='contained' fullWidth disabled={loading || !rating}>
            {loading ? 'กำลังส่ง…' : 'ส่งรีวิว'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
