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

import AddProposalModal from './AddProposalModal'
import { proposalData, ProposalType } from './data'

const columnHelper = createColumnHelper<ProposalType>()

const ProposalsTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: TableType<ProposalType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<ProposalType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('id', {
      header: 'Estimate ID',
      cell: ({ row }) => (
        <Link href="" className="font-semibold hover:text-primary">
          {row.original.id}
        </Link>
      ),
    }),

    columnHelper.accessor('subject', { header: 'Subject' }),

    columnHelper.accessor('sendTo', {
      header: 'Send To',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="btn btn-icon border-default-300 size-8 rounded-full border border-dashed">
              <Image src={row.original.sendTo.image} alt={row.original.sendTo.name} height={row.original.sendTo.logoHeight || 20} />
            </div>
          </div>
          <div>
            <Link href="" className="hover:text-primary">
              {row.original.sendTo.name}
            </Link>
          </div>
        </div>
      ),
    }),

    columnHelper.accessor('value', { header: 'Value' }),

    columnHelper.accessor('createdDate', {
      header: 'Created',
      cell: ({ row }) => (
        <>
          {row.original.createdDate} <small className="text-default-400 ms-1">{row.original.createdTime}</small>
        </>
      ),
    }),
    columnHelper.accessor('openTillDate', {
      header: 'Open Till',
      cell: ({ row }) => (
        <>
          {row.original.openTillDate} <small className="text-default-400 ms-1">{row.original.openTillTime}</small>
        </>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const color =
          row.original.status === 'declined'
            ? 'bg-danger/15 text-danger'
            : row.original.status === 'in-review'
              ? 'bg-primary/15 text-primary '
              : row.original.status === 'approved'
                ? 'bg-success/15 text-success'
                : row.original.status === 'pending'
                  ? 'bg-warning/15 text-warning'
                  : 'bg-info/15 text-info'
        return <span className={`badge badge-label text-xs ${color}`}>{toPascalCase(row.original.status)}</span>
      },
    }),

    {
      id: 'action',
      header: () => <div className="text-center mx-auto">Actions</div>,
      cell: ({ row }: { row: TableRow<ProposalType> }) => (
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

  const [data, setData] = useState<ProposalType[]>(() => [...proposalData])
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
    window.HSOverlay?.close('#confirm-delete-modal')
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex flex-wrap gap-2.5">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="search" placeholder="Search proposal..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="createProposalModal" data-hs-overlay="#createProposalModal">
            <Icon icon="plus" />
            New Proposal
          </button>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
          <span className="me-2.5 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="arrows-shuffle" className="input-icon" />
            <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="">Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
              <option value="Sent">Sent</option>
              <option value="In Review">In Review</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="currency-dollar" className="input-icon" />
            <select className="form-select">
              <option value="">Value Range</option>
              <option value="0-5000">$0 - $5,000</option>
              <option value="5001-10000">$5,001 - $10,000</option>
              <option value="10001-20000">$10,001 - $20,000</option>
              <option value="20001-50000">$20,001 - $50,000</option>
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
      <DataTable<ProposalType> table={table} emptyMessage="No records found" />
      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="proposals"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="proposal" />

      <AddProposalModal />
    </div>
  )
}

export default ProposalsTable
