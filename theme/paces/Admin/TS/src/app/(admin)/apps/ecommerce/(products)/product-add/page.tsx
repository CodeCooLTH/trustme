import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Link from 'next/link'
import Organize from './components/Organize'
import Pricing from './components/Pricing'
import ProductImage from './components/ProductImage'
import ProductInformation from './components/ProductInformation'

export const metadata: Metadata = { title: 'Product Add' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Product" subtitle="Ecommerce" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-base">
        <div className="space-y-base lg:col-span-2">
          <ProductInformation />
          <ProductImage />
        </div>
        <div className="space-y-base">
          <Pricing />
          <Organize />
        </div>
      </div>
      <div className="mt-7.5 mb-2.5 flex justify-center gap-2.5">
        <Link href="" className="btn bg-danger text-white hover:bg-danger-hover">
          Discard
        </Link>
        <Link href="" className="btn bg-secondary text-white hover:bg-secondary-hover">
          Save as Draft
        </Link>
        <Link href="" className="btn bg-success text-white">
          Publish
        </Link>
      </div>
    </>
  )
}

export default Page
