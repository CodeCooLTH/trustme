'use server'

import type { PricingPlanType } from '@/types/pages/pricingTypes'
import { pricingData } from '@/lib/pricing-data'

export async function getPricingData(): Promise<PricingPlanType[]> {
  return pricingData
}
