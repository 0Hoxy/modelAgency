import { format } from 'date-fns'
import { Calendar, Clock, Download, Filter, Plus, Search, Upload, Users } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover } from '../../components/molecules/Popover'
import { TextField } from '../../components/molecules/TextField'
import { SidebarLayout } from '../../components/templates/SidebarLayout'
import type { AttendanceRecord } from '../../types/hr'
import { mockAttendanceRecords, mockEmployees, paginate } from '../../utils/hr'

export default function HrAttendance() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<string>('')
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20)

  // Mock data
  const employees = useMemo(() => mockEmployees(50), [])
  const attendanceRecords = useMemo(() => mockAttendanceRecords(), [])

  // Filter data
  const filteredRecords = useMemo(() => {
    let filtered = attendanceRecords

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((record) => {
        const employee = employees.find((emp) => emp.id === record.employeeId)
        return (
          employee?.name.toLowerCase().includes(query) ||
          employee?.department.toLowerCase().includes(query)
        )
      })
    }

    if (selectedEmployee) {
      filtered = filtered.filter((record) => record.employeeId === selectedEmployee)
    }

    if (dateFrom) {
      filtered = filtered.filter((record) => record.date >= format(dateFrom, 'yyyy-MM-dd'))
    }

    if (dateTo) {
      filtered = filtered.filter((record) => record.date <= format(dateTo, 'yyyy-MM-dd'))
    }

    if (statusFilter) {
      filtered = filtered.filter((record) => {
        if (statusFilter === 'late') {
          return record.clockIn && record.clockIn > '09:10'
        }
        if (statusFilter === 'early') {
          return record.clockOut && record.clockOut < '18:00'
        }
        if (statusFilter === 'absent') {
          return !record.clockIn
        }
        if (statusFilter === 'overtime') {
          return record.workHours && record.workHours > 8
        }
        return true
      })
    }

    return filtered
  }, [attendanceRecords, employees, searchQuery, selectedEmployee, dateFrom, dateTo, statusFilter])

  const paginatedRecords = useMemo(
    () => paginate(filteredRecords, currentPage, pageSize),
    [filteredRecords, currentPage, pageSize],
  )

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayRecords = attendanceRecords.filter((record) => record.date === today)

    const present = todayRecords.filter((record) => record.clockIn).length
    const late = todayRecords.filter((record) => record.clockIn && record.clockIn > '09:10').length
    const absent = todayRecords.filter((record) => !record.clockIn).length
    const overtime = todayRecords.filter(
      (record) => record.workHours && record.workHours > 8,
    ).length

    return { present, late, absent, overtime, total: todayRecords.length }
  }, [attendanceRecords])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedEmployee('')
    setDateFrom(undefined)
    setDateTo(undefined)
    setStatusFilter('')
    setCurrentPage(1)
  }

  const getStatusBadge = (record: AttendanceRecord) => {
    if (!record.clockIn) {
      return <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 500 }}>결근</span>
    }
    if (record.clockIn > '09:10') {
      return <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 500 }}>지각</span>
    }
    if (record.clockOut && record.clockOut < '18:00') {
      return <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 500 }}>조기퇴근</span>
    }
    if (record.workHours && record.workHours > 8) {
      return <span style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: 500 }}>야근</span>
    }
    return <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 500 }}>정상</span>
  }

  return (
    <SidebarLayout>
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          height: 'calc(100vh - 200px)',
        }}
      >
        {/* Statistics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Users style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>출근</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {stats.present}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>총 {stats.total}명 중</div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Clock style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>지각</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>{stats.late}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              출근률{' '}
              {stats.total > 0 ? Math.round(((stats.present - stats.late) / stats.total) * 100) : 0}
              %
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Calendar style={{ color: '#ef4444', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>결근</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {stats.absent}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              결근률 {stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}%
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Clock style={{ color: '#8b5cf6', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>야근</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {stats.overtime}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              야근률 {stats.total > 0 ? Math.round((stats.overtime / stats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1, maxWidth: '400px' }}>
            <TextField
              placeholder="직원명, 부서로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leading={<Search style={{ width: '16px', height: '16px' }} />}
            />
          </div>

          <Popover
            trigger={
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                <Filter style={{ width: '16px', height: '16px' }} />
                필터
              </button>
            }
            onOpenChange={setShowFilters}
          >
            <div
              style={{
                padding: '16px',
                minWidth: '300px',
                maxHeight: '400px',
                overflow: 'visible',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  직원 선택
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  <option value="">전체 직원</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  기간
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input
                    type="date"
                    value={dateFrom ? format(dateFrom, 'yyyy-MM-dd') : ''}
                    onChange={(e) =>
                      setDateFrom(e.target.value ? new Date(e.target.value) : undefined)
                    }
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  <input
                    type="date"
                    value={dateTo ? format(dateTo, 'yyyy-MM-dd') : ''}
                    onChange={(e) =>
                      setDateTo(e.target.value ? new Date(e.target.value) : undefined)
                    }
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  상태
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  <option value="">전체</option>
                  <option value="late">지각</option>
                  <option value="early">조기퇴근</option>
                  <option value="absent">결근</option>
                  <option value="overtime">야근</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  초기화
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#3b82f6',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  적용
                </button>
              </div>
            </div>
          </Popover>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
                e.currentTarget.style.color = '#111827'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color = '#374151'
              }}
            >
              <Plus style={{ width: '14px', height: '14px' }} />
              근태 등록
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
                e.currentTarget.style.color = '#111827'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color = '#374151'
              }}
            >
              <Upload style={{ width: '14px', height: '14px' }} />
              일괄 업로드
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
                e.currentTarget.style.color = '#111827'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color = '#374151'
              }}
            >
              <Download style={{ width: '14px', height: '14px' }} />
              내보내기
            </button>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ overflow: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f8fafc', position: 'sticky', top: 0, zIndex: 1 }}>
                  <tr>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      직원명
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      부서
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      날짜
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      출근
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      퇴근
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      근무시간
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      상태
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.data.map((record) => {
                    const employee = employees.find((emp) => emp.id === record.employeeId)
                    return (
                      <tr key={record.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1e293b' }}>
                          {employee?.name || 'Unknown'}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '14px', color: '#64748b' }}>
                          {employee?.department || '-'}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: '14px',
                            color: '#64748b',
                            textAlign: 'center',
                          }}
                        >
                          {record.date}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: '14px',
                            color: '#1e293b',
                            textAlign: 'center',
                          }}
                        >
                          {record.clockIn || '-'}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: '14px',
                            color: '#1e293b',
                            textAlign: 'center',
                          }}
                        >
                          {record.clockOut || '-'}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: '14px',
                            color: '#1e293b',
                            textAlign: 'center',
                          }}
                        >
                          {record.workHours ? `${record.workHours}시간` : '-'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          {getStatusBadge(record)}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: '14px',
                            color: '#64748b',
                            textAlign: 'center',
                          }}
                        >
                          {record.note || '-'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                padding: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                총 {filteredRecords.length}건 중 {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, filteredRecords.length)}건 표시
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: currentPage === 1 ? '#f9fafb' : 'white',
                    color: currentPage === 1 ? '#9ca3af' : '#374151',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                  }}
                >
                  이전
                </button>
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  {currentPage} / {paginatedRecords.totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(paginatedRecords.totalPages, prev + 1))
                  }
                  disabled={currentPage === paginatedRecords.totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: currentPage === paginatedRecords.totalPages ? '#f9fafb' : 'white',
                    color: currentPage === paginatedRecords.totalPages ? '#9ca3af' : '#374151',
                    cursor: currentPage === paginatedRecords.totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                  }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
