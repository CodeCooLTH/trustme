import Link from 'next/link'
import {
  Shield, ShieldCheck, Lock, ArrowRight, CheckCircle,
  Package, Truck, CreditCard, Scale, Star, Users,
  Clock, Eye, BadgeCheck, HeartHandshake, ChevronRight,
  Phone, Mail, MapPin, Zap, Layers, Globe, ArrowUpRight,
} from 'lucide-react'

/* ── Synox-inspired fintech theme ──
   Primary: #D9FF43 (lime), Dark: #012A2B (deep teal)
   Accent: #00F1B5 (cyan), Secondary: #023436
   Gradient: #D9FF43 → #00F1B5
   Font: DM Sans (Google Fonts fallback for SuisseIntl)
*/

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">

      {/* ═══ NAVBAR ═══ */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: 'rgba(1,42,43,0.95)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
              <Shield className="h-5 w-5 text-[#012A2B]" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SafePay</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['วิธีการทำงาน', 'ฟีเจอร์', 'ความปลอดภัย', 'คำถาม'].map((item, i) => (
              <a key={item} href={`#section-${i}`} className="text-sm text-white/60 hover:text-white transition-colors">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/80 hover:text-white transition-colors hidden sm:block">
              เข้าสู่ระบบ
            </Link>
            <Link href="/login">
              <button className="h-11 px-6 rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-[#D9FF43]/20 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#012A2B' }}>
                เริ่มต้นใช้งาน
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#012A2B' }}>
        {/* Decorative shapes */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: '#D9FF43' }} />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-20" style={{ background: '#00F1B5' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 mb-8">
              <ShieldCheck className="h-4 w-4" style={{ color: '#D9FF43' }} />
              <span className="text-sm text-white/70">ระบบ Escrow ที่ได้รับความไว้วางใจ</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              ซื้อขายออนไลน์{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
                ปลอดภัยทุกดีล
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              ระบบตัวกลางพักเงินสำหรับการซื้อขายออนไลน์ ผู้ซื้อมั่นใจว่าได้ของ
              ผู้ขายมั่นใจว่าได้เงิน ทุกธุรกรรมมี Escrow ค้ำประกัน
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <button className="h-14 px-10 rounded-lg text-base font-bold transition-all hover:shadow-xl hover:shadow-[#D9FF43]/25 active:scale-[0.97] flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#012A2B' }}>
                  เริ่มต้นใช้งานฟรี
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a href="#section-0">
                <button className="h-14 px-10 rounded-lg text-base font-semibold text-white border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
                  ดูวิธีการทำงาน
                </button>
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '100%', label: 'ปลอดภัย', icon: ShieldCheck },
                { value: '24/7', label: 'ติดตามได้', icon: Clock },
                { value: '0฿', label: 'ค่าธรรมเนียม', icon: CreditCard },
                { value: '5 นาที', label: 'สร้างดีล', icon: Zap },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 mx-auto mb-2" style={{ color: '#D9FF43' }} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80V30C240 60 480 0 720 30C960 60 1200 0 1440 30V80H0Z" fill="white"/></svg>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="section-0" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#00F1B5' }}>ขั้นตอนง่ายๆ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: '#012A2B' }}>ทำงานอย่างไร</h2>
            <p className="mt-3 text-[#6B6B6B] max-w-xl mx-auto">เพียง 4 ขั้นตอน ก็สามารถซื้อขายออนไลน์ได้อย่างปลอดภัย</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, icon: Package, title: 'สร้างดีล', desc: 'ผู้ขายสร้างรายการสินค้า ใส่ชื่อ ราคา รายละเอียด แล้วระบบจะสร้างลิงก์ให้', color: '#D9FF43' },
              { step: 2, icon: CreditCard, title: 'ชำระเงิน', desc: 'ผู้ซื้อโอนเงินมาที่ SafePay ระบบพักเงินไว้อย่างปลอดภัย จนกว่าจะได้รับสินค้า', color: '#00F1B5' },
              { step: 3, icon: Truck, title: 'จัดส่งสินค้า', desc: 'ผู้ขายจัดส่งสินค้าพร้อมใส่เลข tracking ผู้ซื้อติดตามสถานะจัดส่งได้', color: '#D9FF43' },
              { step: 4, icon: CheckCircle, title: 'ปล่อยเงิน', desc: 'ผู้ซื้อยืนยันรับสินค้า ระบบปล่อยเงินให้ผู้ขาย ทั้งสองฝ่ายได้คะแนน', color: '#00F1B5' },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="rounded-2xl border border-[#E4EEEF] p-6 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1 bg-white">
                  <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${item.color}20` }}>
                    <item.icon className="h-7 w-7" style={{ color: item.color === '#D9FF43' ? '#012A2B' : '#012A2B' }} />
                  </div>
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white mb-3" style={{ backgroundColor: '#012A2B' }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#012A2B' }}>{item.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="section-1" style={{ backgroundColor: '#012A2B' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#D9FF43' }}>ฟีเจอร์ครบครัน</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">ทุกสิ่งที่คุณต้องการ</h2>
            <p className="mt-3 text-white/40 max-w-xl mx-auto">ออกแบบมาเพื่อให้การซื้อขายออนไลน์เป็นเรื่องง่ายและปลอดภัย</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'ระบบ Escrow', desc: 'เงินถูกพักไว้อย่างปลอดภัยจนกว่าผู้ซื้อจะยืนยันรับสินค้า ป้องกันการโกงทั้งสองฝ่าย' },
              { icon: CreditCard, title: 'ตรวจสอบการชำระ', desc: 'อัพโหลดสลิปโอนเงิน ทีมงานตรวจสอบและยืนยันทุกรายการ มั่นใจได้ว่าเงินเข้าจริง' },
              { icon: Truck, title: 'ติดตามการจัดส่ง', desc: 'ผู้ขายใส่เลข tracking ผู้ซื้อติดตามสถานะได้ real-time รองรับทุกขนส่งในไทย' },
              { icon: Scale, title: 'ระบบข้อพิพาท', desc: 'หากมีปัญหา ทั้งผู้ซื้อและผู้ขายเปิดเรื่องร้องเรียนได้ ทีมงานตัดสินอย่างยุติธรรม' },
              { icon: Star, title: 'คะแนนความน่าเชื่อถือ', desc: 'ทุกดีลที่สำเร็จ ทั้งผู้ซื้อและผู้ขายจะได้รับคะแนน สร้างความน่าเชื่อถือในระบบ' },
              { icon: Lock, title: 'ปลอดภัยสูงสุด', desc: 'ข้อมูลเข้ารหัสทุกขั้นตอน ยืนยันตัวตนผ่าน Facebook ป้องกันบัญชีปลอม' },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(217,255,67,0.15), rgba(0,241,181,0.15))' }}>
                  <f.icon className="h-6 w-6" style={{ color: '#D9FF43' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY SAFEPAY ═══ */}
      <section id="section-2" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#00F1B5' }}>ทำไมต้อง SafePay</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 leading-tight" style={{ color: '#012A2B' }}>
                เพราะความปลอดภัย<br />คือสิ่งที่สำคัญที่สุด
              </h2>
              <p className="mt-4 text-[#6B6B6B] leading-relaxed">
                การซื้อขายออนไลน์ระหว่างบุคคลมีความเสี่ยงสูง SafePay เกิดมาเพื่อแก้ปัญหานี้ ด้วยระบบ Escrow ที่เป็นมาตรฐานสากล
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: BadgeCheck, text: 'ยืนยันตัวตนทุกผู้ใช้ผ่าน Facebook ป้องกันบัญชีปลอม' },
                  { icon: HeartHandshake, text: 'ระบบข้อพิพาทยุติธรรม ทีมงานพิจารณาหลักฐานจากทั้งสองฝ่าย' },
                  { icon: Clock, text: 'Auto-complete อัตโนมัติ หากผู้ซื้อไม่ยืนยันภายในกำหนด' },
                  { icon: Globe, text: 'รองรับทุกขนส่งในไทย พร้อมระบบ tracking ติดตามได้' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="rounded-lg p-1.5 mt-0.5 shrink-0" style={{ backgroundColor: 'rgba(0,241,181,0.1)' }}>
                      <item.icon className="h-4 w-4" style={{ color: '#012A2B' }} />
                    </div>
                    <p className="text-sm" style={{ color: '#012A2B' }}>{item.text}</p>
                  </div>
                ))}
              </div>

              <Link href="/login" className="mt-10 inline-block">
                <button className="h-14 px-10 rounded-lg text-base font-bold transition-all hover:shadow-xl hover:shadow-[#D9FF43]/20 active:scale-[0.97] flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#012A2B' }}>
                  เริ่มใช้งาน SafePay
                  <ChevronRight className="h-5 w-5" />
                </button>
              </Link>
            </div>

            {/* Escrow flow visual */}
            <div className="rounded-3xl p-8 relative overflow-hidden" style={{ backgroundColor: '#012A2B' }}>
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
                        <item.icon className="h-5 w-5 text-[#012A2B]" />
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
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#00F1B5' }}>สำหรับทุกคน</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: '#012A2B' }}>ไม่ว่าจะซื้อหรือขาย</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Users, title: 'สำหรับผู้ซื้อ', subtitle: 'ซื้อของออนไลน์โดยไม่ต้องกลัวโดนโกง',
                items: ['เงินถูกพักไว้จนกว่าจะได้รับสินค้าจริง', 'ติดตามสถานะจัดส่งได้ตลอดเวลา', 'เปิดข้อพิพาทได้หากสินค้ามีปัญหา', 'ยืนยันรับสินค้าพร้อมอัพโหลดรูปหลักฐาน', 'สะสมคะแนนความน่าเชื่อถือ'],
                gradient: 'linear-gradient(135deg, #D9FF43, #00F1B5)',
              },
              {
                icon: Package, title: 'สำหรับผู้ขาย', subtitle: 'สร้างความมั่นใจให้ลูกค้า เพิ่มยอดขาย',
                items: ['สร้างลิงก์ดีลส่งให้ลูกค้าง่ายๆ', 'มั่นใจว่าได้เงินเมื่อส่งสินค้าถึงมือ', 'ระบบ auto-complete ปล่อยเงินอัตโนมัติ', 'ใส่เลข tracking ลูกค้าติดตามได้เอง', 'สะสมคะแนนเพิ่มความน่าเชื่อถือ'],
                gradient: 'linear-gradient(135deg, #00F1B5, #D9FF43)',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#E4EEEF] bg-white p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-5" style={{ background: card.gradient }}>
                  <card.icon className="h-7 w-7 text-[#012A2B]" />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#012A2B' }}>{card.title}</h3>
                <p className="text-sm text-[#6B6B6B] mb-6">{card.subtitle}</p>
                <ul className="space-y-3">
                  {card.items.map((text) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm" style={{ color: '#012A2B' }}>
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#00F1B5' }} />
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
      <section id="section-3" className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#00F1B5' }}>คำถามที่พบบ่อย</span>
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
              <div key={item.q} className="rounded-xl border border-[#E4EEEF] p-5 hover:shadow-md transition-shadow">
                <h3 className="font-bold" style={{ color: '#012A2B' }}>{item.q}</h3>
                <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ backgroundColor: '#012A2B' }} className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: '#D9FF43' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-15" style={{ background: '#00F1B5' }} />

        <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28 text-center">
          <div className="h-16 w-16 rounded-2xl mx-auto mb-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
            <Shield className="h-8 w-8 text-[#012A2B]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">พร้อมซื้อขายอย่างปลอดภัย?</h2>
          <p className="mt-4 text-white/40 text-lg max-w-xl mx-auto">เริ่มต้นใช้งาน SafePay วันนี้ ไม่มีค่าธรรมเนียม ไม่มีค่าใช้จ่ายแอบแฝง</p>
          <Link href="/login" className="mt-10 inline-block">
            <button className="h-14 px-12 rounded-lg text-base font-bold transition-all hover:shadow-xl hover:shadow-[#D9FF43]/25 active:scale-[0.97] flex items-center gap-2 mx-auto"
              style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)', color: '#012A2B' }}>
              เริ่มต้นใช้งานฟรี
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ backgroundColor: '#011E1F' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D9FF43, #00F1B5)' }}>
                  <Shield className="h-5 w-5 text-[#012A2B]" />
                </div>
                <span className="text-lg font-bold text-white">SafePay</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed max-w-sm">
                ระบบ Escrow สำหรับการซื้อขายออนไลน์ระหว่างบุคคลในประเทศไทย
                ปลอดภัย โปร่งใส ได้รับความไว้วางใจ
              </p>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-1.5 text-xs text-white/20">
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: '#00F1B5' }} />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/20">
                  <Lock className="h-3.5 w-3.5" style={{ color: '#00F1B5' }} />
                  <span>Data Protected</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">ลิงก์</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><a href="#section-0" className="hover:text-white transition-colors">วิธีการทำงาน</a></li>
                <li><a href="#section-1" className="hover:text-white transition-colors">ฟีเจอร์</a></li>
                <li><a href="#section-3" className="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">ติดต่อ</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" style={{ color: '#00F1B5' }} /> support@safepay.co.th</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" style={{ color: '#00F1B5' }} /> 02-xxx-xxxx</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" style={{ color: '#00F1B5' }} /> กรุงเทพฯ, ไทย</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">© 2026 SafePay. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/20">
              <span className="hover:text-white/40 cursor-pointer transition-colors">เงื่อนไขการใช้งาน</span>
              <span className="hover:text-white/40 cursor-pointer transition-colors">นโยบายความเป็นส่วนตัว</span>
              <span className="hover:text-white/40 cursor-pointer transition-colors">นโยบาย Escrow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
