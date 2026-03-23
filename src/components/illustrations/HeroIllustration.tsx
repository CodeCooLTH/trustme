export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background blob */}
      <ellipse cx="250" cy="200" rx="220" ry="180" fill="url(#hero-gradient)" opacity="0.08" />

      {/* Phone mockup */}
      <rect x="175" y="50" width="150" height="280" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="175" y="50" width="150" height="280" rx="20" fill="url(#phone-bg)" opacity="0.03" />
      {/* Phone notch */}
      <rect x="220" y="58" width="60" height="6" rx="3" fill="#e2e8f0" />
      {/* Phone screen content */}
      <rect x="190" y="80" width="120" height="16" rx="4" fill="#3b82f6" opacity="0.15" />
      <rect x="190" y="80" width="120" height="16" rx="4" fill="url(#bar-gradient)" />
      <text x="210" y="92" fontSize="8" fill="white" fontWeight="600">SafePay Escrow</text>

      {/* Product card on phone */}
      <rect x="190" y="105" width="120" height="70" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="198" y="113" width="40" height="40" rx="4" fill="#dbeafe" />
      <rect x="206" y="125" width="24" height="16" rx="2" fill="#93c5fd" />
      <rect x="245" y="113" width="55" height="6" rx="2" fill="#1e293b" opacity="0.7" />
      <rect x="245" y="125" width="40" height="4" rx="2" fill="#94a3b8" />
      <text x="245" y="147" fontSize="10" fill="#3b82f6" fontWeight="700">฿25,000</text>
      <rect x="245" y="155" width="55" height="14" rx="4" fill="#dcfce7" />
      <text x="253" y="165" fontSize="7" fill="#16a34a" fontWeight="600">ชำระแล้ว</text>

      {/* Timeline on phone */}
      <circle cx="200" cy="195" r="5" fill="#3b82f6" />
      <circle cx="200" cy="215" r="5" fill="#3b82f6" />
      <circle cx="200" cy="235" r="5" fill="#3b82f6" />
      <circle cx="200" cy="255" r="5" fill="#e2e8f0" />
      <circle cx="200" cy="275" r="5" fill="#e2e8f0" />
      <line x1="200" y1="200" x2="200" y2="210" stroke="#3b82f6" strokeWidth="2" />
      <line x1="200" y1="220" x2="200" y2="230" stroke="#3b82f6" strokeWidth="2" />
      <line x1="200" y1="240" x2="200" y2="250" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="200" y1="260" x2="200" y2="270" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="212" y="190" width="50" height="4" rx="2" fill="#1e293b" opacity="0.5" />
      <rect x="212" y="210" width="45" height="4" rx="2" fill="#1e293b" opacity="0.5" />
      <rect x="212" y="230" width="55" height="4" rx="2" fill="#1e293b" opacity="0.5" />
      <rect x="212" y="250" width="40" height="4" rx="2" fill="#cbd5e1" />
      <rect x="212" y="270" width="35" height="4" rx="2" fill="#cbd5e1" />
      {/* Check marks */}
      <path d="M197 195 L199 197 L203 193" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M197 215 L199 217 L203 213" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M197 235 L199 237 L203 233" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Phone home indicator */}
      <rect x="225" y="315" width="50" height="4" rx="2" fill="#e2e8f0" />

      {/* Shield badge floating */}
      <g transform="translate(100, 100)">
        <circle cx="0" cy="0" r="28" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#shadow)" />
        <path d="M0-14 L12 -8 L12 2 C12 10 6 16 0 18 C-6 16 -12 10 -12 2 L-12 -8 Z" fill="#3b82f6" />
        <path d="M-4 1 L-1 4 L5 -2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Money/coin floating */}
      <g transform="translate(370, 130)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#shadow)" />
        <circle cx="0" cy="0" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="-4" y="5" fontSize="12" fill="#d97706" fontWeight="700">฿</text>
      </g>

      {/* Lock floating */}
      <g transform="translate(120, 260)">
        <circle cx="0" cy="0" r="20" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#shadow)" />
        <rect x="-7" y="-3" width="14" height="11" rx="2" fill="#16a34a" />
        <path d="M-4-3 L-4-7 C-4-11 4-11 4-7 L4-3" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Truck floating */}
      <g transform="translate(380, 270)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#shadow)" />
        <rect x="-12" y="-6" width="16" height="12" rx="1.5" fill="#6366f1" />
        <path d="M4-6 L4 6 L10 6 L10-1 L7-6Z" fill="#818cf8" />
        <circle cx="-6" cy="8" r="2.5" fill="#1e293b" />
        <circle cx="7" cy="8" r="2.5" fill="#1e293b" />
      </g>

      {/* Decorative dots */}
      <circle cx="90" cy="180" r="3" fill="#3b82f6" opacity="0.2" />
      <circle cx="100" cy="195" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="400" cy="200" r="3" fill="#3b82f6" opacity="0.2" />
      <circle cx="415" cy="185" r="2" fill="#6366f1" opacity="0.15" />
      <circle cx="140" cy="320" r="2" fill="#3b82f6" opacity="0.15" />
      <circle cx="360" cy="80" r="2" fill="#6366f1" opacity="0.2" />

      <defs>
        <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="bar-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="phone-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
        </filter>
      </defs>
    </svg>
  )
}
