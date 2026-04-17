'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import AddCategoryModal from './AddCategoryModal'
import { categoryData } from './data'
const columnHelper = createColumnHelper()
const CategoryTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('id', {
      header: 'ID',
      cell: ({ row }) => (
        <a href="#!" className="font-semibold hover:text-primary">
          {row.original.id}
        </a>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Category Name',
    }),
    columnHelper.accessor('expenses', {
      header: 'Total Expenses',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => <span className={cn('badge badge-label', row.original.status === 'active' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning')}>{toPascalCase(row.original.status)}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Last Updated',
      cell: ({ row }) => (
        <>
          {row.original.date} <small className="text-default-400 text-2xs">{row.original.time}</small>
        </>
      ),
    }),
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
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
  const [data, setData] = useState(() => [...categoryData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
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
          <div className="flex flex-wrap gap-2.5">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input className="form-input" placeholder="Search categories..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>
            <div className="flex gap-1">
              <a href="#categoryModal" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="categoryModal" data-hs-overlay="#categoryModal">
                <Icon icon="plus" /> Add Category
              </a>
            </div>
            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
            <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
              <div className="items-center gap-2 md:flex">
                <span className="font-semibold">Filter By:</span>
                <div className="input-icon-group">
                  <Icon icon="circle-check" className="input-icon" />
                  <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                    <option value="All">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <select className="form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                  {[5, 8, 10, 15, 20].map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <DataTable table={table} emptyMessage="No categories found" />

        {/* FOOTER */}
        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="categories"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="categories" />
      </div>
      <AddCategoryModal />
    </>
  )
}
export default CategoryTable
