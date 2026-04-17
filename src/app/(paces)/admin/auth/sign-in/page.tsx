import authCard from '@/assets/images/auth-card-bg.svg'
import authImg from '@/assets/images/auth.jpg'
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
                <div className="card-body relative p-12.5 min-h-[560px]">
                  <div className="mb-7.5 flex flex-col items-center justify-center text-center">
                    <AuthLogo />
                    <h4 className="mt-5 mb-2 text-base font-bold">Deep Admin</h4>
                    <p className="text-default-400 mx-auto w-full lg:w-3/4">
                      เข้าสู่ระบบผู้ดูแลระบบด้วยเบอร์โทรศัพท์
                    </p>
                  </div>

                  <FacebookButton />

                  <p className="relative my-5 text-center text-default-400 after:absolute after:start-0 after:end-0 after:top-2.75 after:h-0.75 after:border-t after:border-b after:border-dashed after:border-default-300">
                    <span className="relative z-10 bg-card font-medium px-4">หรือเข้าสู่ระบบด้วยเบอร์โทร</span>
                  </p>

                  <div className="rounded-md">
                    <SignInForm />

                    <p className="text-default-400 mt-7.5 text-center text-sm">
                      บัญชีแอดมินสร้างโดยทีมงานเท่านั้น
                    </p>

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
