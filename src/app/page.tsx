import AuthLogo from '@/components/AuthLogo'
import { currentYear, META_DATA } from '@/config/constants'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SafePay — ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์',
  description: META_DATA.description,
}

// ── How It Works ──────────────────────────────────────────────
const howItWorksSteps = [
  {
    icon: 'mdi:account-plus-outline',
    title: 'สมัครสมาชิก',
    desc: 'สมัครด้วย Facebook หรือเบอร์โทร ใช้เวลาไม่ถึง 1 นาที',
    step: '01',
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'ยืนยันตัวตน',
    desc: 'ยืนยันหลายระดับ: OTP, บัตรประชาชน, เอกสารธุรกิจ',
    step: '02',
  },
  {
    icon: 'mdi:history',
    title: 'สะสมประวัติ',
    desc: 'ทุก order ที่สำเร็จ ช่วยเพิ่ม Trust Score ของคุณ',
    step: '03',
  },
  {
    icon: 'mdi:star-circle-outline',
    title: 'ได้ Trust Score',
    desc: 'คะแนนโปร่งใสให้ทุกคนตรวจสอบได้ก่อนตัดสินใจ',
    step: '04',
  },
]

// ── Trust Score Factors ───────────────────────────────────────
const trustFactors = [
  {
    label: 'Verification',
    pct: 35,
    desc: 'ยืนยันตัวตนครบทุกระดับ ได้คะแนนเต็ม',
    color: 'bg-primary',
  },
  {
    label: 'Orders',
    pct: 25,
    desc: 'จำนวน orders ที่สำเร็จและยืนยันแล้ว',
    color: 'bg-success',
  },
  {
    label: 'Rating',
    pct: 20,
    desc: 'คะแนนเฉลี่ยจากรีวิวของผู้ซื้อจริง',
    color: 'bg-warning',
  },
  {
    label: 'Account Age',
    pct: 10,
    desc: 'ยิ่งอยู่นานยิ่งน่าเชื่อถือ',
    color: 'bg-secondary',
  },
  {
    label: 'Badges',
    pct: 10,
    desc: 'รางวัลพิเศษตามพฤติกรรม',
    color: 'bg-info',
  },
]

