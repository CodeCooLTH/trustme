import type { Metadata } from 'next'

import AuthToastMount from './AuthToastMount'

export const metadata: Metadata = {
  title: {
    default: 'Auth',
    template: '%s | Deep',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthToastMount />
      {children}
    </>
  )
}
