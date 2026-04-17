import logoDark from '@/assets/images/logo-black.png'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'

const AuthLogo = () => {
  return (
    <>
      <Link href="/" className="auth-logo">
        <img src={logoDark.src} alt="logo" className="flex dark:hidden" />
        <img src={logo.src} alt="dark logo" className="hidden dark:flex" />
      </Link>
    </>
  )
}

export default AuthLogo
