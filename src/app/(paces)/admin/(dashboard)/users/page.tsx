/**
 * Admin /users list — server component.
 *
 * Base: theme/paces/Admin/TS/src/app/(admin)/apps/users/contacts/page.tsx
 * (Paces contacts-style user list). Card-grid layout swapped for a DataTable
 * to show tabular columns the admin needs (trust score, verification level,
 * flags, registration date). Search input + filter chip row kept from theme;
 * table body uses the same-theme paces DataTable pattern adopted for seller
 * customers.
 *
 * Data: direct Prisma (server→server) — /api/admin/users is the HTTP shape
 * used by clients; for this RSC a direct call is simpler. AuthGuard for
 * isAdmin is enforced by the parent (dashboard) layout (A1).
 */

import PageBreadcrumb from '@/components/PageBreadcrumb'
import { prisma } from '@/lib/prisma'
import { getTrustLevel } from '@/services/trust-score.service'
import type { Metadata } from 'next'
import UsersTable from './components/UsersTable'
import type { AdminUserRow } from './components/data'

export const metadata: Metadata = { title: 'ผู้ใช้งาน' }

const thDate = (d: Date): string =>
  new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)

// Resolve the buyer-facing URL for /u/{username} profile links. Admin runs on
// `admin.<buyerHost>`; strip the prefix. Falls back to the relative path when
// no absolute base is resolvable on the server (then the anchor opens on the
// admin subdomain, which 404s for /u/* — acceptable fallback since the env
// var is set in dev + prod).
const resolveProfileUrl = (username: string): string => {
  const envUrl = process.env.NEXT_PUBLIC_BUYER_URL
  if (envUrl) return `${envUrl.replace(/\/$/, '')}/u/${username}`
  return `/u/${username}`
}

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      verifications: {
        where: { status: 'APPROVED' },
        select: { level: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  const rows: AdminUserRow[] = users.map((u) => {
    const maxLevel = u.verifications.length
      ? Math.max(...u.verifications.map((v) => v.level))
      : 0
    const clamped = (Math.max(0, Math.min(3, maxLevel)) as 0 | 1 | 2 | 3)
    return {
      id: u.id,
      displayName: u.displayName,
      username: u.username,
      avatar: u.avatar,
      phone: u.phone,
      email: u.email,
      trustScore: u.trustScore,
      trustLevel: getTrustLevel(u.trustScore),
      maxVerifiedLevel: clamped,
      isShop: u.isShop,
      isAdmin: u.isAdmin,
      createdAt: u.createdAt.toISOString(),
      createdAtTh: thDate(u.createdAt),
      profileUrl: resolveProfileUrl(u.username),
    }
  })

  return (
    <>
      <PageBreadcrumb title="ผู้ใช้งาน" trail={[{ label: 'Admin' }, { label: 'People' }]} />
      <UsersTable users={rows} />
    </>
  )
}
