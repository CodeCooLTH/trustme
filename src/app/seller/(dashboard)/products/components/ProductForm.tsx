'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string()
    .min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร')
    .max(200, 'ชื่อต้องไม่เกิน 200 ตัวอักษร')
    .required('กรุณากรอกชื่อสินค้า'),
  description: Yup.string().max(2000, 'คำอธิบายต้องไม่เกิน 2000 ตัวอักษร').default(''),
  price: Yup.number()
    .typeError('กรุณากรอกราคา')
    .positive('ราคาต้องมากกว่า 0')
    .test('decimal', 'ราคาทศนิยมได้ไม่เกิน 2 ตำแหน่ง', (v) =>
      v !== undefined ? /^\d+(\.\d{1,2})?$/.test(String(v)) : true,
    )
    .required('กรุณากรอกราคา'),
  type: Yup.string()
    .oneOf(['PHYSICAL', 'DIGITAL', 'SERVICE'] as const, 'กรุณาเลือกประเภทสินค้า')
    .required('กรุณาเลือกประเภทสินค้า'),
})

type FormValues = {
  name: string
  description: string
  price: number
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
}

interface ProductFormProps {
  shopId: string
  product?: {
    id: string
    name: string
    description: string | null
    price: unknown // Decimal from Prisma — serialized as string
    type: string
  }
}

export default function ProductForm({ shopId, product }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!product

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price !== undefined ? Number(product.price) : (undefined as unknown as number),
      type: (product?.type as FormValues['type']) ?? 'PHYSICAL',
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const url = isEdit ? `/api/products/${product!.id}` : '/api/products'
      const method = isEdit ? 'PATCH' : 'POST'

      const body = isEdit
        ? {
            name: values.name,
            description: values.description ?? '',
            price: values.price,
            type: values.type,
            images: [], // TODO: image upload UI not implemented yet
          }
        : {
            shopId,
            name: values.name,
            description: values.description ?? '',
            price: values.price,
            type: values.type,
            images: [], // TODO: image upload UI not implemented yet
          }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error ?? 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
        return
      }

      toast.success('บันทึกแล้ว')
      router.push('/products')
      router.refresh()
    } catch {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main info */}
      <div className="lg:col-span-2">
        <div className="card rounded-xl">
          <div className="card-header p-5 border-b border-default-100">
            <h4 className="card-title text-base font-semibold text-dark">ข้อมูลสินค้า</h4>
            <p className="text-default-400 text-sm mt-0.5">กรอกรายละเอียดสินค้าของคุณ</p>
          </div>
          <div className="card-body p-5 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="form-label">
                ชื่อสินค้า<span className="text-danger">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="เช่น กระเป๋าผ้าสะพายข้าง"
                {...register('name')}
              />
              {errors.name && <p className="text-danger mt-1 text-sm">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="form-label">
                คำอธิบายสินค้า{' '}
                <span className="text-default-400">(ไม่บังคับ)</span>
              </label>
              <textarea
                id="description"
                rows={5}
                className="form-textarea"
                placeholder="อธิบายรายละเอียดสินค้า วัสดุ ขนาด ฯลฯ"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-danger mt-1 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Image upload — TODO */}
            <div className="rounded-lg border border-dashed border-default-300 p-6 text-center text-default-400 text-sm">
              <Icon icon="mdi:image-plus-outline" width={32} height={32} className="mx-auto mb-2 opacity-50" />
              <p>อัปโหลดรูปภาพ — ยังไม่รองรับในเวอร์ชันนี้</p>
              <p className="text-xs mt-1 text-default-300">
                {/* TODO: implement image upload (S3 or local storage) */}
                (TODO: image upload)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar: price + type + actions */}
      <div className="space-y-5">
        {/* Pricing */}
        <div className="card rounded-xl">
          <div className="card-header p-5 border-b border-default-100">
            <h4 className="card-title text-base font-semibold text-dark">ราคา</h4>
          </div>
          <div className="card-body p-5">
            <label htmlFor="price" className="form-label">
              ราคา (บาท)<span className="text-danger">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-default-400 text-sm pointer-events-none">
                ฿
              </span>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                className="form-input pl-7"
                placeholder="0.00"
                {...register('price', { valueAsNumber: true })}
              />
            </div>
            {errors.price && <p className="text-danger mt-1 text-sm">{errors.price.message}</p>}
          </div>
        </div>

        {/* Type */}
        <div className="card rounded-xl">
          <div className="card-header p-5 border-b border-default-100">
            <h4 className="card-title text-base font-semibold text-dark">ประเภทสินค้า</h4>
          </div>
          <div className="card-body p-5">
            <label htmlFor="type" className="form-label">
              ประเภท<span className="text-danger">*</span>
            </label>
            <select id="type" className="form-select" {...register('type')}>
              <option value="PHYSICAL">สินค้าจับต้องได้ (PHYSICAL)</option>
              <option value="DIGITAL">ดิจิทัล (DIGITAL)</option>
              <option value="SERVICE">บริการ (SERVICE)</option>
            </select>
            {errors.type && <p className="text-danger mt-1 text-sm">{errors.type.message}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="btn bg-primary text-white hover:bg-primary-hover w-full py-2.5 font-semibold disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Icon icon="mdi:loading" width={18} height={18} className="animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Icon icon="mdi:content-save-outline" width={18} height={18} />
                บันทึกสินค้า
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="btn border border-default-300 bg-card hover:bg-default-50 text-default-700 w-full py-2.5"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  )
}
