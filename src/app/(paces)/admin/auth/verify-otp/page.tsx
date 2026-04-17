import authCard from '@/assets/images/auth-card-bg.svg'
import authImg from '@/assets/images/auth.jpg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import VerifyOtpForm from './components/VerifyOtpForm'

export const metadata: Metadata = { title: 'ยืนยันรหัส OTP' }

export default function AdminVerifyOtpPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center">
          <div className="xl:w-5/6">
            <div className="absolute end-0 top-0">
              <Image src={authCard} alt="auth-card-bg" />
            </div>
            <div className="absolute start-0 bottom-0 rotate-180">
              <Image src={authCard} alt="auth-card-bg" />
            </div>

            <div className="card rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="card-body relative p-12.5 min-h-[580px]">
                  <div className="mb-7.5 flex flex-col items-center justify-center text-center">
                    <AuthLogo />
                    <h4 className="mt-5 mb-2 text-base font-bold">ยืนยันรหัส OTP</h4>
                    <p className="text-default-400 mx-auto w-full lg:w-3/4">
                      กรอกรหัส 6 หลักที่ส่งไปยังเบอร์ของคุณ
                    </p>
                  </div>

                  <div className="rounded-md">
                    <Suspense fallback={<p className="text-center text-default-400">กำลังโหลด...</p>}>
                      <VerifyOtpForm />
                    </Suspense>

                    <p className="text-default-400 mt-7.5 text-center">
                      &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
                    </p>
                  </div>
                </div>

                <div
                  className="relative hidden h-full overflow-hidden rounded-e-2xl bg-cover bg-center object-cover lg:block"
                  style={{ backgroundImage: `url(${authImg.src})` }}
                >
                  <div className="absolute inset-0 flex items-end justify-center rounded-e-sm p-9 [background:linear-gradient(to_top,#313a46,rgba(49,58,70,.8),rgba(49,58,70,.5))]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
