'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import type { CustomerRow } from './data'

const columnHelper = createColumnHelper<CustomerRow>()

type CustomerTableProps = {
  customers: CustomerRow[]
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  const columns = [
    columnHelper.accessor('displayName', {
      header: 'ลูกค้า',
      cell: ({ row }) => (
        <div className="flex gap-3 items-center">
          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
            {row.original.initial}
          </div>
          <h5 className="text-sm font-medium">
            {row.original.isRegistered && row.original.username ? (
              <Link href={`/u/${row.original.username}`} className="hover:text-primary">
                {row.original.displayName}
              </Link>
            ) : (
              <span>{row.original.displayName}</span>
            )}
          </h5>
        </div>
      ),
    }),
    columnHelper.accessor('contact', {
      header: 'ติดต่อ',
      cell: ({ row }) => (
        <span className="text-default-500 font-mono text-sm">{row.original.contact}</span>
      ),
    }),
    columnHelper.accessor('totalOrders', {
      header: 'ออเดอร์',
      cell: ({ row }) => (
        <span className="font-medium">{row.original.totalOrders}</span>
      ),
    }),
    columnHelper.accessor('totalSpent', {
      header: 'ยอดซื้อ',
      cell: ({ row }) => (
        <span className="font-medium">
          {Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(
            row.original.totalSpent
          )}
        </span>
      ),
    }),
    columnHelper.accessor('lastOrderRaw', {
      header: 'ล่าสุด',
      cell: ({ row }) => (
        <span className="text-default-500 text-sm">{row.original.lastOrderDate}</span>
      ),
    }),
    columnHelper.accessor('isRegistered', {
      header: 'สถานะ',
      cell: ({ row }) =>
        row.original.isRegistered ? (
          <span className="badge bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-md">
            สมาชิก
          </span>
        ) : (
          <span className="badge bg-default-200 text-default-700 text-xs font-medium px-2 py-1 rounded-md">
            ไม่ระบุตัวตน
          </span>
        ),
    }),
  ]

  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data: customers,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableColumnFilters: true,
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex gap-2.5">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input
              type="search"
              placeholder="ค้นหาลูกค้า..."
              className="form-input"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2.5 items-center flex-wrap md:flex-nowrap">
          <select
            className="form-select"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto whitespace-normal">
        <DataTable table={table} emptyMessage="ยังไม่มีลูกค้า" />
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="รายการ"
            showInfo
            previousPage={table.previousPage}
            canPreviousPage={table.getCanPreviousPage()}
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            setPageIndex={table.setPageIndex}
            nextPage={table.nextPage}
            canNextPage={table.getCanNextPage()}
          />
        </div>
      )}
    </div>
  )
}

export default CustomerTable
