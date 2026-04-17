'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'
import StatusBadge from './StatusBadge'
import VerificationForm from './VerificationForm'

type Status = 'PENDING' | 'APPROVED' | 'REJECTED'

interface LevelCardProps {
  level: 1 | 2 | 3
  title: string
  description: string
  status: Status | 'NOT_SUBMITTED' | 'AUTO_APPROVED'
  rejectedReason?: string | null
  canSubmit: boolean
}

const levelIcons: Record<number, string> = {
  1: 'mdi:phone-check-outline',
  2: 'mdi:card-account-details-outline',
  3: 'mdi:office-building-check-outline',
}

const borderByStatus: Record<string, string> = {
  APPROVED: 'border-success/40',
  AUTO_APPROVED: 'border-success/40',
  PENDING: 'border-warning/40',
  REJECTED: 'border-danger/40',
  NOT_SUBMITTED: 'border-default-200',
}

export default function LevelCard({
  level,
  title,
  description,
  status,
  rejectedReason,
  canSubmit,
}: LevelCardProps) {
  const [showForm, setShowForm] = useState(false)
  const borderCls = borderByStatus[status] ?? 'border-default-200'

  return (
    <div className={`card p-6 rounded-xl border ${borderCls}`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10">
          <Icon icon={levelIcons[level]} width={24} height={24} className="text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-default-400 uppercase tracking-wider">
              Level {level}
            </span>
            {/* Status badge */}
            {status === 'APPROVED' && <StatusBadge status="APPROVED" />}
            {status === 'AUTO_APPROVED' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
                <Icon icon="mdi:check-circle" width={14} height={14} />
                ยืนยันแล้ว อัตโนมัติ
              </span>
            )}
            {status === 'PENDING' && <StatusBadge status="PENDING" />}
            {status === 'REJECTED' && <StatusBadge status="REJECTED" />}
            {status === 'NOT_SUBMITTED' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-default-100 text-default-500">
                <Icon icon="mdi:minus-circle-outline" width={14} height={14} />
                ยังไม่ส่ง
              </span>
            )}
          </div>

          <h3 className="text-dark font-semibold text-base mb-1">{title}</h3>
          <p className="text-default-400 text-sm">{description}</p>

          {/* Rejection reason */}
          {status === 'REJECTED' && rejectedReason && (
            <div className="mt-3 rounded-lg bg-danger/5 border border-danger/20 px-4 py-3 text-sm text-danger">
              <span className="font-semibold">เหตุผล: </span>
              {rejectedReason}
            </div>
          )}

          {/* Form toggle button for submittable levels */}
          {canSubmit && (level === 2 || level === 3) && !showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-4 btn border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Icon icon="mdi:upload-outline" width={16} height={16} />
              อัปโหลดเอกสาร
            </button>
          )}

          {/* Inline form */}
          {showForm && (level === 2 || level === 3) && (
            <VerificationForm level={level} onDone={() => setShowForm(false)} />
          )}
        </div>
      </div>
    </div>
  )
}
