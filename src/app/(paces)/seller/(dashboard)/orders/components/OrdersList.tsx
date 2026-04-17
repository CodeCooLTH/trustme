'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import ChoiceSelect from '@/components/wrappers/ChoiceSelect'
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

const STATUS_TABS: { value: string; label: string; icon: string; dot?: string }[] = [
  { value: 'all',       label: 'ทั้งหมด',    icon: 'list' },
  { value: 'CREATED',   label: 'รอยืนยัน',   icon: 'clock',         dot: 'bg-warning' },
  { value: 'CONFIRMED', label: 'ยืนยันแล้ว', icon: 'circle-check',  dot: 'bg-info' },
  { value: 'SHIPPED',   label: 'จัดส่งแล้ว', icon: 'truck-delivery', dot: 'bg-primary' },
  { value: 'COMPLETED', label: 'สำเร็จ',     icon: 'check',         dot: 'bg-success' },
  { value: 'CANCELLED', label: 'ยกเลิก',    icon: 'x',             dot: 'bg-danger' },
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
      columnHelper.display({
        id: 'image',
        size: 56,
        maxSize: 56,
        enableSorting: false,
        header: () => '',
        cell: ({ row }) => {
          const first = row.original.items[0]
          if (first?.image) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <div className="size-10 rounded bg-default-100 overflow-hidden flex items-center justify-center shrink-0">
                <img src={first.image} alt={first.name} className="size-full object-cover" />
              </div>
            )
          }
          return (
            <div className="size-10 rounded bg-default-100 flex items-center justify-center shrink-0">
              <Icon icon="package" className="size-5 text-default-400" />
            </div>
          )
        },
      }),
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
      columnHelper.display({
        id: 'product',
        enableSorting: false,
        header: () => 'สินค้า',
        cell: ({ row }) => {
          const items = row.original.items
          if (items.length === 0) return <span className="text-default-400">—</span>
          return (
            <ul className="space-y-1 min-w-[14rem] max-w-[24rem]">
              {items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-1 text-sm leading-snug break-words">
                  <span className="flex-1">{it.name}</span>
                  {it.qty > 1 && (
                    <span className="text-default-400 whitespace-nowrap">×{it.qty}</span>
                  )}
                </li>
              ))}
            </ul>
          )
        },
      }),
      columnHelper.accessor('totalQty', {
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

  // Counts per status for the tab badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length }
    for (const o of orders) {
      counts[o.status] = (counts[o.status] ?? 0) + 1
    }
    return counts
  }, [orders])

  return (
    <div className="card">
      {/* Status Tabs — paces underline style */}
      <div className="card-header px-0 pt-0 pb-0 border-b border-default-200">
        <div className="flex gap-1 px-5 overflow-x-auto">
          {STATUS_TABS.map((tab) => {
            const active = localStatus === tab.value
            const count = statusCounts[tab.value] ?? 0
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleStatusTab(tab.value)}
                className={cn(
                  'relative inline-flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap',
                  'border-b-2 transition-colors focus:outline-none',
                  active
                    ? 'text-primary border-primary'
                    : 'text-default-500 border-transparent hover:text-primary hover:border-default-400',
                )}
              >
                {tab.dot && (
                  <span className={cn('inline-block size-1.5 rounded-full', tab.dot)} />
                )}
                <Icon icon={tab.icon} className="size-4" />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full text-xs font-semibold leading-none px-2 py-0.5 min-w-[1.25rem]',
                    active
                      ? 'bg-primary text-white'
                      : 'bg-default-100 text-default-700',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
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
            <div className="w-20">
              <ChoiceSelect
                options={[
                  { value: '5', label: '5' },
                  { value: '10', label: '10' },
                  { value: '15', label: '15' },
                  { value: '20', label: '20' },
                ]}
                value={String(table.getState().pagination.pageSize)}
                onChange={(v) => table.setPageSize(Number(v as string))}
                search={false}
                sorting={false}
              />
            </div>
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
