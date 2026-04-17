import AuthLogo from '@/components/AuthLogo'
import { authOptions } from '@/lib/auth'
import { Icon } from '@iconify/react'
import { getServerSession } from 'next-auth'
import SignOutButton from './components/SignOutButton'

export default async function MyAccountPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-12.5">
        <p className="text-default-400">กรุณาเข้าสู่ระบบ</p>
      </div>
    )
  }

  const user = session.user as {
    id: string
    displayName: string
    username: string
    avatar: string | null
    isShop: boolean
    isAdmin: boolean
    trustScore: number
  }

  const trustScoreColor =
    user.trustScore >= 80
      ? 'text-success'
      : user.trustScore >= 50
        ? 'text-warning'
        : 'text-danger'

  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="card p-7.5 rounded-2xl">
              {/* Header */}
              <div className="mb-6 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <h4 className="font-bold text-base text-dark mt-5 mb-1">
                  สวัสดี {user.displayName}
                </h4>
                <p className="text-default-400 text-sm">@{user.username}</p>
              </div>

              {/* Trust Score Card */}
              <div className="card bg-default-50 p-5 rounded-xl mb-5 flex flex-col items-center text-center">
                <p className="text-default-400 text-sm mb-1">คะแนนความน่าเชื่อถือ</p>
                <span className={`text-5xl font-bold ${trustScoreColor}`}>
                  {user.trustScore}
                </span>
                <p className="text-default-400 text-xs mt-1">จาก 100 คะแนน</p>
              </div>

              {/* Info Rows */}
              <div className="divide-y divide-default-200 mb-6">
                {/* Username */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-default-400 text-sm flex items-center gap-1.5">
                    <Icon icon="mdi:account-outline" className="text-base" />
                    ชื่อผู้ใช้
                  </span>
                  <span className="text-dark text-sm font-medium">@{user.username}</span>
                </div>

                {/* Phone-only badge */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-default-400 text-sm flex items-center gap-1.5">
                    <Icon icon="mdi:phone-outline" className="text-base" />
                    การยืนยันตัวตน
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <Icon icon="mdi:phone-check" className="text-sm" />
                    เบอร์โทร
                  </span>
                </div>

                {/* Verification status */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-default-400 text-sm flex items-center gap-1.5">
                    <Icon icon="mdi:shield-check-outline" className="text-base" />
                    สถานะการยืนยัน
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                    <Icon icon="mdi:check-circle-outline" className="text-sm" />
                    ยืนยันแล้ว
                  </span>
                </div>

                {/* Shop status */}
                {user.isShop && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-default-400 text-sm flex items-center gap-1.5">
                      <Icon icon="mdi:store-outline" className="text-base" />
                      ประเภทบัญชี
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                      <Icon icon="mdi:storefront" className="text-sm" />
                      ร้านค้า
                    </span>
                  </div>
                )}

                {/* Admin badge */}
                {user.isAdmin && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-default-400 text-sm flex items-center gap-1.5">
                      <Icon icon="mdi:shield-crown-outline" className="text-base" />
                      สิทธิ์พิเศษ
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                      <Icon icon="mdi:crown" className="text-sm" />
                      ผู้ดูแลระบบ
                    </span>
                  </div>
                )}
              </div>

              {/* Sign Out */}
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
