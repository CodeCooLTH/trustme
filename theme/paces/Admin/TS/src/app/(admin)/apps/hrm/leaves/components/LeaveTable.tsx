'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, useReactTable, type Row as TableRow, type Table as TableType } from '@tanstack/react-table'
import { useState } from 'react'
import AddLeaveModal from './AddLeaveModal'
import { leaveData, LeaveType } from './data'

const columnHelper = createColumnHelper<LeaveType>()

const LeaveTable = () => {
  const [data, setData] = useState<LeaveType[]>(() => [...leaveData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = () => {
    const idsToDelete = new Set(Object.keys(selectedRowIds))

    setData((prev) => prev.filter((leave) => !idsToDelete.has(String(leave.id))))

    setSelectedRowIds({})
    setPagination((p) => ({ ...p, pageIndex: 0 }))
    setShowDeleteModal(false)
  }

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

  const toggleLeaveModal = () => {
    const modal = document.getElementById('addLeaveModal')
    modal?.classList.toggle('hidden')
  }

  const columns = [
    {
      id: 'select',
      size: 45,
      header: ({ table }: { table: TableType<LeaveType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<LeaveType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('id', { header: 'Employee ID' }),

    columnHelper.accessor('name', {
      header: 'Employee',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="bg-light flex size-8 items-center justify-center rounded-full">
            <Icon icon="user" className="text-default-400" />
          </div>
          {row.original.name}
        </div>
      ),
    }),

    columnHelper.accessor('department', {
      header: 'Department',
      filterFn: 'equalsString',
    }),

    columnHelper.accessor('dataFrom', { header: 'Date From' }),
    columnHelper.accessor('dataTo', { header: 'Date To' }),

    columnHelper.accessor('leaveType', {
      header: 'Leave Type',
      filterFn: 'equalsString',
    }),

    columnHelper.accessor('reason', {
      header: 'Reason',
      enableSorting: false,
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span className={cn('badge', row.original.status === 'Pending' && 'bg-warning/15 text-warning', row.original.status === 'Approved' && 'bg-success/15 text-success', row.original.status === 'Rejected' && 'bg-danger/15 text-danger')}>{row.original.status}</span>
      ),
    }),

    columnHelper.accessor('appliedOn', { header: 'Applied On' }),
    columnHelper.accessor('approvedBy', { header: 'Approved By' }),

    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<LeaveType> }) => {
        const { status } = row.original

        if (status === 'Pending') {
          return (
            <div className="flex justify-end gap-1.5">
              <button className="btn btn-icon btn-sm bg-success size-8 rounded-full text-white" title="Approve">
                <Icon icon="check" className="text-base" />
              </button>

              <button className="btn btn-icon btn-sm bg-danger size-8 rounded-full text-white" title="Reject">
                <Icon icon="x" className="text-base" />
              </button>

              <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400" title="Edit" onClick={toggleLeaveModal}>
                <Icon icon="edit" className="text-base" />
              </button>

              <button
                className="btn btn-icon btn-sm border border-default-300 hover:border-default-400"
                title="Delete"
                onClick={() => {
                  toggleDeleteModal()
                  setSelectedRowIds({ [row.id]: true })
                }}
              >
                <Icon icon="trash" className="text-base" />
              </button>
            </div>
          )
        }

        return (
          <div className="flex justify-end gap-1.5">
            <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400" title="View">
              <Icon icon="eye" className="text-base" />
            </button>

            <button className="btn btn-icon btn-sm border border-default-300 hover:border-default-400" title="Edit" onClick={toggleLeaveModal}>
              <Icon icon="edit" className="text-base" />
            </button>

            <button
              className="btn btn-icon btn-sm border border-default-300 hover:border-default-400"
              title="Delete"
              onClick={() => {
                toggleDeleteModal()
                setSelectedRowIds({ [row.id]: true })
              }}
            >
              <Icon icon="trash" className="text-base" />
            </button>
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const totalItems = table.getFilteredRowModel().rows.length
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex flex-wrap gap-3">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input className="form-input" placeholder="Search leave records..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>

            <button className={cn('btn bg-danger text-white', Object.keys(selectedRowIds).length === 0 && 'hidden')}>Delete</button>

            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addLeaveModal" data-hs-overlay="#addLeaveModal">
              <Icon icon="plus" />
              Add Leave
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
            <span className="me-3 font-semibold text-nowrap">Filter By:</span>

            <div className="input-icon-group">
              <Icon icon="file-text" className="input-icon" />
              <select className="form-select" value={(table.getColumn('leaveType')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('leaveType')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Paid Leave">Paid Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="box" className="input-icon" />
              <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="users" className="input-icon" />
              <select className="form-select" value={(table.getColumn('department')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('department')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Department</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Support">Support</option>
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

        <DataTable table={table} emptyMessage="No leave records found" />

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
        <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="departments" />
      </div>

      <AddLeaveModal />
    </>
  )
}

export default LeaveTable
