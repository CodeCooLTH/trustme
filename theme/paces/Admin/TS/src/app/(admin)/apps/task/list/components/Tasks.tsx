'use client'
import DataTable from '@/components/table/DataTable'
import DeleteConfirmationModal from '@/components/table/DeleteConfirmationModal'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import { ColumnDef, ColumnFiltersState, createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Row as TableRow, Table as TableType, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { taskData, type TaskType } from './data'

const columnHelper = createColumnHelper<TaskType>()
const Tasks = () => {
  const columns: ColumnDef<TaskType, any>[] = [
    {
      id: 'select',
      maxSize: 45,
      size: 45,
      header: ({ table }: { table: TableType<TaskType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
      cell: ({ row }: { row: TableRow<TaskType> }) => <input type="checkbox" className="form-checkbox form-checkbox-light size-4.5" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    columnHelper.accessor('title', {
      header: 'Task Title',
      cell: ({ row }) => {
        return (
          <>
            <h5>
              <Link href="/apps/task/details" className="hover:text-primary">
                {row.original.title}
              </Link>
            </h5>
            <p className="text-default-400 text-xs">
              Created: {row.original.createdAtDate}
              <small className="text-default-400 text-2xs">{row.original.createdAtTime}</small>
            </p>
          </>
        )
      },
    }),
    columnHelper.accessor('assignee', {
      header: 'Assigned To',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="size-8">
            <Image src={row.original.assignee.image} alt={row.original.assignee.name} className="rounded-full" />
          </div>
          <div>
            <h6 className="font-semibold">{row.original.assignee.name}</h6>
            <p className="text-default-400 text-xs">{row.original.assignee.members} members</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      filterFn: 'equalsString',
      enableColumnFilter: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Icon icon="calendar" className="text-default-400 size-3.5" />
          {row.original.dueDate}
        </div>
      ),
    }),
    columnHelper.accessor('totalTask', {
      header: 'Progress',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Icon icon="list-details" className="text-default-400 size-3.5" />
          {row.original.completedTask}/{row.original.totalTask}
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => <span className={cn('badge border', row.original.status === 'cancelled' ? 'border-danger text-danger' : row.original.status === 'in-progress' ? 'border-success text-success' : 'border-warning text-warning')}>{toPascalCase(row.original.status)}</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: ({ row }) => <span className={cn('badge fs-xxs', row.original.priority === 'high' ? 'bg-danger/15 text-danger' : row.original.priority === 'medium' ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success')}>{toPascalCase(row.original.priority)}</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('comments', {
      header: 'Comments',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.25">
          <Icon icon="messages" className="text-default-400 text-sm" />
          {row.original.comments}
        </div>
      ),
      enableSorting: false,
    }),
    {
      header: 'Actions',
      cell: ({ row }: { row: TableRow<TaskType> }) => (
        <div className="flex justify-center gap-1.5">
          <button type="button" className="btn btn-icon btn-sm border border-default-300 text-default-800 hover:border-default-400">
            <Icon icon="eye" className="text-base" />
          </button>
          <button type="button" className="btn btn-icon btn-sm border border-default-300 text-default-800 hover:border-default-400">
            <Icon icon="edit" className="text-base" />
          </button>
          <button type="button" className="btn btn-icon btn-sm border border-default-300 hover:border-default-400" data-table-delete-row>
            <Icon icon="trash" className="text-base" />
          </button>
        </div>
      ),
    },
  ]

  const [data, setData] = useState<TaskType[]>(() => [...taskData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters, pagination, rowSelection: selectedRowIds },
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
    enableColumnFilters: true,
    enableRowSelection: true,
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length

  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  const handleDelete = () => {
    const selectedIds = new Set(Object.keys(selectedRowIds))
    setData((old) => old.filter((_, idx) => !selectedIds.has(idx.toString())))
    setSelectedRowIds({})
    setPagination({ ...pagination, pageIndex: 0 })
    window.HSOverlay?.close('#confirm-delete-modal')
  }

  return (
    <div className="card mb-base">
      <div className="card-header">
        <div className="flex gap-base w-full items-center justify-between">
          <div className="flex gap-2">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input type="search" className="form-input" placeholder="Search task..." onChange={(e) => setGlobalFilter(e.target.value)} value={globalFilter ?? ''} />
            </div>

            <button className={cn('btn bg-danger text-white hover:bg-danger-hover', !(Object.keys(selectedRowIds).length > 0) && 'hidden')} type="button" data-hs-overlay="#confirm-delete-modal">
              Delete
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold me-3">Filter By:</span>

            <div className="input-icon-group">
              <Icon icon="list-check" className="input-icon" />
              <select className="form-select" value={(table.getColumn('status')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Task Status</option>
                <option value="New">New</option>
                <option value="In-Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="In-Review">In Review</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="input-icon-group">
              <Icon icon="alert-triangle" className="input-icon" />

              <select className="form-select" value={(table.getColumn('priority')?.getFilterValue() as string) ?? 'All'} onChange={(e) => table.getColumn('priority')?.setFilterValue(e.target.value === 'All' ? undefined : e.target.value)}>
                <option value="All">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <select className="form-select" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                {[5, 8, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-1.5">
            <Link href="/apps/task/create" className="btn bg-primary text-white hover:bg-primary-hover">
              <Icon icon="plus" className="text-base" />
              Add Task
            </Link>
          </div>
        </div>
      </div>

      <DataTable<TaskType> table={table} emptyMessage="No records found" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="taks"
            showInfo
            previousPage={table.previousPage}
            canPreviousPage={table.getCanPreviousPage()}
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            setPageIndex={table.setPageIndex}
            nextPage={table.nextPage}
            canNextPage={table.getCanNextPage()}
          />
        </div>
      )}

      <DeleteConfirmationModal onConfirm={handleDelete} selectedCount={Object.keys(selectedRowIds).length} itemName="task" />
    </div>
  )
}

export default Tasks
