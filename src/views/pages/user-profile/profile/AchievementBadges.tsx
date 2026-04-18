// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

type AchievementItem = {
  id: string
  name: string
  nameEN: string
  icon: string
}

// Base: composed from Vuexy ConnectionsTeams card pattern (icon + label chips)
// No direct theme widget exists; reuses the Card + badge row convention from the profile tab.
const AchievementBadges = ({ items }: { items: AchievementItem[] }) => {
  if (items.length === 0) return null

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <Typography className='uppercase' variant='body2' color='text.disabled'>
          Badge ที่ได้รับ
        </Typography>
        <div className='flex flex-wrap gap-3'>
          {items.map((item) => (
            <Tooltip key={item.id} title={item.nameEN}>
              <div className='flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--mui-palette-divider)] bg-[var(--mui-palette-action-hover)]'>
                <i className={`${item.icon} text-xl text-[var(--mui-palette-primary-main)]`} />
                <Typography className='text-sm font-medium'>{item.name}</Typography>
              </div>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AchievementBadges
