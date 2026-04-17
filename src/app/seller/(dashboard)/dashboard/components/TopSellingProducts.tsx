'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { ProductType } from './data'

const columnHelper = createColumnHelper<ProductType>()

const typeConfig: Record<ProductType['type'], { label: string; cls: string }> = {
  PHYSICAL: { label: 'สินค้า',     cls: 'bg-primary/10 text-primary' },
  DIGITAL:  { label: 'ดิจิทัล',   cls: 'bg-info/10 text-info' },
  SERVICE:  { label: 'บริการ',     cls: 'bg-success/10 text-success' },
}

const TopSellingProducts = ({ products }: { products: ProductType[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  })

  const columns = [
    columnHelper.accessor('image', {
      header: '',
      cell: ({ row }) => {
        const src = row.original.image
        const firstLetter = row.original.name?.charAt(0)?.toUpperCase() ?? '?'
        if (src) {
          return <Image src={src} alt={row.original.name} height={36} width={36} className="rounded object-cover" />
        }
        return (
          <div className="size-9 bg-default-100 rounded flex items-center justify-center text-default-500 font-semibold text-sm">
            {firstLetter}
          </div>
        )
      },
      enableSorting: false,
    }),

    columnHelper.accessor('name', {
      header: 'สินค้า',
      cell: ({ row }) => (
        <>
          <h5>{row.original.name}</h5>
          <span
            className={cn('badge text-xs mt-0.5', typeConfig[row.original.type]?.cls ?? 'bg-default-100 text-default-600')}
          >
            {typeConfig[row.original.type]?.label ?? row.original.type}
          </span>
        </>
      ),
    }),

    columnHelper.accessor('price', {
      header: 'ราคา',
      cell: ({ row }) => (
        <>
          <h5>฿{row.original.price.toLocaleString('th-TH')}</h5>
          <span className="text-default-400 text-xs">ราคาต่อชิ้น</span>
        </>
      ),
    }),

    columnHelper.accessor('sales', {
      header: 'ยอดขาย',
      cell: ({ row }) => (
        <>
          <h5>{row.original.sales.toLocaleString('th-TH')}</h5>
          <span className="text-default-400 text-xs">ชิ้น</span>
        </>
      ),
    }),
  ]

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length

  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  return (
    <div className="card h-full">
      <div className="card-header">
        <h4 className="card-title">สินค้าขายดี</h4>
        <div>
          <Icon icon="trophy" className="text-warning" />
        </div>
      </div>
      <div className="card-body p-0">
        <DataTable<ProductType> table={table} emptyMessage="ยังไม่มีสินค้า" className="whitespace-nowrap w-full" showHeaders={false} />
      </div>
      <div className="card-footer">
        <TablePagination
          totalItems={totalItems}
          start={start}
          end={end}
          itemsName="สินค้า"
          showInfo
          previousPage={table.previousPage}
          canPreviousPage={table.getCanPreviousPage()}
          pageCount={table.getPageCount()}
          pageIndex={pageIndex}
          setPageIndex={table.setPageIndex}
          nextPage={table.nextPage}
          canNextPage={table.getCanNextPage()}
        />
      </div>
    </div>
  )
}

export default TopSellingProducts
