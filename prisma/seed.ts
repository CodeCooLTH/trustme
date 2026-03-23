import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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
