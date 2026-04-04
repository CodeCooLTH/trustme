import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Link from 'next/link'

const features = [
  {
    icon: '✅',
    title: 'ยืนยันตัวตน',
    description: 'ยืนยันตัวตนด้วยเบอร์โทรศัพท์หรือ Facebook เพื่อสร้างความน่าเชื่อถือในการทำธุรกรรม',
  },
  {
    icon: '⭐',
    title: 'สะสม Trust Score',
    description: 'สะสมคะแนนความน่าเชื่อถือจากการทำธุรกรรมที่สำเร็จ รีวิวจากผู้ซื้อ และการยืนยันต่างๆ',
  },
  {
    icon: '🏅',
    title: 'แสดง Badge',
    description: 'รับ Badge พิเศษที่แสดงให้ผู้อื่นเห็นว่าคุณเป็นผู้ขายที่น่าเชื่อถือและมีประสบการณ์สูง',
  },
]

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navbar */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          SafePay
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} href="/login" variant="outlined" size="small">
            เข้าสู่ระบบ
          </Button>
          <Button component={Link} href="/register" variant="contained" size="small">
            สมัครสมาชิก
          </Button>
        </Stack>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6C3BE4 0%, #9B59B6 100%)',
          color: 'white',
          py: { xs: 8, md: 14 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            SafePay
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ opacity: 0.9, mb: 2, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
            ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, mb: 5, maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
            SafePay ช่วยให้ผู้ซื้อและผู้ขายสร้างความน่าเชื่อถือผ่านการยืนยันตัวตน การสะสม Trust Score
            และการแสดง Badge เพื่อให้ทุกธุรกรรมออนไลน์ปลอดภัยและโปร่งใส
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/register"
              variant="contained"
              size="large"
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' }, fontWeight: 'bold' }}
            >
              เริ่มต้นใช้งานฟรี
            </Button>
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              size="large"
              sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              เข้าสู่ระบบ
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          ทำไมต้องใช้ SafePay?
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}>
          เราช่วยให้การซื้อขายออนไลน์ของคุณปลอดภัยและน่าเชื่อถือมากยิ่งขึ้น
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  boxShadow: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
              >
                <CardContent sx={{ py: 5, px: 4 }}>
                  <Typography variant="h2" sx={{ mb: 2, fontSize: '3rem' }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'action.hover', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            พร้อมเริ่มต้นแล้วหรือยัง?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            สมัครสมาชิกฟรีและเริ่มสร้างความน่าเชื่อถือของคุณวันนี้
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={Link} href="/register" variant="contained" size="large" color="primary">
              สมัครสมาชิกฟรี
            </Button>
            <Button component={Link} href="/login" variant="outlined" size="large" color="primary">
              เข้าสู่ระบบ
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          © 2026 SafePay — ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
        </Typography>
      </Box>
    </Box>
  )
}
