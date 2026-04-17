'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { dealData } from './data'
const columnHelper = createColumnHelper()
const getBarColor = (probability) => {
  if (probability <= 1) return 'bg-danger'
  return 'bg-success'
}
const DealStatus = () => {
  const steps = ['Strategy Development', 'Target Identification', 'Valuation Analysis', 'Negotiations', 'Deal Closure']
  const [data] = useState(() => [...dealData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return data
    return data.filter((d) => d.status === statusFilter)
  }, [data, statusFilter])
  const columns = [
    columnHelper.accessor('id', {
      header: 'Deal ID',
      cell: ({ row }) => (
        <Link href="" className="font-medium text-sm">
          {row.original.id}
        </Link>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Deal Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className={cn('size-6 rounded-full flex justify-center items-center', row.original.className)}>
            <span className="text-sm font-bold"> {row.original.name.charAt(0).toUpperCase()} </span>
          </div>
          <Link href="">{row.original.name}</Link>
        </div>
      ),
    }),
    columnHelper.accessor('company', {
      header: 'Company',
    }),
    columnHelper.accessor('probability', {
      header: 'Pipeline',
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <>
            {steps.map((step, idx) => (
              <div key={idx} className="hs-tooltip [--placement:top] inline-block">
                <button type="button" className={cn('hs-tooltip-toggle h-3 px-4.5 me-1', idx < row.original.probability ? getBarColor(row.original.probability) : 'bg-light')}>
                  <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-900 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                    {' '}
                    {step}{' '}
                  </span>
                </button>
              </div>
            ))}
          </>
        )
      },
    }),
    columnHelper.accessor('date', {
      header: 'Closing Date',
    }),
    columnHelper.accessor('user', {
      header: 'User Responsible',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image src={row.original.user.image} alt="" className="size-6 rounded-full" />
          <Link href="" className="font-medium">
            {row.original.user.name}
          </Link>
        </div>
      ),
    }),
    columnHelper.accessor('value', {
      header: 'Deal Value',
      cell: ({ row }) => (
        <div className="text-nowrap">
          {row.original.prefix}
          {row.original.value}
          {row.original.suffix}
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Deal Status',
      cell: ({ row }) => {
        return (
          <span
            className={cn(
              'badge p-1.25',
              row.original.status === 'paused'
                ? 'bg-info/15 text-info'
                : row.original.status === 'new'
                  ? 'bg-default-200 text-default-700'
                  : row.original.status === 'cold-lead'
                    ? 'bg-warning/15 text-warning'
                    : row.original.status === 'cancelled'
                      ? 'bg-danger/15 text-danger'
                      : 'bg-success/15 text-success'
            )}
          >
            {toPascalCase(row.original.status)}
          </span>
        )
      },
    }),
    {
      header: '•••',
      enableSorting: false,
      cell: () => (
        <Link href="" className="text-default-400 text-xl">
          <Icon icon="edit" />
        </Link>
      ),
    },
  ]
  const table = useReactTable({
    data: filteredData,
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
        <h4 className="card-title">Deal Status</h4>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-semibold">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="briefcase" className="input-icon text-default-400" />
            <select className="form-input form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Deal Status</option>
              <option value="paused">Paused</option>
              <option value="new">New</option>
              <option value="cold-lead">Cold Lead</option>
              <option value="cancelled">Canceled</option>
              <option value="deal-won">Deal Won</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon text-default-400" />
            <input type="search" className="form-input" placeholder="Search deals..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <div>
            <select data-table-set-rows-per-page className="form-select form-input" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataTable table={table} emptyMessage="No deals found" />

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
export default DealStatus
