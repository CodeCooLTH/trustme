'use client'

import { useEffect, useRef, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface User {
  id: string
  displayName?: string | null
  username: string
  email: string
  avatarUrl?: string | null
}

export default function BuyerProfileSettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/users/me')
        const data: User = await res.json()

        setUser(data)
        setDisplayName(data.displayName ?? '')
        setUsername(data.username ?? '')
        setAvatarPreview(data.avatarUrl ?? null)
      } catch (err) {
        console.error('fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    const reader = new FileReader()

    reader.onload = ev => setAvatarPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)
    try {
      const body: Record<string, string> = { displayName, username }

      if (avatarPreview && avatarPreview !== user?.avatarUrl) {
        body.avatarUrl = avatarPreview
      }

      await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSuccess(true)
    } catch (err) {
      console.error('save error', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={300}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box maxWidth={600}>
      <Typography variant='h4' mb={4}>
        โปรไฟล์
      </Typography>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            {/* Avatar */}
            <Stack direction='row' alignItems='center' spacing={3}>
              <Avatar
                src={avatarPreview ?? undefined}
                sx={{ width: 80, height: 80, fontSize: 32 }}
              >
                {(displayName || username || '?')[0]?.toUpperCase()}
              </Avatar>
              <Stack spacing={1}>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => fileInputRef.current?.click()}
                >
                  เปลี่ยนรูปโปรไฟล์
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={handleAvatarChange}
                />
                <Typography variant='caption' color='text.secondary'>
                  JPG, PNG ขนาดไม่เกิน 2MB
                </Typography>
              </Stack>
            </Stack>

            {/* Display Name */}
            <TextField
              label='ชื่อที่แสดง'
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              fullWidth
            />

            {/* Username */}
            <TextField
              label='ชื่อผู้ใช้ (username)'
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />

            {/* Email (read-only) */}
            <TextField
              label='อีเมล'
              value={user?.email ?? ''}
              fullWidth
              disabled
              helperText='ไม่สามารถเปลี่ยนอีเมลได้'
            />

            {success && (
              <Typography color='success.main' variant='body2'>
                บันทึกข้อมูลสำเร็จ
              </Typography>
            )}

            <Button
              variant='contained'
              onClick={handleSave}
              disabled={saving}
              sx={{ alignSelf: 'flex-start' }}
            >
              {saving ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
