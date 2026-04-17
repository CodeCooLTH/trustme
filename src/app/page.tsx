import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">SafePay</h1>
        <p className="mt-4 text-lg text-gray-600">
          ระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Paces UI migration — scaffolding phase. Pages under construction.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/auth/sign-in"
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </main>
  )
}
