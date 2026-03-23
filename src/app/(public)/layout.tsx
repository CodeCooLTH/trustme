export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
          <span className="text-lg font-bold text-primary">SafePay</span>
          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Escrow</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
