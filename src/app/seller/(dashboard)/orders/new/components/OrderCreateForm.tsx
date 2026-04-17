'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import ChoiceSelect from '@/components/wrappers/ChoiceSelect'
import Icon from '@/components/wrappers/Icon'
import ProductPickerModal from './ProductPickerModal'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CatalogProduct {
  id: string
  name: string
  description?: string | null
  price: number
  type: string
  image?: string | null
}

interface Props {
  shopId: string
  catalog: CatalogProduct[]
  /** HTML id assigned to the <form> element so an external submit button can use form="…" */
  formId?: string
}

// ─── Validation schema ────────────────────────────────────────────────────────

const itemSchema = Yup.object({
  productId: Yup.string().optional(),
  name: Yup.string().min(1, 'กรุณากรอกชื่อสินค้า').required('กรุณากรอกชื่อสินค้า'),
  description: Yup.string().optional(),
  qty: Yup.number()
    .typeError('กรุณากรอกจำนวน')
    .integer('จำนวนต้องเป็นจำนวนเต็ม')
    .min(1, 'จำนวนอย่างน้อย 1')
    .required('กรุณากรอกจำนวน'),
  price: Yup.number()
    .typeError('กรุณากรอกราคา')
    .min(0.01, 'ราคาต้องมากกว่า 0')
    .required('กรุณากรอกราคา'),
})

const schema = Yup.object({
  // ── Persisted fields ───────────────────────────────────────────────────────
  type: Yup.string()
    .oneOf(['PHYSICAL', 'DIGITAL', 'SERVICE'], 'กรุณาเลือกประเภทออเดอร์')
    .required('กรุณาเลือกประเภทออเดอร์'),
  buyerContact: Yup.string()
    .optional()
    .test('phone-or-email', 'ต้องเป็นเบอร์ไทย (0xxxxxxxxx) หรืออีเมล', (val) => {
      if (!val || val.trim() === '') return true
      const phoneOk = /^0[0-9]{9}$/.test(val.trim())
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
      return phoneOk || emailOk
    }),
  items: Yup.array(itemSchema).min(1, 'ต้องมีสินค้าอย่างน้อย 1 รายการ').required(),

  // ── UI-only fields (collected but NOT sent to API yet) ─────────────────────
  buyerName: Yup.string().required('กรุณากรอกชื่อลูกค้า'),
  shippingAddress: Yup.object({
    line1: Yup.string().optional(),
    district: Yup.string().optional(),
    amphoe: Yup.string().optional(),
    province: Yup.string().optional(),
    postalCode: Yup.string().optional(),
    note: Yup.string().optional(),
  }).optional(),
  channel: Yup.string()
    .oneOf(['STOREFRONT', 'FACEBOOK', 'LINE', 'TIKTOK', 'OTHER'])
    .optional(),
  paymentMethod: Yup.string()
    .oneOf(['CASH', 'TRANSFER', 'PROMPTPAY', 'CARD', 'COD', 'OTHER'])
    .optional(),
  note: Yup.string().optional(),
})

