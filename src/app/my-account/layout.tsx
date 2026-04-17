import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'บัญชีของฉัน' }

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
