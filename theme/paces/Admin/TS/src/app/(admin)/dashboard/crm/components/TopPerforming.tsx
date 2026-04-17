'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { saleExecutiveData, SaleExecutiveType } from './data'

const columnHelper = createColumnHelper<SaleExecutiveType>()

const TopPerforming = () => {
  const [data] = useState<SaleExecutiveType[]>(() => [...saleExecutiveData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const columns = [
    columnHelper.accessor('user', {
      header: 'User',
      cell: ({ row }) => (
        <>
          <h5 className="text-sm font-normal">{row.original.user.name}</h5>
          <span className="text-default-400 text-xs">{row.original.user.designation}</span>
        </>
      ),
    }),

    columnHelper.accessor('leads', {
      header: 'Leads',
    }),

    columnHelper.accessor('deals', {
      header: 'Deals',
    }),

    columnHelper.accessor('tasks', {
      header: 'Tasks',
    }),

    {
      header: '•••',
      enableSorting: false,
      cell: () => (
        <Link href="" className="text-default-400 text-xl">
          <Icon icon="eye" />
        </Link>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
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
    <div className="card xl:col-span-1 md:col-span-2">
      <div className="card-header">
        <h4 className="card-title">Top Performing</h4>
        <div className="flex items-center gap-2">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon text-default-400" />
            <input type="search" className="form-input" placeholder="Search..." />
          </div>
        </div>
      </div>
      <DataTable<SaleExecutiveType> table={table} emptyMessage="No executives found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="deals"
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
      )}
    </div>
  )
}

export default TopPerforming
