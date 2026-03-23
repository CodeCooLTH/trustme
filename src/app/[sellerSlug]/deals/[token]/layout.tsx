import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function PublicDealLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <Link href="/" className="text-lg font-bold text-foreground">SafePay</Link>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Escrow</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
