'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import ChoiceSelect from '@/components/wrappers/ChoiceSelect'
import Icon from '@/components/wrappers/Icon'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import type { CategoryRow } from './data'

const columnHelper = createColumnHelper<CategoryRow>()

const thbFormatter = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })

const columns = [
  columnHelper.accessor('label', {
    header: 'หมวดหมู่',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${row.original.iconClass}`}>
          <Icon icon={row.original.icon} className="text-xl" />
        </div>
        <div>
          <p className="font-medium text-sm">{row.original.label}</p>
          <p className="text-xs text-default-400">{row.original.description}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('activeCount', {
    header: 'สินค้า',
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.activeCount} / {row.original.productCount}{' '}
        <span className="text-default-400 text-xs">เปิดขาย</span>
      </span>
    ),
  }),
  columnHelper.accessor('orderCount', {
    header: 'ออเดอร์',
    cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
  }),
  columnHelper.accessor('revenue', {
    header: 'ยอดขาย',
    cell: ({ getValue }) => <span className="text-sm font-medium">{thbFormatter.format(getValue())}</span>,
  }),
]

type CategoryTableProps = {
  rows: CategoryRow[]
}

const CategoryTable = ({ rows }: CategoryTableProps) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const table = useReactTable({
    data: rows,
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
              placeholder="ค้นหาหมวดหมู่..."
              className="form-input"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-1.25">
          <div className="w-20">
            <ChoiceSelect
              options={[
                { value: '5', label: '5' },
                { value: '8', label: '8' },
                { value: '10', label: '10' },
                { value: '15', label: '15' },
                { value: '20', label: '20' },
              ]}
              value={String(table.getState().pagination.pageSize)}
              onChange={(v) => table.setPageSize(Number(v as string))}
              search={false}
              sorting={false}
            />
          </div>
        </div>
      </div>

      <DataTable table={table} emptyMessage="ไม่พบหมวดหมู่" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="หมวดหมู่"
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

export default CategoryTable
