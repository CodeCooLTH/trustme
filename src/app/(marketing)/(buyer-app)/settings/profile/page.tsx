// Base: theme/vuexy/typescript-version/full-version/src/views/pages/user-profile/profile/AboutOverview.tsx
// + theme/vuexy/typescript-version/full-version/src/views/pages/user-profile/profile/index.tsx
// Adapted: owner-facing edit surface for /settings/profile — AboutOverview pattern (about + summary)
// plus an avatar card. Dropped teams/connections/activity-timeline (not relevant for self edit).

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Typography from '@mui/material/Typography'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTrustLevel } from '@/services/trust-score.service'

import { LinkButton } from '@/app/(marketing)/_components/mui-link'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = { title: 'แก้ไขโปรไฟล์' }

const dateFmt = new Intl.DateTimeFormat('th-TH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/settings/profile')

  const userId = (session.user as { id: string }).id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { userBadges: true },
  })
  if (!user) redirect('/auth/sign-in')

  const trustLevel = getTrustLevel(user.trustScore)
  const memberSince = dateFmt.format(user.createdAt)
  const badgeCount = user.userBadges.length

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

        <ProfileForm
          user={{
            id: user.id,
            displayName: user.displayName,
            username: user.username,
            avatar: user.avatar,
            phone: user.phone,
            email: user.email,
          }}
          summary={{
            trustScore: user.trustScore,
            trustLevel,
            memberSince,
            badgeCount,
          }}
        />
      </div>
    </div>
  )
}
