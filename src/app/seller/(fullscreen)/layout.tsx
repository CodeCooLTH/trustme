import AuthLogo from '@/components/AuthLogo'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import FullscreenCloseButton from './_shared/FullscreenCloseButton'

export default async function FullscreenLayout({ children }: { children: React.ReactNode }) {
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
  if (!session || !user?.id) redirect('/auth/sign-in')

  // Ensure seller has a shop — same invariant as (dashboard)/layout.tsx
  const shop = await prisma.shop.findUnique({
    where: { userId: user.id },
    select: { id: true },
  })
  if (!shop) {
    await prisma.shop.create({
      data: {
        userId: user.id,
        shopName: `ร้านของ ${user.displayName}`,
        businessType: 'INDIVIDUAL',
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-body-bg flex flex-col overflow-hidden">
      <header className="bg-card border-b border-default-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          <div className="flex items-center gap-3">
            <AuthLogo />
          </div>
          <FullscreenCloseButton />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-5xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
