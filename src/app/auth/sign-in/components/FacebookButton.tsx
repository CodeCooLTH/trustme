'use client'

import { Icon } from '@iconify/react'
import { signIn } from 'next-auth/react'

export default function FacebookButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('facebook', { callbackUrl: '/' })}
      className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 w-full flex items-center justify-center gap-2"
    >
      <Icon icon="mdi:facebook" width={18} height={18} className="text-[#1877F2]" />
      <span>เข้าสู่ระบบด้วย Facebook</span>
    </button>
  )
}
