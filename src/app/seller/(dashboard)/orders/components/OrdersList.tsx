'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { OrderRow, OrderStatus } from './data'

const STATUS_TABS: { value: string; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'CREATED', label: 'รอยืนยัน' },
  { value: 'CONFIRMED', label: 'ยืนยันแล้ว' },
  { value: 'SHIPPED', label: 'จัดส่งแล้ว' },
  { value: 'COMPLETED', label: 'สำเร็จ' },
  { value: 'CANCELLED', label: 'ยกเลิก' },
]

const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  CREATED:   { label: 'รอยืนยัน',  cls: 'bg-warning/10 text-warning' },
  CONFIRMED: { label: 'ยืนยันแล้ว', cls: 'bg-info/10 text-info' },
  SHIPPED:   { label: 'จัดส่งแล้ว', cls: 'bg-primary/10 text-primary' },
  COMPLETED: { label: 'สำเร็จ',    cls: 'bg-success/10 text-success' },
  CANCELLED: { label: 'ยกเลิก',    cls: 'bg-danger/10 text-danger' },
}

const columnHelper = createColumnHelper<OrderRow>()

type Props = {
  orders: OrderRow[]
  activeStatus: string
}

const OrdersList = ({ orders, activeStatus }: Props) => {
  const router = useRouter()

  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  // Client-side status filter (all orders already fetched)
  const [localStatus, setLocalStatus] = useState<string>(activeStatus ?? 'all')

  const filteredByStatus = useMemo(() => {
    if (localStatus === 'all' || !localStatus) return orders
    return orders.filter((o) => o.status === localStatus)
  }, [orders, localStatus])

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Order #',
        cell: ({ row }) => (
          <h5 className="text-sm font-medium font-mono">
            <Link href={`/orders/${row.original.publicToken}`} className="hover:text-primary">
              #{row.original.id}
            </Link>
          </h5>
        ),
      }),
      columnHelper.accessor('buyer', {
        header: 'ผู้ซื้อ',
        cell: ({ row }) => (
          <span className="text-default-700">{row.original.buyer}</span>
        ),
      }),
      columnHelper.accessor('product', {
        header: 'สินค้า',
        cell: ({ row }) => (
          <span className="max-w-[180px] truncate block text-default-700">{row.original.product}</span>
        ),
      }),
      columnHelper.accessor('qty', {
        header: 'จำนวน',
        cell: ({ getValue }) => <span>{getValue()}</span>,
      }),
      columnHelper.accessor('total', {
        header: 'ยอดรวม',
        cell: ({ getValue }) => (
          <span className="font-medium">
            {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(getValue())}
          </span>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'สถานะ',
        cell: ({ getValue }) => {
          const s = STATUS_META[getValue()] ?? { label: getValue(), cls: 'bg-default-100 text-default-700' }
          return (
            <span className={cn('badge', s.cls)}>{s.label}</span>
          )
        },
      }),
      columnHelper.accessor('date', {
        header: 'วันที่',
        cell: ({ getValue }) => (
          <span className="text-default-400 text-sm">{getValue()}</span>
        ),
      }),
      {
        id: 'action',
        header: () => <div className="text-center">Actions</div>,
        enableSorting: false,
        cell: ({ row }: { row: { original: OrderRow } }) => (
          <div className="flex justify-center gap-1.5">
            <Link
              href={`/orders/${row.original.publicToken}`}
              className="btn btn-icon btn-sm border border-default-300 text-default-800 hover:border-default-400"
            >
              <Icon icon="eye" className="text-base" />
            </Link>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredByStatus,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length
  const start = totalItems === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  const handleStatusTab = (value: string) => {
    setLocalStatus(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
    // Also update URL search param for SSR consistency
    if (value === 'all') {
      router.push('/orders')
    } else {
      router.push(`?status=${value}`)
    }
  }

  return (
    <div className="card">
      {/* Status Tabs */}
      <div className="card-header border-b border-default-200 flex flex-wrap gap-1.5 pb-3 pt-4 px-5">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleStatusTab(tab.value)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              localStatus === tab.value
                ? 'bg-primary text-white'
                : 'bg-default-100 text-default-900 hover:bg-default-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="card-header flex flex-wrap items-center justify-between gap-2.5">
        <div className="input-icon-group">
          <Icon icon="search" className="input-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="ค้นหาออเดอร์..."
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value)
              setPagination((p) => ({ ...p, pageIndex: 0 }))
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-nowrap">แสดง:</label>
            <select
              className="form-select"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <Link href="/orders/new" className="btn bg-primary text-white hover:bg-primary-hover">
            <Icon icon="plus" />
            สร้างออเดอร์
          </Link>
        </div>
      </div>

      <DataTable table={table} emptyMessage="ไม่มีออเดอร์ในขณะนี้" />

      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            itemsName="ออเดอร์"
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

export default OrdersList
