'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { departmentData } from './data'
import NewDepartmentModal from './NewDepartmentModal'
const columnHelper = createColumnHelper()
const DepartmentTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('name', {
      header: 'Department Name',
    }),
    columnHelper.accessor('code', {
      header: 'Department Code',
    }),
    columnHelper.accessor('head', {
      header: 'Head of Department (HOD)',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.head.image} alt="" className="size-6 rounded-full" />
          <span>{row.original.head.name}</span>
        </div>
      ),
    }),
    columnHelper.accessor('totalStaff', {
      header: 'Total Staff',
    }),
    columnHelper.accessor('date', {
      header: 'Established',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span className={cn('badge badge-label', row.original.status === 'active' ? 'bg-success/15 text-success' : row.original.status === 'inactive' ? 'bg-danger/15 text-danger' : 'bg-warning/15 text-warning')}>{toPascalCase(row.original.status.replace('-', ' '))}</span>
      ),
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
  const [data, setData] = useState(() => [...departmentData])
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
              <input className="form-input" placeholder="Search department..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>

            <button className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addDepartmentModal" data-hs-overlay="#addDepartmentModal">
              <Icon icon="plus" />
              New Department
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
            <span className="me-3 font-semibold text-nowrap">Filter By:</span>

            <div className="input-icon-group">
              <Icon icon="arrows-shuffle" className="input-icon" />
              <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Department Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-hold">On Hold</option>
              </select>
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

        <DataTable table={table} emptyMessage="No departments found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="departments"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="departments" />
      </div>
      <NewDepartmentModal />
    </>
  )
}
export default DepartmentTable
