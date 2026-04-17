'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import AddCustomerModal from './AddCustomerModal'
import { customerData, type CustomerType } from './data'
const columnHelper = createColumnHelper<CustomerType>()

const CustomerTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: TableType<CustomerType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<CustomerType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('user.name', {
      header: 'Customer Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div>
            <Image src={row.original.user.image} alt="Product" className="size-8 rounded-full" />
          </div>
          <div>
            <h5>
              <Link href="" className="hover:text-primary">
                {row.original.user.name}
              </Link>
            </h5>
            <p className="text-default-400 text-xs">{row.original.user.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('user.phone', { header: 'Phone' }),

    columnHelper.accessor('country', {
      header: 'Country',
      cell: ({ row }) => (
        <div className="badge p-1.5 text-sm bg-light">
          <Image src={row.original.country.flag} className="me-1.5 size-3 rounded-full" alt="flag-img" />
          {row.original.country.code}
        </div>
      ),
    }),
    columnHelper.accessor('joinedDate', {
      header: 'Date',
      cell: ({ row }) => <>{row.original.joinedDate}</>,
    }),
    columnHelper.accessor('type', { header: 'Type' }),
    columnHelper.accessor('company', { header: 'Company' }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const color = row.original.status === 'blocked' ? ' bg-danger/15 text-danger' : row.original.status === 'verification-pending' ? 'bg-warning/15 text-warning' : row.original.status === 'active' ? 'bg-success/15 text-success' : 'bg-secondary/15 text-secondary'
        return <span className={`badge badge-label ${color}`}>{toPascalCase(row.original.status)}</span>
      },
    }),

    {
      id: 'action',
      header: () => <div className="text-center mx-auto">Actions</div>,
      cell: ({ row }: { row: TableRow<CustomerType> }) => (
        <div className="flex justify-center gap-1.5">
          <button type="button" className="btn btn-icon btn-sm border border-default-300 hover:border-default-400">
            <Icon icon="eye" className="text-base" />
          </button>
          <button type="button" className="btn btn-icon btn-sm border border-default-300 hover:border-default-400">
            <Icon icon="edit" className="text-base" />
          </button>
          <button
            className="btn btn-icon btn-sm border border-default-300 hover:border-default-400"
            onClick={() => {
              'use no memo'
              setSelectedRowIds({ [row.id]: true })
            }}
            data-hs-overlay="#confirm-delete-modal"
            type="button"
          >
            <Icon icon="trash" className="text-base" />
          </button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState<CustomerType[]>(() => [...customerData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination, rowSelection: selectedRowIds },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setSelectedRowIds,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableColumnFilters: true,
    enableRowSelection: true,
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length

  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({ ...pagination, pageIndex: 0 })
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex flex-wrap gap-3">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="text" placeholder="Search clients..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
          <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="createEstimationModal" data-hs-overlay="#createEstimationModal">
            <Icon icon="plus" />
            New Customer
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <span className="me-3 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="world" className="input-icon" />
            <select className="form-select">
              <option value="All">Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="BR">Brazil</option>
              <option value="DE">Germany</option>
              <option value="JP">Japan</option>
              <option value="FR">France</option>
              <option value="IN">India</option>
              <option value="EG">Egypt</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="arrows-shuffle" className="input-icon" />
            <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Account Status</option>
              <option value="Active">Active</option>
              <option value="Verification Pending">Verification Pending</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <div>
            <select className="form-select" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataTable<CustomerType> table={table} emptyMessage="No records found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="customers"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="customers" />

      <AddCustomerModal />
    </div>
  )
}

export default CustomerTable