// ── Features ──────────────────────────────────────────────────
const features = [
  {
    icon: 'mdi:check-decagram',
    title: 'ตรวจสอบตัวตนได้จริง',
    desc: 'ยืนยันหลายระดับผ่านระบบ admin review',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: 'mdi:medal-outline',
    title: 'Badge สะสม 10+ แบบ',
    desc: 'รางวัล verification และ achievement จากพฤติกรรมดี',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: 'mdi:cart-check',
    title: 'ระบบ Order ครบวงจร',
    desc: 'สร้าง order → ส่งลิงก์ → buyer confirm ผ่าน OTP',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: 'mdi:account-details-outline',
    title: 'Public Trust Profile',
    desc: 'ทุกคนมีหน้า @username ให้คนอื่นตรวจสอบได้',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-card">
      {/* ── Top Nav ─────────────────────────────────────────── */}
      <header className="border-b border-default-200 bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <AuthLogo />
          <nav className="flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 py-2 px-4 font-semibold text-sm hidden sm:inline-flex"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/auth/sign-up"
              className="btn bg-primary py-2 px-4 font-semibold text-white hover:bg-primary-hover text-sm"
            >
              สมัครฟรี
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary/5 via-card to-primary/10 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Icon icon="mdi:shield-check" width={16} height={16} />
              ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
            </span>

            <h1 className="text-3xl font-bold text-dark leading-tight md:text-4xl lg:text-5xl lg:leading-tight mb-6">
              SafePay —{' '}
              <span className="text-primary">
                ระบบสร้างความน่าเชื่อถือ
              </span>
              <br />
              สำหรับการซื้อขายออนไลน์
            </h1>

            <p className="text-default-400 text-base md:text-lg leading-relaxed mb-8 mx-auto max-w-2xl">
              "ทำให้ทุกคนที่ซื้อขายออนไลน์มีตัวตนที่ตรวจสอบได้ ลดปัญหามิจฉาชีพด้วยระบบ Trust Score ที่โปร่งใสและน่าเชื่อถือ"
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/sign-up"
                className="btn bg-primary py-3 px-8 font-semibold text-white hover:bg-primary-hover text-base w-full sm:w-auto"
              >
                <Icon icon="mdi:account-plus-outline" width={20} height={20} />
                เริ่มใช้งานฟรี
              </Link>
              <Link
                href="/auth/sign-in"
                className="btn border border-default-300 text-default-900 hover:border-default-400 hover:bg-default-50 py-3 px-8 font-semibold text-base w-full sm:w-auto"
              >
                <Icon icon="mdi:login" width={20} height={20} />
                เข้าสู่ระบบ
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-dark">100%</p>
                <p className="text-default-400 text-xs">ฟรีตลอดชีพ</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-dark">10+</p>
                <p className="text-default-400 text-xs">Achievement Badges</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-dark">3</p>
                <p className="text-default-400 text-xs">ระดับยืนยันตัวตน</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-default-400 text-sm font-semibold uppercase tracking-wide">
              ขั้นตอนการใช้งาน
            </span>
            <h2 className="text-2xl font-bold text-dark mt-2 md:text-3xl">
              เริ่มต้นได้ใน <span className="text-primary">4 ขั้นตอน</span>
            </h2>
            <p className="text-default-400 mt-3 max-w-xl mx-auto">
              SafePay ออกแบบให้ง่าย ใช้งานได้ทันที ไม่ว่าจะซื้อหรือขาย
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((s) => (
              <div key={s.step} className="card rounded-2xl p-6 text-center relative">
                <span className="absolute top-4 right-4 text-5xl font-black text-default-100 select-none leading-none">
                  {s.step}
                </span>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
                  <Icon icon={s.icon} width={28} height={28} />
                </div>
                <h3 className="text-base font-bold text-dark mb-2">{s.title}</h3>
                <p className="text-default-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Score Explainer ────────────────────────────── */}
      <section id="trust-score" className="py-16 md:py-20 bg-default-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-default-400 text-sm font-semibold uppercase tracking-wide">
              ความโปร่งใส
            </span>
            <h2 className="text-2xl font-bold text-dark mt-2 md:text-3xl">
              Trust Score คำนวณจากอะไร?
            </h2>
            <p className="text-default-400 mt-3 max-w-xl mx-auto">
              คะแนนความน่าเชื่อถือของคุณสะท้อนพฤติกรรมจริง โปร่งใส ตรวจสอบได้
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto">
            {trustFactors.map((f) => (
              <div key={f.label} className="card rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-dark">{f.label}</span>
                  <span className="text-lg font-black text-dark">{f.pct}%</span>
                </div>
                {/* Progress Bar */}
                <div className="h-2 w-full rounded-full bg-default-200">
                  <div
                    className={`h-2 rounded-full ${f.color}`}
                    style={{ width: `${f.pct * 2.86}%` }}
                  />
                </div>
                <p className="text-default-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Score Level Table */}
          <div className="mt-10 max-w-2xl mx-auto">
            <h3 className="text-center text-base font-bold text-dark mb-4">ระดับ Trust Score</h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {[
                { grade: 'A+', range: '90–100', color: 'text-success', bg: 'bg-success/10' },
                { grade: 'A', range: '80–89', color: 'text-success', bg: 'bg-success/10' },
                { grade: 'B+', range: '70–79', color: 'text-primary', bg: 'bg-primary/10' },
                { grade: 'B', range: '60–69', color: 'text-primary', bg: 'bg-primary/10' },
                { grade: 'C', range: '40–59', color: 'text-warning', bg: 'bg-warning/10' },
                { grade: 'D', range: '0–39', color: 'text-danger', bg: 'bg-danger/10' },
              ].map((lvl) => (
                <div key={lvl.grade} className={`card rounded-xl p-3 text-center ${lvl.bg}`}>
                  <p className={`text-xl font-black ${lvl.color}`}>{lvl.grade}</p>
                  <p className="text-default-400 text-xs mt-1">{lvl.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-default-400 text-sm font-semibold uppercase tracking-wide">
              ฟีเจอร์หลัก
            </span>
            <h2 className="text-2xl font-bold text-dark mt-2 md:text-3xl">
              ทำไมต้องใช้ <span className="text-primary">SafePay</span>?
            </h2>
            <p className="text-default-400 mt-3 max-w-xl mx-auto">
              ครบทุกเครื่องมือที่คุณต้องการเพื่อสร้างความน่าเชื่อถือออนไลน์
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="card rounded-2xl p-6">
                <div className={`${f.bg} ${f.color} mb-4 flex size-12 items-center justify-center rounded-xl`}>
                  <Icon icon={f.icon} width={24} height={24} />
                </div>
                <h3 className="text-base font-bold text-dark mb-2">{f.title}</h3>
                <p className="text-default-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Target Users ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-default-400 text-sm font-semibold uppercase tracking-wide">
              เหมาะสำหรับ
            </span>
            <h2 className="text-2xl font-bold text-dark mt-2 md:text-3xl">
              SafePay ใช้ได้ทั้ง <span className="text-primary">ผู้ซื้อและผู้ขาย</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Buyer Card */}
            <div className="card rounded-2xl p-7">
              <div className="bg-success/10 text-success mb-5 flex size-14 items-center justify-center rounded-2xl">
                <Icon icon="mdi:account-search-outline" width={28} height={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">สำหรับผู้ซื้อ</h3>
              <p className="text-default-400 text-sm mb-5 leading-relaxed">
                ซื้อออนไลน์อย่างมั่นใจ ตรวจสอบ Trust Score ของผู้ขายได้ก่อนตัดสินใจ
              </p>
              <ul className="space-y-3">
                {[
                  'เปิดลิงก์ order เพื่อดูข้อมูลสินค้าและ Trust Score ร้านค้าทันที',
                  'Confirm order ผ่าน OTP เบอร์โทร/email โดยไม่ต้องสมัครสมาชิก',
                  'ให้รีวิวและคะแนน 1–5 ดาวหลัง confirm เพื่อช่วยผู้ซื้อรายต่อไป',
                  'สมัครสมาชิกทีหลัง ประวัติ orders ทั้งหมดตามมาอัตโนมัติ',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-default-500">
                    <Icon icon="mdi:check-circle-outline" width={18} height={18} className="text-success mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/sign-up"
                className="btn border border-success text-success hover:bg-success hover:text-white mt-6 py-2.5 px-5 font-semibold text-sm inline-flex items-center gap-1.5"
              >
                <Icon icon="mdi:account-plus-outline" width={18} height={18} />
                สมัครเป็นผู้ซื้อ
              </Link>
            </div>

            {/* Seller Card */}
            <div className="card rounded-2xl p-7">
              <div className="bg-primary/10 text-primary mb-5 flex size-14 items-center justify-center rounded-2xl">
                <Icon icon="mdi:store-outline" width={28} height={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">สำหรับผู้ขาย</h3>
              <p className="text-default-400 text-sm mb-5 leading-relaxed">
                สร้างความน่าเชื่อถือ เพิ่มยอดขาย ลดเวลาเจรจาเรื่องความมั่นใจ
              </p>
              <ul className="space-y-3">
                {[
                  'เปิดร้านค้าและเพิ่มสินค้า PHYSICAL / DIGITAL / SERVICE ได้ง่าย',
                  'สร้าง order แล้วส่งลิงก์ให้ buyer ยืนยันผ่าน OTP โดยตรง',
                  'ยืนยันตัวตนระดับร้านค้า ได้ badges และ Trust Score เพิ่ม',
                  'Dashboard ดูสถานะ orders ทุกรายการ กรองตามสถานะได้',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-default-500">
                    <Icon icon="mdi:check-circle-outline" width={18} height={18} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/sign-up"
                className="btn bg-primary text-white hover:bg-primary-hover mt-6 py-2.5 px-5 font-semibold text-sm inline-flex items-center gap-1.5"
              >
                <Icon icon="mdi:store-plus-outline" width={18} height={18} />
                เปิดร้านค้าเลย
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="card rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-10 md:p-14 text-center max-w-3xl mx-auto">
            <div className="bg-primary/10 text-primary mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl">
              <Icon icon="mdi:rocket-launch-outline" width={32} height={32} />
            </div>
            <h2 className="text-2xl font-bold text-dark md:text-3xl mb-4">
              พร้อมสร้าง Trust Score ของคุณหรือยัง?
            </h2>
            <p className="text-default-400 text-base mb-8 max-w-lg mx-auto">
              สมัครฟรี ใช้งานได้ทันที ไม่มีค่าธรรมเนียมแอบแฝง
            </p>
            <Link
              href="/auth/sign-up"
              className="btn bg-primary py-3.5 px-10 font-bold text-white hover:bg-primary-hover text-base inline-flex items-center gap-2"
            >
              <Icon icon="mdi:account-plus-outline" width={22} height={22} />
              สมัครสมาชิกเลย
            </Link>
            <p className="text-default-400 text-xs mt-5">
              มีบัญชีแล้ว?{' '}
              <Link href="/auth/sign-in" className="text-primary hover:underline font-medium">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-default-200 py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-default-400 text-sm">
              &copy; {currentYear} SafePay - by SafePay
            </p>
            <nav className="flex items-center gap-4">
              <a href="#" className="text-default-400 hover:text-primary text-sm transition-colors">
                เกี่ยวกับ
              </a>
              <a href="#" className="text-default-400 hover:text-primary text-sm transition-colors">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="text-default-400 hover:text-primary text-sm transition-colors">
                ติดต่อเรา
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
