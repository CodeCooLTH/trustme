'use client'

import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface StarRatingProps {
  value: number
  readOnly?: boolean
  onChange?: (value: number | null) => void
  showValue?: boolean
}

export default function StarRating({ value, readOnly = true, onChange, showValue = true }: StarRatingProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Rating
        value={value}
        readOnly={readOnly}
        onChange={(_, newValue) => onChange?.(newValue)}
        precision={0.1}
        size="small"
      />
      {showValue && (
        <Typography variant="body2" color="text.secondary">
          ({value.toFixed(1)})
        </Typography>
      )}
    </Stack>
  )
}
