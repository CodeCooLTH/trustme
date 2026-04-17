import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Auth',
    template: '%s | SafePay',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
