import express from '@/assets/images/cards/american-express.svg'
import discover from '@/assets/images/cards/discover-card.svg'
import mastercard from '@/assets/images/cards/mastercard.svg'
import visa from '@/assets/images/cards/visa.svg'
import { StaticImageData } from 'next/image'

export type BankAccountType = {
  name: string
  icon: string
  balance: string
  holder: string
  accountNo: string
  type: string
  branch: string
  status: 'active' | 'inactive'
  iconClassName: string
}

export const bankAccountData: BankAccountType[] = [
  {
    name: 'Chase Bank',
    balance: '$12,875.61',
    holder: 'John Doe',
    accountNo: '1234 5678 2045',
    type: 'Checking',
    branch: 'New York Downtown',
    status: 'active',
    icon: 'building-bank',
    iconClassName: 'bg-primary/15 text-primary',
  },
  {
    name: 'Bank of America',
    balance: '$9,432.18',
    holder: 'Emily Smith',
    accountNo: '9876 5432 1089',
    type: 'Savings',
    branch: 'Los Angeles Central',
    status: 'inactive',
    icon: 'building-bank',
    iconClassName: 'bg-info/15 text-info',
  },
  {
    name: 'Wells Fargo',
    balance: '$18,210.42',
    holder: 'Michael Johnson',
    accountNo: '4455 2299 6574',
    type: 'Business',
    branch: 'Chicago West Loop',
    status: 'active',
    icon: 'building-bank',
    iconClassName: 'bg-danger/15 text-danger',
  },
]

export type PaymentCardType = {
  brand: string
  image: StaticImageData
  number: string
  expiryDate: string
  holder: string
  status: 'active' | 'inactive' | 'expired'
}

export const paymentCardData: PaymentCardType[] = [
  {
    brand: 'Visa',
    image: visa,
    number: '**** **** **** 3294',
    expiryDate: '08/28',
    holder: 'John Miller',
    status: 'active',
  },
  {
    brand: 'MasterCard',
    image: mastercard,
    number: '**** **** **** 7841',
    expiryDate: '12/26',
    holder: 'Emma Thompson',
    status: 'active',
  },
  {
    brand: 'American Express',
    image: express,
    number: '**** **** **** 4428',
    expiryDate: '03/27',
    holder: 'Liam Carter',
    status: 'inactive',
  },
  {
    brand: 'Discover',
    image: discover,
    number: '**** **** **** 9812',
    expiryDate: '11/24',
    holder: 'Sophia Lewis',
    status: 'expired',
  },
]
