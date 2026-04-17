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
import { giftCardData } from './data'
const columnHelper = createColumnHelper()
const GiftCardTable = () => {
  const [data, setData] = useState(() => [...giftCardData])
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
      header: 'Card Code',
      cell: ({ row }) => (
        <h5 className="text-sm">
          <Link href="" className="hover:text-primary">
            {row.original.code}
          </Link>
        </h5>
      ),
    }),
    columnHelper.accessor('recipient', {
      header: 'Recipient',
      cell: ({ row }) => (
        <>
          {row.original.recipient.name}
          <br />
          <small className="text-default-400">{row.original.recipient.email}</small>
        </>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: ({ row }) => <span className={`badge badge-label text-2xs ${row.original.type === 'digital' ? 'bg-primary/15 text-primary' : row.original.type === 'physical' ? 'bg-secondary/15 text-secondary' : ''}`}>{toPascalCase(row.original.type)}</span>,
    }),
    columnHelper.accessor('value', {
      header: 'Value',
    }),
    columnHelper.accessor('balance', {
      header: 'Balance',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <span className={`fw-semibold flex items-center ${row.original.status === 'active' ? 'text-success' : row.original.status === 'redeemed' ? 'text-default-400' : row.original.status === 'expired' ? 'text-danger' : row.original.status === 'pending' ? 'text-warning' : ''}`}>
          <Icon icon="circle-filled" className="fs-sm me-1" /> {toPascalCase(row.original.status)}
        </span>
      ),
    }),
    columnHelper.accessor('issuedOn', {
      header: 'Issued On',
    }),
    columnHelper.accessor('expiresOn', {
      header: 'Expires On',
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
            <input data-table-search type="text" placeholder="Search gift card..." className="form-input" />
          </div>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <span className="me-3 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="activity" className="input-icon" />
            <select data-table-filter="gift-status" className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Redeemed">Redeemed</option>
              <option value="Expired">Expired</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="gift" className="input-icon" />
            <select data-table-filter="gift-type" className="form-select" value={table.getColumn('type')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('type')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Type</option>
              <option value="Digital">Digital</option>
              <option value="Physical">Physical</option>
            </select>
          </div>
          <div>
            <select data-table-set-rows-per-page className="form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 8, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" data-hs-overlay="#addGiftCardModal">
          <Icon icon="plus" />
          Add Gift Card
        </button>
      </div>

      <DataTable table={table} emptyMessage="No gift cards found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="gift cards"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="gift card" />

      <div id="addGiftCardModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addGiftCardModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 bg-light/60 flex items-center justify-between border-b p-5">
              <h3 id="addGiftCardModalLabel" className="flex items-center gap-2 text-sm">
                <Icon icon="gift" className="text-primary text-sm" />
                Add New Gift Card
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addGiftCardModal">
                <Icon icon="x" className="text-xl" />
              </button>
            </div>
            <form id="addCouponForm">
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      Gift Card Code
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-input" name="gift_code" placeholder="e.g., GFT-A2025" required />
                  </div>
                  <div>
                    <label className="form-label">
                      Type
                      <span className="text-danger">*</span>
                    </label>
                    <select className="form-input" name="gift_type" required>
                      <option value="">Select Type</option>
                      <option value="digital">Digital</option>
                      <option value="physical">Physical</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">
                      Gift Card Value ($)
                      <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-input" name="gift_value" placeholder="e.g., 100" required />
                  </div>
                  <div>
                    <label className="form-label">Initial Balance</label>
                    <input type="number" className="form-input" name="gift_balance" placeholder="e.g., 100" />
                  </div>
                  <div>
                    <label className="form-label">
                      Recipient Name
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-input" name="recipient_name" placeholder="e.g., John Doe" required />
                  </div>
                  <div>
                    <label className="form-label">
                      Recipient Email
                      <span className="text-danger">*</span>
                    </label>
                    <input type="email" className="form-input" name="recipient_email" placeholder="e.g., john.doe@mail.com" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Personal Message</label>
                    <textarea className="form-textarea" name="gift_message" rows={2} placeholder="Write a short message to include with the gift card" defaultValue={''} />
                  </div>
                  <div>
                    <label className="form-label">
                      Issue Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr
                      type="text"
                      options={{
                        dateFormat: 'd M, Y',
                        defaultDate: 'today',
                      }}
                      className="form-input flatpickr-input"
                      name="issue_date"
                      placeholder="Select issue date"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      Expiry Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr
                      type="text"
                      options={{
                        dateFormat: 'd M, Y',
                        defaultDate: 'today',
                      }}
                      className="form-input flatpickr-input"
                      name="expiry_date"
                      placeholder="Select expiry date"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="mt-3 flex flex-wrap gap-base">
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isGiftCardActive" defaultChecked />
                        <label htmlFor="isGiftCardActive">Active</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isGiftCardDelivered" />
                        <label htmlFor="isGiftCardDelivered">Send via Email</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isGiftCardPhysical" />
                        <label htmlFor="isGiftCardPhysical">Physical Delivery</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addGiftCardModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="plus" />
                Add Gift Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GiftCardTable
