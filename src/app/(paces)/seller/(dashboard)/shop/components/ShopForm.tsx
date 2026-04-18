'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Select from '@/components/wrappers/Select'

const CATEGORIES = [
  'อาหารและเครื่องดื่ม',
  'แฟชั่น',
  'ความงาม',
  'อิเล็กทรอนิกส์',
  'บ้านและสวน',
  'บริการ',
  'ดิจิทัล',
  'สุขภาพ',
  'อื่นๆ',
]

const schema = Yup.object({
  shopName: Yup.string()
    .min(2, 'ชื่อร้านต้องมีอย่างน้อย 2 ตัวอักษร')
    .max(100, 'ชื่อร้านต้องไม่เกิน 100 ตัวอักษร')
    .required('กรุณากรอกชื่อร้าน'),
  description: Yup.string().max(500, 'คำอธิบายต้องไม่เกิน 500 ตัวอักษร').default(''),
  category: Yup.string().default(''),
  address: Yup.string().max(200, 'ที่อยู่ต้องไม่เกิน 200 ตัวอักษร').default(''),
  businessType: Yup.string()
    .oneOf(['INDIVIDUAL', 'COMPANY'] as const, 'กรุณาเลือกประเภทธุรกิจ')
    .required('กรุณาเลือกประเภทธุรกิจ'),
})

type FormValues = Yup.InferType<typeof schema>

interface ShopFormProps {
  shop?: {
    id: string
    shopName: string
    description: string | null
    category: string | null
    address: string | null
    businessType: string
  } | null
}

export default function ShopForm({ shop }: ShopFormProps) {
  const router = useRouter()
  const isEdit = !!shop

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      shopName: shop?.shopName ?? '',
      description: shop?.description ?? '',
      category: shop?.category ?? '',
      address: shop?.address ?? '',
      businessType: (shop?.businessType as FormValues['businessType']) ?? 'INDIVIDUAL',
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const url = isEdit ? `/api/shops/${shop!.id}` : '/api/shops'
      const method = isEdit ? 'PATCH' : 'POST'

      const body = {
        shopName: values.shopName,
        description: values.description ?? '',
        category: values.category ?? '',
        address: values.address ?? '',
        businessType: values.businessType,
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
      router.refresh()
    } catch {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column — main shop info */}
        <div className="space-y-5">
          <div className="card p-6 rounded-xl">
            <h4 className="text-base font-semibold text-dark mb-4">ข้อมูลร้านค้า</h4>

            {/* Shop name */}
            <div className="mb-4">
              <label htmlFor="shopName" className="form-label">
                ชื่อร้าน<span className="text-danger">*</span>
              </label>
              <input
                id="shopName"
                type="text"
                className="form-input"
                placeholder="เช่น ร้านของดีมีคุณภาพ"
                {...register('shopName')}
              />
              {errors.shopName && (
                <p className="text-danger mt-1 text-sm">{errors.shopName.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                คำอธิบายร้าน{' '}
                <span className="text-default-400">(ไม่บังคับ)</span>
              </label>
              <textarea
                id="description"
                rows={4}
                className="form-textarea"
                placeholder="แนะนำร้านของคุณ เช่น ขายอะไร มีบริการอะไรบ้าง"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-danger mt-1 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="form-label">
                หมวดหมู่ร้าน{' '}
                <span className="text-default-400">(ไม่บังคับ)</span>
              </label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => {
                  const options = CATEGORIES.map((cat) => ({ value: cat, label: cat }))
                  return (
                    <Select
                      inputId="category"
                      className="select2 react-select"
                      classNamePrefix="react-select"
                      isSearchable={false}
                      placeholder="-- เลือกหมวดหมู่ --"
                      options={options}
                      value={options.find((o) => o.value === field.value) ?? null}
                      onChange={(opt: any) => field.onChange(opt?.value ?? '')}
                    />
                  )
                }}
              />
              {errors.category && (
                <p className="text-danger mt-1 text-sm">{errors.category.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column — address + business type + actions */}
        <div className="space-y-5">
          {/* Address */}
          <div className="card p-6 rounded-xl">
            <h4 className="text-base font-semibold text-dark mb-4">ที่ตั้งและประเภทธุรกิจ</h4>

            <div className="mb-4">
              <label htmlFor="address" className="form-label">
                ที่อยู่{' '}
                <span className="text-default-400">(ไม่บังคับ)</span>
              </label>
              <input
                id="address"
                type="text"
                className="form-input"
                placeholder="เช่น 123 ถ.สุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110"
                {...register('address')}
              />
              {errors.address && (
                <p className="text-danger mt-1 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Business type */}
            <div>
              <label className="form-label">
                ประเภทธุรกิจ<span className="text-danger">*</span>
              </label>
              <div className="flex flex-col gap-3 mt-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    value="INDIVIDUAL"
                    className="mt-0.5 shrink-0"
                    {...register('businessType')}
                  />
                  <div>
                    <span className="text-sm font-medium text-dark">บุคคลธรรมดา</span>
                    <p className="text-xs text-default-400 mt-0.5">
                      ขายในนามบุคคล ไม่มีการจดทะเบียน
                    </p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    value="COMPANY"
                    className="mt-0.5 shrink-0"
                    {...register('businessType')}
                  />
                  <div>
                    <span className="text-sm font-medium text-dark">นิติบุคคล</span>
                    <p className="text-xs text-default-400 mt-0.5">
                      บริษัท ห้างหุ้นส่วน หรือกิจการที่จดทะเบียน
                    </p>
                  </div>
                </label>
              </div>
              {errors.businessType && (
                <p className="text-danger mt-2 text-sm">{errors.businessType.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
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
                  {isEdit ? 'บันทึกการเปลี่ยนแปลง' : 'สร้างร้านค้า'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="btn border border-default-300 bg-card hover:bg-default-50 text-default-700 w-full py-2.5"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
