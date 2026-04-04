import { notFound } from 'next/navigation'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import TrustScoreBadge from '@/components/trust-score-badge'
import VerificationBadges from '@/components/verification-badges'
import AchievementBadges from '@/components/achievement-badges'
import ReviewList from '@/components/review-list'

interface PublicProfileData {
  displayName: string
  username: string
  avatar: string | null
  trustScore: number
  isShop: boolean
  shop: {
    shopName: string
    description: string | null
    logoUrl: string | null
  } | null
  badges: Array<{ name: string; icon: string; nameEN: string; type: string }>
  memberSince: string
}

interface Review {
  id: string
  rating: number
  comment?: string | null
  reviewerContact?: string | null
  createdAt: string
}

async function fetchProfile(username: string): Promise<PublicProfileData | null> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/public/profile/${encodeURIComponent(username)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchReviews(username: string): Promise<Review[]> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/public/reviews/${encodeURIComponent(username)}?take=10`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

function calcAvgRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return sum / reviews.length
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const [profile, reviews] = await Promise.all([fetchProfile(username), fetchReviews(username)])

  if (!profile) notFound()

  const avgRating = calcAvgRating(reviews)
  const memberSinceDate = new Date(profile.memberSince).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{ py: 2, px: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Typography
          component={Link}
          href="/"
          variant="h6"
          fontWeight="bold"
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
          SafePay
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Stack spacing={4}>
          {/* Profile Card */}
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                {/* Avatar */}
                <Avatar
                  src={profile.avatar || undefined}
                  alt={profile.displayName}
                  sx={{ width: 96, height: 96, fontSize: '2.5rem', bgcolor: 'primary.main', flexShrink: 0 }}
                >
                  {profile.displayName.charAt(0).toUpperCase()}
                </Avatar>

                {/* Info */}
                <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                    mb={0.5}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {profile.displayName}
                    </Typography>
                    {profile.isShop && (
                      <Chip label="ร้านค้า" color="primary" size="small" variant="tonal" />
                    )}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    @{profile.username} · สมาชิกตั้งแต่ {memberSinceDate}
                  </Typography>

                  {/* Trust Score */}
                  <Box mb={2}>
                    <TrustScoreBadge score={profile.trustScore} />
                  </Box>

                  {/* Verification Badges */}
                  <VerificationBadges badges={profile.badges} />
                </Box>
              </Stack>

              {/* Achievement Badges */}
              {profile.badges.some(b => b.type === 'ACHIEVEMENT') && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    ความสำเร็จ
                  </Typography>
                  <AchievementBadges badges={profile.badges} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Shop Info */}
          {profile.isShop && profile.shop && (
            <Card sx={{ boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ข้อมูลร้านค้า
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {profile.shop.logoUrl && (
                    <Avatar src={profile.shop.logoUrl} alt={profile.shop.shopName} sx={{ width: 56, height: 56 }} />
                  )}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {profile.shop.shopName}
                    </Typography>
                    {profile.shop.description && (
                      <Typography variant="body2" color="text.secondary">
                        {profile.shop.description}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                สถิติ
              </Typography>
              <Stack direction="row" spacing={4}>
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {reviews.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    รีวิวทั้งหมด
                  </Typography>
                </Box>
                {reviews.length > 0 && (
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="warning.main">
                      {avgRating.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      คะแนนเฉลี่ย
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              รีวิวจากผู้ซื้อ
            </Typography>
            <ReviewList reviews={reviews} />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
