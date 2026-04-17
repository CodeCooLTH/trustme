import { Icon } from '@iconify/react'

type BadgeColor = 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'secondary'

type BadgeChipProps = {
  icon: string
  label: string
  color: BadgeColor
}

const COLOR_MAP: Record<BadgeColor, string> = {
  primary: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  info: 'bg-info/15 text-info',
  danger: 'bg-danger/15 text-danger',
  secondary: 'bg-secondary/15 text-secondary',
}

const BadgeChip = ({ icon, label, color }: BadgeChipProps) => {
  return (
    <span className={`badge ${COLOR_MAP[color]} rounded-full inline-flex items-center gap-1.5`}>
      <Icon icon={icon} className="size-4" />
      {label}
    </span>
  )
}

export default BadgeChip
