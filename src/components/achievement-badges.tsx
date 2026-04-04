'use client'

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

type Badge = { name: string; icon: string; nameEN: string; type: string }

export default function AchievementBadges({ badges }: { badges: Badge[] }) {
  const achievements = badges.filter(b => b.type === 'ACHIEVEMENT')

  if (achievements.length === 0) return null

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {achievements.map(badge => (
        <Chip
          key={badge.nameEN}
          label={`${badge.icon} ${badge.name}`}
          variant="outlined"
          size="small"
        />
      ))}
    </Stack>
  )
}
