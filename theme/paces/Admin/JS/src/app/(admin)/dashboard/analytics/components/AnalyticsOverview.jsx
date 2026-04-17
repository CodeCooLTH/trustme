'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { preline } from '@/utils/preline'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { analyticData } from './data'
const columnHelper = createColumnHelper()
const AnalyticsOverview = () => {
  const [data, setData] = useState(() => [...analyticData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const [selectedRowIds, setSelectedRowIds] = useState({})
  const columns = [
    {
      id: 'select',
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light text-sm" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('pagePath', {
      header: 'Page Path',
    }),
    columnHelper.accessor('source', {
      header: 'Top Referral Source',
    }),
    columnHelper.accessor('views', {
      header: 'Page Views',
      cell: ({ row }) => (
        <span className="flex items-center">
          <Icon icon="eye" className="me-1.25" /> {row.original.views.toLocaleString()}
        </span>
      ),
    }),
    columnHelper.accessor('duration', {
      header: 'Avg Time on Page',
      cell: ({ row }) => (
        <span className="flex items-center">
          <Icon icon="clock" className="me-1.25" /> {row.original.duration}
        </span>
      ),
    }),
    columnHelper.accessor('bounceRate', {
      header: 'Bounce Rate',
      cell: ({ row }) => `${row.original.bounceRate}%`,
    }),
    columnHelper.accessor('conversionRate', {
      header: 'Conversion Rate',
      cell: ({ row }) => `${row.original.conversionRate}%`,
    }),
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1.25">
          <button
            className="btn border-default-300 hover:border-default-400 btn-icon btn-sm text-default-900"
            onClick={() => {
              'use no memo'

              preline.openModal('#confirm-delete-modal')
              setSelectedRowIds({
                [row.id]: true,
              })
            }}
          >
            <Icon icon="trash" className="text-base" />
          </button>
        </div>
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
  }
  return (
    <div data-table data-table-rows-per-page={5} className="card">
      <div className="card-header">
        <h4 className="card-title">Page Analytics Overview</h4>
        <div className="flex items-center gap-2.5">
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="text" placeholder="Search pages..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <div>
            <select className="form-select form-control my-1 my-md-0" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 10, 15, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DataTable table={table} emptyMessage="No analytics found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="pages"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="entries" />
    </div>
  )
}
export default AnalyticsOverview
