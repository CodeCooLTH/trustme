'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState, type SortingState, type Row as TableRow, type Table as TableType } from '@tanstack/react-table'
import { useState } from 'react'
import { DiscountType, discountData } from './data'

const columnHelper = createColumnHelper<DiscountType>()

const DiscountTable = () => {
  const [data, setData] = useState<DiscountType[]>(() => [...discountData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({ ...pagination, pageIndex: 0 })
    window.HSOverlay?.close('#confirm-delete-modal')
  }

  const columns = [
    {
      id: 'select',
      size: 45,
      header: ({ table }: { table: TableType<DiscountType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<DiscountType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
    },

    columnHelper.accessor('name', {
      header: 'Discount Name',
      cell: ({ row }) => (
        <h5 className="text-sm">
          <a href="" className="hover:text-primary">
            {row.original.name}
          </a>
          <br />
          <small className="text-default-400">{row.original.details}</small>
        </h5>
      ),
    }),

    columnHelper.accessor('type', {
      header: 'Discount Type',
      cell: ({ row }) => <span className={cn('badge badge-label text-2xs', row.original.type === 'percentage' ? 'bg-primary/15 text-primary' : row.original.type === 'flat' ? 'bg-success/15 text-success' : 'bg-info/15 text-info')}>{toPascalCase(row.original.type)}</span>,
    }),

    columnHelper.accessor('value', {
      header: 'Discount Value',
    }),

    columnHelper.accessor('startDate', {
      header: 'Start Date',
    }),

    columnHelper.accessor('endDate', {
      header: 'End Date',
    }),

    columnHelper.accessor('minPurchase', {
      header: 'Min Purchase',
    }),

    columnHelper.accessor('maxDiscount', {
      header: 'Max Discount',
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <span className={cn('flex items-center gap-2', row.original.status === 'active' ? 'text-success' : row.original.status === 'scheduled' ? 'text-warning' : row.original.status === 'expired' ? 'text-danger' : row.original.status === 'disabled' ? 'text-muted' : '')}>
          <Icon icon="circle-filled" className="fs-sm me-1" /> {toPascalCase(row.original.status)}
        </span>
      ),
    }),
    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<DiscountType> }) => (
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

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination, rowSelection: selectedRowIds },
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
            <input type="text" placeholder="Search discount..." className="form-input" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>
          <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
            Delete
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <span className="me-3 font-semibold text-nowrap">Filter By:</span>
          <div className="input-icon-group">
            <Icon icon="circle-check" className="input-icon" />
            <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Discount Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div className="input-icon-group">
            <Icon icon="tag" className="input-icon" />
            <select data-table-filter="discount-type" className="form-select" value={(table.getColumn('type')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('type')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
              <option value="All">Discount Type</option>
              <option value="Percentage">Percentage</option>
              <option value="Flat">Flat Amount</option>
              <option value="BOGO">Buy One Get One (BOGO)</option>
              <option value="Bundle">Bundle Offer</option>
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
        <button type="button" className="btn bg-danger text-white hover:bg-danger-hover" aria-haspopup="dialog" aria-expanded="false" data-hs-overlay="#addDiscountModal">
          <Icon icon="plus" />
          Add Discount
        </button>
      </div>
      <DataTable<DiscountType> table={table} emptyMessage="No discounts found" />
      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="discounts"
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

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="discount" />

      <div id="addDiscountModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addDiscountModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 bg-light/60 flex items-center justify-between border-b p-5">
              <h3 id="addDiscountModalLabel" className="flex items-center gap-2 text-sm">
                <Icon icon="discount" className="text-primary text-sm" />
                Add New Discount
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addDiscountModal">
                <Icon icon="x" className="text-xl" />
              </button>
            </div>
            <form id="addDiscountForm">
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      Discount Name
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-input" name="discount_name" placeholder="e.g., Summer Sale" required />
                  </div>
                  <div>
                    <label className="form-label">
                      Discount Code
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-input" name="discount_code" placeholder="e.g., SUMMER25" required />
                  </div>
                  <div>
                    <label className="form-label">
                      Discount Type
                      <span className="text-danger">*</span>
                    </label>
                    <select className="form-input" name="discount_type" required>
                      <option value="All">Select Type</option>
                      <option value="Percentage">Percentage</option>
                      <option value="Flat">Flat Amount</option>
                      <option value="BOGO">Buy One Get One (BOGO)</option>
                      <option value="Bundle">Bundle Offer</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">
                      Discount Value
                      <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-input" name="discount_value" placeholder="e.g., 25 (for 25%) or 50 (for $50)" required />
                  </div>
                  <div>
                    <label className="form-label">Minimum Purchase ($)</label>
                    <input type="number" className="form-input" name="min_purchase" placeholder="e.g., 100" />
                  </div>
                  <div>
                    <label className="form-label">Maximum Discount ($)</label>
                    <input type="number" className="form-input" name="max_discount" placeholder="e.g., 300" />
                  </div>
                  <div>
                    <label className="form-label">
                      Start Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr type="text" className="form-input" options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} name="start_date" placeholder="Select start date" required readOnly />
                  </div>
                  <div>
                    <label className="form-label">
                      End Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr type="text" className="form-input" options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} name="end_date" placeholder="Select end date" required readOnly />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" name="discount_description" rows={2} placeholder="Short description about this discount..." defaultValue={''} />
                  </div>
                  <div className="md:col-span-2">
                    <div className="mt-3 flex flex-wrap gap-base">
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isDiscountActive" defaultChecked />
                        <label htmlFor="isDiscountActive">Active</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isDiscountAutoApply" />
                        <label htmlFor="isDiscountAutoApply">Send via Email</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input className="form-switch" type="checkbox" id="isDiscountFirstPurchase" />
                        <label htmlFor="isDiscountFirstPurchase">Physical Delivery</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addDiscountModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="plus" />
                Add Discount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscountTable
