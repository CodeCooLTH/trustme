'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { payrollData } from './data'
import NewPayRollModal from './NewPayRollModal'
const columnHelper = createColumnHelper()
const PayRollTable = () => {
  const [data, setData] = useState(() => [...payrollData])
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
    columnHelper.accessor('id', {
      header: 'Employee ID',
    }),
    columnHelper.accessor('employee', {
      header: 'Employee Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.employee.image} alt="" className="size-8 rounded-full" />
          <div>
            <h5 className="text-sm font-semibold">{row.original.employee.name}</h5>
            <p className="text-default-400 text-xs">{row.original.employee.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('department', {
      header: 'Department',
      filterFn: 'equalsString',
    }),
    columnHelper.accessor('designation', {
      header: 'Designation',
    }),
    columnHelper.accessor('date', {
      header: 'Pay Period',
    }),
    columnHelper.accessor('salary', {
      header: 'Base Salary',
    }),
    columnHelper.accessor('allowance', {
      header: 'Allowances',
    }),
    columnHelper.accessor('actualSalary', {
      header: 'Actual Salary',
      cell: ({ row }) => <strong>{row.original.actualSalary}</strong>,
    }),
    columnHelper.accessor('deductions', {
      header: 'Deductions',
    }),
    columnHelper.accessor('netPay', {
      header: 'Net Pay',
      cell: ({ row }) => <strong>{row.original.netPay}</strong>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span className={cn('badge', row.original.status === 'paid' && 'bg-success/15 text-success', row.original.status === 'processing' && 'bg-warning/15 text-warning', row.original.status === 'on-hold' && 'bg-danger/15 text-danger')}>{toPascalCase(row.original.status)}</span>
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
  const { pageIndex, pageSize } = table.getState().pagination
  const totalItems = table.getFilteredRowModel().rows.length
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)
  const handleDelete = () => {
    const ids = new Set(Object.keys(selectedRowIds))
    setData((prev) => prev.filter((_, idx) => !ids.has(idx.toString())))
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
              <input className="form-input" placeholder="Search payroll records..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>

            <button className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addPayrollModal" data-hs-overlay="#addPayrollModal">
              <Icon icon="plus" />
              New Payroll
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap">
            <span className="me-2.5 font-semibold text-nowrap">Filter By:</span>

            <div className="input-icon-group">
              <Icon icon="layout" className="input-icon" />
              <select className="form-select" value={table.getColumn('department')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('department')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Department</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Research & Development">Research & Development</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="arrows-shuffle" className="input-icon" />
              <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option>Status</option>
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Review">Pending Review</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="calendar" className="input-icon" />
              <select className="form-select" value={table.getColumn('date')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('date')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option>Pay Period</option>
                <option value="Oct 2025">October 2025</option>
                <option value="Sep 2025">September 2025</option>
                <option value="Aug 2025">August 2025</option>
                <option value="Jul 2025">July 2025</option>
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

        <DataTable table={table} emptyMessage="No payroll records found" />

        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="records"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="payrolls" />
      </div>
      <NewPayRollModal />
    </>
  )
}
export default PayRollTable
