export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
          <span className="text-lg font-bold text-blue-600">SafePay</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Escrow</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
