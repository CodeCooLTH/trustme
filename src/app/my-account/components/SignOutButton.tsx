'use client'

import { Icon } from '@iconify/react'
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="btn border border-default-300 text-default-900 hover:bg-default-50 w-full flex items-center justify-center gap-2"
    >
      <Icon icon="mdi:logout" className="text-lg" />
      ออกจากระบบ
    </button>
  )
}
