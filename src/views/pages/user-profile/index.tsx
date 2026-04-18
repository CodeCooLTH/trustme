// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserProfileHeader from './UserProfileHeader'
import type { ProfileHeaderData } from './UserProfileHeader'
import ProfileTab from './profile'
import type { ProfileTabData } from './profile'

// Base: theme/vuexy/typescript-version/full-version/src/views/pages/user-profile/index.tsx
// Tabs decision: dropped the Tabs wrapper (TabContext + CustomTabList + TabPanel) entirely.
// The SafePay public profile only has one "Profile" tab — rendering a single-tab Tabs component
// is visually noisy and forces a client boundary for no benefit. This keeps the page a pure RSC.
const UserProfile = ({
  profileHeader,
  profileTab,
}: {
  profileHeader: ProfileHeaderData
  profileTab: ProfileTabData
}) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserProfileHeader data={profileHeader} />
      </Grid>
      <Grid size={{ xs: 12 }} className='flex flex-col gap-6'>
        <ProfileTab data={profileTab} />
      </Grid>
    </Grid>
  )
}

export default UserProfile
