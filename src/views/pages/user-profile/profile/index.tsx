// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AboutOverview from './AboutOverview'
import type { AboutOverviewData } from './AboutOverview'
import VerificationBadges from './VerificationBadges'
import AchievementBadges from './AchievementBadges'
import RecentReviews from './RecentReviews'

export type ProfileTabData = {
  about: AboutOverviewData
  verification: {
    level: number
    label: string
    icon: string
    active: boolean
  }[]
  achievements: {
    id: string
    name: string
    nameEN: string
    icon: string
  }[]
  reviews: {
    id: string
    rating: number
    comment: string | null
    createdAt: string
    itemName: string | null
  }[]
  avgRating: number
}

// Base: theme/vuexy/typescript-version/full-version/src/views/pages/user-profile/profile/index.tsx
// Adapted: dropped ActivityTimeline, ConnectionsTeams, ProjectsTable (not applicable).
// Kept 5/7 (left) + 7/8 (right) grid split — left holds AboutOverview, right holds verification/badges/reviews.
const ProfileTab = ({ data }: { data: ProfileTabData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 5, lg: 4 }} className='order-last md:order-first'>
        <AboutOverview data={data.about} />
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 8 }} className='order-first md:order-last'>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <VerificationBadges items={data.verification} />
          </Grid>
          {data.achievements.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <AchievementBadges items={data.achievements} />
            </Grid>
          )}
          <Grid size={{ xs: 12 }}>
            <RecentReviews reviews={data.reviews} avgRating={data.avgRating} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
