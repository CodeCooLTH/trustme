'use client'

import Rating from '@/components/Rating'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export type ProductCardData = {
  id: string
  name: string
  description: string | null
  images: string[]
  price: number
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE'
  reviews: number
  rating: number
  totalSold: number
}

const TYPE_META: Record<ProductCardData['type'], { icon: string; label: string; cls: string }> = {
  PHYSICAL: {
    icon: 'mdi:package-variant-closed',
    label: 'สินค้าจับต้องได้',
    cls: 'bg-primary/10 text-primary',
  },
  DIGITAL: {
    icon: 'mdi:cloud-download-outline',
    label: 'ดิจิทัล',
    cls: 'bg-info/10 text-info',
  },
  SERVICE: {
    icon: 'mdi:wrench-outline',
    label: 'บริการ',
    cls: 'bg-success/10 text-success',
  },
}

const ProductCard = ({ product }: { product: ProductCardData }) => {
  const { id, name, description, images, price, type, reviews, rating, totalSold } = product
  const meta = TYPE_META[type] ?? TYPE_META.PHYSICAL
  const imageUrl = images[0]
  const hasImage = Boolean(imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http')))

  return (
    <div className="card relative h-full!">
      <div className="card-body pb-0 h-full">
        {/* Image or placeholder */}
        <div className="p-5">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={name}
              width={300}
              height={300}
              className="img-fluid w-full object-cover aspect-square rounded"
            />
          ) : (
            <div className="bg-default-100 rounded flex items-center justify-center aspect-square">
              <Icon icon="package" className="size-12 text-default-300" />
            </div>
          )}
        </div>

        {/* Name link */}
        <h6 className="card-title mb-1.5 text-sm">
          <Link href={`/products/${id}/edit`} className="hover:text-primary line-clamp-2">
            {name}
          </Link>
        </h6>

        {/* Type badge */}
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium mb-2 ${meta.cls}`}
        >
          <Icon icon={meta.icon.replace('mdi:', 'mdi:')} className="size-3" />
          {meta.label}
        </span>

        {/* Rating + reviews */}
        <div className="flex items-center gap-1.25 mb-2">
          <Rating rating={rating} />
          <span>
            <Link href="/reviews" className="hover:text-primary font-semibold">
              ({reviews})
            </Link>
          </span>
        </div>

        {/* Sold count */}
        {totalSold > 0 && (
          <p className="text-xs text-default-400 mb-1">ขายแล้ว {totalSold.toLocaleString('th-TH')} ชิ้น</p>
        )}

        {description && (
          <p className="text-xs text-default-400 line-clamp-2 mb-1">{description}</p>
        )}
      </div>

      {/* Card footer */}
      <div className="card-footer border-0!">
        <div className="flex w-full justify-between items-center">
          <h4 className="text-sm font-semibold text-primary">
            ฿{price.toLocaleString('th-TH')}
          </h4>
          <div className="flex items-center gap-2">
            <Link
              href={`/products/${id}/edit`}
              className="btn btn-icon size-7.75 border border-default-300 bg-card hover:bg-default-50 text-default-600 hover:text-primary"
              title="แก้ไขสินค้า"
            >
              <Icon icon="pencil-outline" className="text-sm" />
            </Link>
            <DeleteButton productId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
