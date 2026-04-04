'use client'

// Next Imports
import { redirect, usePathname } from 'next/navigation'

// Type Imports
import type { Locale } from '@configs/i18n'

const AuthRedirect = ({ lang: _lang }: { lang: Locale }) => {
  const pathname = usePathname()

  // Login is always at /login — middleware handles subdomain rewriting
  const loginPath = '/login'

  const redirectUrl = pathname === loginPath ? loginPath : `${loginPath}?redirectTo=${pathname}`

  return redirect(redirectUrl)
}

export default AuthRedirect
