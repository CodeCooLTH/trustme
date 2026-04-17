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
import AddStaffModal from './AddStaffModal'
import { staffListData } from './data'
const columnHelper = createColumnHelper()
const StaffTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('id', {
      header: 'Staff ID',
      cell: ({ row }) => (
        <Link href="/apps-hrm-staff-profile" className="font-semibold hover:text-primary">
          {row.original.id}
        </Link>
      ),
    }),
    columnHelper.accessor('member', {
      header: 'Staff Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.member.image} alt="" className="size-8 rounded-full" />
          <div>
            <h5 className="font-medium">{row.original.member.name}</h5>
            <p className="text-default-400 text-xs">{row.original.member.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
    }),
    columnHelper.accessor('country', {
      header: 'Country',
      cell: ({ row }) => (
        <div className="bg-light inline-flex items-center gap-1.5 rounded px-1.5 py-1 font-bold">
          <Image src={row.original.country.flag} alt="" className="size-3.5 rounded-full" />
          {row.original.country.code}
        </div>
      ),
    }),
    columnHelper.accessor('joinedDate', {
      header: 'Joined',
    }),
    columnHelper.accessor('role', {
      header: 'Role',
    }),
    columnHelper.accessor('department', {
      header: 'Department',
      filterFn: 'equalsString',
      enableColumnFilter: true,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span
          className={cn(
            'badge badge-label',
            row.original.status === 'active'
              ? 'bg-success/15 text-success'
              : row.original.status === 'on-leave'
                ? 'bg-warning/15 text-warning'
                : row.original.status === 'suspended'
                  ? 'bg-danger/15 text-danger'
                  : row.original.status === 'probation'
                    ? 'bg-warning/15 text-warning'
                    : 'bg-warning/15 text-warning'
          )}
        >
          {toPascalCase(row.original.status)}
        </span>
      ),
    }),
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex justify-center gap-1.5">
          <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400">
            <Icon icon="eye" className="text-base" />
          </button>
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
  const [data, setData] = useState(() => [...staffListData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
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
          <div className="flex flex-wrap gap-3">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input className="form-input" placeholder="Search staff..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>

            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addStaffModal" data-hs-overlay="#addStaffModal">
              <Icon icon="plus" />
              New Staff
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <span className="me-3 font-semibold text-nowrap">Filter By:</span>
            <div className="input-icon-group">
              <Icon icon="layout" className="input-icon"></Icon>
              <select className="form-select" value={table.getColumn('department')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('department')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Department</option>
                <option value="Human Resources">Human Resources</option>
                <option value="IT Department">IT Department</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Analytics">Analytics</option>
                <option value="Product">Product</option>
                <option value="Quality Assurance">Quality Assurance</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="arrows-shuffle" className="input-icon"></Icon>
              <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Employment Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="probation">Probation</option>
                <option value="suspended">Suspended</option>
                <option value="review-pending">Review Pending</option>
              </select>
            </div>
            <div>
              <select className="form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                {[5, 10, 15, 20].map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <DataTable table={table} emptyMessage="No staff found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="staffs"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="staffs" />
      </div>

      <AddStaffModal />
    </>
  )
}
export default StaffTable
