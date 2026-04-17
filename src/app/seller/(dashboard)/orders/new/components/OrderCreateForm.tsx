'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import ChoiceSelect from '@/components/wrappers/ChoiceSelect'

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
})

// Explicit interface — avoids Yup inference vs. react-hook-form generic mismatch
interface FormValues {
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
  buyerContact?: string | undefined
  items: {
    productId?: string | undefined
    name: string
    description?: string | undefined
    qty: number
    price: number
  }[]
}


const DEFAULT_ITEM: FormValues['items'][number] = {
  productId: '',
  name: '',
  description: '',
  qty: 1,
  price: 0,
}

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'PHYSICAL', label: 'สินค้าจับต้องได้ (Physical)' },
  { value: 'DIGITAL', label: 'ดิจิทัล (Digital)' },
  { value: 'SERVICE', label: 'บริการ (Service)' },
]

const ONOFF_VALUE = '__onoff__'

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderCreateForm({ shopId, catalog }: Props) {
  const router = useRouter()

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
      items: [{ ...DEFAULT_ITEM }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const watchedItems = useWatch({ control, name: 'items' })

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

  // ── Catalog pick handler ──────────────────────────────────────────────────

  const handleProductPick = useCallback(
    (index: number, productId: string) => {
      if (productId === ONOFF_VALUE || productId === '') {
        // One-off mode — clear auto-fill but keep what user typed
        setValue(`items.${index}.productId`, '', { shouldValidate: false })
      } else {
        const product = catalog.find((p) => p.id === productId)
        if (!product) return
        setValue(`items.${index}.productId`, product.id, { shouldValidate: false })
        setValue(`items.${index}.name`, product.name, { shouldValidate: true })
        setValue(`items.${index}.price`, Number(product.price), { shouldValidate: true })
        if (product.description) {
          setValue(`items.${index}.description`, product.description, { shouldValidate: false })
        }
      }
    },
    [catalog, setValue],
  )

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = async (values: FormValues) => {
    const body = {
      type: values.type,
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

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── Top fields ─────────────────────────────────────────────────────── */}
      <div className="card rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-dark mb-5">ข้อมูลออเดอร์</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Type */}
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
                กรอกเพื่อแจ้งลิงก์ให้ผู้ซื้อ (ไม่บังคับ)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Items ──────────────────────────────────────────────────────────── */}
      <div className="card rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-dark mb-5">รายการสินค้า</h2>

        <div className="flex flex-col gap-6">
          {fields.map((field, index) => {
            const currentProductId = watchedItems?.[index]?.productId ?? ''
            const isOnOff = !currentProductId || currentProductId === ONOFF_VALUE
            const itemErrors = (errors.items as any)?.[index]

            return (
              <div
                key={field.id}
                className="border border-default-200 rounded-xl p-5 relative"
              >
                {/* Remove button */}
                <button
                  type="button"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  className="absolute top-3 right-3 btn btn-icon btn-sm border border-default-200 text-default-500 hover:text-danger hover:border-danger disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="ลบรายการ"
                >
                  <Icon icon="mdi:close" width={16} height={16} />
                </button>

                <div className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-4">
                  สินค้า #{index + 1}
                </div>

                {/* Row 1: catalog picker */}
                <div className="mb-4">
                  <label className="form-label">เลือกจากคลัง / กำหนดเอง</label>
                  <ChoiceSelect
                    options={[
                      { value: ONOFF_VALUE, label: 'กำหนดเอง (one-off)' },
                      ...catalog.map((p) => ({
                        value: p.id,
                        label: `${p.name} — ${formatThb(p.price)}`,
                      })),
                    ]}
                    value={currentProductId || ONOFF_VALUE}
                    onChange={(v) => handleProductPick(index, v as string)}
                    search={catalog.length > 5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="form-label">
                      ชื่อสินค้า<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ชื่อสินค้า"
                      className="form-input"
                      readOnly={!isOnOff}
                      {...register(`items.${index}.name`)}
                    />
                    {itemErrors?.name && (
                      <p className="text-danger mt-1 text-sm">{itemErrors.name.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="form-label">รายละเอียด</label>
                    <input
                      type="text"
                      placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
                      className="form-input"
                      {...register(`items.${index}.description`)}
                    />
                  </div>

                  {/* Qty */}
                  <div>
                    <label className="form-label">
                      จำนวน<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      placeholder="1"
                      className="form-input"
                      {...register(`items.${index}.qty`, { valueAsNumber: true })}
                    />
                    {itemErrors?.qty && (
                      <p className="text-danger mt-1 text-sm">{itemErrors.qty.message}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="form-label">
                      ราคา (บาท)<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0.01}
                      step={0.01}
                      placeholder="0.00"
                      className="form-input"
                      readOnly={!isOnOff}
                      {...register(`items.${index}.price`, { valueAsNumber: true })}
                    />
                    {itemErrors?.price && (
                      <p className="text-danger mt-1 text-sm">{itemErrors.price.message}</p>
                    )}
                  </div>
                </div>

                {/* hidden productId */}
                <input type="hidden" {...register(`items.${index}.productId`)} />
              </div>
            )
          })}
        </div>

        {/* Add item */}
        <button
          type="button"
          onClick={() => append({ ...DEFAULT_ITEM })}
          className="mt-5 btn border border-default-300 bg-card hover:bg-default-50 text-default-700 inline-flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Icon icon="mdi:plus" width={16} height={16} />
          เพิ่มสินค้า
        </button>
      </div>

      {/* ── Total + actions ─────────────────────────────────────────────────── */}
      <div className="card rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-default-400 text-sm mb-0.5">ยอดรวมทั้งหมด</div>
          <div className="text-2xl font-bold text-dark">{formatThb(total)}</div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn border border-default-300 bg-card hover:bg-default-50 text-default-700 flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-primary text-white hover:bg-primary-hover flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Icon icon="mdi:loading" width={16} height={16} className="animate-spin" />
                กำลังสร้าง...
              </>
            ) : (
              <>
                <Icon icon="mdi:receipt-text-plus-outline" width={16} height={16} />
                สร้างออเดอร์
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