// Explicit interface — avoids Yup inference vs. react-hook-form generic mismatch
interface FormValues {
  // Persisted
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
  buyerContact?: string | undefined
  items: {
    productId?: string | undefined
    name: string
    description?: string | undefined
    qty: number
    price: number
  }[]
  // UI-only
  buyerName: string
  shippingAddress?: {
    line1?: string
    district?: string
    amphoe?: string
    province?: string
    postalCode?: string
    note?: string
  }
  channel?: 'STOREFRONT' | 'FACEBOOK' | 'LINE' | 'TIKTOK' | 'OTHER'
  paymentMethod?: 'CASH' | 'TRANSFER' | 'PROMPTPAY' | 'CARD' | 'COD' | 'OTHER'
  note?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CHANNEL_OPTIONS = [
  { value: 'STOREFRONT', label: 'หน้าร้าน' },
  { value: 'FACEBOOK', label: 'Facebook' },
  { value: 'LINE', label: 'Line' },
  { value: 'TIKTOK', label: 'TikTok / TikTok Shop' },
  { value: 'OTHER', label: 'อื่นๆ' },
]

const PAYMENT_OPTIONS = [
  { value: 'CASH', label: 'เงินสด' },
  { value: 'TRANSFER', label: 'โอนเงิน' },
  { value: 'PROMPTPAY', label: 'พร้อมเพย์' },
  { value: 'CARD', label: 'บัตรเครดิต/เดบิต' },
  { value: 'COD', label: 'เก็บปลายทาง' },
  { value: 'OTHER', label: 'อื่นๆ' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderCreateForm({ shopId: _shopId, catalog, formId }: Props) {
  const router = useRouter()

  // Product picker modal state
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      type: 'PHYSICAL',
      buyerContact: '',
      buyerName: '',
      items: [],
      shippingAddress: {
        line1: '',
        district: '',
        amphoe: '',
        province: '',
        postalCode: '',
        note: '',
      },
      channel: undefined,
      paymentMethod: undefined,
      note: '',
    },
  })

  const { append, update, remove } = useFieldArray({ control, name: 'items' })
  const watchedItems = useWatch({ control, name: 'items' }) ?? []
  const watchedType = useWatch({ control, name: 'type' })
  const isPhysical = watchedType === 'PHYSICAL'

  // ── Computed total ────────────────────────────────────────────────────────

  const total = useMemo(() => {
    return watchedItems.reduce((sum, item) => {
      const q = Number(item?.qty) || 0
      const p = Number(item?.price) || 0
      return sum + q * p
    }, 0)
  }, [watchedItems])

  const formatThb = (n: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(n)

  // ── Quick-pick helpers ────────────────────────────────────────────────────

  const qtyByProduct = (pid: string): number =>
    watchedItems.find((i) => i.productId === pid)?.qty ?? 0

  const inc = (product: CatalogProduct) => {
    const idx = watchedItems.findIndex((i) => i.productId === product.id)
    if (idx >= 0) {
      update(idx, { ...watchedItems[idx], qty: watchedItems[idx].qty + 1 })
    } else {
      append({
        productId: product.id,
        name: product.name,
        description: product.description ?? '',
        qty: 1,
        price: Number(product.price),
      })
    }
  }

  const dec = (productId: string) => {
    const idx = watchedItems.findIndex((i) => i.productId === productId)
    if (idx < 0) return
    const next = watchedItems[idx].qty - 1
    if (next <= 0) {
      remove(idx)
    } else {
      update(idx, { ...watchedItems[idx], qty: next })
    }
  }

  // Custom items: those with no productId
  const customItems = watchedItems
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => !item.productId)

