'use client'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

type VerificationRecord = {
  id: string
  type: string
  level: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  rejectedReason: string | null
  createdAt: string | Date
}

type Props = {
  phoneVerified: boolean
  records: VerificationRecord[]
}

function levelStatus(records: VerificationRecord[], level: number) {
  const list = records.filter((r) => r.level === level)
  const approved = list.find((r) => r.status === 'APPROVED')
  if (approved) return { state: 'APPROVED' as const, record: approved }
  const pending = list.find((r) => r.status === 'PENDING')
  if (pending) return { state: 'PENDING' as const, record: pending }
  const rejected = list.find((r) => r.status === 'REJECTED')
  if (rejected) return { state: 'REJECTED' as const, record: rejected }
  return { state: 'NONE' as const, record: null }
}

async function uploadFile(file: File): Promise<string | null> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: form })
  if (!res.ok) return null
  const { fileId } = (await res.json()) as { fileId: string }
  return fileId
}

export default function VerificationClient({ phoneVerified, records }: Props) {
  const router = useRouter()
  const l2 = levelStatus(records, 2)
  const l3 = levelStatus(records, 3)

  const [submittingL2, setSubmittingL2] = useState(false)
  const [submittingL3, setSubmittingL3] = useState(false)
  const [idCardFile, setIdCardFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [bizFile, setBizFile] = useState<File | null>(null)
  const idCardInput = useRef<HTMLInputElement | null>(null)
  const selfieInput = useRef<HTMLInputElement | null>(null)
  const bizInput = useRef<HTMLInputElement | null>(null)

  const submitL2 = async () => {
    if (!idCardFile || !selfieFile) {
      toast.error('กรุณาอัพโหลดทั้งบัตรประชาชนและเซลฟี่')
      return
    }
    setSubmittingL2(true)
    try {
      const [idCardId, selfieId] = await Promise.all([
        uploadFile(idCardFile),
        uploadFile(selfieFile),
      ])
      if (!idCardId || !selfieId) {
        toast.error('อัพโหลดรูปไม่สำเร็จ')
        return
      }
      const res = await fetch('/api/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ID_CARD',
          level: 2,
          documents: { idCard: idCardId, selfie: selfieId },
        }),
      })
      if (!res.ok) {
        toast.error('ส่งเอกสารไม่สำเร็จ')
        return
      }
      toast.success('ส่งเอกสารแล้ว รอแอดมินตรวจสอบ')
      setIdCardFile(null)
      setSelfieFile(null)
      router.refresh()
    } finally {
      setSubmittingL2(false)
    }
  }

  const submitL3 = async () => {
    if (!bizFile) {
      toast.error('กรุณาอัพโหลดเอกสารจดทะเบียนธุรกิจ')
      return
    }
    setSubmittingL3(true)
    try {
      const docId = await uploadFile(bizFile)
      if (!docId) {
        toast.error('อัพโหลดเอกสารไม่สำเร็จ')
        return
      }
      const res = await fetch('/api/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'BUSINESS_REG',
          level: 3,
          documents: { doc: docId },
        }),
      })
      if (!res.ok) {
        toast.error('ส่งเอกสารไม่สำเร็จ')
        return
      }
      toast.success('ส่งเอกสารแล้ว รอแอดมินตรวจสอบ')
      setBizFile(null)
      router.refresh()
    } finally {
      setSubmittingL3(false)
    }
  }

  const validateFile = (f: File): boolean => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type) && f.type !== 'application/pdf') {
      toast.error('รองรับเฉพาะ JPG, PNG, WEBP, PDF')
      return false
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('ไฟล์ต้องไม่เกิน 5MB')
      return false
    }
    return true
  }

  return (
    <div className='flex flex-col gap-5'>
      {/* Level 1 */}
      <Card>
        <CardContent>
          <div className='flex items-center justify-between gap-3 flex-wrap'>
            <div>
              <div className='flex items-center gap-2'>
                <Typography variant='h6'>ระดับ 1 — ยืนยันตัวตนพื้นฐาน</Typography>
                <Chip size='small' label='L1' color='info' variant='outlined' />
              </div>
              <Typography color='text.secondary' className='text-sm mt-1'>
                ยืนยันเบอร์โทรและอีเมลเพื่อเริ่มต้น
              </Typography>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-3'>
            <div className='flex items-center justify-between gap-3 p-3 rounded-md border border-[var(--mui-palette-divider)]'>
              <div className='flex items-center gap-3'>
                <i className='tabler-phone text-xl text-[var(--mui-palette-primary-main)]' />
                <Typography className='text-sm'>เบอร์โทรศัพท์</Typography>
              </div>
              <Chip
                size='small'
                color={phoneVerified ? 'success' : 'default'}
                label={phoneVerified ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน'}
              />
            </div>
            <div className='flex items-center justify-between gap-3 p-3 rounded-md border border-[var(--mui-palette-divider)]'>
              <div className='flex items-center gap-3'>
                <i className='tabler-mail text-xl text-[var(--mui-palette-primary-main)]' />
                <Typography className='text-sm'>อีเมล</Typography>
              </div>
              <Chip size='small' label='เร็วๆ นี้' variant='outlined' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level 2 */}
      <Card>
        <CardContent>
          <div className='flex items-center justify-between gap-3 flex-wrap mb-3'>
            <div>
              <div className='flex items-center gap-2'>
                <Typography variant='h6'>ระดับ 2 — บัตรประชาชน + เซลฟี่</Typography>
                <Chip size='small' label='L2' color='info' variant='outlined' />
              </div>
              <Typography color='text.secondary' className='text-sm mt-1'>
                ส่งรูปบัตรประชาชนและเซลฟี่คู่กับบัตร ทีมงานจะตรวจสอบภายใน 1-2 วัน
              </Typography>
            </div>
            <StatusChip state={l2.state} />
          </div>

          {l2.state === 'REJECTED' && l2.record?.rejectedReason && (
            <Typography color='error.main' className='text-sm mb-3'>
              เหตุผลที่ปฏิเสธ: {l2.record.rejectedReason}
            </Typography>
          )}

          {(l2.state === 'NONE' || l2.state === 'REJECTED') && (
            <div className='flex flex-col gap-3'>
              <UploadRow
                label='บัตรประชาชน (ด้านหน้า)'
                file={idCardFile}
                onPick={() => idCardInput.current?.click()}
                onClear={() => setIdCardFile(null)}
              />
              <UploadRow
                label='เซลฟี่คู่กับบัตร'
                file={selfieFile}
                onPick={() => selfieInput.current?.click()}
                onClear={() => setSelfieFile(null)}
              />
              <input
                ref={idCardInput}
                type='file'
                accept='image/jpeg,image/png,image/webp'
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f && validateFile(f)) setIdCardFile(f)
                  e.target.value = ''
                }}
              />
              <input
                ref={selfieInput}
                type='file'
                accept='image/jpeg,image/png,image/webp'
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f && validateFile(f)) setSelfieFile(f)
                  e.target.value = ''
                }}
              />
              <div className='flex justify-end'>
                <Button
                  variant='contained'
                  onClick={submitL2}
                  disabled={submittingL2 || !idCardFile || !selfieFile}
                >
                  {submittingL2 ? 'กำลังส่ง…' : 'ส่งเอกสารตรวจสอบ'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Level 3 */}
      <Card>
        <CardContent>
          <div className='flex items-center justify-between gap-3 flex-wrap mb-3'>
            <div>
              <div className='flex items-center gap-2'>
                <Typography variant='h6'>ระดับ 3 — จดทะเบียนธุรกิจ</Typography>
                <Chip size='small' label='L3' color='info' variant='outlined' />
              </div>
              <Typography color='text.secondary' className='text-sm mt-1'>
                สำหรับผู้ประกอบการที่จดทะเบียนธุรกิจ ส่งเอกสารทางราชการเพื่อยืนยัน
              </Typography>
            </div>
            <StatusChip state={l3.state} />
          </div>

          {l3.state === 'REJECTED' && l3.record?.rejectedReason && (
            <Typography color='error.main' className='text-sm mb-3'>
              เหตุผลที่ปฏิเสธ: {l3.record.rejectedReason}
            </Typography>
          )}

          {(l3.state === 'NONE' || l3.state === 'REJECTED') && (
            <div className='flex flex-col gap-3'>
              <UploadRow
                label='เอกสารจดทะเบียนธุรกิจ (ภพ.20 / ทะเบียนพาณิชย์)'
                file={bizFile}
                onPick={() => bizInput.current?.click()}
                onClear={() => setBizFile(null)}
              />
              <input
                ref={bizInput}
                type='file'
                accept='image/jpeg,image/png,image/webp,application/pdf'
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f && validateFile(f)) setBizFile(f)
                  e.target.value = ''
                }}
              />
              <div className='flex justify-end'>
                <Button
                  variant='contained'
                  onClick={submitL3}
                  disabled={submittingL3 || !bizFile}
                >
                  {submittingL3 ? 'กำลังส่ง…' : 'ส่งเอกสารตรวจสอบ'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatusChip({ state }: { state: 'APPROVED' | 'PENDING' | 'REJECTED' | 'NONE' }) {
  if (state === 'APPROVED') return <Chip size='small' color='success' label='ยืนยันแล้ว' />
  if (state === 'PENDING') return <Chip size='small' color='warning' label='กำลังตรวจสอบ' />
  if (state === 'REJECTED') return <Chip size='small' color='error' label='ถูกปฏิเสธ — ส่งใหม่ได้' />
  return <Chip size='small' label='ยังไม่ยืนยัน' />
}

function UploadRow({
  label,
  file,
  onPick,
  onClear,
}: {
  label: string
  file: File | null
  onPick: () => void
  onClear: () => void
}) {
  return (
    <div className='flex items-center justify-between gap-3 p-3 rounded-md border border-[var(--mui-palette-divider)] flex-wrap'>
      <div className='flex-1 min-w-0'>
        <Typography className='text-sm font-medium'>{label}</Typography>
        <Typography color='text.secondary' className='text-xs truncate'>
          {file ? file.name : 'ยังไม่ได้เลือกไฟล์'}
        </Typography>
      </div>
      <div className='flex gap-2'>
        <Button variant='outlined' size='small' onClick={onPick}>
          เลือกไฟล์
        </Button>
        {file && (
          <Button variant='text' color='error' size='small' onClick={onClear}>
            ล้าง
          </Button>
        )}
      </div>
    </div>
  )
}
