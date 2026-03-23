import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  Shield, ShieldCheck, Lock, ArrowRight, CheckCircle,
  Package, Truck, CreditCard, Scale, Star, Users,
  Clock, Eye, Landmark, BadgeCheck, HeartHandshake,
  Phone, Mail, MapPin, ChevronRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground tracking-tight">SafePay</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">วิธีการทำงาน</a>
            <a href="#features" className="hover:text-foreground transition-colors">ฟีเจอร์</a>
            <a href="#why-safepay" className="hover:text-foreground transition-colors">ทำไมต้อง SafePay</a>
            <a href="#faq" className="hover:text-foreground transition-colors">คำถามที่พบบ่อย</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">เริ่มต้นใช้งาน</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-indigo-50/50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>ระบบ Escrow ที่ได้รับความไว้วางใจ</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              ซื้อขายออนไลน์<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ปลอดภัยทุกดีล
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ระบบตัวกลางพักเงินสำหรับการซื้อขายออนไลน์ ผู้ซื้อมั่นใจว่าได้ของ
              ผู้ขายมั่นใจว่าได้เงิน ทุกธุรกรรมมีระบบ Escrow ค้ำประกัน
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  เริ่มต้นใช้งานฟรี
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  ดูวิธีการทำงาน
                </Button>
              </a>
            </div>

            {/* Trust stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16">
              {[
                { icon: ShieldCheck, value: '100%', label: 'ปลอดภัย' },
                { icon: Clock, value: '24/7', label: 'ติดตามได้ตลอดเวลา' },
                { icon: CreditCard, value: '0฿', label: 'ค่าธรรมเนียม' },
                { icon: Eye, value: 'โปร่งใส', label: 'ทุกขั้นตอน' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-20 lg:py-24">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-2">ขั้นตอนง่ายๆ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">ทำงานอย่างไร</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              เพียง 4 ขั้นตอน ก็สามารถซื้อขายออนไลน์ได้อย่างปลอดภัย
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { step: 1, icon: Package, title: 'สร้างดีล', desc: 'ผู้ขายสร้างรายการสินค้า ใส่ชื่อ ราคา รายละเอียด แล้วระบบจะสร้างลิงก์ให้ส่งให้ผู้ซื้อ', color: 'bg-blue-600' },
              { step: 2, icon: CreditCard, title: 'ชำระเงิน', desc: 'ผู้ซื้อโอนเงินมาที่บัญชี SafePay ระบบพักเงินไว้อย่างปลอดภัย จนกว่าจะได้รับสินค้า', color: 'bg-indigo-600' },
              { step: 3, icon: Truck, title: 'จัดส่งสินค้า', desc: 'ผู้ขายจัดส่งสินค้าพร้อมใส่เลข tracking ผู้ซื้อติดตามสถานะจัดส่งได้ตลอดเวลา', color: 'bg-violet-600' },
              { step: 4, icon: CheckCircle, title: 'ปล่อยเงิน', desc: 'ผู้ซื้อยืนยันรับสินค้า ระบบปล่อยเงินให้ผู้ขาย ทั้งสองฝ่ายได้รับคะแนนความน่าเชื่อถือ', color: 'bg-green-600' },
            ].map((item) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="relative flex flex-col items-center text-center">
                  <div className={`${item.color} text-white rounded-2xl p-4 mb-4 shadow-lg`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 lg:py-24">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-2">ฟีเจอร์ครบครัน</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">ทุกสิ่งที่คุณต้องการ</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              ออกแบบมาเพื่อให้การซื้อขายออนไลน์เป็นเรื่องง่ายและปลอดภัย
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'ระบบ Escrow', desc: 'เงินถูกพักไว้อย่างปลอดภัยจนกว่าผู้ซื้อจะยืนยันรับสินค้า ป้องกันการโกงทั้งสองฝ่าย' },
              { icon: CreditCard, title: 'ตรวจสอบการชำระเงิน', desc: 'อัพโหลดสลิปโอนเงิน ทีมงานตรวจสอบและยืนยันทุกรายการ มั่นใจได้ว่าเงินเข้าจริง' },
              { icon: Truck, title: 'ติดตามการจัดส่ง', desc: 'ผู้ขายใส่เลข tracking ผู้ซื้อติดตามสถานะได้แบบ real-time รองรับทุกขนส่งในไทย' },
              { icon: Scale, title: 'ระบบข้อพิพาท', desc: 'หากมีปัญหา ทั้งผู้ซื้อและผู้ขายสามารถเปิดเรื่องร้องเรียน ทีมงานตัดสินอย่างยุติธรรม' },
              { icon: Star, title: 'คะแนนความน่าเชื่อถือ', desc: 'ทุกดีลที่สำเร็จ ทั้งผู้ซื้อและผู้ขายจะได้รับคะแนน สร้างความน่าเชื่อถือในระบบ' },
              { icon: Lock, title: 'ปลอดภัยสูงสุด', desc: 'ข้อมูลเข้ารหัสทุกขั้นตอน ยืนยันตัวตนผ่าน Facebook ป้องกันการสร้างบัญชีปลอม' },
            ].map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="rounded-xl bg-primary/10 p-3 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why SafePay ─── */}
      <section id="why-safepay" className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm font-medium text-primary mb-2">ทำไมต้อง SafePay</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                เพราะความปลอดภัย<br />คือสิ่งที่สำคัญที่สุด
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                การซื้อขายออนไลน์ระหว่างบุคคลมีความเสี่ยงสูง SafePay เกิดมาเพื่อแก้ปัญหานี้
                ด้วยระบบ Escrow ที่เป็นมาตรฐานสากล ปรับให้เหมาะกับคนไทย
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: BadgeCheck, text: 'ยืนยันตัวตนทุกผู้ใช้ผ่าน Facebook ป้องกันบัญชีปลอม' },
                  { icon: Landmark, text: 'รองรับการโอนเงินผ่านธนาคารไทย สกุลเงินบาทเท่านั้น' },
                  { icon: HeartHandshake, text: 'ระบบข้อพิพาทยุติธรรม ทีมงานพิจารณาหลักฐานจากทั้งสองฝ่าย' },
                  { icon: Clock, text: 'Auto-complete อัตโนมัติ หากผู้ซื้อไม่ยืนยันภายในกำหนด ระบบปล่อยเงินให้ผู้ขาย' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="rounded-lg bg-green-100 p-1.5 mt-0.5 shrink-0">
                      <item.icon className="h-4 w-4 text-green-700" />
                    </div>
                    <p className="text-sm text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/login">
                  <Button size="lg" className="h-12 px-8">
                    เริ่มใช้งาน SafePay
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Illustration: Escrow flow diagram */}
            <div className="rounded-2xl border border-border bg-background p-8">
              <div className="space-y-6">
                <h3 className="font-semibold text-center text-foreground">Escrow Flow</h3>
                {[
                  { step: '1', label: 'ผู้ขายสร้างดีล', sub: 'สินค้า + ราคา + ขนส่ง', icon: Package, color: 'bg-blue-600' },
                  { step: '2', label: 'ผู้ซื้อโอนเงินมาที่ SafePay', sub: 'เงินถูกพักไว้อย่างปลอดภัย', icon: Lock, color: 'bg-indigo-600' },
                  { step: '3', label: 'ผู้ขายจัดส่งสินค้า', sub: 'ใส่เลข tracking ติดตามได้', icon: Truck, color: 'bg-violet-600' },
                  { step: '4', label: 'ผู้ซื้อยืนยันรับสินค้า', sub: 'ตรวจสอบความเรียบร้อย', icon: Eye, color: 'bg-amber-600' },
                  { step: '5', label: 'ระบบปล่อยเงินให้ผู้ขาย', sub: 'ดีลสำเร็จ ทั้งคู่ได้คะแนน', icon: CheckCircle, color: 'bg-green-600' },
                ].map((item, idx) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`${item.color} text-white rounded-full p-2`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      {idx < 4 && <div className="w-px h-6 bg-border mt-1" />}
                    </div>
                    <div className="pt-0.5">
                      <p className="font-medium text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── For Buyers & Sellers ─── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 lg:py-24">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-2">สำหรับทุกคน</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">ไม่ว่าจะซื้อหรือขาย</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buyer */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="rounded-xl bg-blue-600 text-white p-3 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">สำหรับผู้ซื้อ</h3>
              <p className="mt-2 text-sm text-muted-foreground">ซื้อของออนไลน์โดยไม่ต้องกลัวโดนโกง</p>
              <ul className="mt-6 space-y-3">
                {[
                  'เงินถูกพักไว้จนกว่าจะได้รับสินค้าจริง',
                  'ติดตามสถานะจัดส่งได้ตลอดเวลา',
                  'เปิดข้อพิพาทได้หากสินค้ามีปัญหา',
                  'ยืนยันรับสินค้าพร้อมอัพโหลดรูปหลักฐาน',
                  'สะสมคะแนนความน่าเชื่อถือ',
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Seller */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="rounded-xl bg-green-600 text-white p-3 w-fit">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">สำหรับผู้ขาย</h3>
              <p className="mt-2 text-sm text-muted-foreground">สร้างความมั่นใจให้ลูกค้า เพิ่มยอดขาย</p>
              <ul className="mt-6 space-y-3">
                {[
                  'สร้างลิงก์ดีลส่งให้ลูกค้าง่ายๆ',
                  'มั่นใจว่าได้เงินเมื่อส่งสินค้าถึงมือ',
                  'ระบบ auto-complete ปล่อยเงินอัตโนมัติ',
                  'ใส่เลข tracking ลูกค้าติดตามได้เอง',
                  'สะสมคะแนนเพิ่มความน่าเชื่อถือ',
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="border-t border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-20 lg:py-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-2">คำถามที่พบบ่อย</p>
            <h2 className="text-3xl font-bold text-foreground">FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'SafePay คืออะไร?',
                a: 'SafePay เป็นระบบ Escrow (ตัวกลางพักเงิน) สำหรับการซื้อขายออนไลน์ระหว่างบุคคล เงินจะถูกพักไว้จนกว่าผู้ซื้อจะได้รับสินค้าและยืนยันความเรียบร้อย จึงปล่อยเงินให้ผู้ขาย',
              },
              {
                q: 'มีค่าธรรมเนียมไหม?',
                a: 'ในช่วง MVP ยังไม่มีค่าธรรมเนียม ใช้งานได้ฟรีทั้งผู้ซื้อและผู้ขาย',
              },
              {
                q: 'รองรับการชำระเงินแบบไหน?',
                a: 'ปัจจุบันรองรับการโอนเงินผ่านธนาคารไทย (Bank Transfer) สกุลเงินบาทเท่านั้น โดยผู้ซื้อโอนเงินมาที่บัญชีของ SafePay แล้วอัพโหลดสลิปให้ทีมงานตรวจสอบ',
              },
              {
                q: 'หากได้รับสินค้าไม่ตรงหรือเสียหายทำอย่างไร?',
                a: 'คุณสามารถเปิดข้อพิพาท (Dispute) ได้ พร้อมแนบหลักฐาน ทีมงานจะพิจารณาและตัดสินอย่างยุติธรรม หากตัดสินให้ผู้ซื้อ เงินจะถูกคืนกลับ',
              },
              {
                q: 'ทำไมต้องเข้าสู่ระบบด้วย Facebook?',
                a: 'เพื่อยืนยันตัวตนของผู้ใช้ทุกคน ป้องกันการสร้างบัญชีปลอม ทำให้ระบบมีความน่าเชื่อถือและปลอดภัยมากขึ้น',
              },
              {
                q: 'หากผู้ซื้อไม่กดยืนยันรับสินค้าจะเกิดอะไรขึ้น?',
                a: 'ระบบมี Auto-complete อัตโนมัติ หากผู้ซื้อไม่กดยืนยันภายในระยะเวลาที่กำหนด (เช่น 3 วัน) ระบบจะปล่อยเงินให้ผู้ขายโดยอัตโนมัติ',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-semibold text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-20 lg:py-24">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 lg:p-16 text-center text-white">
            <Shield className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold">
              พร้อมซื้อขายอย่างปลอดภัยแล้วหรือยัง?
            </h2>
            <p className="mt-4 text-blue-100 max-w-xl mx-auto text-lg">
              เริ่มต้นใช้งาน SafePay วันนี้ ไม่มีค่าธรรมเนียม ไม่มีค่าใช้จ่ายแอบแฝง
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button size="lg" className="h-12 px-10 text-base bg-white text-blue-700 hover:bg-blue-50">
                  เริ่มต้นใช้งานฟรี
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">SafePay</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                ระบบ Escrow สำหรับการซื้อขายออนไลน์ระหว่างบุคคลในประเทศไทย
                ปลอดภัย โปร่งใส ได้รับความไว้วางใจ
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="h-4 w-4 text-green-600" />
                  <span>Data Protected</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">ลิงก์</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">วิธีการทำงาน</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">ฟีเจอร์</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">คำถามที่พบบ่อย</a></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">ติดต่อ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>support@safepay.co.th</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>02-xxx-xxxx</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>กรุงเทพมหานคร, ประเทศไทย</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 SafePay. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer transition-colors">เงื่อนไขการใช้งาน</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">นโยบายความเป็นส่วนตัว</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">นโยบาย Escrow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
