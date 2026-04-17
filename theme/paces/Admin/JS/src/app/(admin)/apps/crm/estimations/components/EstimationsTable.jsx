'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AddEstimationModal from './AddEstimationModal'
import { estimateData } from './data'
const columnHelper = createColumnHelper()
const EstimationsTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
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
    columnHelper.accessor('project', {
      header: 'Project',
    }),
    columnHelper.accessor('client', {
      header: 'Client',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="btn btn-icon border-default-300 size-8 rounded-full border border-dashed">
              <Image src={row.original.client.image} alt={row.original.client.name} height={20} />
            </div>
          </div>
          <div>
            <Link href="" className="hover:text-primary">
              {row.original.client.name}
            </Link>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('value', {
      header: 'Estimated Value',
    }),
    columnHelper.accessor('estimatedBy', {
      header: 'Estimated By',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div>
            <Image src={row.original.estimatedBy.image} alt={row.original.estimatedBy.name} height={20} width={20} className="size-6 rounded-full" />
          </div>
          <div>
            <Link href="" className="hover:text-primary">
              {row.original.estimatedBy.name}
            </Link>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('createdDate', {
      header: 'Created',
      cell: ({ row }) => (
        <>
          {row.original.createdDate} <small className="text-default-400 ms-1">{row.original.createdTime}</small>
        </>
      ),
    }),
    columnHelper.accessor('closeDate', {
      header: 'Expected Close',
      cell: ({ row }) => (
        <>
          {row.original.closeDate} <small className="text-default-400 ms-1">{row.original.closeTime}</small>
        </>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const color =
          row.original.status === 'declined'
            ? 'bg-danger/15 text-danger '
            : row.original.status === 'in-review'
              ? 'bg-info/15 text-info '
              : row.original.status === 'approved'
                ? 'bg-success/15 text-success '
                : row.original.status === 'pending'
                  ? 'bg-warning/15 text-warning '
                  : 'bg-secondary/15 text-secondary '
        return <span className={`badge badge-label ${color}`}>{toPascalCase(row.original.status)}</span>
      },
    }),
    {
      id: 'action',
      header: () => <div className="text-center mx-auto">Actions</div>,
      cell: ({ row }) => (
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

              setSelectedRowIds({
                [row.id]: true,
              })
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
  const [data, setData] = useState(() => [...estimateData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  })
  const [selectedRowIds, setSelectedRowIds] = useState({})
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
      rowSelection: selectedRowIds,
    },
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
    setPagination({
      ...pagination,
      pageIndex: 0,
    })
    window.HSOverlay?.close('#confirm-delete-modal')
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex flex-wrap gap-3">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="search" placeholder="Search deals..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="createEstimationModal" data-hs-overlay="#createEstimationModal">
            <Icon icon="plus" />
            New Estimation
          </button>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <span className="me-3 font-semibold">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="arrows-shuffle" className="input-icon" />
            <select value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)} className="form-select">
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
            <select value={table.getColumn('value')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('value')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)} className="form-select">
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
      <DataTable table={table} emptyMessage="No records found" />
      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="estimations"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="estimations" />

      <AddEstimationModal />
    </div>
  )
}
export default EstimationsTable
