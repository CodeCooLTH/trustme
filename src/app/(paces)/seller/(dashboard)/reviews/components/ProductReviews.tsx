'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import Rating from '@/components/Rating'
import ChoiceSelect from '@/components/wrappers/ChoiceSelect'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import ratingsImg from '@/assets/images/ratings.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { ReviewRow, SummaryData } from './data'

type Props = {
  reviews: ReviewRow[]
  summary: SummaryData
}

const starRatings = [5, 4, 3, 2, 1] as const

const columnHelper = createColumnHelper<ReviewRow>()

const ProductReviews = ({ reviews, summary }: Props) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const columns = [
    columnHelper.accessor('productName', {
      header: 'สินค้า',
      cell: ({ row }) => (
        <div className="flex items-center gap-base">
          {/* Product image omitted — orderItems don't snapshot images */}
          <div className="bg-default-100 text-default-400 size-11 rounded flex items-center justify-center">
            <Icon icon="package" className="text-lg" />
          </div>
          <h5>
            <span className="text-default-800 text-sm font-medium">{row.original.productName}</span>
          </h5>
        </div>
      ),
    }),
    columnHelper.accessor('reviewerLabel', {
      header: 'ผู้รีวิว',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          {/* Avatar: initials fallback — no user image available */}
          <div className="bg-primary/10 text-primary rounded-full size-10 flex items-center justify-center font-bold shrink-0">
            {row.original.reviewerInitial}
          </div>
          <div>
            <h5 className="text-sm leading-tight font-medium text-default-800">{row.original.reviewerLabel}</h5>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('rating', {
      header: 'รีวิว',
      enableSorting: false,
      cell: ({ row }) => (
        <>
          <Rating rating={row.original.rating} />
          <p className={cn('mt-2 text-sm', row.original.comment ? 'text-default-700 italic' : 'text-default-300 italic')}>
            {row.original.comment ?? 'ไม่มีความคิดเห็น'}
          </p>
        </>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'วันที่',
      cell: ({ row }) => (
        <span className="text-default-500 text-sm">{row.original.date}</span>
      ),
    }),
    {
      id: 'actions',
      header: 'ออเดอร์',
      enableSorting: false,
      cell: ({ row }: { row: { original: ReviewRow } }) => (
        <Link
          href={`/orders/${row.original.orderToken}`}
          className="btn btn-sm border border-default-300 text-default-800 hover:border-default-400 flex items-center gap-1"
        >
          <Icon icon="receipt" className="text-base" />
          ดู
        </Link>
      ),
    },
  ]

  const table = useReactTable({
    data: reviews,
    columns,
    state: { pagination, globalFilter },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalItems = table.getFilteredRowModel().rows.length
  const start = pageIndex * pageSize + 1
  const end = Math.min(start + pageSize - 1, totalItems)

  // Compute distribution bar widths from summary
  const maxCount = Math.max(1, ...Object.values(summary.distribution))

  return (
    <div className="card">
      {/* ── Summary header: left = rating overview, right = distribution bars ── */}
      <div className="border-default-300 border-b border-dashed">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: overall rating block */}
          <div className="border-default-300 grid grid-cols-12 border-e border-dashed">
            <div className="col-span-7">
              <div className="flex items-center gap-base p-7.5 md:gap-7.5">
                <Image src={ratingsImg} alt="Ratings" className="h-20" width={95} />
                <div className="flex flex-col gap-y-2.5">
                  <h3 className="flex items-center gap-2.5 text-xl font-bold">
                    {summary.total > 0 ? summary.avgRating.toFixed(1) : '—'}
                    <Icon icon="star-filled" className="text-xl text-warning" />
                  </h3>
                  <p className="text-default-500 text-sm">
                    จาก {summary.total} รีวิวที่ยืนยันแล้ว
                  </p>
                  <div>
                    <span className="badge badge-label bg-success/15 font-semibold text-success">
                      คะแนนจริงจากลูกค้า
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution bars (5 → 1 star) */}
            <div className="col-span-5">
              <div className="space-y-2.5 mt-2 p-5">
                {starRatings.map((star) => {
                  const count = summary.distribution[star] ?? 0
                  const pct = summary.total > 0 ? Math.round((count / summary.total) * 100) : 0
                  return (
                    <div className="flex items-center gap-2.5" key={star}>
                      <div className="text-sm text-nowrap min-w-12.5">{star} ดาว</div>
                      <div
                        className="bg-default-100 flex h-2 w-full overflow-hidden rounded-full"
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="bg-primary flex flex-col justify-center overflow-hidden rounded-s-full text-center text-xs whitespace-nowrap text-white transition duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-end">
                        <span className="badge bg-light text-dark">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: placeholder area — chart omitted (no time-series review data in MVP) */}
          <div className="flex items-center justify-center p-7.5 text-default-300">
            <div className="text-center">
              <Icon icon="chart-bar" className="text-5xl mb-2" />
              <p className="text-sm">กราฟแนวโน้มรีวิว</p>
              <p className="text-xs">จะแสดงเมื่อมีข้อมูลเพียงพอ</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="card-header">
        <div className="flex gap-2">
          <div className="input-icon-group">
            <Icon icon="search" className="input-icon" />
            <input
              type="search"
              placeholder="ค้นหารีวิว..."
              className="form-input w-full ps-10"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="ms-auto">
          <div className="flex items-center gap-2.5">
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
            {/* Filter dropdown — visual only (MVP: no server-side filtering) */}
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button
                type="button"
                className="hs-dropdown-toggle btn border-default-300 text-default-800 hover:bg-default-100 border text-nowrap"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                ทั้งหมด
                <Icon icon="chevron-down" className="text-sm" />
              </button>
              {/* Visual-only filter tabs — no actual filtering in MVP */}
              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <div className="space-y-0.5">
                  <span className="dropdown-item cursor-default text-default-400">ทั้งหมด</span>
                  <span className="dropdown-item cursor-default text-default-400">5 ดาว</span>
                  <span className="dropdown-item cursor-default text-default-400">4 ดาว</span>
                  <span className="dropdown-item cursor-default text-default-400">3 ดาว หรือต่ำกว่า</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Data table ── */}
      <DataTable
        table={table}
        emptyMessage={
          <div className="py-10 text-center">
            <Icon icon="star" className="text-5xl text-default-200 mb-3" />
            <p className="text-default-400">ยังไม่มีรีวิว</p>
            <p className="text-default-300 text-sm mt-1">รีวิวจะปรากฏที่นี่หลังลูกค้ายืนยันออเดอร์</p>
          </div>
        }
      />

      {/* ── Pagination ── */}
      {table.getRowModel().rows.length > 0 && (
        <div className="card-footer border-light">
          <TablePagination
            totalItems={totalItems}
            start={start}
            end={end}
            showInfo
            itemsName="รีวิว"
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

export default ProductReviews
