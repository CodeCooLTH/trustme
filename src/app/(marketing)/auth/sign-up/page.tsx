import type { Metadata } from 'next'

import SignUpCard from './SignUpCard'

export const metadata: Metadata = { title: 'สมัครสมาชิก' }

export default function SignUpPage() {
  return <SignUpCard />
}
