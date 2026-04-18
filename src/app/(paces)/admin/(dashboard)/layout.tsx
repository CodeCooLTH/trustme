/**
 * Admin authed app shell — Paces VerticalLayout with admin-only AuthGuard.
 *
 * Base: src/app/(paces)/seller/(dashboard)/layout.tsx
 * (seller's same-theme shell; originally from theme/paces/Admin/TS/... — the
 *  project scaffold copied paces wholesale). Adapted by dropping the seller-
 *  specific auto-shop-create block and adding an isAdmin guard.
 */
import { authOptions } from '@/lib/auth'
import VerticalLayout from '@/layouts/VerticalLayout'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { adminMenuItems } from './_admin-menu'

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const user = (session as any)?.user as
    | {
        id: string
        displayName: string
        username: string
        avatar: string | null
        isShop: boolean
        isAdmin: boolean
        trustScore: number
      }
    | undefined

  // No session OR stale token pointing to a non-existent user → re-sign-in.
  if (!session || !user?.id) redirect('/auth/sign-in')
  // Admin-only — non-admins bounced to sign-in (NOT to buyer/seller app).
  if (!user.isAdmin) redirect('/auth/sign-in')

  return <VerticalLayout menuItems={adminMenuItems}>{children}</VerticalLayout>
}
