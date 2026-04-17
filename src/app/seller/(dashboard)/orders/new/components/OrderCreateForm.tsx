'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import ChoiceSelect from '@/components/wrappers/ChoiceSelect'
import Icon from '@/components/wrappers/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CatalogProduct {
  id: string
  name: string
  description?: string | null
  price: number
  type: string
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

const DEFAULT_ITEM: FormValues['items'][number] = {
  productId: '',
  name: '',
  description: '',
  qty: 1,
  price: 0,
}

const TYPE_OPTIONS = [
  { value: 'PHYSICAL', label: 'สินค้าจับต้องได้ (Physical)' },
  { value: 'DIGITAL', label: 'ดิจิทัล (Digital)' },
  { value: 'SERVICE', label: 'บริการ (Service)' },
]

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

  // Selected catalog item for the picker row at the top of the middle column
  const [pickerProductId, setPickerProductId] = useState<string>('')

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      type: 'PHYSICAL',
      buyerContact: '',
      buyerName: '',
      items: [{ ...DEFAULT_ITEM }],
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

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const watchedItems = useWatch({ control, name: 'items' })
  const watchedType = useWatch({ control, name: 'type' })
  const isPhysical = watchedType === 'PHYSICAL'

  // ── Computed total ────────────────────────────────────────────────────────

  const total = useMemo(() => {
    if (!watchedItems) return 0
    return watchedItems.reduce((sum, item) => {
      const q = Number(item?.qty) || 0
      const p = Number(item?.price) || 0
      return sum + q * p
    }, 0)
  }, [watchedItems])

  const formatThb = (n: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(n)

  // ── Catalog pick handler (top-of-picker row "เพิ่ม" button) ──────────────

  const handleAddFromCatalog = useCallback(() => {
    if (!pickerProductId) return
    const product = catalog.find((p) => p.id === pickerProductId)
    if (!product) return
    append({
      productId: product.id,
      name: product.name,
      description: product.description ?? '',
      qty: 1,
      price: Number(product.price),
    })
    setPickerProductId('')
  }, [pickerProductId, catalog, append])

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* COLUMN 1 — ข้อมูลลูกค้า                                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="card rounded-xl p-6 flex flex-col gap-5">
          <h2 className="text-base font-semibold text-dark">ข้อมูลลูกค้า</h2>

          {/* Order type */}
          <div>
            <label htmlFor="order-type" className="form-label">
              ประเภทออเดอร์<span className="text-danger">*</span>
            </label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <ChoiceSelect
                  id="order-type"
                  options={TYPE_OPTIONS}
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  search={false}
                />
              )}
            />
            {errors.type && (
              <p className="text-danger mt-1 text-sm">{errors.type.message}</p>
            )}
          </div>

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
        {/* COLUMN 2 — เลือกสินค้า                                             */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="card rounded-xl p-6 flex flex-col">
          <h2 className="text-base font-semibold text-dark mb-5">เลือกสินค้า</h2>

          {/* Top picker row */}
          {catalog.length > 0 && (
            <div className="flex gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <ChoiceSelect
                  options={[
                    { value: '', label: 'เลือกสินค้าจากแคตตาล็อก' },
                    ...catalog.map((p) => ({
                      value: p.id,
                      label: `${p.name} — ${formatThb(p.price)}`,
                    })),
                  ]}
                  value={pickerProductId}
                  onChange={(v) => setPickerProductId(v as string)}
                  search={catalog.length > 5}
                  placeholder="เลือกสินค้าจากแคตตาล็อก"
                />
              </div>
              <button
                type="button"
                onClick={handleAddFromCatalog}
                disabled={!pickerProductId}
                className="btn bg-primary text-white hover:bg-primary-hover disabled:opacity-40 disabled:pointer-events-none px-3 py-2 inline-flex items-center gap-1 text-sm shrink-0"
              >
                <Icon icon="plus" width={16} height={16} />
                เพิ่ม
              </button>
            </div>
          )}

          {/* Items list */}
          <div className="flex flex-col gap-3 flex-1">
            {fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-default-400 gap-2">
                <Icon icon="package" width={40} height={40} className="opacity-40" />
                <p className="text-sm">ยังไม่มีรายการ</p>
                <p className="text-xs">เลือกสินค้าจากแคตตาล็อกหรือเพิ่มรายการกำหนดเอง</p>
              </div>
            ) : (
              fields.map((field, index) => {
                const item = watchedItems?.[index]
                const itemErrors = (errors.items as any)?.[index]
                const isFromCatalog = !!item?.productId

                return (
                  <div
                    key={field.id}
                    className="border border-default-200 rounded-lg p-3 flex flex-col gap-2"
                  >
                    {/* Row: name + remove */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        {isFromCatalog ? (
                          <p className="text-sm font-medium text-dark truncate">
                            {item?.name}
                          </p>
                        ) : (
                          <input
                            type="text"
                            placeholder="ชื่อสินค้า"
                            className="form-input text-sm py-1.5"
                            {...register(`items.${index}.name`)}
                          />
                        )}
                        {itemErrors?.name && (
                          <p className="text-danger text-xs mt-0.5">{itemErrors.name.message}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn btn-icon btn-sm border border-default-200 text-default-400 hover:text-danger hover:border-danger shrink-0 mt-0.5"
                        aria-label="ลบรายการ"
                      >
                        <Icon icon="x" width={14} height={14} />
                      </button>
                    </div>

                    {/* Row: qty stepper + price */}
                    <div className="flex items-center gap-3">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const cur = Number(item?.qty) || 1
                            if (cur > 1) setValue(`items.${index}.qty`, cur - 1, { shouldValidate: true })
                          }}
                          className="btn btn-icon btn-sm border border-default-200 text-default-600 hover:bg-default-50 w-7 h-7"
                        >
                          <Icon icon="minus" width={12} height={12} />
                        </button>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          step={1}
                          className="form-input text-sm text-center py-1 w-12"
                          {...register(`items.${index}.qty`, { valueAsNumber: true })}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const cur = Number(item?.qty) || 1
                            setValue(`items.${index}.qty`, cur + 1, { shouldValidate: true })
                          }}
                          className="btn btn-icon btn-sm border border-default-200 text-default-600 hover:bg-default-50 w-7 h-7"
                        >
                          <Icon icon="plus" width={12} height={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex-1 flex items-center gap-1.5">
                        <span className="text-xs text-default-400 shrink-0">฿</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0.01}
                          step={0.01}
                          placeholder="0.00"
                          className="form-input text-sm py-1.5 flex-1"
                          readOnly={isFromCatalog}
                          {...register(`items.${index}.price`, { valueAsNumber: true })}
                        />
                      </div>

                      {/* Row subtotal */}
                      <span className="text-xs text-default-500 shrink-0 min-w-[60px] text-right">
                        {formatThb((Number(item?.qty) || 0) * (Number(item?.price) || 0))}
                      </span>
                    </div>

                    {itemErrors?.price && (
                      <p className="text-danger text-xs">{itemErrors.price.message}</p>
                    )}
                    {itemErrors?.qty && (
                      <p className="text-danger text-xs">{itemErrors.qty.message}</p>
                    )}

                    {/* hidden productId */}
                    <input type="hidden" {...register(`items.${index}.productId`)} />
                  </div>
                )
              })
            )}
          </div>

          {/* Add custom item */}
          <button
            type="button"
            onClick={() => append({ ...DEFAULT_ITEM })}
            className="mt-4 text-sm text-primary hover:underline inline-flex items-center gap-1 self-start"
          >
            <Icon icon="plus" width={14} height={14} />
            เพิ่มรายการกำหนดเอง
          </button>

          {errors.items && typeof errors.items.message === 'string' && (
            <p className="text-danger text-sm mt-2">{errors.items.message}</p>
          )}

          {/* Total footer */}
          <div className="mt-5 pt-4 border-t border-default-200 flex items-center justify-between">
            <span className="text-sm text-default-500">รวม</span>
            <span className="text-xl font-bold text-dark">{formatThb(total)}</span>
          </div>
        </div>

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
