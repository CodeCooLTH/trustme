import Link from 'next/link'
import {
  Shield, ShieldCheck, Lock, ArrowRight, CheckCircle,
  Package, Truck, CreditCard, Scale, Star, Users,
  Clock, Eye, BadgeCheck, HeartHandshake, ChevronRight,
  Phone, Mail, MapPin, Zap, Globe, ArrowUpRight,
  Smartphone, QrCode, Fingerprint, Wallet,
} from 'lucide-react'

/* ── Synox Payment Solutions theme (Purple variant) ──
   Hero Gradient: #8234C5 → #230952 (purple)
   Primary accent: #D9FF43 (lime) on dark
   Accent: #00F1B5 (cyan)
   Dark: #012A2B (deep teal)
   Card borders: rgba(217,255,67,0.4) with gradient fill
*/

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">

      {/* ═══ NAVBAR ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ backgroundColor: 'rgba(35,9,82,0.9)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
              <Shield className="h-5 w-5 text-[#230952]" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SafePay</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'วิธีการทำงาน', href: '#how-it-works' },
              { label: 'ฟีเจอร์', href: '#features' },
              { label: 'ความปลอดภัย', href: '#security' },
              { label: 'คำถาม', href: '#faq' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/80 hover:text-white transition-colors hidden sm:block">
              เข้าสู่ระบบ
            </Link>
            <Link href="/login">
              <button className="h-11 px-6 rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-[#D9FF43]/20 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#230952' }}>
                เริ่มต้นใช้งาน
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ HERO — Purple Gradient ═══ */}
      <section className="relative overflow-hidden pt-20" style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)' }}>
        {/* Decorative orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30" style={{ background: '#8234C5' }} />
        <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-20" style={{ background: '#D9FF43' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-10" style={{ background: '#00F1B5' }} />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-2 mb-8">
                <ShieldCheck className="h-4 w-4" style={{ color: '#D9FF43' }} />
                <span className="text-sm text-white/70">ระบบ Escrow ที่ได้รับความไว้วางใจ</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] tracking-tight">
                ซื้อขายออนไลน์{' '}
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #D9FF43, #00F1B5)' }}>
                  ปลอดภัยทุกดีล
                </span>
              </h1>

              <p className="mt-6 text-lg text-white/50 max-w-lg leading-relaxed">
                ระบบตัวกลางพักเงินสำหรับการซื้อขายออนไลน์ ผู้ซื้อมั่นใจว่าได้ของ
                ผู้ขายมั่นใจว่าได้เงิน ทุกธุรกรรมมี Escrow ค้ำประกัน
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/login">
                  <button className="h-14 px-10 rounded-lg text-base font-bold transition-all hover:shadow-xl hover:shadow-[#D9FF43]/25 active:scale-[0.97] flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#230952' }}>
                    สมัครฟรี
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <a href="#how-it-works">
                  <button className="h-14 px-10 rounded-lg text-base font-semibold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    ดูวิธีการทำงาน
                  </button>
                </a>
              </div>

              {/* Review badge */}
              <div className="mt-12 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['ก', 'ข', 'ค', 'ง'].map((c, i) => (
                    <div key={c} className="h-9 w-9 rounded-full border-2 border-[#230952] flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: ['#8234C5', '#D9FF43', '#00F1B5', '#E040FB'][i], color: i === 1 ? '#230952' : 'white' }}>
                      {c}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-[#D9FF43] text-[#D9FF43]" />)}
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">ผู้ใช้ที่ไว้วางใจ SafePay</p>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:block relative">
              {/* Phone mockup */}
              <div className="relative mx-auto w-[280px]">
                <div className="rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 p-3 shadow-2xl">
                  <div className="rounded-[24px] overflow-hidden bg-[#1a0a35]">
                    {/* Phone screen */}
                    <div className="p-5">
                      {/* Status bar */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] text-white/50">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 rounded-sm bg-white/30" />
                          <div className="w-2 h-2 rounded-sm bg-white/30" />
                        </div>
                      </div>

                      {/* App header */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
                          <Shield className="h-4 w-4 text-[#230952]" />
                        </div>
                        <span className="text-sm font-bold text-white">SafePay</span>
                      </div>

                      {/* Balance card */}
                      <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #8234C5, #5B21B6)' }}>
                        <p className="text-[10px] text-white/50">ยอดเงินพักไว้</p>
                        <p className="text-2xl font-bold text-white mt-1">฿135,400</p>
                        <div className="flex gap-2 mt-3">
                          <div className="flex-1 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: '#D9FF43', color: '#230952' }}>
                            ถอนเงิน
                          </div>
                          <div className="flex-1 h-8 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white border border-white/20">
                            ประวัติ
                          </div>
                        </div>
                      </div>

                      {/* Mini order list */}
                      {[
                        { name: 'iPhone 15 Pro', price: '฿35,000', status: 'ชำระแล้ว', statusColor: '#00F1B5' },
                        { name: 'MacBook Air M3', price: '฿42,000', status: 'จัดส่ง', statusColor: '#D9FF43' },
                        { name: 'AirPods Pro 2', price: '฿7,500', status: 'สำเร็จ', statusColor: '#00F1B5' },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                          <div>
                            <p className="text-xs font-medium text-white">{item.name}</p>
                            <p className="text-[10px] text-white/40">{item.price}</p>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.statusColor}20`, color: item.statusColor }}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -left-16 top-20 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
                    <Lock className="h-4 w-4 text-[#230952]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-900">Escrow ค้ำประกัน</p>
                    <p className="text-[9px] text-gray-400">เงินปลอดภัย 100%</p>
                  </div>
                </div>

                <div className="absolute -right-12 bottom-32 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-900">ดีลสำเร็จ!</p>
                    <p className="text-[9px] text-gray-400">฿7,500 → ผู้ขาย</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80V30C240 60 480 0 720 30C960 60 1200 0 1440 30V80H0Z" fill="white"/></svg>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '100%', label: 'ปลอดภัย', icon: ShieldCheck },
              { value: '24/7', label: 'ติดตามได้ตลอด', icon: Clock },
              { value: '0฿', label: 'ค่าธรรมเนียม', icon: CreditCard },
              { value: '< 5 นาที', label: 'สร้างดีล', icon: Zap },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(130,52,197,0.1), rgba(35,9,82,0.1))' }}>
                  <s.icon className="h-6 w-6" style={{ color: '#8234C5' }} />
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: '#012A2B' }}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8234C5' }}>ขั้นตอนง่ายๆ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: '#012A2B' }}>ทำงานอย่างไร</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">เพียง 4 ขั้นตอน ก็สามารถซื้อขายออนไลน์ได้อย่างปลอดภัย</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, icon: Package, title: 'สร้างดีล', desc: 'ผู้ขายสร้างรายการสินค้า ใส่ชื่อ ราคา รายละเอียด แล้วระบบสร้างลิงก์ส่งให้ผู้ซื้อ' },
              { step: 2, icon: CreditCard, title: 'ชำระเงิน', desc: 'ผู้ซื้อโอนเงินมาที่ SafePay ระบบพักเงินไว้อย่างปลอดภัย จนกว่าจะได้รับสินค้า' },
              { step: 3, icon: Truck, title: 'จัดส่งสินค้า', desc: 'ผู้ขายจัดส่งสินค้า ใส่เลข tracking ผู้ซื้อติดตามสถานะจัดส่งได้ตลอดเวลา' },
              { step: 4, icon: CheckCircle, title: 'ปล่อยเงิน', desc: 'ผู้ซื้อยืนยันรับสินค้า ระบบปล่อยเงินให้ผู้ขาย ทั้งสองฝ่ายได้คะแนน' },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1 bg-white h-full">
                  <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)' }}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white mb-3" style={{ backgroundColor: '#8234C5' }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#012A2B' }}>{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PAYMENT METHODS — Purple section (Synox signature) ═══ */}
      <section id="features" style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)' }} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#D9FF43' }}>ฟีเจอร์ครบครัน</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">ทุกสิ่งที่คุณต้องการ</h2>
            <p className="mt-3 text-white/40 max-w-xl mx-auto">ออกแบบมาเพื่อให้การซื้อขายออนไลน์เป็นเรื่องง่ายและปลอดภัย</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: 'ระบบ Escrow', desc: 'เงินถูกพักไว้อย่างปลอดภัยจนกว่าผู้ซื้อจะยืนยันรับสินค้า ป้องกันการโกงทั้งสองฝ่าย' },
              { icon: Fingerprint, title: 'ยืนยันตัวตน', desc: 'ทุกผู้ใช้ต้องยืนยันตัวตนผ่าน Facebook ป้องกันบัญชีปลอม สร้างความน่าเชื่อถือ' },
              { icon: Truck, title: 'ติดตามการจัดส่ง', desc: 'ผู้ขายใส่เลข tracking ผู้ซื้อติดตามสถานะจัดส่งได้ real-time รองรับทุกขนส่งในไทย' },
              { icon: Scale, title: 'ระบบข้อพิพาท', desc: 'หากมีปัญหา ทั้งผู้ซื้อและผู้ขายเปิดเรื่องร้องเรียนได้ ทีมงานตัดสินอย่างยุติธรรม' },
              { icon: Star, title: 'คะแนนความน่าเชื่อถือ', desc: 'ทุกดีลที่สำเร็จ ทั้งผู้ซื้อและผู้ขายจะได้รับคะแนน สร้างชื่อเสียงในระบบ' },
              { icon: Wallet, title: 'ชำระเงินง่าย', desc: 'รองรับโอนผ่านธนาคารไทย อัพโหลดสลิป ทีมงานตรวจสอบทุกรายการ' },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl border p-6 transition-all duration-300 hover:border-[#D9FF43]"
                style={{ borderColor: 'rgba(217,255,67,0.25)', backgroundImage: 'linear-gradient(30deg, rgba(217,255,67,0.08) 0%, transparent 60%)' }}>
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 border" style={{ borderColor: 'rgba(217,255,67,0.3)' }}>
                  <f.icon className="h-6 w-6" style={{ color: '#D9FF43' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY SAFEPAY ═══ */}
      <section id="security" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8234C5' }}>ทำไมต้อง SafePay</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight" style={{ color: '#012A2B' }}>
                เพราะความปลอดภัย<br />คือสิ่งที่สำคัญที่สุด
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                การซื้อขายออนไลน์ระหว่างบุคคลมีความเสี่ยงสูง SafePay เกิดมาเพื่อแก้ปัญหานี้ ด้วยระบบ Escrow ที่เป็นมาตรฐานสากล
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: BadgeCheck, text: 'ยืนยันตัวตนทุกผู้ใช้ผ่าน Facebook ป้องกันบัญชีปลอม' },
                  { icon: HeartHandshake, text: 'ระบบข้อพิพาทยุติธรรม พิจารณาหลักฐานจากทั้งสองฝ่าย' },
                  { icon: Clock, text: 'Auto-complete อัตโนมัติ หากผู้ซื้อไม่ยืนยันภายในกำหนด' },
                  { icon: Globe, text: 'รองรับทุกขนส่งในไทย พร้อมระบบ tracking ติดตามได้' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="rounded-lg p-1.5 mt-0.5 shrink-0" style={{ backgroundColor: 'rgba(130,52,197,0.1)' }}>
                      <item.icon className="h-4 w-4" style={{ color: '#8234C5' }} />
                    </div>
                    <p className="text-sm" style={{ color: '#012A2B' }}>{item.text}</p>
                  </div>
                ))}
              </div>

              <Link href="/login" className="mt-10 inline-block">
                <button className="h-14 px-10 rounded-lg text-base font-bold transition-all hover:shadow-xl hover:shadow-[#8234C5]/20 active:scale-[0.97] flex items-center gap-2"
                  style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)', color: 'white' }}>
                  เริ่มใช้งาน SafePay
                  <ChevronRight className="h-5 w-5" />
                </button>
              </Link>
            </div>

            {/* Escrow flow */}
            <div className="rounded-3xl p-8 relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)' }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-30" style={{ background: '#D9FF43' }} />
              <h3 className="text-white font-bold text-lg mb-8">Escrow Flow</h3>
              <div className="space-y-5">
                {[
                  { step: '1', label: 'ผู้ขายสร้างดีล', sub: 'สินค้า + ราคา + ขนส่ง', icon: Package },
                  { step: '2', label: 'ผู้ซื้อโอนเงินมาที่ SafePay', sub: 'เงินถูกพักไว้อย่างปลอดภัย', icon: Lock },
                  { step: '3', label: 'ผู้ขายจัดส่งสินค้า', sub: 'ใส่เลข tracking ติดตามได้', icon: Truck },
                  { step: '4', label: 'ผู้ซื้อยืนยันรับสินค้า', sub: 'ตรวจสอบความเรียบร้อย', icon: Eye },
                  { step: '5', label: 'ระบบปล่อยเงินให้ผู้ขาย', sub: 'ดีลสำเร็จ ทั้งคู่ได้คะแนน', icon: CheckCircle },
                ].map((item, idx) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
                        <item.icon className="h-5 w-5 text-[#230952]" />
                      </div>
                      {idx < 4 && <div className="w-px h-5 mt-1" style={{ backgroundColor: 'rgba(217,255,67,0.2)' }} />}
                    </div>
                    <div className="pt-1.5">
                      <p className="font-semibold text-sm text-white">{item.label}</p>
                      <p className="text-xs text-white/40">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOR BUYERS & SELLERS ═══ */}
      <section style={{ backgroundColor: '#F8FAFB' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8234C5' }}>สำหรับทุกคน</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: '#012A2B' }}>ไม่ว่าจะซื้อหรือขาย</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Users, title: 'สำหรับผู้ซื้อ', sub: 'ซื้อของออนไลน์โดยไม่ต้องกลัวโดนโกง', items: ['เงินถูกพักไว้จนกว่าจะได้รับสินค้าจริง', 'ติดตามสถานะจัดส่งได้ตลอดเวลา', 'เปิดข้อพิพาทได้หากสินค้ามีปัญหา', 'ยืนยันรับสินค้าพร้อมอัพโหลดรูปหลักฐาน', 'สะสมคะแนนความน่าเชื่อถือ'] },
              { icon: Package, title: 'สำหรับผู้ขาย', sub: 'สร้างความมั่นใจให้ลูกค้า เพิ่มยอดขาย', items: ['สร้างลิงก์ดีลส่งให้ลูกค้าง่ายๆ', 'มั่นใจว่าได้เงินเมื่อส่งสินค้าถึงมือ', 'ระบบ auto-complete ปล่อยเงินอัตโนมัติ', 'ใส่เลข tracking ลูกค้าติดตามได้เอง', 'สะสมคะแนนเพิ่มความน่าเชื่อถือ'] },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)' }}>
                  <card.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#012A2B' }}>{card.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{card.sub}</p>
                <ul className="space-y-3">
                  {card.items.map((text) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm" style={{ color: '#012A2B' }}>
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#8234C5' }} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8234C5' }}>คำถามที่พบบ่อย</span>
            <h2 className="text-3xl font-bold mt-3" style={{ color: '#012A2B' }}>FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'SafePay คืออะไร?', a: 'SafePay เป็นระบบ Escrow (ตัวกลางพักเงิน) สำหรับการซื้อขายออนไลน์ระหว่างบุคคล เงินจะถูกพักไว้จนกว่าผู้ซื้อจะได้รับสินค้าและยืนยัน จึงปล่อยเงินให้ผู้ขาย' },
              { q: 'มีค่าธรรมเนียมไหม?', a: 'ในช่วงนี้ยังไม่มีค่าธรรมเนียม ใช้งานได้ฟรีทั้งผู้ซื้อและผู้ขาย' },
              { q: 'รองรับการชำระเงินแบบไหน?', a: 'ปัจจุบันรองรับการโอนเงินผ่านธนาคารไทย (Bank Transfer) สกุลเงินบาทเท่านั้น โดยผู้ซื้อโอนเงินมาที่บัญชี SafePay แล้วอัพโหลดสลิป' },
              { q: 'หากสินค้ามีปัญหาทำอย่างไร?', a: 'สามารถเปิดข้อพิพาท (Dispute) ได้ พร้อมแนบหลักฐาน ทีมงานจะพิจารณาและตัดสินอย่างยุติธรรม หากตัดสินให้ผู้ซื้อ เงินจะถูกคืน' },
              { q: 'ผู้ซื้อไม่กดยืนยันรับจะเกิดอะไรขึ้น?', a: 'ระบบมี Auto-complete อัตโนมัติ หากผู้ซื้อไม่กดยืนยันภายในระยะเวลาที่กำหนด ระบบจะปล่อยเงินให้ผู้ขายอัตโนมัติ' },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-gray-100 p-5 hover:shadow-md hover:shadow-purple-500/5 transition-shadow">
                <h3 className="font-bold" style={{ color: '#012A2B' }}>{item.q}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(120deg, #8234C5, #230952)' }}>
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: '#D9FF43' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-15" style={{ background: '#00F1B5' }} />

        <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
          <div className="h-16 w-16 rounded-2xl mx-auto mb-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
            <Shield className="h-8 w-8 text-[#230952]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">พร้อมซื้อขายอย่างปลอดภัย?</h2>
          <p className="mt-4 text-white/40 text-lg max-w-xl mx-auto">เริ่มต้นใช้งาน SafePay วันนี้ ไม่มีค่าธรรมเนียม ไม่มีค่าใช้จ่ายแอบแฝง</p>
          <Link href="/login" className="mt-10 inline-block">
            <button className="h-14 px-12 rounded-lg text-base font-bold transition-all hover:shadow-xl hover:shadow-[#D9FF43]/25 active:scale-[0.97] flex items-center gap-2 mx-auto"
              style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#230952' }}>
              เริ่มต้นใช้งานฟรี
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ backgroundImage: 'linear-gradient(120deg, #230952, #1a063d)' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
                  <Shield className="h-5 w-5 text-[#230952]" />
                </div>
                <span className="text-lg font-bold text-white">SafePay</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed max-w-sm">
                ระบบ Escrow สำหรับการซื้อขายออนไลน์ระหว่างบุคคลในประเทศไทย
                ปลอดภัย โปร่งใส ได้รับความไว้วางใจ
              </p>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-1.5 text-xs text-white/20">
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: '#D9FF43' }} /> SSL Encrypted
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/20">
                  <Lock className="h-3.5 w-3.5" style={{ color: '#D9FF43' }} /> Data Protected
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">ลิงก์</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">วิธีการทำงาน</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">ติดต่อ</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" style={{ color: '#D9FF43' }} /> support@safepay.co.th</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" style={{ color: '#D9FF43' }} /> 02-xxx-xxxx</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" style={{ color: '#D9FF43' }} /> กรุงเทพฯ, ไทย</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">© 2026 SafePay. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/20">
              <span className="hover:text-white/40 cursor-pointer transition-colors">เงื่อนไขการใช้งาน</span>
              <span className="hover:text-white/40 cursor-pointer transition-colors">นโยบายความเป็นส่วนตัว</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
