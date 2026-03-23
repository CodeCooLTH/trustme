export function SecurityIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background glow */}
      <circle cx="200" cy="150" r="130" fill="url(#sec-glow)" opacity="0.06" />

      {/* Central shield */}
      <g transform="translate(200, 130)">
        <path d="M0-70 L55-52 L55-5 C55 35 28 62 0 72 C-28 62 -55 35 -55-5 L-55-52 Z" fill="url(#sec-shield)" />
        <path d="M0-58 L42-43 L42-5 C42 27 22 48 0 56 C-22 48 -42 27 -42-5 L-42-43 Z" fill="white" opacity="0.15" />

        {/* Checkmark */}
        <path d="M-18 -2 L-6 10 L20 -14" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Orbiting elements */}
      {/* Lock */}
      <g transform="translate(85, 70)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#sec-shadow)" />
        <rect x="-7" y="-2" width="14" height="10" rx="2" fill="#16a34a" />
        <path d="M-4-2 L-4-7 C-4-11 4-11 4-7 L4-2" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Key */}
      <g transform="translate(320, 75)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#sec-shadow)" />
        <circle cx="-5" cy="-2" r="5" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <line x1="0" y1="-2" x2="10" y2="-2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="-2" x2="7" y2="2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="-2" x2="10" y2="2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Eye (transparency) */}
      <g transform="translate(85, 220)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#sec-shadow)" />
        <ellipse cx="0" cy="0" rx="10" ry="6" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <circle cx="0" cy="0" r="3" fill="#6366f1" />
      </g>

      {/* Certificate */}
      <g transform="translate(320, 215)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#sec-shadow)" />
        <rect x="-8" y="-10" width="16" height="18" rx="1.5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="-4" y1="-5" x2="4" y2="-5" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
        <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
        <line x1="-4" y1="3" x2="2" y2="3" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
        <circle cx="3" cy="8" r="3" fill="#16a34a" />
        <path d="M1.5 8 L2.5 9 L4.5 7" stroke="white" strokeWidth="0.8" fill="none" />
      </g>

      {/* Connection lines (dashed circles) */}
      <circle cx="200" cy="145" r="105" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <circle cx="200" cy="145" r="75" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />

      {/* Decorative dots */}
      <circle cx="140" cy="140" r="2" fill="#3b82f6" opacity="0.3" />
      <circle cx="260" cy="100" r="2" fill="#6366f1" opacity="0.25" />
      <circle cx="155" cy="200" r="1.5" fill="#16a34a" opacity="0.3" />
      <circle cx="250" cy="210" r="2" fill="#f59e0b" opacity="0.25" />

      {/* Labels */}
      <text x="200" y="278" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="500">ระบบรักษาความปลอดภัยหลายชั้น</text>

      <defs>
        <linearGradient id="sec-shield" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <radialGradient id="sec-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <filter id="sec-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>
    </svg>
  )
}