  const addCustomItem = () => {
    append({ productId: undefined, name: '', description: '', qty: 1, price: 0 })
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = async (values: FormValues) => {
    // TODO: persist buyerName/shippingAddress/channel/paymentMethod/note when order schema extends
    const body = {
      type: values.type,
      ...(values.buyerContact ? { buyerContact: values.buyerContact } : {}),
      items: values.items.map((item) => ({
        ...(item.productId ? { productId: item.productId } : {}),
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        qty: item.qty,
        price: item.price,
      })),
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error ?? 'สร้างออเดอร์ไม่สำเร็จ กรุณาลองใหม่')
        return
      }

      const order = await res.json()
      const token = order?.publicToken ?? order?.order?.publicToken
      toast.success('สร้างออเดอร์แล้ว แชร์ลิงก์ให้ผู้ซื้อ')
      if (token) {
        router.push(`/orders/${token}`)
      } else {
        router.push('/orders')
      }
    } catch {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {isSubmitting && (
        <div className="mb-4 flex items-center gap-2 text-sm text-default-500">
          <Icon icon="loader-2" className="animate-spin" width={16} height={16} />
          กำลังสร้างออเดอร์...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[30%_40%_30%] gap-6">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* COLUMN 1 — ข้อมูลลูกค้า                                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="card rounded-xl p-6 flex flex-col gap-5">
          <h2 className="text-base font-semibold text-dark">ข้อมูลลูกค้า</h2>

          {/* Order type hidden — defaults to PHYSICAL in form state */}

          {/* Buyer name — UI-only */}
          <div>
            <label htmlFor="buyer-name" className="form-label">
              ชื่อ-นามสกุลลูกค้า<span className="text-danger">*</span>
            </label>
            <input
              id="buyer-name"
              type="text"
              placeholder="เช่น สมชาย ใจดี"
              className="form-input"
              {...register('buyerName')}
            />
            {errors.buyerName && (
              <p className="text-danger mt-1 text-sm">{errors.buyerName.message}</p>
            )}
          </div>

          {/* Buyer contact */}
          <div>
            <label htmlFor="buyer-contact" className="form-label">
              ช่องทางติดต่อผู้ซื้อ
            </label>
            <input
              id="buyer-contact"
              type="text"
              placeholder="0812345678 หรือ buyer@email.com"
              className="form-input"
              {...register('buyerContact')}
            />
            {errors.buyerContact ? (
              <p className="text-danger mt-1 text-sm">{errors.buyerContact.message}</p>
            ) : (
              <p className="text-default-400 mt-1 text-xs">
                เบอร์หรือ email สำหรับแจ้งลิงก์ให้ผู้ซื้อ
              </p>
            )}
          </div>

          {/* Shipping address — visible only for PHYSICAL orders */}
          {isPhysical && (
            <fieldset className="border border-default-200 rounded-lg p-4 flex flex-col gap-3">
              <legend className="text-xs font-semibold text-default-500 px-1">
                ที่อยู่จัดส่ง
              </legend>

              <div>
                <label htmlFor="addr-line1" className="form-label">
                  ที่อยู่ / บ้านเลขที่ + ถนน
                </label>
                <input
                  id="addr-line1"
                  type="text"
                  placeholder="123 ถนนสุขุมวิท"
                  className="form-input"
                  {...register('shippingAddress.line1')}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="addr-district" className="form-label">
                    ตำบล/แขวง
                  </label>
                  <input
                    id="addr-district"
                    type="text"
                    placeholder="คลองเตย"
                    className="form-input"
                    {...register('shippingAddress.district')}
                  />
                </div>
                <div>
                  <label htmlFor="addr-amphoe" className="form-label">
                    อำเภอ/เขต
                  </label>
                  <input
                    id="addr-amphoe"
                    type="text"
                    placeholder="คลองเตย"
                    className="form-input"
                    {...register('shippingAddress.amphoe')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="addr-province" className="form-label">
                    จังหวัด
                  </label>
                  <input
                    id="addr-province"
                    type="text"
                    placeholder="กรุงเทพมหานคร"
                    className="form-input"
                    {...register('shippingAddress.province')}
                  />
                </div>
                <div>
                  <label htmlFor="addr-postal" className="form-label">
                    รหัสไปรษณีย์
                  </label>
                  <input
                    id="addr-postal"
                    type="text"
                    inputMode="numeric"
                    placeholder="10110"
                    className="form-input"
                    {...register('shippingAddress.postalCode')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="addr-note" className="form-label">
                  หมายเหตุถึงผู้ส่ง
                </label>
                <input
                  id="addr-note"
                  type="text"
                  placeholder="เช่น ฝากไว้ที่รปภ."
                  className="form-input"
                  {...register('shippingAddress.note')}
                />
              </div>
            </fieldset>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* COLUMN 2 — รายการสั่งซื้อ (cart-style)                            */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="card rounded-xl flex flex-col overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-default-100">
            <h2 className="text-base font-semibold text-dark">รายการสั่งซื้อ</h2>
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="btn btn-sm bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-1 px-3 py-1.5"
            >
              <Icon icon="plus" width={14} height={14} />
              เลือกสินค้า
            </button>
          </div>

          {/* Cart list */}
          <div className="flex-1 overflow-y-auto divide-y divide-default-100">
            {/* Empty state */}
            {watchedItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-14 gap-3 text-default-400 px-4 text-center">
                <Icon icon="shopping-cart" width={40} height={40} className="opacity-40" />
                <p className="text-sm font-medium">ยังไม่มีรายการ</p>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="text-sm text-primary hover:underline"
                >
                  เลือกสินค้า
                </button>
              </div>
            )}

            {/* Catalog cart rows */}
            {watchedItems.map((item, idx) => {
              if (!item.productId) return null // custom items rendered below
              const product = catalog.find((p) => p.id === item.productId)
              const shortId = item.productId.slice(0, 8)
              const itemErrors = (errors.items as any)?.[idx]
              return (
                <div
                  key={`catalog-${item.productId}`}
                  className="flex gap-3 px-4 py-3 border-b border-default-100 last:border-b-0"
                >
                  {/* Image / icon */}
                  <div className="size-12 rounded bg-default-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {product?.image ? (
                      <img
                        src={product.image}
                        alt={item.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Icon icon="package" className="size-6 text-default-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-dark truncate">{item.name}</p>
                        <p className="text-xs text-default-400 mt-0.5">SKU: {shortId}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        aria-label="ลบ"
                        className="text-default-400 hover:text-danger shrink-0"
                      >
                        <Icon icon="x" className="size-4" />
                      </button>
                    </div>
                    <div className="flex justify-end mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => dec(item.productId!)}
                          className="btn btn-icon btn-sm border border-default-200 text-default-600 hover:bg-default-100 w-7 h-7"
                          aria-label="ลด"
                        >
                          <Icon icon="minus" width={12} height={12} />
                        </button>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          step={1}
                          className="form-input text-sm text-center py-1 w-12"
                          {...register(`items.${idx}.qty`, { valueAsNumber: true })}
                        />
                        <button
                          type="button"
                          onClick={() => inc(catalog.find((p) => p.id === item.productId)!)}
                          className="btn btn-icon btn-sm border border-default-200 text-default-600 hover:bg-default-100 w-7 h-7"
                          aria-label="เพิ่ม"
                        >
                          <Icon icon="plus" width={12} height={12} />
                        </button>
                      </div>
                    </div>
                    {itemErrors?.qty && (
                      <p className="text-danger text-xs mt-1">{itemErrors.qty.message}</p>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Custom item rows */}
            {customItems.map(({ item, idx }) => {
              const itemErrors = (errors.items as any)?.[idx]
              return (
                <div
                  key={`custom-${idx}`}
                  className="flex gap-3 px-4 py-3 border-b border-default-100 last:border-b-0"
                >
                  {/* Icon placeholder */}
                  <div className="size-12 rounded bg-default-100 flex items-center justify-center shrink-0">
                    <Icon icon="edit" className="size-6 text-default-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            กำหนดเอง
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="ชื่อสินค้า"
                          className="form-input text-sm py-1 w-full"
                          {...register(`items.${idx}.name`)}
                        />
                        {itemErrors?.name && (
                          <p className="text-danger text-xs mt-0.5">{itemErrors.name.message}</p>
                        )}
                        {/* Price input */}
                        <div className="relative mt-1.5">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-default-400 text-xs pointer-events-none">฿</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0.01}
                            step={0.01}
                            placeholder="0.00"
                            className="form-input text-sm py-1 pl-6 w-full"
                            {...register(`items.${idx}.price`, { valueAsNumber: true })}
                          />
                        </div>
                        {itemErrors?.price && (
                          <p className="text-danger text-xs mt-0.5">{itemErrors.price.message}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        aria-label="ลบ"
                        className="text-default-400 hover:text-danger shrink-0"
                      >
                        <Icon icon="x" className="size-4" />
                      </button>
                    </div>

                    {/* Qty stepper */}
                    <div className="flex justify-end mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const cur = Number(item?.qty) || 1
                            if (cur > 1) update(idx, { ...item, qty: cur - 1 })
                            else remove(idx)
                          }}
                          className="btn btn-icon btn-sm border border-default-200 text-default-600 hover:bg-default-100 w-7 h-7"
                          aria-label="ลด"
                        >
                          <Icon icon="minus" width={12} height={12} />
                        </button>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          step={1}
                          className="form-input text-sm text-center py-1 w-12"
                          {...register(`items.${idx}.qty`, { valueAsNumber: true })}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const cur = Number(item?.qty) || 1
                            update(idx, { ...item, qty: cur + 1 })
                          }}
                          className="btn btn-icon btn-sm border border-default-200 text-default-600 hover:bg-default-100 w-7 h-7"
                          aria-label="เพิ่ม"
                        >
                          <Icon icon="plus" width={12} height={12} />
                        </button>
                      </div>
                    </div>
                    {itemErrors?.qty && (
                      <p className="text-danger text-xs mt-1">{itemErrors.qty.message}</p>
                    )}

                    {/* hidden productId */}
                    <input type="hidden" {...register(`items.${idx}.productId`)} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Add custom item link */}
          <div className="px-4 py-3 border-t border-default-100">
            <button
              type="button"
              onClick={addCustomItem}
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              <Icon icon="plus" width={14} height={14} />
              เพิ่มรายการกำหนดเอง
            </button>
          </div>

          {/* Validation error for items array */}
          {errors.items && typeof errors.items.message === 'string' && (
            <div className="px-4 pb-2">
              <p className="text-danger text-sm">{errors.items.message}</p>
            </div>
          )}

          {/* Total footer */}
          <div className="px-4 py-3 border-t border-default-200 bg-card flex items-center justify-between">
            <span className="text-sm text-default-500">รวม</span>
            <span className="text-xl font-bold text-dark">{formatThb(total)}</span>
          </div>
        </div>

        {/* Product picker modal (rendered outside form columns, full-screen overlay) */}
        <ProductPickerModal
          open={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          catalog={catalog}
          qtyByProduct={qtyByProduct}
          inc={inc}
          dec={dec}
        />

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* COLUMN 3 — ข้อมูลอื่น ๆ                                            */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="card rounded-xl p-6 flex flex-col gap-5">
          <h2 className="text-base font-semibold text-dark">ข้อมูลอื่น ๆ</h2>

          {/* Channel — UI-only */}
          <div>
            <label htmlFor="order-channel" className="form-label">
              ช่องทางการขาย
            </label>
            <Controller
              control={control}
              name="channel"
              render={({ field }) => (
                <ChoiceSelect
                  id="order-channel"
                  options={CHANNEL_OPTIONS}
                  value={field.value ?? ''}
                  onChange={(v) => field.onChange(v || undefined)}
                  search={false}
                  placeholder="เลือกช่องทาง"
                />
              )}
            />
          </div>

          {/* Payment method — UI-only */}
          <div>
            <label htmlFor="order-payment" className="form-label">
              วิธีชำระเงิน
            </label>
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <ChoiceSelect
                  id="order-payment"
                  options={PAYMENT_OPTIONS}
                  value={field.value ?? ''}
                  onChange={(v) => field.onChange(v || undefined)}
                  search={false}
                  placeholder="เลือกวิธีชำระเงิน"
                />
              )}
            />
          </div>

          {/* Note — UI-only */}
          <div>
            <label htmlFor="order-note" className="form-label">
              หมายเหตุภายใน
            </label>
            <textarea
              id="order-note"
              rows={3}
              placeholder="บันทึกส่วนตัวเกี่ยวกับออเดอร์นี้"
              className="form-input resize-none"
              {...register('note')}
            />
            <p className="text-default-400 mt-1 text-xs">
              มองเห็นเฉพาะร้านค้า ไม่แสดงให้ผู้ซื้อเห็น
            </p>
          </div>
        </div>

      </div>
    </form>
  )
}
