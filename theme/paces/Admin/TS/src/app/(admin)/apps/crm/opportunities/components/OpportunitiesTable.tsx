'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { SortingState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { opportunityData, type OpportunityType } from './data'

const columnHelper = createColumnHelper<OpportunityType>()

const OpportunitiesTable = () => {
  const columns = [
    columnHelper.accessor('id', { header: 'ID' }),
    columnHelper.accessor('product.name', {
      header: 'Opportunity',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="btn btn-icon border-default-300 size-8 border border-dashed">
              <Image src={row.original.product.image} alt="Product" className="size-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">
              <Link href="" className="hover:text-primary">
                {row.original.product.name}
              </Link>
            </p>
            <small className="text-default-400">By: {row.original.product.seller}</small>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('customer.name', {
      header: 'Contact Person',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.customer.image} alt="Product" className="size-8 rounded-full" />
          <div className="flex flex-col">
            <p className="font-medium">
              <Link href="#!" className="hover:text-primary">
                {row.original.customer.name}
              </Link>
            </p>
            <small className="text-default-400">{row.original.customer.email}</small>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('stage', { header: 'Stage', enableColumnFilter: true }),

    columnHelper.accessor('amount', { header: 'Value(usd)' }),
    columnHelper.accessor('closeDate', { header: 'Close Date' }),
    columnHelper.accessor('source', { header: 'Lead Source' }),
    columnHelper.accessor('owner', { header: 'Owner ', enableSorting: false }),

    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span className={cn('badge badge-label text-2xs', row.original.status == 'closed' ? 'bg-danger/15 text-danger' : row.original.status == 'in-progress' ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success')}>{toPascalCase(row.original.status)}</span>
      ),
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      filterFn: 'equalsString',
      enableColumnFilter: true,
      cell: ({ row }) => <span className={cn('badge text-2xs text-white', row.original.priority == 'low' ? 'bg-success' : row.original.priority == 'medium' ? 'bg-warning' : 'bg-danger')}>{toPascalCase(row.original.priority)}</span>,
    }),
  ]

  const [data, setData] = useState<OpportunityType[]>(() => [...opportunityData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
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
      <div className="card-header gap-2.5">
        <div className="flex gap-2.5">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="search" placeholder="Search opportunity..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
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
            <Icon icon="circle-check" className="input-icon" />
            <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="alert-circle" className="input-icon" />
            <select className="form-select" value={(table.getColumn('priority')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('priority')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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

      <DataTable<OpportunityType> table={table} emptyMessage="No records found" />
      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="Opportunities"
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

export default OpportunitiesTable
