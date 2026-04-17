'use client'

import DataTable from '@/components/table/DataTable'
import TablePagination from '@/components/table/TablePagination'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import Icon from '@/components/wrappers/Icon'
import type { DailyRow } from './data'

type Props = { rows: DailyRow[] }

const columnHelper = createColumnHelper<DailyRow>()

const thb = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 })

const columns = [
  columnHelper.accessor('label', {
    header: 'วันที่',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('orders', {
    header: 'ออเดอร์',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('completed', {
    header: 'สำเร็จ',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('revenue', {
    header: 'ยอดขาย',
    enableColumnFilter: false,
    cell: ({ getValue }) => thb.format(getValue()),
  }),
  columnHelper.accessor('avgOrder', {
    header: 'เฉลี่ย/ออเดอร์',
    enableColumnFilter: false,
    cell: ({ getValue }) => thb.format(getValue()),
  }),
]

const SalesTable = ({ rows }: Props) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<any[]>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
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

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between flex-wrap gap-3">
        <h5 className="card-title">รายละเอียดรายวัน</h5>
        <div className="input-icon-group">
          <Icon icon="search" className="input-icon" />
          <input
            type="search"
            placeholder="ค้นหา..."
            className="form-input"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>

      <DataTable table={table} emptyMessage="ไม่มีข้อมูลในช่วงเวลานี้" />

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

export default SalesTable
