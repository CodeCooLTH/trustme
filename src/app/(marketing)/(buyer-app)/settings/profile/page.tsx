// Base: theme/vuexy/typescript-version/full-version/src/app/[lang]/(dashboard)/(private)/pages/account-settings/page.tsx
// + theme/vuexy/typescript-version/full-version/src/views/pages/account-settings/account/AccountDetails.tsx
// Dropped: tabs (security / billing-plans / notifications / connections) — MVP renders Account only.

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Typography from '@mui/material/Typography'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { LinkButton } from '@/app/(marketing)/_components/mui-link'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = { title: 'แก้ไขโปรไฟล์' }

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/settings/profile')

  const userId = (session.user as { id: string }).id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      displayName: true,
      username: true,
      avatar: true,
      phone: true,
      email: true,
    },
  })
  if (!user) redirect('/auth/sign-in')

  return (
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-3xl flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-3 flex-wrap'>
          <div>
            <Typography variant='h5'>แก้ไขโปรไฟล์</Typography>
            <Typography color='text.secondary' className='text-sm'>
              จัดการข้อมูลส่วนตัวของคุณ
            </Typography>
          </div>
          <LinkButton
            href='/dashboard'
            variant='outlined'
            startIcon={<i className='tabler-arrow-left' />}
          >
            กลับหน้าหลัก
          </LinkButton>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  )
}
