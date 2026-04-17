import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center p-12.5">
      <div className="container">
        <div className="flex justify-center px-2.5">
          <div className="2xl:w-4/10 md:w-1/2 sm:w-2/3 w-full">
            <div className="card p-7.5 rounded-2xl">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <AuthLogo />
                <h4 className="font-bold text-base text-dark mt-5 mb-2">
                  {META_DATA.name}
                </h4>
                <p className="text-default-400 mx-auto w-full lg:w-3/4 mb-6">
                  ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/sign-in"
                  className="btn bg-primary py-3 font-semibold text-white hover:bg-primary-hover text-center"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 py-3 font-semibold text-center"
                >
                  สมัครสมาชิก
                </Link>
              </div>
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
