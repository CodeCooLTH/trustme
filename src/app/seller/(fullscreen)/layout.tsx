import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

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
    <div className="fixed inset-0 z-50 bg-card flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="w-full p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
