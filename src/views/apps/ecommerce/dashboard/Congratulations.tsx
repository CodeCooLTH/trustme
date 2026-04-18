// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Component Imports
import { LinkButton } from '@/app/(marketing)/_components/mui-link'

// Type Imports
import type { TrustLevel } from '@/services/trust-score.service'

/**
 * Base: theme/vuexy/typescript-version/full-version/src/views/apps/ecommerce/dashboard/Congratulations.tsx
 * Adapted: greet buyer with trust score + next-level target. Illustration kept (character/8.png).
 * CTA → /settings/verification.
 */

type Props = {
  displayName: string
  trustScore: number
  trustLevel: TrustLevel
  nextLevelLabel: string
}

const Congratulations = ({ displayName, trustScore, trustLevel, nextLevelLabel }: Props) => {
  return (
    <Card>
      <Grid container>
        <Grid size={{ xs: 8 }}>
          <CardContent>
            <Typography variant='h5' className='mbe-0.5'>
              สวัสดี {displayName} 🎉
            </Typography>
            <Typography variant='subtitle1' className='mbe-2'>
              ระดับ {trustLevel} — เป้าหมายถัดไป {nextLevelLabel}
            </Typography>
            <Typography variant='h4' color='primary.main' className='mbe-1'>
              {trustScore} / 100
            </Typography>
            <LinkButton href='/settings/verification' variant='contained' color='primary'>
              ยกระดับความน่าเชื่อถือ
            </LinkButton>
          </CardContent>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <div className='relative bs-full is-full'>
            <img
              alt='Trust score illustration'
              src='/images/illustrations/characters/8.png'
              className='max-bs-[150px] absolute block-end-0 inline-end-6 max-is-full'
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Congratulations
