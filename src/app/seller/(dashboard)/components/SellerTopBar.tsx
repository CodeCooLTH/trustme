import AuthLogo from '@/components/AuthLogo'
import SignOutButton from './SignOutButton'

export default function SellerTopBar({ displayName }: { displayName: string }) {
  return (
    <header className="bg-card border-b border-default-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        <div className="flex items-center gap-3">
          <AuthLogo />
          <span className="hidden md:inline text-default-400 text-sm font-medium">ผู้ขาย</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-default-900 text-sm font-medium">{displayName}</span>
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}
