'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import { couponData } from './data'
const columnHelper = createColumnHelper()
const CouponTable = () => {
  const [data, setData] = useState(() => [...couponData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  })
  const [selectedRowIds, setSelectedRowIds] = useState({})
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
  const columns = [
    {
      id: 'select',
      size: 45,
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
    },
    columnHelper.accessor('code', {
      header: 'Coupon Code',
      cell: ({ row }) => (
        <>
          <h5 className="text-sm">
            <Link href="" className="hover:text-primary">
              {row.original.code}
            </Link>
          </h5>
          <small className="text-default-400">{row.original.details}</small>
        </>
      ),
    }),
    columnHelper.accessor((row) => row.discount.type, {
      id: 'discountType',
      header: 'Discount Type',
      cell: ({ row }) => (
        <span className={cn('badge badge-label text-xs', row.original.discount.type === 'percentage' ? 'bg-primary/15 text-primary' : row.original.discount.type === 'fixed' ? 'bg-secondary/15 text-secondary' : 'bg-info/15 text-info')}>
          {toPascalCase(row.original.discount.type)}
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.discount.value, {
      id: 'discountValue',
      header: 'Discount Value',
      cell: ({ row }) => <span>{row.original.discount.value}</span>,
    }),
    columnHelper.accessor('startDate', {
      header: 'Start Date',
    }),
    columnHelper.accessor('expiryDate', {
      header: 'Expiry Date',
    }),
    columnHelper.accessor('usageLimit', {
      header: 'Usage Limit',
    }),
    columnHelper.accessor('used', {
      header: 'Used',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <div className={cn('text-success flex items-center gap-2', row.original.status === 'expired' ? 'text-danger' : row.original.status === 'upcoming' ? 'text-warning' : 'text-success')}>
          <Icon icon="circle-filled" className="text-xs" />
          {toPascalCase(row.original.status)}
        </div>
      ),
    }),
    {
      header: 'Actions',
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
    onRowSelectionChange: setSelectedRowIds,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableRowSelection: true,
  })
  const totalItems = table.getFilteredRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex flex-wrap gap-3">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input type="text" placeholder="Search coupon..." className="form-input" />
          </div>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <span className="me-3 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="circle-check" className="input-icon" />
            <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Coupon Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="tag" className="input-icon" />
            <select className="form-select" value={table.getColumn('discountType')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('discountType')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Coupon Type</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed Amount</option>
              <option value="Free Shipping">Free Shipping</option>
            </select>
          </div>
          <div>
            <select className="form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="button" className="btn bg-danger text-white hover:bg-danger-hover" aria-haspopup="dialog" aria-expanded="false" data-hs-overlay="#addCouponModalLabel">
          <Icon icon="plus" />
          Add Coupon
        </button>
      </div>
      <DataTable table={table} emptyMessage="No coupons found" />
      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="coupons"
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
      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="coupon" />

      <div
        id="addCouponModalLabel"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="addCouponModalLabelLabel"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 bg-light/60 flex items-center justify-between border-b p-5">
              <h3 id="addCouponModalLabelLabel" className="flex items-center gap-2 text-sm">
                <Icon icon="ticket" className="text-primary text-sm" />
                Add New Coupon
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addCouponModalLabel">
                <Icon icon="x" className="text-xl" />
              </button>
            </div>
            <form id="addCouponForm">
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      Coupon Code
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-input" name="coupon_code" placeholder="e.g., SAVE20" required />
                  </div>
                  <div>
                    <label className="form-label">
                      Coupon Type
                      <span className="text-danger">*</span>
                    </label>
                    <select className="form-input" name="coupon_type" required>
                      <option value="">Select Type</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="free_shipping">Free Shipping</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">
                      Discount Value
                      <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-input" name="discount_value" placeholder="e.g., 20 or 50" required />
                  </div>
                  <div>
                    <label className="form-label">Minimum Order Value</label>
                    <input type="number" className="form-input" name="min_order" placeholder="e.g., 100" />
                  </div>
                  <div>
                    <label className="form-label">
                      Start Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr
                      options={{
                        dateFormat: 'd M, Y',
                        defaultDate: 'today',
                      }}
                      className="form-input flatpickr-input"
                      name="start_date"
                      placeholder="Select start date"
                      required
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      End Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr
                      options={{
                        dateFormat: 'd M, Y',
                        defaultDate: 'today',
                      }}
                      className="form-input flatpickr-input"
                      name="end_date"
                      placeholder="Select end date"
                      required
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="form-label">Usage Limit</label>
                    <input type="number" className="form-input" name="usage_limit" placeholder="e.g., 1000" />
                  </div>
                  <div>
                    <label className="form-label">Per User Limit</label>
                    <input type="number" className="form-input" name="user_limit" placeholder="e.g., 5" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" name="description" rows={2} placeholder="Brief description of the offer" defaultValue={''} />
                  </div>
                  <div className="md:col-span-2">
                    <div className="mt-3 flex flex-wrap gap-base">
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isActive" defaultChecked />
                        <label htmlFor="isActive">Active</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isFeatured" />
                        <label htmlFor="isFeatured">Featured Coupon</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isFreeShipping" />
                        <label htmlFor="isFreeShipping">Free Shipping</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addCouponModalLabel">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="plus" />
                Add Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CouponTable
