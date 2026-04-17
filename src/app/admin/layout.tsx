import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | SafePay Admin' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
