// Base: theme/vuexy/typescript-version/full-version/src/views/pages/account-settings/index.tsx
//       (outer `<Grid container>` wrapper, header pattern)
// Note: MVP does not use TabContext/TabList — single-panel layout composing multiple
//       account-settings Card sub-components (security/TwoFactorAuthenticationCard.tsx,
//       connections/index.tsx) inside the client component.
// Dropped: Tabs, TabContext, TabPanel — single verification panel only.

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getUserVerifications } from '@/services/verification.service'

import { LinkButton } from '@/app/(marketing)/_components/mui-link'
import VerificationClient from './VerificationClient'

export const metadata: Metadata = { title: 'ยืนยันตัวตน' }

export default async function VerificationSettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/sign-in?callbackUrl=/settings/verification')

  const userId = (session.user as { id: string }).id

  const [user, records] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { phone: true } }),
    getUserVerifications(userId),
  ])

  if (!user) redirect('/auth/sign-in')

  return (
    <>
      <div>
        <Typography variant='h5'>ยืนยันตัวตน</Typography>
        <Typography color='text.secondary' className='text-sm'>
          ยิ่งยืนยันหลายระดับ ยิ่งได้ Trust Score สูงขึ้น
        </Typography>
      </div>

      <VerificationClient
        phoneVerified={!!user.phone}
        records={records.map((r) => ({
          id: r.id,
          type: r.type,
          level: r.level,
          status: r.status as 'PENDING' | 'APPROVED' | 'REJECTED',
          rejectedReason: r.rejectedReason,
          createdAt: r.createdAt.toISOString(),
        }))}
      />
    </>
  )
}
