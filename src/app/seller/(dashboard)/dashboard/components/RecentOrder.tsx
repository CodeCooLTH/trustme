'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { OrderType } from './data'

const columnHelper = createColumnHelper<OrderType>()

const statusConfig: Record<OrderType['status'], { label: string; cls: string }> = {
  CREATED:   { label: 'รอยืนยัน',   cls: 'bg-warning/10 text-warning' },
  CONFIRMED: { label: 'ยืนยันแล้ว', cls: 'bg-info/10 text-info' },
  SHIPPED:   { label: 'จัดส่งแล้ว', cls: 'bg-primary/10 text-primary' },
  COMPLETED: { label: 'สำเร็จ',      cls: 'bg-success/10 text-success' },
  CANCELLED: { label: 'ยกเลิก',      cls: 'bg-danger/10 text-danger' },
}

const RecentOrder = ({ orders }: { orders: OrderType[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = [
    columnHelper.accessor('id', {
      header: 'ออเดอร์',
      cell: ({ row }) => (
        <Link href={`/orders/${row.original.publicToken}`} className="text-primary font-semibold hover:underline">
          #{row.original.id}
        </Link>
      ),
    }),

    columnHelper.accessor('customer', {
      header: 'ลูกค้า',
      cell: ({ row }) => (
        <>
          <h5 className="font-semibold">{row.original.customer.name || '—'}</h5>
          <span className="text-default-400 text-xs">{row.original.customer.contact}</span>
        </>
      ),
    }),

    columnHelper.accessor('product', {
      header: 'สินค้า',
    }),

    columnHelper.accessor('date', {
      header: 'วันที่',
    }),

    columnHelper.accessor('total', {
      header: 'รวม',
      cell: ({ row }) => (
        <span>฿{row.original.total.toLocaleString('th-TH')}</span>
      ),
    }),

    columnHelper.accessor('status', {
      header: 'สถานะ',
      cell: ({ row }) => {
        const cfg = statusConfig[row.original.status] ?? { label: row.original.status, cls: 'bg-default-100 text-default-700' }
        return (
          <span className={cn('badge', cfg.cls)}>
            {cfg.label}
          </span>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: orders,
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
        <h4 className="card-title">
          ออเดอร์ล่าสุด{' '}
          <span className="text-default-400 text-sm font-normal ms-1">({totalItems} รายการ)</span>
        </h4>
        <div>
          <Link href="/orders" className="btn btn-sm bg-light hover:text-primary font-semibold">
            <Icon icon="list" /> ดูทั้งหมด
          </Link>
        </div>
      </div>
      <div className="card-body p-0">
        <DataTable<OrderType> table={table} emptyMessage="ยังไม่มีออเดอร์" className="table-centered table-hover" />
      </div>
      <div className="card-footer">
        <TablePagination
          totalItems={totalItems}
          start={start}
          end={end}
          itemsName="ออเดอร์"
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

export default RecentOrder
