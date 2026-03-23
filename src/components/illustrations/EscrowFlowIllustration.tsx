export function EscrowFlowIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background */}
      <rect x="20" y="20" width="440" height="320" rx="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* ─── Seller (Left) ─── */}
      <g transform="translate(80, 80)">
        {/* Avatar circle */}
        <circle cx="0" cy="0" r="32" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        {/* Person icon */}
        <circle cx="0" cy="-8" r="8" fill="#3b82f6" />
        <path d="M-14 16 C-14 6 14 6 14 16" fill="#3b82f6" />
        <text x="-18" y="50" fontSize="11" fill="#1e293b" fontWeight="600">ผู้ขาย</text>
      </g>

      {/* ─── SafePay (Center) ─── */}
      <g transform="translate(240, 80)">
        {/* Shield */}
        <path d="M0-38 L30-26 L30 0 C30 20 15 34 0 40 C-15 34 -30 20 -30 0 L-30-26 Z" fill="url(#shield-gradient)" />
        <path d="M0-28 L20-19 L20-2 C20 12 10 22 0 26 C-10 22 -20 12 -20-2 L-20-19 Z" fill="white" opacity="0.2" />
        {/* Lock icon inside shield */}
        <rect x="-8" y="-5" width="16" height="13" rx="2" fill="white" />
        <path d="M-4-5 L-4-10 C-4-16 4-16 4-10 L4-5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="0" cy="2" r="2" fill="#3b82f6" />
        <rect x="-0.75" y="2" width="1.5" height="4" rx="0.5" fill="#3b82f6" />
        <text x="-22" y="58" fontSize="12" fill="#3b82f6" fontWeight="700">SafePay</text>
        <text x="-16" y="72" fontSize="8" fill="#64748b">ตัวกลางพักเงิน</text>
      </g>

      {/* ─── Buyer (Right) ─── */}
      <g transform="translate(400, 80)">
        <circle cx="0" cy="0" r="32" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
        <circle cx="0" cy="-8" r="8" fill="#16a34a" />
        <path d="M-14 16 C-14 6 14 6 14 16" fill="#16a34a" />
        <text x="-18" y="50" fontSize="11" fill="#1e293b" fontWeight="600">ผู้ซื้อ</text>
      </g>

      {/* ─── Flow Arrows ─── */}
      {/* Buyer → SafePay (money) */}
      <g>
        <path d="M365 85 L275 85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrow-gold)" />
        <rect x="298" y="70" width="50" height="18" rx="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="310" y="83" fontSize="8" fill="#d97706" fontWeight="600">โอนเงิน</text>
      </g>

      {/* SafePay → Seller (money release) */}
      <g>
        <path d="M205 85 L115 85" stroke="#16a34a" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrow-green)" />
        <rect x="130" y="70" width="55" height="18" rx="9" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <text x="139" y="83" fontSize="8" fill="#16a34a" fontWeight="600">ปล่อยเงิน</text>
      </g>

      {/* Seller → Buyer (product) */}
      <path d="M110 120 Q240 200 370 120" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 3" fill="none" markerEnd="url(#arrow-purple)" />
      <rect x="205" y="160" width="70" height="22" rx="11" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="212" y="175" fontSize="9" fill="#7c3aed" fontWeight="600">ส่งสินค้า 📦</text>

      {/* ─── Bottom: Steps Timeline ─── */}
      <g transform="translate(60, 250)">
        {/* Timeline line */}
        <line x1="0" y1="20" x2="360" y2="20" stroke="#e2e8f0" strokeWidth="2" />

        {/* Step 1 */}
        <circle cx="0" cy="20" r="12" fill="#3b82f6" />
        <text x="-3" y="24" fontSize="10" fill="white" fontWeight="700">1</text>
        <text x="-15" y="50" fontSize="8" fill="#1e293b" fontWeight="600">สร้างดีล</text>

        {/* Step 2 */}
        <circle cx="90" cy="20" r="12" fill="#6366f1" />
        <text x="87" y="24" fontSize="10" fill="white" fontWeight="700">2</text>
        <text x="72" y="50" fontSize="8" fill="#1e293b" fontWeight="600">ชำระเงิน</text>

        {/* Step 3 */}
        <circle cx="180" cy="20" r="12" fill="#8b5cf6" />
        <text x="177" y="24" fontSize="10" fill="white" fontWeight="700">3</text>
        <text x="163" y="50" fontSize="8" fill="#1e293b" fontWeight="600">จัดส่งสินค้า</text>

        {/* Step 4 */}
        <circle cx="270" cy="20" r="12" fill="#f59e0b" />
        <text x="267" y="24" fontSize="10" fill="white" fontWeight="700">4</text>
        <text x="253" y="50" fontSize="8" fill="#1e293b" fontWeight="600">ยืนยันรับ</text>

        {/* Step 5 */}
        <circle cx="360" cy="20" r="12" fill="#16a34a" />
        <text x="357" y="24" fontSize="10" fill="white" fontWeight="700">5</text>
        <text x="340" y="50" fontSize="8" fill="#1e293b" fontWeight="600">ปล่อยเงิน ✓</text>

        {/* Progress fill */}
        <line x1="0" y1="20" x2="180" y2="20" stroke="#3b82f6" strokeWidth="2" />
      </g>

      <defs>
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <marker id="arrow-gold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#f59e0b" />
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#16a34a" />
        </marker>
        <marker id="arrow-purple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#6366f1" />
        </marker>
      </defs>
    </svg>
  )
}
