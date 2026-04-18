'use client'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import CustomTextField from '@core/components/mui/TextField'

type Props = {
  user: {
    id: string
    displayName: string
    username: string
    avatar: string | null
    phone: string | null
    email: string | null
  }
}

const schema = Yup.object({
  displayName: Yup.string()
    .min(2, 'อย่างน้อย 2 ตัวอักษร')
    .max(50, 'ไม่เกิน 50 ตัวอักษร')
    .required('กรุณากรอกชื่อที่แสดง'),
})

type FormValues = Yup.InferType<typeof schema>

export default function ProfileForm({ user }: Props) {
  const router = useRouter()
  const [avatar, setAvatar] = useState(user.avatar)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { displayName: user.displayName },
  })

  const onAvatarPicked = async (file: File) => {
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) {
        toast.error('อัพโหลดรูปไม่สำเร็จ')
        return
      }
      const { fileId } = (await res.json()) as { fileId: string }
      const url = `/api/files/${fileId}`

      const save = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: url }),
      })
      if (!save.ok) {
        toast.error('บันทึกรูปไม่สำเร็จ')
        return
      }
      setAvatar(url)
      toast.success('อัพเดตรูปโปรไฟล์แล้ว')
      router.refresh()
    } catch {
      toast.error('อัพโหลดรูปไม่สำเร็จ')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: values.displayName }),
      })
      if (!res.ok) {
        toast.error('บันทึกไม่สำเร็จ')
        return
      }
      toast.success('บันทึกโปรไฟล์แล้ว')
      router.refresh()
    } catch {
      toast.error('บันทึกไม่สำเร็จ')
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' className='mb-6'>
          ข้อมูลส่วนตัว
        </Typography>

        <div className='flex items-center gap-5 mb-6 flex-wrap'>
          <Avatar
            src={avatar ?? undefined}
            alt={user.displayName}
            sx={{ width: 88, height: 88 }}
          >
            {user.displayName.slice(0, 1)}
          </Avatar>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Button
                variant='contained'
                size='small'
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? 'กำลังอัพโหลด…' : 'เปลี่ยนรูป'}
              </Button>
              {avatar && (
                <Button
                  variant='outlined'
                  color='error'
                  size='small'
                  disabled={uploading}
                  onClick={async () => {
                    setUploading(true)
                    try {
                      const res = await fetch('/api/users/me', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ avatar: null }),
                      })
                      if (res.ok) {
                        setAvatar(null)
                        toast.success('ลบรูปแล้ว')
                        router.refresh()
                      } else {
                        toast.error('ลบรูปไม่สำเร็จ')
                      }
                    } finally {
                      setUploading(false)
                    }
                  }}
                >
                  ลบรูป
                </Button>
              )}
            </div>
            <Typography color='text.secondary' className='text-xs'>
              รองรับ JPG, PNG, WEBP — ขนาดไม่เกิน 5MB
            </Typography>
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/jpeg,image/png,image/webp'
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              if (file.size > 5 * 1024 * 1024) {
                toast.error('ไฟล์ต้องไม่เกิน 5MB')
                return
              }
              onAvatarPicked(file)
              e.target.value = ''
            }}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-5'>
          <CustomTextField
            fullWidth
            label='ชื่อที่แสดง'
            placeholder='ชื่อ-นามสกุล หรือชื่อเล่น'
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            {...register('displayName')}
          />
          <CustomTextField
            fullWidth
            label='ชื่อผู้ใช้ (username)'
            value={user.username}
            disabled
            helperText='ไม่สามารถแก้ไขได้หลังจากตั้งค่าแล้ว'
          />
          <CustomTextField
            fullWidth
            label='เบอร์โทรศัพท์'
            value={user.phone ?? ''}
            disabled
            helperText='ยืนยันตัวตนระดับ 1 แล้ว'
          />
          <CustomTextField
            fullWidth
            label='อีเมล'
            value={user.email ?? '-'}
            disabled
            helperText='ยังไม่เปิดให้แก้ไขในเวอร์ชันนี้'
          />

          <div className='flex justify-end'>
            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? 'กำลังบันทึก…' : 'บันทึก'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
