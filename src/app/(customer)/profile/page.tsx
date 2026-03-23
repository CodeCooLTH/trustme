import { Header } from '@/components/layouts/Header'
import { Card, CardContent } from '@/components/ui/Card'

export default function ProfilePage() {
  return (
    <>
      <Header title="โปรไฟล์" />
      <div className="p-4 lg:p-6 max-w-2xl">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">หน้าโปรไฟล์อยู่ระหว่างพัฒนา</p></CardContent></Card>
      </div>
    </>
  )
}
