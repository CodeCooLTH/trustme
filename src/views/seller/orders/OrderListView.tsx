'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import CircularProgress from '@mui/material/CircularProgress'
import type { Theme } from '@mui/material/styles'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import OrderDetailDrawer from './OrderDetailDrawer'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Types
interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface ShipmentTracking {
  id: string
  provider: string
  trackingNo: string
  createdAt: string
}

interface Review {
  id: string
  rating: number
  comment?: string | null
}

interface Order {
  id: string
  publicToken: string
  totalAmount: number
  status: string
  type: string
  createdAt: string
  buyerContact?: string | null
  items: OrderItem[]
  shipmentTracking?: ShipmentTracking[]
  review?: Review | null
}

type StatusChipColorType = {
  label: string
  color: 'default' | 'primary' | 'info' | 'warning' | 'success' | 'error' | 'secondary'
}

const statusChipColor: Record<string, StatusChipColorType> = {
  CREATED: { label: 'รอยืนยัน', color: 'default' },
  CONFIRMED: { label: 'ยืนยันแล้ว', color: 'info' },
  SHIPPED: { label: 'กำลังจัดส่ง', color: 'warning' },
  COMPLETED: { label: 'สำเร็จ', color: 'success' },
  CANCELLED: { label: 'ยกเลิก', color: 'error' }
}

const STATUS_TABS = [
  { value: 'ALL', label: 'ทั้งหมด' },
  { value: 'CREATED', label: 'รอยืนยัน' },
  { value: 'CONFIRMED', label: 'ยืนยันแล้ว' },
  { value: 'SHIPPED', label: 'กำลังจัดส่ง' },
  { value: 'COMPLETED', label: 'สำเร็จ' },
  { value: 'CANCELLED', label: 'ยกเลิก' }
]

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<Order>()

