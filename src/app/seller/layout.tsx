import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'ผู้ขาย', template: '%s | SafePay ผู้ขาย' },
}

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
