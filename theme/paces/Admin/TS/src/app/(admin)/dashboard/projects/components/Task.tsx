'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { taskData, TaskType } from './data'

const columnHelper = createColumnHelper<TaskType>()

const Task = () => {
  const [data] = useState(taskData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = [
    // Task
    columnHelper.accessor('title', {
      header: 'Task',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">{row.original.dueInfo}</span>
          <h5 className="text-sm font-semibold">
            <a href="#" className="hover:underline">
              {row.original.title}
            </a>
          </h5>
        </div>
      ),
    }),

    // Due Date
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">Due Date</span>
          <h5 className="text-sm font-normal">{row.original.dueDate}</h5>
        </div>
      ),
    }),

    // Assigned To
    columnHelper.accessor('assignedTo', {
      header: 'Assigned To',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Image src={row.original.assignedTo.image} alt={row.original.assignedTo.name} width={32} height={32} className="rounded-full" />
          <div>
            <span className="text-default-400 text-xs">Assigned To</span>
            <h5 className="text-sm font-normal">{row.original.assignedTo.name}</h5>
          </div>
        </div>
      ),
    }),

    // Status
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">Status</span>
          <h5 className="text-sm font-normal">
            <span
              className={`badge ${
                row.original.status === 'completed'
                  ? 'bg-success/15 text-success'
                  : row.original.status === 'in-progress'
                    ? 'bg-info/15 text-info'
                    : row.original.status === 'pending'
                      ? 'bg-warning/15 text-warning'
                      : row.original.status === 'blocked'
                        ? 'bg-danger/15 text-danger'
                        : 'bg-primary/15 text-primary'
              }`}
            >
              {toPascalCase(row.original.status)}
            </span>
          </h5>
        </div>
      ),
    }),

    // Time
    columnHelper.accessor('time', {
      header: 'Time Spent',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">Total time spent</span>
          <h5 className="text-sm font-normal">{row.original.time}</h5>
        </div>
      ),
    }),

    // Actions
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: () => (
        <div className="hs-dropdown [--placement:bottom-right] ml-auto">
          <button className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300">
            <Icon icon="dots-vertical" className="text-base" />
          </button>
          <ul className="hs-dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                View Task
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Edit Task
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Archive Task
              </a>
            </li>
          </ul>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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
    <div className="card">
      <div className="card-header flex items-center justify-between gap-4">
        <h4 className="card-title">Tasks</h4>

        <div className="flex items-center gap-2.5">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input data-table-search type="text" placeholder="Search project..." className="form-input" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
          </div>

          <div>
            <select className="form-input form-select" value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
              {[5, 10, 15, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-light/25 p-2.5 text-center border-b border-dashed border-light">
        <p className="text-sm">
          <b>{totalItems}</b> Tasks completed out of <span className="font-medium">195</span>
        </p>
      </div>

      <DataTable<TaskType> table={table} emptyMessage="No tasks found" className="table-custom table-hover" showHeaders={false} />

      {totalItems > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="tasks"
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
    </div>
  )
}

export default Task
