import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import SellerSidebar from './components/SellerSidebar'
import SellerTopBar from './components/SellerTopBar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/sign-in')

  const user = (session as any).user as {
    id: string
    displayName: string
    username: string
    avatar: string | null
    isShop: boolean
    isAdmin: boolean
    trustScore: number
  }

  // Every seller MUST have a shop — auto-create a default one on first visit
  // so they land on a usable dashboard instead of a "create shop" CTA.
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
    <div className="min-h-screen bg-default-50">
      <SellerTopBar displayName={user.displayName} />
      <div className="flex">
        <SellerSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
