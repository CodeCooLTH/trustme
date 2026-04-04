'use client'

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

type Badge = { name: string; icon: string; nameEN: string }

export default function VerificationBadges({ badges }: { badges: Badge[] }) {
  const verificationBadges = badges.filter(b => b.nameEN === 'Fully Verified' || b.icon === '✅')

  if (verificationBadges.length === 0) return null

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {verificationBadges.map(badge => (
        <Chip
          key={badge.nameEN}
          label={badge.name}
          icon={<span>{badge.icon}</span>}
          color="success"
          variant="tonal"
          size="small"
        />
      ))}
    </Stack>
  )
}
