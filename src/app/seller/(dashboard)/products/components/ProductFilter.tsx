'use client'

import Rating from '@/components/Rating'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const TYPE_OPTIONS = [
  { value: 'PHYSICAL', label: 'สินค้าจับต้องได้' },
  { value: 'DIGITAL', label: 'ดิจิทัล' },
  { value: 'SERVICE', label: 'บริการ' },
] as const

const RATING_OPTIONS = [5, 4, 3, 2, 1]

const ProductFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') ?? '')
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') ?? '')
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') ?? '')
  const [minRating, setMinRating] = useState<string>(searchParams.get('minRating') ?? '')

  const applyFilters = (overrides?: {
    type?: string
    minPrice?: string
    maxPrice?: string
    minRating?: string
  }) => {
    const type = overrides?.type !== undefined ? overrides.type : selectedType
    const min = overrides?.minPrice !== undefined ? overrides.minPrice : minPrice
    const max = overrides?.maxPrice !== undefined ? overrides.maxPrice : maxPrice
    const rating = overrides?.minRating !== undefined ? overrides.minRating : minRating

    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (min) params.set('minPrice', min)
    if (max) params.set('maxPrice', max)
    if (rating) params.set('minRating', rating)

    const qs = params.toString()
    router.push(qs ? `/products?${qs}` : '/products')
  }

  const handleTypeChange = (value: string, checked: boolean) => {
    const next = checked ? value : ''
    setSelectedType(next)
    applyFilters({ type: next })
  }

  const handleRatingChange = (value: string, checked: boolean) => {
    const next = checked ? value : ''
    setMinRating(next)
    applyFilters({ minRating: next })
  }

  const handleReset = () => {
    setSelectedType('')
    setMinPrice('')
    setMaxPrice('')
    setMinRating('')
    router.push('/products')
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        {/* ประเภทสินค้า */}
        <div className="border-default-300 border-b border-dashed p-5">
          <div className="mb-4 flex items-center justify-between">
            <h5>ประเภทสินค้า</h5>
          </div>
          <div className="space-y-3">
            {TYPE_OPTIONS.map((opt) => (
              <div className="flex items-center gap-1.5" key={opt.value}>
                <input
                  type="checkbox"
                  id={`type-${opt.value}`}
                  className="form-checkbox"
                  checked={selectedType === opt.value}
                  onChange={(e) => handleTypeChange(opt.value, e.target.checked)}
                />
                <label htmlFor={`type-${opt.value}`} className="text-default-400 cursor-pointer">
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ราคา */}
        <div className="border-default-300 border-b border-dashed p-5">
          <h5 className="mb-4.5">ราคา (฿)</h5>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-default-400 mb-1 block">ต่ำสุด</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={minPrice}
                min={0}
                onChange={(e) => setMinPrice(e.target.value)}
                onBlur={() => applyFilters()}
              />
            </div>
            <span className="text-default-400 font-semibold mt-5">–</span>
            <div className="flex-1">
              <label className="text-xs text-default-400 mb-1 block">สูงสุด</label>
              <input
                type="number"
                className="form-input"
                placeholder="∞"
                value={maxPrice}
                min={0}
                onChange={(e) => setMaxPrice(e.target.value)}
                onBlur={() => applyFilters()}
              />
            </div>
          </div>
        </div>

        {/* เรตติ้ง */}
        <div className="border-default-300 border-b border-dashed p-5">
          <div className="mb-4 flex items-center justify-between">
            <h5>เรตติ้ง</h5>
          </div>
          <div className="space-y-3">
            {RATING_OPTIONS.map((r) => (
              <div className="flex items-center gap-1.5" key={r}>
                <input
                  type="checkbox"
                  id={`rating-${r}`}
                  className="form-checkbox"
                  checked={minRating === String(r)}
                  onChange={(e) => handleRatingChange(String(r), e.target.checked)}
                />
                <div className="flex items-center">
                  <Rating rating={r} />
                  <span className="text-default-400 ms-1">{r} ดาว ขึ้นไป</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="p-5">
          <button
            type="button"
            onClick={handleReset}
            className="btn border border-default-300 w-full text-default-600 hover:bg-default-50"
          >
            ล้างตัวกรอง
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter
