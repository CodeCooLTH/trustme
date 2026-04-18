'use client'

/**
 * Admin users list — client-side filtered table.
 *
 * Base: src/app/(paces)/seller/(dashboard)/customers/components/CustomerTable.tsx
 * (same-theme Paces DataTable pattern, itself derived from
 *  theme/paces/Admin/TS/src/app/(admin)/apps/users/contacts/).
 *
 * Columns adapted for SafePay: avatar+name+@username, contact, trust score+level,
 * max verification level, isShop/isAdmin chips, registration date, profile action.
 * Search + status chip filter (all / verified / shops / admins).
 */

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Select from '@/components/wrappers/Select'
import Icon from '@/components/wrappers/Icon'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import type { AdminUserRow } from './data'

type Filter = 'all' | 'verified' | 'shops' | 'admins'

const columnHelper = createColumnHelper<AdminUserRow>()

const trustBadgeClass = (level: AdminUserRow['trustLevel']): string => {
  switch (level) {
    case 'A+':
    case 'A':
      return 'bg-success/10 text-success'
    case 'B+':
    case 'B':
      return 'bg-info/10 text-info'
    case 'C':
      return 'bg-warning/10 text-warning'
    default:
      return 'bg-default-200 text-default-700'
  }
}

const verifyBadgeClass = (lvl: number): string => {
  if (lvl >= 3) return 'bg-success/10 text-success'
  if (lvl >= 2) return 'bg-info/10 text-info'
  if (lvl >= 1) return 'bg-primary/10 text-primary'
  return 'bg-default-200 text-default-700'
}

const UsersTable = ({ users }: { users: AdminUserRow[] }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<Filter>('all')
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const filteredUsers = useMemo(() => {
    if (statusFilter === 'all') return users
    if (statusFilter === 'verified') return users.filter((u) => u.maxVerifiedLevel >= 1)
    if (statusFilter === 'shops') return users.filter((u) => u.isShop)
    if (statusFilter === 'admins') return users.filter((u) => u.isAdmin)
    return users
  }, [users, statusFilter])

  const columns = [
    columnHelper.accessor('displayName', {
      header: 'ผู้ใช้งาน',
      cell: ({ row }) => {
        const u = row.original
        return (
          <div className="flex gap-3 items-center">
            {u.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={u.avatar}
                alt={u.displayName}
                className="size-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
                {(u.displayName || '?').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{u.displayName}</div>
              <div className="text-default-400 text-xs truncate">@{u.username}</div>
            </div>
          </div>
        )
      },
    }),
    columnHelper.display({
      id: 'contact',
      header: 'ติดต่อ',
      cell: ({ row }) => {
        const u = row.original
        const contact = u.phone || u.email || '—'
        return <span className="text-default-500 font-mono text-sm">{contact}</span>
      },
    }),
    columnHelper.accessor('trustScore', {
      header: 'Trust',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{row.original.trustScore}</span>
          <span
            className={`badge text-xs font-medium px-2 py-1 rounded-md ${trustBadgeClass(
              row.original.trustLevel
            )}`}
          >
            {row.original.trustLevel}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('maxVerifiedLevel', {
      header: 'Verify',
      cell: ({ row }) => (
        <span
          className={`badge text-xs font-medium px-2 py-1 rounded-md ${verifyBadgeClass(
            row.original.maxVerifiedLevel
          )}`}
        >
          L{row.original.maxVerifiedLevel}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'flags',
      header: 'สถานะ',
      cell: ({ row }) => {
        const u = row.original
        return (
          <div className="flex flex-wrap items-center gap-1.5">
            {u.isAdmin && (
              <span className="badge bg-danger/10 text-danger text-xs font-medium px-2 py-1 rounded-md">
                แอดมิน
              </span>
            )}
            {u.isShop && (
              <span className="badge bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md">
                ร้านค้า
              </span>
            )}
            {!u.isAdmin && !u.isShop && (
              <span className="text-default-400 text-xs">—</span>
            )}
          </div>
        )
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'สมัครเมื่อ',
      cell: ({ row }) => (
        <span className="text-default-500 text-sm">{row.original.createdAtTh}</span>
      ),
      sortingFn: (a, b) =>
        new Date(a.original.createdAt).getTime() - new Date(b.original.createdAt).getTime(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'การจัดการ',
      cell: ({ row }) => (
        <a
          href={row.original.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm border border-default-300 bg-card hover:bg-primary hover:text-white text-default-700 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
        >
          <Icon icon="external-link" className="text-sm" />
          ดูโปรไฟล์
        </a>
      ),
    }),
  ]

  const table = useReactTable({
    data: filteredUsers,
    columns,
    filterFns: {},
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    enableColumnFilters: true,
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length
  const start = totalItems === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min(pageIndex * pageSize + pageSize, totalItems)

  const chip = (
    value: Filter,
    label: string,
    count: number
  ) => (
    <button
      key={value}
      type="button"
      onClick={() => {
        setStatusFilter(value)
        table.setPageIndex(0)
      }}
      className={
        statusFilter === value
          ? 'btn btn-sm bg-primary text-white hover:bg-primary-hover inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md'
          : 'btn btn-sm border border-default-300 bg-card hover:bg-default-50 text-default-700 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md'
      }
    >
      <span>{label}</span>
      <span
        className={
          statusFilter === value
            ? 'text-[10px] font-semibold bg-white/20 px-1.5 py-0.5 rounded'
            : 'text-[10px] font-semibold bg-default-100 text-default-500 px-1.5 py-0.5 rounded'
        }
      >
        {count}
      </span>
    </button>
  )

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex gap-2.5 flex-1">
          <div className="input-icon-group w-full md:max-w-xs">
            <Icon icon="search" className="input-icon" />
            <input
              type="search"
              placeholder="ค้นหาชื่อหรือ @username…"
              className="form-input"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2.5 items-center flex-wrap md:flex-nowrap">
          <div className="w-24">
            <Select
              className="select2 react-select"
              classNamePrefix="react-select"
              isSearchable={false}
              options={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
              ]}
              value={{
                value: pageSize,
                label: String(pageSize),
              }}
              onChange={(opt: any) => table.setPageSize(Number(opt?.value ?? 10))}
            />
          </div>
        </div>
      </div>

      <div className="px-base pb-3 flex flex-wrap items-center gap-2">
        {chip('all', 'ทั้งหมด', users.length)}
        {chip('verified', 'ยืนยันแล้ว', users.filter((u) => u.maxVerifiedLevel >= 1).length)}
        {chip('shops', 'ร้านค้า', users.filter((u) => u.isShop).length)}
        {chip('admins', 'แอดมิน', users.filter((u) => u.isAdmin).length)}
      </div>

      <div className="overflow-x-auto whitespace-normal">
        <DataTable table={table} emptyMessage="ไม่พบผู้ใช้งาน" />
      </div>

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="รายการ"
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
    </div>
  )
}

export default UsersTable
