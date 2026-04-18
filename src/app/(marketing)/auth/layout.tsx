import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Auth',
    template: '%s | Deep',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
