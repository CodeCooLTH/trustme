'use client'
import { redirect } from 'next/navigation'

// ไม่มีหน้า register แยก — ใช้ Facebook login เพื่อทั้ง login และ register
export default function RegisterPage() {
  redirect('/login')
}
