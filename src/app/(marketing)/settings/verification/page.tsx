import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getUserVerifications } from '@/services/verification.service'

import { LinkButton } from '../../_components/mui-link'
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
    <div className='p-6 lg:p-10 min-bs-[100dvh] bg-[var(--mui-palette-background-default)]'>
      <div className='mx-auto max-w-3xl flex flex-col gap-6'>
        <div className='flex items-center justify-between gap-3 flex-wrap'>
          <div>
            <Typography variant='h5'>ยืนยันตัวตน</Typography>
            <Typography color='text.secondary' className='text-sm'>
              ยิ่งยืนยันหลายระดับ ยิ่งได้ Trust Score สูงขึ้น
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

        <VerificationClient
          phoneVerified={!!user.phone}
          records={records.map((r) => ({
            id: r.id,
            type: r.type,
            level: r.level,
            status: r.status as 'PENDING' | 'APPROVED' | 'REJECTED',
            rejectedReason: r.rejectedReason,
            createdAt: r.createdAt,
          }))}
        />
      </div>
    </div>
  )
}
