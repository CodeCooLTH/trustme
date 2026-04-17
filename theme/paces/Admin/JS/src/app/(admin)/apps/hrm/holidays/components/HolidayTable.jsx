'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import AddHolidayModal from './AddHolidayModal'
import { holidayData } from './data'
const columnHelper = createColumnHelper()
const HolidayTable = () => {
  const [data, setData] = useState(() => [...holidayData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [selectedRowIds, setSelectedRowIds] = useState({})
  const columns = [
    {
      id: 'select',
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('name', {
      header: 'Holiday Name',
    }),
    columnHelper.accessor('date', {
      header: 'Date',
    }),
    columnHelper.accessor('day', {
      header: 'Day',
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      enableSorting: false,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => <span className={cn('badge ', row.original.status === 'active' ? 'bg-success/15 text-success' : 'bg-info/15 text-info')}>{toPascalCase(row.original.status)}</span>,
    }),
    columnHelper.accessor('optional', {
      header: 'Optional',
      cell: ({ row }) => (row.original.optional === 'yes' ? 'Yes' : 'No'),
    }),
    columnHelper.accessor('createdOn', {
      header: 'Created On',
    }),
    columnHelper.accessor('addedBy', {
      header: 'Added By',
    }),
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex justify-center gap-1.5">
          <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400">
            <Icon icon="edit" className="text-base" />
          </button>

          <button
            className="btn btn-icon btn-sm border border-default-300 hover:border-default-400"
            onClick={() =>
              setSelectedRowIds({
                [row.id]: true,
              })
            }
            data-hs-overlay="#confirm-delete-modal"
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
      columnFilters,
      pagination,
      rowSelection: selectedRowIds,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onRowSelectionChange: setSelectedRowIds,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableRowSelection: true,
    enableColumnFilters: true,
  })
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)
  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((prev) => prev.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({
      ...pagination,
      pageIndex: 0,
    })
    window.HSOverlay?.close('#confirm-delete-modal')
  }
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex flex-wrap gap-3">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input className="form-input" placeholder="Search holidays..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addHolidayModal" data-hs-overlay="#addHolidayModal">
              <Icon icon="plus" />
              Add Holiday
            </button>

            <div>
              <select className="form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                {[5, 10, 15, 20].map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <DataTable table={table} emptyMessage="No holidays found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="holidays"
              pageIndex={pageIndex}
              pageCount={table.getPageCount()}
              canPreviousPage={table.getCanPreviousPage()}
              canNextPage={table.getCanNextPage()}
              previousPage={table.previousPage}
              nextPage={table.nextPage}
              setPageIndex={table.setPageIndex}
              showInfo
            />
          </div>
        )}

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="holidays" />
      </div>

      <AddHolidayModal />
    </>
  )
}
export default HolidayTable
