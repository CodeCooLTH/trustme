'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const MESSAGES: Record<string, string> = {
  OAuthSignin: 'เชื่อมต่อ Facebook ไม่สำเร็จ ลองอีกครั้ง',
  OAuthCallback: 'Facebook ปฏิเสธการเข้าสู่ระบบ',
  OAuthCreateAccount: 'สร้างบัญชีจาก Facebook ไม่สำเร็จ',
  AccessDenied: 'การเข้าสู่ระบบถูกปฏิเสธ',
}

export default function OAuthErrorToast() {
  const params = useSearchParams()
  const err = params.get('error')

  useEffect(() => {
    if (!err) return
    toast.error(MESSAGES[err] ?? 'เข้าสู่ระบบไม่สำเร็จ ลองอีกครั้ง')
  }, [err])

  return null
}
