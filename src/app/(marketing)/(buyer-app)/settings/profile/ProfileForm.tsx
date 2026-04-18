'use client'

// Base: theme/vuexy/typescript-version/full-version/src/views/pages/account-settings/account/AccountDetails.tsx
// Kept: avatar upload (Upload/Reset), Grid layout, CustomTextField, Save/Reset action row.
// Dropped: firstName/lastName (we use single displayName), organization, role, country, state, address,
//   zipCode, language, timezone, currency — not in SafePay MVP user schema.
// Added: username/phone/email (read-only), email shown as "coming soon", avatar upload wired to
//   POST /api/upload → PATCH /api/users/me, Save submits PATCH /api/users/me { displayName }.

// React Imports
import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

// Component Imports
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
    .trim()
    .min(2, 'อย่างน้อย 2 ตัวอักษร')
    .max(50, 'ไม่เกิน 50 ตัวอักษร')
    .required('กรุณากรอกชื่อที่แสดง'),
})

type FormValues = Yup.InferType<typeof schema>

const ProfileForm = ({ user }: Props) => {
  const router = useRouter()

  // States (mirror Vuexy AccountDetails structure)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>(user.avatar ?? '/images/avatars/1.png')
  const [uploading, setUploading] = useState<boolean>(false)
  const initialAvatarRef = useRef<string | null>(user.avatar)
  const fileInputElRef = useRef<HTMLInputElement | null>(null)

  // Hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { displayName: user.displayName },
  })

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.size > 5 * 1024 * 1024) {
      toast.error('ไฟล์ต้องไม่เกิน 5MB')
      event.target.value = ''
      return
    }

    // Optimistic preview (Vuexy pattern)
    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result as string)
      setFileInput(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload + save
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

      initialAvatarRef.current = url
      setImgSrc(url)
      toast.success('อัพเดตรูปโปรไฟล์แล้ว')
      router.refresh()
    } catch {
      toast.error('อัพโหลดรูปไม่สำเร็จ')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const handleFileInputReset = async () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
    if (initialAvatarRef.current === null) return

    setUploading(true)
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: null }),
      })
      if (!res.ok) {
        toast.error('ลบรูปไม่สำเร็จ')
        return
      }
      initialAvatarRef.current = null
      toast.success('ลบรูปแล้ว')
      router.refresh()
    } catch {
      toast.error('ลบรูปไม่สำเร็จ')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: values.displayName.trim() }),
      })
      if (!res.ok) {
        toast.error('บันทึกไม่สำเร็จ')
        return
      }
      toast.success('บันทึกโปรไฟล์แล้ว')
      reset({ displayName: values.displayName.trim() })
      router.refresh()
    } catch {
      toast.error('บันทึกไม่สำเร็จ')
    }
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img
            height={100}
            width={100}
            className='rounded object-cover'
            src={imgSrc}
            alt={user.displayName}
          />
          <div className='flex grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                component='label'
                variant='contained'
                htmlFor='account-settings-upload-image'
                disabled={uploading}
              >
                {uploading ? 'กำลังอัพโหลด…' : 'เปลี่ยนรูปโปรไฟล์'}
                <input
                  ref={fileInputElRef}
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg, image/webp'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button
                variant='tonal'
                color='secondary'
                onClick={handleFileInputReset}
                disabled={uploading}
              >
                รีเซ็ต
              </Button>
            </div>
            <Typography>รองรับ JPG, PNG, WEBP — ขนาดไม่เกิน 5MB</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='ชื่อที่แสดง'
                placeholder='ชื่อ-นามสกุล หรือชื่อเล่น'
                error={!!errors.displayName}
                helperText={errors.displayName?.message}
                {...register('displayName')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='ชื่อผู้ใช้ (username)'
                value={user.username}
                disabled
                helperText='ไม่สามารถแก้ไขได้หลังจากตั้งค่าแล้ว'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='เบอร์โทรศัพท์'
                value={user.phone ?? ''}
                disabled
                helperText='ยืนยันตัวตนระดับ 1 แล้ว'
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='อีเมล'
                value={user.email ?? '-'}
                disabled
                helperText='ยังไม่เปิดให้แก้ไขในเวอร์ชันนี้'
              />
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4 flex-wrap'>
              <Button
                variant='contained'
                type='submit'
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? 'กำลังบันทึก…' : 'บันทึก'}
              </Button>
              <Button
                variant='tonal'
                type='reset'
                color='secondary'
                onClick={() => reset({ displayName: user.displayName })}
                disabled={isSubmitting}
              >
                รีเซ็ต
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm
