// In-memory OTP store (MVP — replace with Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();

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

export function verifyOtp(contact: string, otp: string): boolean {
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
