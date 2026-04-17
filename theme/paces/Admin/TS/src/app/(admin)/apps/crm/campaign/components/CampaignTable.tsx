'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'

import Link from 'next/link'
import AddCampaignModal from './AddCampaignModal'
import { campaignsData, CampaignType } from './data'

const columnHelper = createColumnHelper<CampaignType>()

const CampaignTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: TableType<CampaignType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<CampaignType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },

    columnHelper.accessor('name', { header: 'Camaping name' }),

    columnHelper.accessor('creator', {
      header: 'creator',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.creator.image} alt="avatar-5" className="size-6 rounded-full" />
          <Link href="" className="hover:text-primary">
            {row.original.creator.name}
          </Link>
        </div>
      ),
    }),

    columnHelper.accessor('budget', { header: 'budget' }),
    columnHelper.accessor('goals', { header: 'goals' }),

    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const color =
          row.original.status === 'in-progress'
            ? 'bg-warning/15 text-warning'
            : row.original.status === 'success'
              ? 'bg-success/15 text-success'
              : row.original.status === 'scheduled'
                ? 'bg-info/15 text-info'
                : row.original.status === 'failed'
                  ? 'bg-danger/15 text-danger'
                  : 'bg-primary/15 text-primary'
        return <span className={`badge ${color}`}>{toPascalCase(row.original.status)}</span>
      },
    }),

    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: ({ row }) => (
        <div className="d-flex gap-1 flex-wrap">
          {row.original.tags.map((tag, index) => (
            <span key={index} className="badge badge-label bg-light me-1">
              {tag}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('dateCreated', {
      header: 'Date Created',
      cell: ({ row }) => (
        <>
          {row.original.dateCreated} <small className="text-muted">{row.original.dateCreatedTime}</small>
        </>
      ),
    }),

    {
      id: 'action',
      header: () => <div className="text-center mx-auto">Actions</div>,
      cell: ({ row }: { row: TableRow<CampaignType> }) => (
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

  const [data, setData] = useState<CampaignType[]>(() => [...campaignsData])
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
            <input value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} type="search" placeholder="Search campaign..." className="form-input" />
          </div>
          <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="createCampaignForm" data-hs-overlay="#createCampaignForm">
            <Icon icon="plus" />
            Create Campaign
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
              <option value="All">Status</option>
              <option value="Success">Success</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Failed">Failed</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="currency-dollar" className="input-icon" />
            <select className="form-select" value={(table.getColumn('budget')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('budget')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Budget Range</option>
              <option value="0-5000">$0 - $5,000</option>
              <option value="5001-10000">$5,001 - $10,000</option>
              <option value="10001-20000">$10,001 - $20,000</option>
              <option value="20001-50000">$20,001 - $50,000</option>
              <option value="50000+">$50,000+</option>
            </select>
          </div>
          <div>
            <select data-table-set-rows-per-page className="form-select" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataTable<CampaignType> table={table} emptyMessage="No records found" />

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

      <AddCampaignModal />
    </div>
  )
}

export default CampaignTable
