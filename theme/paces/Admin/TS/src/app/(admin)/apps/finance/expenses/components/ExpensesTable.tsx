'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import AddExpensesModal from './AddExpensesModal'
import { expenseData, ExpenseType } from './data'

const columnHelper = createColumnHelper<ExpenseType>()

const ExpensesTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: TableType<ExpenseType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<ExpenseType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
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

    columnHelper.accessor('title', {
      header: 'Expense Title',
    }),

    columnHelper.accessor('category', {
      header: 'Category',
      filterFn: 'equalsString',
    }),

    columnHelper.accessor('paymentMethod', {
      header: 'Payment Method',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image src={row.original.paymentMethod.image} alt="" className="me-3 h-6.5 w-auto" />
          <span>{row.original.paymentMethod.number || row.original.paymentMethod.name}</span>
        </div>
      ),
    }),

    columnHelper.accessor('amount', {
      header: 'Amount',
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span
          className={cn(
            'badge badge-label',
            row.original.status === 'approved' && 'bg-success/15 text-success',
            row.original.status === 'pending' && 'bg-warning/15 text-warning',
            row.original.status === 'rejected' && 'bg-danger/15 text-danger',
            row.original.status === 'reimbursed' && 'bg-success/15 text-success'
          )}
        >
          {toPascalCase(row.original.status)}
        </span>
      ),
    }),

    columnHelper.accessor('date', {
      header: 'Date',
      cell: ({ row }) => (
        <>
          {row.original.date} <small className="text-default-400 text-2xs">{row.original.time}</small>
        </>
      ),
    }),

    columnHelper.accessor('addedBy', {
      header: 'Added By',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.addedBy.image} alt="" className="size-6 rounded-full" />
          <span>{row.original.addedBy.name}</span>
        </div>
      ),
    }),

    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<ExpenseType> }) => (
        <div className="flex justify-center gap-1.5">
          <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400">
            <Icon icon="eye" className="text-base" />
          </button>
          <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400">
            <Icon icon="edit" className="text-base" />
          </button>
          <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400" onClick={() => setSelectedRowIds({ [row.id]: true })} data-hs-overlay="#confirm-delete-modal">
            <Icon icon="trash" className="text-base" />
          </button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState<ExpenseType[]>(() => [...expenseData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

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
    setPagination({ ...pagination, pageIndex: 0 })
    window.HSOverlay?.close('#confirm-delete-modal')
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex flex-wrap gap-2.5">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input className="form-input" placeholder="Search expenses..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <div className="flex gap-1">
              <a href="#addExpenseModal" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addExpenseModal" data-hs-overlay="#addExpenseModal">
                <Icon icon="plus" />
                Add Expense
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
                  <Icon icon="category" className="input-icon" />
                  <select className="form-select" value={(table.getColumn('category')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('category')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                    <option value="All">Category</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Travel">Travel</option>
                    <option value="Meals">Meals</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-icon-group">
              <Icon icon="circle-check" className="input-icon" />
              <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="reimbursed">Reimbursed</option>
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

        <DataTable table={table} emptyMessage="No expenses found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="expenses"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="expenses" />
      </div>

      <AddExpensesModal />
    </>
  )
}

export default ExpensesTable
