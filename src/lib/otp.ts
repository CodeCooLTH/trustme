// In-memory OTP store (MVP — replace with Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();

// In-memory rate-limit bucket per contact (MVP — replace with Redis/Upstash)
// PRD NFR-2.7: "OTP rate limit: 3 ครั้ง / 10 นาที ต่อเบอร์โทร"
const otpRequestTimestamps = new Map<string, number[]>();

/**
 * ตรวจว่า contact นี้ยังส่ง OTP ได้อยู่ไหม ภายใต้ quota.
 * Return true = ผ่าน (consume 1 slot), false = เกิน quota
 *
 * Test accounts (TEST_ACCOUNTS) bypass rate limit — dev/QA ไม่ติด
 */
export function consumeOtpRequestQuota(
  contact: string,
  max = 3,
  windowMs = 10 * 60 * 1000,
): boolean {
  if (TEST_ACCOUNTS[contact]) return true; // bypass for bypass accounts

  const now = Date.now();
  const cutoff = now - windowMs;
  const prev = otpRequestTimestamps.get(contact) ?? [];
  const recent = prev.filter((t) => t > cutoff);

  if (recent.length >= max) {
    otpRequestTimestamps.set(contact, recent); // trim stale
    return false;
  }

  recent.push(now);
  otpRequestTimestamps.set(contact, recent);
  return true;
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOtp(contact: string): string {
  const otp = generateOtp();
  otpStore.set(contact, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  });
  return otp;
}

// Test account bypass — remove in production.
// Used to log in without DB/SMS for smoke-testing the UI flow.
export const TEST_ACCOUNT = {
  phone: '0920791649',
  otp: '123456',
  id: 'test-user-0920791649',
  displayName: 'ผู้ใช้ทดสอบ',
  username: 'testuser',
} as const;

const TEST_ACCOUNTS: Record<string, string> = {
  [TEST_ACCOUNT.phone]: TEST_ACCOUNT.otp,
  '0000000001': '123456', // 2nd seller test account — BT Premium สุขสวัสดิ์
};

export function verifyOtp(contact: string, otp: string): boolean {
  if (TEST_ACCOUNTS[contact] && otp === TEST_ACCOUNTS[contact]) return true;

  const stored = otpStore.get(contact);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(contact);
    return false;
  }
  if (stored.attempts >= 3) {
    otpStore.delete(contact);
    return false;
  }
  stored.attempts++;
  if (stored.otp !== otp) return false;
  otpStore.delete(contact);
  return true;
}
