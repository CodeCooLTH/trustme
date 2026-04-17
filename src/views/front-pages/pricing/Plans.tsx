// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Types
type FeatureType = {
  feature: string
  starter: boolean
  pro: boolean
  enterprise: boolean
  addOnAvailable: {
    starter: boolean
    pro: boolean
    enterprise: boolean
  }
}
type PlanType = {
  variant: 'tonal' | 'contained'
  label: string
  plan: 'starter' | 'pro' | 'enterprise'
}

// Data
const features: FeatureType[] = [
  {
    feature: 'ยืนยันตัวตนด้วย OTP',
    starter: true,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Trust Score พื้นฐาน',
    starter: true,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Trust Score แบบละเอียด',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'สร้าง Order ต่อเดือน',
    starter: true,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Order ไม่จำกัด',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'ยืนยันเอกสารระดับ L2',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'ยืนยันจดทะเบียนธุรกิจ L3',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Achievement Badge ครบชุด',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'หลายร้านต่อบัญชี',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'รายงานยอดขายและรีวิว',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Priority support 24/7',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'API integration',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  }
]

const plans: PlanType[] = [
  { variant: 'tonal', label: 'เลือกแพ็กนี้', plan: 'starter' },
  { variant: 'contained', label: 'เลือกแพ็กนี้', plan: 'pro' },
  { variant: 'tonal', label: 'เลือกแพ็กนี้', plan: 'enterprise' }
]

const Plans = () => {
  return (
    <section className='md:plb-[100px] plb-[50px] bg-backgroundPaper'>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col text-center gap-2 mbe-6'>
          <Typography variant='h3'>เลือกแพ็กเกจที่เหมาะกับคุณที่สุด</Typography>
          <Typography>มั่นใจได้ เรามีการันตีคืนเงินภายใน 30 วัน</Typography>
        </div>
        <div className='overflow-x-auto border-x border-be rounded'>
          <table className={tableStyles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <>ฟีเจอร์</>
                  <Typography variant='body2' className='capitalize'>
                    ฟีเจอร์ของ Deep
                  </Typography>
                </th>
                <th>
                  <>เริ่มต้น</>
                  <Typography variant='body2' className='capitalize'>
                    ฟรี
                  </Typography>
                </th>
                <th>
                  <div className='flex justify-center gap-x-2'>
                    <>ธุรกิจ</>
                    <CustomAvatar size={20} color='primary'>
                      <i className='tabler-star text-[14px]' />
                    </CustomAvatar>
                  </div>
                  <Typography variant='body2' className='capitalize'>
                    ฿219/เดือน
                  </Typography>
                </th>
                <th>
                  <>องค์กร</>
                  <Typography variant='body2' className='capitalize'>
                    ฿790/เดือน
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody className={classnames('border-be', styles.tableBody)}>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td>
                    <Typography color='text.primary'>{feature.feature}</Typography>
                  </td>
                  <td className='flex items-center justify-center'>
                    {feature.starter ? (
                      <CustomAvatar skin='light' color='primary' size={20}>
                        <i className='tabler-check text-primary text-[14px]' />
                      </CustomAvatar>
                    ) : (
                      <CustomAvatar skin='light' color='secondary' size={20}>
                        <i className='tabler-x text-[14px]' />
                      </CustomAvatar>
                    )}
                  </td>
                  <td>
                    <div className='flex items-center justify-center'>
                      {feature.pro ? (
                        <CustomAvatar skin='light' color='primary' size={20}>
                          <i className='tabler-check text-primary text-[14px]' />
                        </CustomAvatar>
                      ) : feature.addOnAvailable.pro && !feature.pro ? (
                        <Chip variant='tonal' size='small' color='primary' label='มีให้เลือกเพิ่ม' />
                      ) : (
                        <CustomAvatar skin='light' color='secondary' size={20}>
                          <i className='tabler-x text-[14px]' />
                        </CustomAvatar>
                      )}
                    </div>
                  </td>
                  <td className='flex items-center justify-center'>
                    {feature.enterprise ? (
                      <CustomAvatar skin='light' color='primary' size={20}>
                        <i className='tabler-check text-primary text-[14px]' />
                      </CustomAvatar>
                    ) : (
                      <CustomAvatar skin='light' color='secondary' size={20}>
                        <i className='tabler-x text-[14px]' />
                      </CustomAvatar>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                {plans.map((plan, index) => (
                  <td key={index} className='text-center plb-[9px]'>
                    <Button component={Link} href='/auth/sign-up' variant={plan.variant}>
                      {plan.label}
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Plans
