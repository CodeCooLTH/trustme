'use client'

import { useEffect, useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'

interface User {
  id: string
  displayName?: string | null
  username: string
  phone?: string | null
  email?: string | null
  trustScore: number
  isShop: boolean
  isAdmin: boolean
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const fetchUsers = useCallback(async (searchQuery: string) => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams()

      if (searchQuery) params.set('search', searchQuery)

      const res = await fetch(`/api/admin/users?${params.toString()}`)

      if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')

      const data = await res.json()

      setUsers(Array.isArray(data) ? data : [])
      setPage(0)
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(search)
    }, 400)

    return () => clearTimeout(timer)
  }, [search, fetchUsers])

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      <Typography variant='h4' fontWeight='bold' mb={1}>
        จัดการผู้ใช้
      </Typography>
      <Typography variant='body2' color='text.secondary' mb={4}>
        รายชื่อผู้ใช้ทั้งหมดในระบบ
      </Typography>

      <Stack direction='row' spacing={2} mb={3} alignItems='center'>
        <TextField
          placeholder='ค้นหาชื่อ, username, เบอร์โทร...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          size='small'
          sx={{ width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='tabler-search' style={{ fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant='body2' color='text.secondary'>
          พบ {users.length} รายการ
        </Typography>
      </Stack>

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        {loading ? (
          <CardContent>
            <Box display='flex' justifyContent='center' alignItems='center' minHeight={200}>
              <CircularProgress />
            </Box>
          </CardContent>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อแสดง</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>เบอร์โทร</TableCell>
                    <TableCell align='center'>คะแนน</TableCell>
                    <TableCell align='center'>ประเภท</TableCell>
                    <TableCell align='right'>วันที่สมัคร</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align='center' sx={{ py: 6 }}>
                        <Typography color='text.secondary'>ไม่พบผู้ใช้</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map(user => (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          <Typography variant='body2' fontWeight='medium'>
                            {user.displayName || '—'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' color='text.secondary'>
                            @{user.username}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{user.phone || '—'}</Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography variant='body2' fontWeight='bold'>
                            {user.trustScore}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Stack direction='row' spacing={0.5} justifyContent='center'>
                            {user.isAdmin && (
                              <Chip label='ผู้ดูแล' color='error' size='small' variant='tonal' />
                            )}
                            {user.isShop && (
                              <Chip label='ร้านค้า' color='primary' size='small' variant='tonal' />
                            )}
                            {!user.isAdmin && !user.isShop && (
                              <Chip label='ผู้ใช้' color='default' size='small' variant='tonal' />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant='body2' color='text.secondary'>
                            {new Date(user.createdAt).toLocaleDateString('th-TH')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component='div'
              count={users.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={e => {
                setRowsPerPage(parseInt(e.target.value, 10))
                setPage(0)
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelRowsPerPage='แถวต่อหน้า:'
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} จาก ${count}`}
            />
          </>
        )}
      </Card>
    </Box>
  )
}
