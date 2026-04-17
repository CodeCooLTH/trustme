import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Auth',
    template: '%s | Deep ผู้ขาย',
  },
}

export default function SellerAuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
