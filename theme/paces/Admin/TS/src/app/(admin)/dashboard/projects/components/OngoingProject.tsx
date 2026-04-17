'use client'
import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import Image from 'next/image'
import { useState } from 'react'
import { projectData, ProjectType } from './data'

const columnHelper = createColumnHelper<ProjectType>()

const OngoingProject = () => {
  const [data] = useState(projectData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = [
    // Project
    columnHelper.accessor('name', {
      header: 'Project',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">{row.original.company}</span>
          <h5 className="text-sm font-semibold">
            <a href="#" className="hover:underline">
              {row.original.name}
            </a>
          </h5>
        </div>
      ),
    }),

    // Deadline
    columnHelper.accessor('deadline', {
      header: 'Deadline',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">Deadline</span>
          <h5 className="text-sm font-normal">{row.original.deadline}</h5>
        </div>
      ),
    }),

    // Budget
    columnHelper.accessor('budget', {
      header: 'Budget',
      cell: ({ row }) => (
        <div>
          <span className="text-default-400 text-xs">Budget</span>
          <h5 className="text-sm font-normal">{row.original.budget}</h5>
        </div>
      ),
    }),

    // Assigned User
    columnHelper.accessor('user', {
      header: 'Assigned',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Image src={row.original.user.image} alt={row.original.user.name} width={32} height={32} className="rounded-full" />
          <div>
            <span className="text-default-400 text-xs">{row.original.user.role}</span>
            <h5 className="text-sm font-normal">{row.original.user.name}</h5>
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
          <h5 className="text-sm font-normal flex items-center gap-1.5">
            <Icon icon="circle" className={`text-xs ${row.original.status.className}`} />
            {row.original.status.label}
          </h5>
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
                View Project
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Edit Project
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Archive Project
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
        <h4 className="card-title">Ongoing Projects</h4>

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
          <b>{totalItems}</b> Active projects out of <span className="font-medium">958</span>
        </p>
      </div>

      <DataTable<ProjectType> table={table} emptyMessage="No projects found" className="table-custom table-centered table-hover" showHeaders={false} />

      {totalItems > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="projects"
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

export default OngoingProject
