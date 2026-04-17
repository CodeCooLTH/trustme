import authCard from '@/assets/images/auth-card-bg.svg'
import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import FacebookButton from './components/FacebookButton'
import OAuthErrorToast from './components/OAuthErrorToast'
import SignInForm from './components/SignInForm'

export const metadata: Metadata = { title: 'เข้าสู่ระบบ Admin' }

export default function AdminSignInPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <Suspense fallback={null}>
        <OAuthErrorToast />
      </Suspense>
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="absolute end-0 top-0">
              <Image src={authCard} alt="auth-card-bg" />
            </div>
            <div className="absolute start-0 bottom-0 rotate-180">
              <Image src={authCard} alt="auth-card-bg" />
            </div>

            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <h4 className="font-bold text-base text-dark mt-5 mb-2">
                  SafePay Admin
                </h4>
                <p className="text-default-400 mx-auto w-full lg:w-3/4 mb-4">
                  เข้าสู่ระบบผู้ดูแลระบบด้วยเบอร์โทรศัพท์
                </p>
              </div>

              <FacebookButton />

              <p className="relative my-5 text-center text-default-400 after:absolute after:start-0 after:end-0 after:top-2.75 after:h-0.75 after:border-t after:border-b after:border-dashed after:border-default-300">
                <span className="relative z-10 font-medium bg-card px-4">
                  หรือเข้าสู่ระบบด้วยเบอร์โทร
                </span>
              </p>

              <SignInForm />

              <p className="text-default-400 mt-7.5 text-center text-sm">
                บัญชีแอดมินสร้างโดยทีมงานเท่านั้น
              </p>
            </div>

            <p className="text-default-400 mt-7.5 text-center">
              &copy; {currentYear} {META_DATA.name} - by <span>{META_DATA.author}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
