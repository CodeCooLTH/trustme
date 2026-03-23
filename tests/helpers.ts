import { prisma } from '@/lib/prisma'
import { UserRole, DealStatus } from '@prisma/client'

export async function createTestUser(overrides: Partial<{
  facebookId: string
  name: string
  role: UserRole
  points: number
}> = {}) {
  return prisma.user.create({
    data: {
      facebookId: overrides.facebookId ?? `fb-${Date.now()}-${Math.random()}`,
      name: overrides.name ?? 'Test User',
      role: overrides.role ?? UserRole.SELLER,
      points: overrides.points ?? 0,
    },
  })
}

export async function createTestSellerWithBank(overrides: Partial<{
  name: string
}> = {}) {
  const seller = await createTestUser({ role: UserRole.SELLER, ...overrides })
  await prisma.sellerBankAccount.create({
    data: {
      userId: seller.id,
      bankName: 'กสิกรไทย',
      accountNo: '012-345-6789',
      accountName: seller.name,
    },
  })
  return seller
}

export async function createTestDeal(sellerId: string, overrides: Partial<{
  productName: string
  price: number
  status: DealStatus
}> = {}) {
  return prisma.deal.create({
    data: {
      sellerId,
      productName: overrides.productName ?? 'iPhone 15',
      description: 'สภาพดี ใช้งาน 6 เดือน',
      price: overrides.price ?? 25000,
      shippingMethod: 'Kerry Express',
      status: overrides.status ?? DealStatus.DRAFT,
      images: [],
    },
  })
}

export async function seedSystemSettings() {
  const settings = [
    { key: 'confirm_deadline_days', value: '3' },
    { key: 'max_payment_attempts', value: '3' },
    {
      key: 'shipping_providers',
      value: JSON.stringify(['Kerry Express', 'Flash Express', 'ไปรษณีย์ไทย']),
    },
    {
      key: 'bank_account',
      value: JSON.stringify({
        bank: 'กสิกรไทย',
        accountNo: '012-345-6789',
        accountName: 'บจก. เซฟเพย์',
      }),
    },
  ]

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }
}
