'use client'

import { Icon } from '@iconify/react'
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="btn border border-default-300 text-default-900 hover:bg-default-50 flex items-center gap-2 px-4 py-2"
    >
      <Icon icon="mdi:logout" width={18} height={18} />
      <span>ออกจากระบบ</span>
    </button>
  )
}
