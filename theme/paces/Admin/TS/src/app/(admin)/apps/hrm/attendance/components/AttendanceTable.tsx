'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import AddRecodeModal from './AddRecodeModal'
import { attendanceData, AttendanceType } from './data'

const columnHelper = createColumnHelper<AttendanceType>()

const AttendanceTable = () => {
  const columns = [
    columnHelper.accessor('date', {
      header: 'Date',
    }),

    columnHelper.accessor('status', {
      header: 'Status',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span
          className={cn(
            'badge',
            row.original.status === 'present' && 'bg-success/15 text-success',
            row.original.status === 'late' && 'bg-warning/15 text-warning',
            row.original.status === 'half-day' && 'bg-warning/15 text-warning',
            row.original.status === 'on-leave' && 'bg-info/15 text-info',
            row.original.status === 'absent' && 'bg-danger/15 text-danger'
          )}
        >
          {toPascalCase(row.original.status.replace('-', ' '))}
        </span>
      ),
    }),

    columnHelper.accessor('shiftType', {
      header: 'Shift Type',
      filterFn: 'equalsString',
    }),

    columnHelper.accessor('clockIn', { header: 'Clock In' }),
    columnHelper.accessor('clockOut', { header: 'Clock Out' }),
    columnHelper.accessor('production', { header: 'Production' }),
    columnHelper.accessor('breakTime', { header: 'Break' }),
    columnHelper.accessor('overtime', { header: 'Overtime' }),

    columnHelper.accessor('progress', {
      header: 'Progress',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="bg-default-200 h-1.5 w-20 rounded-full overflow-hidden">
          <div className={cn('h-full transition-all', row.original.status === 'late' || row.original.status === 'half-day' ? 'bg-warning' : 'bg-success')} style={{ width: `${row.original.progress}%` }} />
        </div>
      ),
    }),

    columnHelper.accessor('totalHours', { header: 'Total Hours' }),
    columnHelper.accessor('leaveType', { header: 'Leave Type' }),

    columnHelper.accessor('approval', {
      header: 'Approval',
      filterFn: 'equalsString',
      cell: ({ row }) => (
        <span className={cn('badge', row.original.approval === 'approved' && 'bg-success/15 text-success', row.original.approval === 'pending' && 'bg-warning/15 text-warning', row.original.approval === 'rejected' && 'bg-danger/15 text-danger')}>
          {toPascalCase(row.original.approval)}
        </span>
      ),
    }),

    columnHelper.accessor('user.name', {
      header: 'Approved By',
    }),
  ]

  const [data] = useState<AttendanceType[]>(attendanceData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination,
    },
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
              <input className="form-input" placeholder="Search attendance..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
            </div>
            <button data-table-delete-selected className="btn bg-danger text-white hover:bg-danger-hover hidden">
              Delete
            </button>

            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addAttendanceModal" data-hs-overlay="#addAttendanceModal">
              <Icon icon="plus" />
              Add Record
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="me-3 font-semibold">Filter By:</span>
            <div className="input-icon-group">
              <Icon icon="user-check" className="input-icon"></Icon>
              <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Status</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
                <option value="on-leave">On Leave</option>
                <option value="absent">Absent</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="clock" className="input-icon"></Icon>
              <select className="form-select" value={(table.getColumn('shiftType')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('shiftType')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option>Shift Type</option>
                <option value="Day Shift">Day Shift</option>
                <option value="Night Shift">Night Shift</option>
                <option value="Mid Shift">Mid Shift</option>
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

        <DataTable table={table} emptyMessage="No attendance records found" />

        {table.getRowModel().rows.length > 0 && (
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
        )}
      </div>

      <AddRecodeModal />
    </>
  )
}

export default AttendanceTable
