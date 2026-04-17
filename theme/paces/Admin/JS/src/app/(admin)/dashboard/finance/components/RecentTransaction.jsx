'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { transactionData } from './data'
const columnHelper = createColumnHelper()
const RecentTransaction = () => {
  const [data] = useState(() => [...transactionData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  })
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: ({ getValue }) => (
        <Link href="#" className="font-medium">
          {getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('user', {
      header: 'Name / Business',
      cell: ({ row }) => {
        const { user } = row.original
        return (
          <div className="flex items-center gap-2">
            {user.image ? (
              <Image src={user.image} alt="" width={24} height={24} className="size-6 rounded-full" />
            ) : (
              <div className="flex items-center gap-2">
                <span className={`size-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-xs font-semibold ${user.className}`}>{user.name.charAt(0)}</span>
              </div>
            )}
            <span className="align-middle">{user.name}</span>
          </div>
        )
      },
    }),
    columnHelper.accessor('description', {
      header: 'Description',
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: ({ row }) => <span className={row.original.type === 'credit' ? 'text-success' : 'text-danger'}>USD {row.original.amount}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Timestamp',
      cell: ({ row }) => (
        <>
          {row.original.date} <small className="text-default-400">{row.original.time}</small>
        </>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: ({ getValue }) => (getValue() === 'credit' ? 'Credit' : 'Debit'),
    }),
    columnHelper.accessor('Payment', {
      header: 'Payment Method',
      cell: ({ row }) => {
        const payment = row.original.Payment
        if (!payment) return null
        return (
          <div className="flex items-center gap-2">
            <Image src={payment.image} alt="" width={24} height={24} className="size-6 rounded-full" />
            <span className="align-middle">{payment.lastDigit || payment.name}</span>
          </div>
        )
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        return (
          <span className={`badge ${row.original.status === 'success' ? 'bg-success/15 text-success' : row.original.status === 'pending' ? 'bg-warning/15 text-warning' : row.original.status === 'failed' ? 'bg-danger/15 text-danger' : 'bg-warning/15 text-warning'} p-1.25`}>
            {toPascalCase(row.original.status)}
          </span>
        )
      },
    }),
    {
      header: '•••',
      enableSorting: false,
      cell: () => (
        <Link href="#" className="text-default-400 text-xl">
          <Icon icon="eye" className="align-middle" />
        </Link>
      ),
    },
  ]
  const table = useReactTable({
    data,
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
    <div data-table data-table-rows-per-page={8} className="card">
      <div className="card-header">
        <h4 className="card-title">
          Recent Transactions <span className="text-default-400 font-normal text-sm">(95.6k+ Transactions)</span>
        </h4>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-semibold me-2.5">Filter By:</span>

          <div className="input-icon-group">
            <Icon icon="filter-2" className="input-icon text-default-400" />
            <select className="form-input form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Processing">Processing</option>
              <option value="Onhold">On Hold</option>
            </select>
          </div>

          <div className="input-icon-group">
            <Icon icon="search" className="input-icon text-default-400" />
            <input type="search" className="form-input" placeholder="Search transactions..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>

          <div>
            <select className="form-select form-control" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataTable table={table} emptyMessage="No transactions found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="transactions"
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
export default RecentTransaction
