'use client'

import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

function getTrustLevel(score: number): { label: string; color: 'success' | 'warning' | 'info' | 'error' | 'default' } {
  if (score >= 90) return { label: 'A+', color: 'success' }
  if (score >= 80) return { label: 'A', color: 'success' }
  if (score >= 70) return { label: 'B+', color: 'warning' }
  if (score >= 60) return { label: 'B', color: 'warning' }
  if (score >= 40) return { label: 'C', color: 'info' }
  return { label: 'D', color: 'error' }
}

export default function TrustScoreBadge({ score }: { score: number }) {
  const { label, color } = getTrustLevel(score)

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Chip label={label} color={color} size="small" variant="tonal" />
      <Typography variant="body2" color="text.secondary">
        {score} คะแนน
      </Typography>
    </Stack>
  )
}
