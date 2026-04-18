// MUI Imports
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

export type ProfileHeaderData = {
  coverImg: string
  profileImg?: string | null
  fullName: string
  username: string
  memberSince: string
  shopName?: string | null
  trustScore: number
  trustLevel: string
  trustColor: 'success' | 'info' | 'warning' | 'error'
  maxVerifyLevel: number
  stats: {
    completedOrders: number
    reviews: number
    badges: number
  }
}

// Base: theme/vuexy/typescript-version/full-version/src/views/pages/user-profile/UserProfileHeader.tsx
// Adapted: dropped "Connected" CTA, added trust score panel + verification chip + stats
const UserProfileHeader = ({ data }: { data: ProfileHeaderData }) => {
  return (
    <Card>
      <CardMedia image={data.coverImg} className='bs-[150px] sm:bs-[200px] md:bs-[250px]' />
      <CardContent className='flex gap-5 justify-center flex-col items-center md:items-end md:flex-row !pt-0 md:justify-start'>
        <div className='flex rounded-bs-md mbs-[-24px] sm:mbs-[-40px] border-[5px] mis-[-5px] border-be-0 border-backgroundPaper bg-backgroundPaper'>
          <Avatar
            src={data.profileImg ?? undefined}
            alt={data.fullName}
            variant='rounded'
            sx={{ height: 120, width: 120, borderRadius: 1 }}
          >
            {data.fullName.slice(0, 1)}
          </Avatar>
        </div>
        <div className='flex is-full justify-start self-end flex-col items-center gap-6 sm:gap-0 sm:flex-row sm:justify-between sm:items-end'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <div className='flex items-center gap-2 flex-wrap justify-center sm:justify-start'>
              <Typography variant='h4'>{data.fullName}</Typography>
              {data.maxVerifyLevel >= 1 && (
                <Tooltip title='ยืนยันตัวตนแล้ว'>
                  <span className='inline-flex items-center text-[var(--mui-palette-primary-main)]'>
                    <i className='tabler-rosette-discount-check text-2xl' />
                  </span>
                </Tooltip>
              )}
            </div>
            <Typography color='text.secondary'>@{data.username}</Typography>
            <div className='flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-normal'>
              {data.shopName && (
                <div className='flex items-center gap-2'>
                  <i className='tabler-building-store' />
                  <Typography className='font-medium'>{data.shopName}</Typography>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <i className='tabler-calendar' />
                <Typography className='font-medium'>สมาชิกตั้งแต่ {data.memberSince}</Typography>
              </div>
            </div>
            <div className='flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-normal mt-2'>
              <div className='flex items-center gap-1.5'>
                <i className='tabler-shopping-bag text-[var(--mui-palette-text-secondary)]' />
                <Typography className='font-medium'>{data.stats.completedOrders}</Typography>
                <Typography color='text.secondary' className='text-sm'>
                  ออเดอร์สำเร็จ
                </Typography>
              </div>
              <div className='flex items-center gap-1.5'>
                <i className='tabler-message-2 text-[var(--mui-palette-text-secondary)]' />
                <Typography className='font-medium'>{data.stats.reviews}</Typography>
                <Typography color='text.secondary' className='text-sm'>
                  รีวิว
                </Typography>
              </div>
              <div className='flex items-center gap-1.5'>
                <i className='tabler-award text-[var(--mui-palette-text-secondary)]' />
                <Typography className='font-medium'>{data.stats.badges}</Typography>
                <Typography color='text.secondary' className='text-sm'>
                  Badge
                </Typography>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center text-center gap-1 bg-[var(--mui-palette-action-hover)] rounded-xl p-5 w-full sm:w-auto sm:min-is-[180px]'>
            <Typography color='text.secondary' className='text-xs'>
              Trust Score
            </Typography>
            <Typography
              variant='h3'
              color={`${data.trustColor}.main`}
              className='!font-bold !leading-none'
            >
              {data.trustScore}
            </Typography>
            <Chip color={data.trustColor} size='small' label={`ระดับ ${data.trustLevel}`} className='mt-1' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
