'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { type ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { Row as TableRow, type Table as TableType } from '@tanstack/table-core'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/utils/helpers'
import { useState } from 'react'
import AddDealModal from './AddDealModal'
import { dealData, type DealType } from './data'

const columnHelper = createColumnHelper<DealType>()

const DealsTable = () => {
  const columns = [
    {
      id: 'select',
      maxSize: 45,
      size: 45,
      header: ({ table }: { table: TableType<DealType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<DealType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('name', {
      header: 'Deal Name',
    }),
    columnHelper.accessor('company', {
      header: 'Company',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="btn btn-icon border-default-300 size-8 rounded-full border border-dashed">
              <Image src={row.original.image} alt="Product" className="size-5" />
            </div>
          </div>
          <div>
            <h5>
              <Link href="" className="hover:text-primary">
                {row.original.company}
              </Link>
            </h5>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'amount (usd)',
      enableColumnFilter: true,
      cell: ({ row }) => <>{row.original.amount}</>,
    }),

    columnHelper.accessor('stage', { header: 'Stage', enableColumnFilter: true }),

    columnHelper.accessor('probability', {
      header: 'Probability',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => {
              const activeBars = Math.round(row.original.probability / 20)
              const color = i < activeBars ? 'bg-success' : i === activeBars ? 'bg-success/50' : row.original.probability === 0 ? 'bg-danger/25' : 'bg-success/25'
              return <div key={i} className={cn('w-1 h-4 rounded', color)}></div>
            })}
            <strong className="text-dark">{row.original.probability}%</strong>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Closing Date',
    }),
    {
      id: 'action',
      header: () => <div className="text-center mx-auto">Actions</div>,
      cell: ({ row }: { row: TableRow<DealType> }) => (
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

  const [data, setData] = useState<DealType[]>(() => [...dealData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination, rowSelection: selectedRowIds },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setSelectedRowIds,
    onPaginationChange: setPagination,
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
    window.HSOverlay?.close('#confirm-delete-modal')
  }

  return (
    <div className="card">
      <div className="card-header justify-between gap-2.5">
        <div className="flex flex-wrap gap-2.5">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="search" placeholder="Search deals..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="createDealModal" data-hs-overlay="#createDealModal">
            <Icon icon="plus" />
            Create Deal
          </button>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="me-2.5 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="arrows-shuffle" className="input-icon" />
            <select className="form-select" value={(table.getColumn('stage')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('stage')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Stage</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="currency-dollar" className="input-icon" />
            <select className="form-select">
              <option value="All">Amount Range</option>
              <option value="0-1000">$0 - $10,000</option>
              <option value="10001-25000">$10,001 - $25,000</option>
              <option value="25001-50000">$25,001 - $50,000</option>
              <option value="50000+">$50,000+</option>
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

      <DataTable<DealType> table={table} emptyMessage="No records found" />

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
            pageIndex={table.getState().pagination.pageIndex}
            setPageIndex={table.setPageIndex}
            nextPage={table.nextPage}
            canNextPage={table.getCanNextPage()}
          />
        </div>
      )}

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="deal" />

      <AddDealModal />
    </div>
  )
}

export default DealsTable
