import { Header } from '@/components/layouts/Header'
import { EmptyState } from '@/components/ui/EmptyState'
import { Scale } from 'lucide-react'

export default function DisputesPage() {
  return (
    <>
      <Header title="ข้อพิพาท" />
      <div className="p-4 lg:p-6">
        <EmptyState icon={Scale} title="ดูข้อพิพาทได้จากหน้าออเดอร์" />
      </div>
    </>
  )
}
