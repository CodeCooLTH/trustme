'use client'

import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { ticketData } from './data'
const columnHelper = createColumnHelper()
const TicketsTable = () => {
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
    }),
    columnHelper.accessor('requestedBy', {
      header: 'Requested By',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.requestedBy.image} alt={row.original.requestedBy.name} className="size-6 rounded-full" />
          <span>{row.original.requestedBy.name}</span>
        </div>
      ),
    }),
    columnHelper.accessor('subject', {
      header: 'Ticket Subject',
    }),
    columnHelper.accessor('agent', {
      header: 'Assigned Agent',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image src={row.original.agent.image} alt={row.original.agent.name} className="size-6 rounded-full" />
          <span>{row.original.agent.name}</span>
        </div>
      ),
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      filterFn: 'equalsString',
      cell: ({ row }) => {
        const priority = row.original.priority
        const color = priority === 'low' ? 'bg-success text-white' : priority === 'medium' ? 'bg-warning text-white' : priority === 'high' ? 'bg-danger text-white' : 'bg-danger/90 text-white'
        return <span className={`badge ${color}`}>{toPascalCase(priority)}</span>
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => {
        const status = row.original.status
        const color =
          status === 'open'
            ? 'bg-info/15 text-info'
            : status === 'pending'
              ? 'bg-warning/15 text-warning'
              : status === 'resolved'
                ? 'bg-success/15 text-success'
                : status === 'closed'
                  ? 'bg-secondary/15 text-secondary'
                  : status === 'escalated'
                    ? 'bg-danger/15 text-danger'
                    : 'bg-info/15 text-info'
        return <span className={`badge badge-label ${color}`}>{toPascalCase(status.replace('-', ' '))}</span>
      },
    }),
    columnHelper.accessor('createdAtDate', {
      header: 'Date Created',
      cell: ({ row }) => (
        <>
          {row.original.createdAtDate}
          <small className="text-default-400 text-xs ms-1">{row.original.createdAtTime}</small>
        </>
      ),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
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
            onClick={(e) => {
              e.stopPropagation()
              setSelectedRowIds({
                [row.id]: true,
              })
              document.getElementById('delete-confirmation-modal')?.classList.remove('hidden')
            }}
          >
            <Icon icon="trash" className="text-base" />
          </button>
        </div>
      ),
    },
  ]
  const [data, setData] = useState(() => [...ticketData])
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
          <div className="flex gap-2.5 flex-wrap">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input className="form-input" placeholder="Search tickets..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <div>
              <a href="/apps/ticket/create" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="plus" /> New Ticket
              </a>
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')} data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <span className="me-3 font-semibold text-nowrap">Filter By:</span>

            {/* Status Filter */}
            <div className="input-icon-group">
              <Icon icon="arrows-shuffle" className="input-icon" />
              <select className="form-select" value={table.getColumn('status')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="escalated">Escalated</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="input-icon-group">
              <Icon icon="alert-triangle" className="input-icon" />
              <select className="form-select" value={table.getColumn('priority')?.getFilterValue() ?? 'All'} onChange={(e) => table.getColumn('priority')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
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

        <DataTable table={table} emptyMessage="No tickets found" />

        {table.getRowModel().rows.length > 0 && (
          <div className="card-footer">
            <TablePagination
              totalItems={totalItems}
              start={start}
              end={end}
              itemsName="tickets"
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

        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="tickets" />
      </div>
    </>
  )
}
export default TicketsTable
