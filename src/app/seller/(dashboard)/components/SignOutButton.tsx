'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 px-4 py-2 text-sm"
    >
      ออกจากระบบ
    </button>
  )
}
