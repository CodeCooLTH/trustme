'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { type ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { Row as TableRow, type Table as TableType } from '@tanstack/table-core'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { leadData, type LeadType } from './data'
import NewLeadModal from './NewLeadModal'

const columnHelper = createColumnHelper<LeadType>()

const LeadsTable = () => {
  const columns = [
    {
      id: 'select',
      maxSize: 45,
      size: 45,
      header: ({ table }: { table: TableType<LeadType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<LeadType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('id', {
      header: 'Lead Id',
      cell: ({ row }) => <span className="hover:text-primary px-2.25 py-3">{row.original.id}</span>,
    }),
    columnHelper.accessor('customer', {
      header: 'Customer',
    }),
    columnHelper.accessor('company', {
      header: 'Company',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div>
            <div className="btn btn-icon border-default-300 size-8 rounded-full border border-dashed">
              <Image src={row.original.image} alt="Product" className="size-5" />
            </div>
          </div>
          <div>
            <Link href="" className="hover:text-primary">
              {row.original.company}
            </Link>
          </div>
        </div>
      ),
    }),

    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('phone', { header: 'Phone' }),
    columnHelper.accessor('amount', {
      header: 'amount (usd)',
    }),
    columnHelper.accessor('tag', {
      header: 'Tags',
      cell: ({ row }) => <span className={`badge badge-label ${row.original.tag.className}`}>{row.original.tag.label}</span>,
    }),
    columnHelper.accessor('assigned', {
      header: 'Assigned',
      cell: ({ row }) => <Image src={row.original.assigned.image} alt="Product" className="size-6 rounded-full" />,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`badge ${row.original.status === 'in-progress' ? 'bg-success/15 text-success' : row.original.status === 'proposal-sent' ? 'bg-primary/15 text-primary' : row.original.status === 'follow-up' ? 'bg-info/15 text-info' : row.original.status === 'pending' ? 'bg-warning/15 text-warning' : row.original.status === 'rejected' ? 'bg-danger/15 text-danger' : row.original.status === 'negotiation' ? 'bg-secondary/15 text-secondary' : 'bg-secondary/15 text-secondary'}`}
        >
          {toPascalCase(row.original.status)}
        </span>
      ),
    }),
    columnHelper.accessor('createdDate', { header: 'Created' }),
    {
      id: 'action',
      header: () => <div className="text-center mx-auto">Actions</div>,
      cell: ({ row }: { row: TableRow<LeadType> }) => (
        <div className="flex justify-center gap-1.25">
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

  const [data, setData] = useState<LeadType[]>(() => [...leadData])
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
      <div className="card-header">
        <div className="flex flex-wrap gap-2.5">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="search" placeholder="Search leads..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
          <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addLeadModal" data-hs-overlay="#addLeadModal">
            <Icon icon="plus" />
            New Leads
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
          <span className="me-2.5 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="arrows-shuffle" className="input-icon" />
            <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
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

      <DataTable<LeadType> table={table} emptyMessage="No records found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="leads"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="lead" />

      <NewLeadModal />
    </div>
  )
}

export default LeadsTable
