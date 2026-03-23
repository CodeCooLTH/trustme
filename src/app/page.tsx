import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">SafePay</span>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">เข้าสู่ระบบ</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">สมัครสมาชิก</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          ซื้อขายออนไลน์<br />
          <span className="text-primary">ปลอดภัยทุกดีล</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          ระบบ Escrow ตัวกลางพักเงิน ผู้ซื้อมั่นใจว่าได้ของ ผู้ขายมั่นใจว่าได้เงิน
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">เริ่มต้นใช้งาน</Button>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-foreground mb-12">ทำงานอย่างไร</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'สร้างดีล', desc: 'ผู้ขายสร้างรายการสินค้าและส่งลิงก์ให้ผู้ซื้อ', icon: '🏷️' },
            { step: '2', title: 'ชำระเงิน', desc: 'ผู้ซื้อโอนเงินมาที่ SafePay ระบบพักเงินไว้', icon: '💰' },
            { step: '3', title: 'จัดส่งสินค้า', desc: 'ผู้ขายจัดส่งสินค้าพร้อมเลข tracking', icon: '📦' },
            { step: '4', title: 'ปล่อยเงิน', desc: 'ผู้ซื้อยืนยันรับ ระบบโอนเงินให้ผู้ขาย', icon: '✅' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">{item.step}</div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          SafePay Escrow Marketplace
        </div>
      </footer>
    </div>
  )
}