// Stats Card — based on OrderCard.tsx
const OrderStatsCard = ({ orders }: { orders: Order[] }) => {
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const stats = [
    {
      value: orders.length,
      title: 'คำสั่งซื้อทั้งหมด',
      icon: 'tabler-shopping-cart'
    },
    {
      value: orders.filter(o => o.status === 'CREATED' || o.status === 'CONFIRMED').length,
      title: 'รอดำเนินการ',
      icon: 'tabler-calendar-stats'
    },
    {
      value: orders.filter(o => o.status === 'COMPLETED').length,
      title: 'สำเร็จ',
      icon: 'tabler-checks'
    },
    {
      value: `฿${orders.filter(o => o.status === 'COMPLETED').reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('th-TH')}`,
      title: 'รายได้รวม',
      icon: 'tabler-currency-baht'
    }
  ]

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {stats.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              key={index}
              className={classnames({
                '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                  isBelowMdScreen && !isBelowSmScreen,
                '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
              })}
            >
              <div className='flex justify-between gap-4'>
                <div className='flex flex-col items-start'>
                  <Typography variant='h4'>{item.value}</Typography>
                  <Typography>{item.title}</Typography>
                </div>
                <CustomAvatar variant='rounded' size={42} skin='light'>
                  <i className={classnames(item.icon, 'text-[26px]')} />
                </CustomAvatar>
              </div>
              {isBelowMdScreen && !isBelowSmScreen && index < stats.length - 2 && (
                <Divider
                  className={classnames('mbs-6', {
                    'mie-6': index % 2 === 0
                  })}
                />
              )}
              {isBelowSmScreen && index < stats.length - 1 && <Divider className='mbs-6' />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

// Order List Table — based on OrderListTable.tsx
const OrderListView = () => {
  // States
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState('')
  const [activeTab, setActiveTab] = useState('ALL')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders?role=seller')
      const data = await res.json()

      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('fetch error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filteredByTab = useMemo(
    () => (activeTab === 'ALL' ? orders : orders.filter(o => o.status === activeTab)),
    [orders, activeTab]
  )

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/o/${token}`

    navigator.clipboard.writeText(url)
  }

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order)
    setDrawerOpen(true)
  }

  const handleRefresh = () => {
    fetchOrders()
    setDrawerOpen(false)
    setSelectedOrder(null)
  }

  const columns = useMemo<ColumnDef<Order, any>[]>(
    () => [
      columnHelper.accessor('publicToken', {
        header: 'คำสั่งซื้อ',
        cell: ({ row }) => (
          <Typography
            color='primary.main'
            className='font-medium cursor-pointer'
            onClick={() => handleOpenDetail(row.original)}
          >
            #{row.original.publicToken.slice(0, 8)}
          </Typography>
        )
      }),
      columnHelper.accessor('items', {
        header: 'รายการ',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.items.map(i => i.name).join(', ')}
            </Typography>
            <Typography variant='body2'>
              {row.original.items.length} รายการ
            </Typography>
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('buyerContact', {
        header: 'ผู้ซื้อ',
        cell: ({ row }) => (
          <Typography color={row.original.buyerContact ? 'text.primary' : 'text.disabled'}>
            {row.original.buyerContact || 'ยังไม่ยืนยัน'}
          </Typography>
        )
      }),
      columnHelper.accessor('totalAmount', {
        header: 'ยอดรวม',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            ฿{row.original.totalAmount.toLocaleString('th-TH')}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'สถานะ',
        cell: ({ row }) => {
          const config = statusChipColor[row.original.status] || {
            label: row.original.status,
            color: 'default' as const
          }

          return <Chip label={config.label} color={config.color} variant='tonal' size='small' />
        }
      }),
      columnHelper.accessor('createdAt', {
        header: 'วันที่',
        cell: ({ row }) => (
          <Typography>{new Date(row.original.createdAt).toLocaleDateString('th-TH')}</Typography>
        )
      }),
      {
        id: 'action',
        header: 'จัดการ',
        cell: ({ row }: any) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'ดูรายละเอียด',
                  icon: 'tabler-eye',
                  menuItemProps: {
                    onClick: () => handleOpenDetail(row.original),
                    className: 'flex items-center gap-2'
                  }
                },
                {
                  text: 'คัดลอกลิงก์',
                  icon: 'tabler-link',
                  menuItemProps: {
                    onClick: () => handleCopyLink(row.original.publicToken),
                    className: 'flex items-center gap-2'
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      } as ColumnDef<Order, any>
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: filteredByTab,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  if (loading) {
    return (
      <div className='flex justify-center items-center min-bs-[300px]'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Grid container spacing={6}>
      {/* Stats Card */}
      <Grid size={{ xs: 12 }}>
        <OrderStatsCard orders={orders} />
      </Grid>

      {/* Order Table */}
      <Grid size={{ xs: 12 }}>
        <Card>
          {/* Tabs */}
          <TabContext value={activeTab}>
            <TabList
              variant='scrollable'
              scrollButtons='auto'
              onChange={(_, value) => setActiveTab(value)}
              className='border-be'
            >
              {STATUS_TABS.map(tab => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={
                    <div className='flex items-center gap-1.5'>
                      {tab.label}
                      {tab.value !== 'ALL' && (
                        <Chip
                          variant='tonal'
                          label={orders.filter(o => o.status === tab.value).length}
                          size='small'
                          color={statusChipColor[tab.value]?.color || 'default'}
                        />
                      )}
                    </div>
                  }
                />
              ))}
            </TabList>
          </TabContext>

          {/* Search + Actions */}
          <CardContent className='flex justify-between max-sm:flex-col sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='ค้นหาคำสั่งซื้อ'
              className='sm:is-auto'
            />
            <div className='flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='is-[70px] max-sm:is-full'
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='25'>25</MenuItem>
                <MenuItem value='50'>50</MenuItem>
              </CustomTextField>
              <Button
                variant='contained'
                href='/orders/create'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full is-auto'
              >
                สร้างคำสั่งซื้อ
              </Button>
            </div>
          </CardContent>

          {/* Table */}
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      ไม่มีคำสั่งซื้อ
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
          <TablePagination
            component={() => <TablePaginationComponent table={table} />}
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => {
              table.setPageIndex(page)
            }}
          />
        </Card>
      </Grid>

      {/* Detail Drawer */}
      <OrderDetailDrawer
        open={drawerOpen}
        order={selectedOrder}
        onClose={() => {
          setDrawerOpen(false)
          setSelectedOrder(null)
        }}
        onRefresh={handleRefresh}
      />
    </Grid>
  )
}

export default OrderListView
