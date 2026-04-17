'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import AddTransactionModal from './AddTransactionModal'
import { transactionData, TransactionType } from './data'

const columnHelper = createColumnHelper<TransactionType>()

const TransactionTable = () => {
  const columns = [
    {
      id: 'select',
      header: ({ table }: { table: TableType<TransactionType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<TransactionType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
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

    columnHelper.accessor('description', {
      header: 'Description',
    }),

    columnHelper.accessor('type', {
      header: 'Type',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span
          className={cn(
            'badge',
            row.original.type === 'credit' && 'bg-success/15 text-success',
            row.original.type === 'debit' && 'bg-danger/15 text-danger',
            row.original.type === 'refund' && 'bg-info/15 text-info',
            row.original.type === 'adjustment' && 'bg-secondary/15 text-secondary'
          )}
        >
          {toPascalCase(row.original.type)}
        </span>
      ),
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
      cell: ({ row }) => <span className={cn('font-semibold', row.original.amount.startsWith('+') && 'text-success', row.original.amount.startsWith('−') && 'text-danger')}>{row.original.amount}</span>,
    }),

    columnHelper.accessor('balance', {
      header: 'Balance',
      cell: ({ row }) => <span className="font-semibold">{row.original.balance}</span>,
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span
          className={cn(
            'badge badge-label',
            row.original.status === 'completed' && 'bg-success/15 text-success',
            row.original.status === 'pending' && 'bg-warning/15 text-warning',
            row.original.status === 'failed' && 'bg-danger/15 text-danger',
            row.original.status === 'adjustment' && 'bg-info/15 text-info'
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

    columnHelper.accessor('processedBy', {
      header: 'Processed By',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.processedBy.image} alt="" className="size-6 rounded-full" />
          <span>{row.original.processedBy.name}</span>
        </div>
      ),
    }),

    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<TransactionType> }) => (
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

  const [data, setData] = useState<TransactionType[]>(() => [...transactionData])
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
              <input className="form-input" placeholder="Search transactions..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>
            <div className="flex gap-1">
              <a href="#transactionModal" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="transactionModal" data-hs-overlay="#transactionModal">
                <Icon icon="plus" />
                Add Transaction
              </a>
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 lg:flex-nowrap">
            <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
              <div className="items-center gap-2.5 md:flex">
                <span className="font-semibold me-2.5">Filter By:</span>

                <div className="input-icon-group">
                  <Icon icon="transaction-dollar" className="input-icon" />
                  <select className="form-select" value={(table.getColumn('type')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('type')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                    <option>Type</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                    <option value="Refund">Refund</option>
                    <option value="Adjustment">Adjustment</option>
                  </select>
                </div>
              </div>

              <div className="input-icon-group">
                <Icon icon="circle-check" className="input-icon" />
                <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                  <option>Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div className="relative">
                <select className="form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                  {[5, 8, 10, 15, 20].map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <DataTable table={table} emptyMessage="No transactions found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="transactions"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="transactions" />
      </div>

      <AddTransactionModal />
    </>
  )
}

export default TransactionTable
