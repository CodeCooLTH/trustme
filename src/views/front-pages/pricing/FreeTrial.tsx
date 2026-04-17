// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const FreeTrial = () => {
  return (
    <section className='bg-[var(--mui-palette-primary-lightOpacity)]'>
      <div className={classnames('flex justify-between flex-wrap md:relative', frontCommonStyles.layoutSpacing)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className='flex flex-col gap-11 items-center md:items-start justify-center plb-12'>
              <div className='flex flex-col gap-2 max-md:text-center'>
                <Typography variant='h4' color='primary.main' className='font-medium'>
                  ยังไม่แน่ใจ? เริ่มใช้งาน Deep ฟรี ไม่มีค่าใช้จ่าย
                </Typography>
                <Typography>รับสิทธิ์ใช้งานฟีเจอร์ครบถ้วนสำหรับแพ็กเริ่มต้น ฟรีตลอดชีพ ไม่ต้องใส่บัตรเครดิต</Typography>
              </div>
              <div className='flex gap-3 flex-wrap'>
                <Button component={Link} href='/auth/sign-up' variant='contained'>
                  สมัครใช้งาน
                </Button>
                <Button component={Link} href='/auth/sign-in' variant='outlined'>
                  เข้าสู่ระบบ
                </Button>
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className='md:absolute md:inline-end-[90px] xl:inline-end-[2%] flex justify-center block-end-0'>
              <img
                src='/images/illustrations/characters/4.png'
                alt='ผู้ใช้กำลังเริ่มต้นใช้งาน Deep'
                className='bs-[270px]'
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  )
}

export default FreeTrial
