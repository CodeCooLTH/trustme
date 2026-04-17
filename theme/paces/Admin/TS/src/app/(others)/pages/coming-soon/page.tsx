import bgCard from '@/assets/images/auth-card-bg.svg'
import authImg from '@/assets/images/auth.jpg'
import logoBlack from '@/assets/images/logo-black.png'
import logo from '@/assets/images/logo.png'
import Icon from '@/components/wrappers/Icon'
import { currentYear, META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CountdownTimer from './components/CountdownTimer'

export const metadata: Metadata = { title: 'Coming Soon' }

const Page = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex h-full w-full">
          <div className="min-w-full md:min-w-160">
            <div className="card relative flex min-h-screen flex-col justify-between rounded-none p-12.5">
              <div className="absolute end-0 top-0">
                <Image src={bgCard} className="w-45" alt="auth-card-bg" />
              </div>
              <Link href="/" className="auth-logo flex justify-center">
                <img src={logoBlack.src} alt="logo" className="flex dark:hidden" />
                <img src={logo.src} alt="dark logo" className="hidden dark:flex" />
              </Link>
              <div>
                <h3 className="my-2.5 text-center text-xl font-bold">Something Exciting is Coming</h3>
                <p className="text-default-400 text-center">We’re working hard to bring you something amazing. Stay tuned!</p>
                <div className="my-7.5">
                  <CountdownTimer />
                </div>
                <div className="bg-[linear-gradient(90deg,#6658dd_0%,#f1556c_100%)] bg-clip-text text-center text-lg! font-bold text-transparent" data-text="Stay tunned!">
                  Stay tunned!
                </div>
                <div className="relative mx-auto mt-5 flex w-auto items-center overflow-hidden rounded-md lg:w-sm">
                  <input type="text" placeholder="Enter email..." className="border-default-300 text-default-500 w-full rounded-md border py-3 ps-10 pe-28 text-sm font-semibold" />
                  <Icon icon="mail" className="text-default-400 absolute start-3 text-lg" />
                  <button type="button" className="bg-secondary absolute end-0 rounded-md rounded-s-none px-6 py-3.25 text-sm font-medium text-white transition">
                    Notify me!
                  </button>
                </div>
              </div>
              <p className="text-default-400 mt-7.5 text-center">
                © {currentYear} {META_DATA.name} - by
                <span className="font-bold">{META_DATA.author}</span>
              </p>
            </div>
          </div>
          <div className="hidden w-full md:block">
            <div className="relative h-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${authImg.src})` }}>
              <div className="from-default-800 via-default-800/80 to-default-800/50 absolute inset-0 flex items-end justify-center bg-linear-to-t p-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
