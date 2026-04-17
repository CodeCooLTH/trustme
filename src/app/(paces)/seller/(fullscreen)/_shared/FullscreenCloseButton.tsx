'use client'

import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

export default function FullscreenCloseButton() {
  const router = useRouter()

  const onClose = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <button
      type="button"
      onClick={onClose}
      className="btn btn-icon border border-default-300 text-default-900 hover:bg-default-50 flex items-center gap-2 px-4 py-2"
    >
      <Icon icon="mdi:close" width={20} height={20} />
      <span className="hidden sm:inline">ยกเลิก</span>
    </button>
  )
}
