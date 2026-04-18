// Third-party Imports
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// Type Imports
import type { ChildrenType } from '@core/types'

// Auth Imports
import { authOptions } from '@/lib/auth'

export default async function AuthGuard({ children }: ChildrenType) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
