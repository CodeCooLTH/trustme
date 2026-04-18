'use client'

// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Third Party Imports
import type { useReactTable } from '@tanstack/react-table'

/**
 * Base: theme/vuexy/typescript-version/full-version/src/components/TablePaginationComponent.tsx
 * Adapted: Thai labels for "Showing X to Y of Z entries".
 */
const TablePaginationComponent = ({ table }: { table: ReturnType<typeof useReactTable> }) => {
  const totalRows = table.getFilteredRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`แสดง ${from}-${to} จาก ${totalRows} รายการ`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.max(1, Math.ceil(totalRows / pageSize))}
        page={pageIndex + 1}
        onChange={(_, page) => {
          table.setPageIndex(page - 1)
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
