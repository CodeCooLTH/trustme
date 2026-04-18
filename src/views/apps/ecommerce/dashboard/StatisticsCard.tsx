// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

/**
 * Base: theme/vuexy/typescript-version/full-version/src/views/apps/ecommerce/dashboard/StatisticsCard.tsx
 * Adapted: 4 buyer stats — total orders / completed / reviews given / badges earned.
 */

type DataType = {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

type Props = {
  totalOrders: number
  completedOrders: number
  reviewsGiven: number
  badgesEarned: number
}

const StatisticsCard = ({ totalOrders, completedOrders, reviewsGiven, badgesEarned }: Props) => {
  const data: DataType[] = [
    {
      stats: `${totalOrders}`,
      title: 'คำสั่งซื้อทั้งหมด',
      color: 'primary',
      icon: 'tabler-shopping-bag'
    },
    {
      color: 'success',
      stats: `${completedOrders}`,
      title: 'สำเร็จแล้ว',
      icon: 'tabler-circle-check'
    },
    {
      color: 'warning',
      stats: `${reviewsGiven}`,
      title: 'รีวิวที่ให้',
      icon: 'tabler-star'
    },
    {
      stats: `${badgesEarned}`,
      color: 'info',
      title: 'Badge ที่ได้รับ',
      icon: 'tabler-award'
    }
  ]

  return (
    <Card>
      <CardHeader
        title='สถิติของคุณ'
        action={
          <Typography variant='subtitle2' color='text.disabled'>
            อัปเดตล่าสุด
          </Typography>
        }
      />
      <CardContent className='flex justify-between flex-wrap gap-4 md:pbs-10 max-md:pbe-6 max-[1060px]:pbe-[74px] max-[1200px]:pbe-[52px] max-[1320px]:pbe-[74px] max-[1501px]:pbe-[52px]'>
        <Grid container spacing={4} sx={{ inlineSize: '100%' }}>
          {data.map((item, index) => (
            <Grid key={index} size={{ xs: 6, sm: 3 }} className='flex items-center gap-4'>
              <CustomAvatar color={item.color} variant='rounded' size={40} skin='light'>
                <i className={item.icon}></i>
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>{item.stats}</Typography>
                <Typography variant='body2'>{item.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
