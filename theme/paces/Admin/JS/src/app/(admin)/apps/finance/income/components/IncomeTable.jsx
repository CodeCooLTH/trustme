'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import AddIncomeModal from './AddIncomeModal'
import { incomeData } from './data'
const columnHelper = createColumnHelper()
const IncomeTable = () => {
  const [data, setData] = useState(() => [...incomeData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  })
  const [selectedRowIds, setSelectedRowIds] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const toggleDeleteModal = () => setShowDeleteModal((prev) => !prev)
  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({
      ...pagination,
      pageIndex: 0,
    })
    setShowDeleteModal(false)
  }
  const columns = [
    {
      id: 'select',
      size: 45,
      header: ({ table }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
    },
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => (
        <a href="#!" className="hover:text-primary font-semibold">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('title', {
      header: 'Income Title',
    }),
    columnHelper.accessor('category', {
      header: 'Source',
      filterFn: 'equalsString',
    }),
    columnHelper.accessor('paymentMethod', {
      header: 'Payment Type',
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image src={row.original.paymentMethod.image} alt="payment" className="me-3 h-6.5" height={26} />
          <span>{row.original.paymentMethod.number}</span>
        </div>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: ({ row }) => {
        const value = Number(row.original.amount.replace(/[^0-9.-]+/g, ''))
        return `$${value.toFixed(2)}`
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => <span className={`badge ${row.original.status === 'received' ? 'bg-success/15 text-success' : row.original.status === 'pending' ? 'bg-warning/15 text-warning' : 'bg-danger/15 text-danger'}`}>{toPascalCase(row.original.status)}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: ({ row }) => (
        <>
          {row.original.date}
          <small className="text-default-400 text-2xs ms-1">{row.original.time}</small>
        </>
      ),
    }),
    columnHelper.accessor('receivedBy', {
      header: 'Received By',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.receivedBy.image} alt={row.original.receivedBy.name} className="size-6 rounded-full" />
          <span>{row.original.receivedBy.name}</span>
        </div>
      ),
    }),
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex justify-center gap-1.5">
          <button className="btn border-default-300 hover:border-default-400 btn-icon btn-sm">
            <Icon icon="eye" className="text-base" />
          </button>
          <button className="btn border-default-300 hover:border-default-400 btn-icon btn-sm">
            <Icon icon="edit" className="text-base" />
          </button>
          <button
            className="btn border-default-300 hover:border-default-400 btn-icon btn-sm"
            onClick={() => {
              toggleDeleteModal()
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
  })
  const totalItems = table.getFilteredRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex flex-wrap gap-2">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input type="search" className="form-input w-auto ps-10" placeholder="Search income..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <div className="flex gap-1">
              <a href="#incomeModal" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="incomeModal" data-hs-overlay="#incomeModal">
                <Icon icon="plus" /> Add Income
              </a>
            </div>

            {Object.keys(selectedRowIds).length > 0 && (
              <button className="btn bg-danger text-white hover:bg-danger-hover" onClick={toggleDeleteModal}>
                Delete
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
            <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
              <div className="items-center gap-2 md:flex">
                <span className="font-semibold me-3">Filter By:</span>

                <div className="input-icon-group">
                  <Icon icon="briefcase" className="input-icon" />
                  <select className="form-select" value={table.getColumn('category')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('category')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                    <option value="All">Source</option>
                    <option value="Sales">Sales</option>
                    <option value="Services">Services</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Investments">Investments</option>
                    <option value="Affiliate">Affiliate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-icon-group">
              <Icon icon="circle-check" className="input-icon" />
              <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Status</option>
                <option value="received">Received</option>
                <option value="pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="refunded">Refunded</option>
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

        <DataTable table={table} emptyMessage="No income found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="income records"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="income" />
      </div>

      <AddIncomeModal />
    </>
  )
}
export default IncomeTable
