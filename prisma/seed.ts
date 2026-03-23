import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Admin user
  await prisma.user.upsert({
    where: { facebookId: 'admin-system' },
    update: {},
    create: {
      facebookId: 'admin-system',
      name: 'System Admin',
      email: 'admin@safepay.co.th',
      role: UserRole.ADMIN,
    },
  })

  // 2. Demo Seller
  const seller = await prisma.user.upsert({
    where: { facebookId: 'demo-seller' },
    update: {},
    create: {
      facebookId: 'demo-seller',
      slug: 'somchai-shop',
      name: 'สมชาย ขายดี',
      email: 'seller@demo.com',
      role: UserRole.SELLER,
      points: 45,
    },
  })

  // Seller bank account
  await prisma.sellerBankAccount.upsert({
    where: { userId: seller.id },
    update: {},
    create: {
      userId: seller.id,
      bankName: 'กสิกรไทย',
      accountNo: '012-345-6789',
      accountName: 'สมชาย ขายดี',
    },
  })

  // 3. Demo Buyer
  await prisma.user.upsert({
    where: { facebookId: 'demo-buyer' },
    update: {},
    create: {
      facebookId: 'demo-buyer',
      name: 'สมหญิง ซื้อเก่ง',
      email: 'buyer@demo.com',
      role: UserRole.BUYER,
      points: 20,
    },
  })

  console.log('Demo users created: admin-system, demo-seller, demo-buyer')

  const settings = [
    {
      key: 'bank_account',
      value: JSON.stringify({
        bank: 'กสิกรไทย',
        accountNo: '012-345-6789',
        accountName: 'บจก. เซฟเพย์',
      }),
    },
    { key: 'confirm_deadline_days', value: '3' },
    {
      key: 'shipping_providers',
      value: JSON.stringify([
        'ไปรษณีย์ไทย', 'Kerry Express', 'Flash Express',
        'J&T Express', 'Ninja Van', 'DHL', 'Best Express',
      ]),
    },
    { key: 'max_payment_attempts', value: '3' },
  ]

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('Seed completed')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
