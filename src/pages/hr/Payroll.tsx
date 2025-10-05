import {
  AlertCircle,
  DollarSign,
  Download,
  Filter,
  Plus,
  Search,
  TrendingUp,
  Upload,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover } from '../../components/molecules/Popover'
import { TextField } from '../../components/molecules/TextField'
import { SidebarLayout } from '../../components/templates/SidebarLayout'
import type { PayrollItem } from '../../types/hr'
import { mockEmployees, mockPayrollItems, paginate } from '../../utils/hr'

export default function HrPayroll() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20)

  // Mock data
  const employees = useMemo(() => mockEmployees(50), [])
  const payrollItems = useMemo(() => mockPayrollItems(), [])

  // Filter data
  const filteredItems = useMemo(() => {
    let filtered = payrollItems

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => {
        const employee = employees.find((emp) => emp.id === item.employeeId)
        return (
          employee?.name.toLowerCase().includes(query) ||
          employee?.department.toLowerCase().includes(query) ||
          item.department.toLowerCase().includes(query)
        )
      })
    }

    if (selectedEmployee) {
      filtered = filtered.filter((item) => item.employeeId === selectedEmployee)
    }

    if (selectedMonth) {
      filtered = filtered.filter((item) => item.month === selectedMonth)
    }

    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter)
    }

    return filtered
  }, [payrollItems, employees, searchQuery, selectedEmployee, selectedMonth, statusFilter])

  const paginatedItems = useMemo(
    () => paginate(filteredItems, currentPage, pageSize),
    [filteredItems, currentPage, pageSize],
  )

  // Calculate statistics
  const stats = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    const currentMonthItems = payrollItems.filter((item) => item.month === currentMonth)

    const totalAmount = currentMonthItems.reduce((sum, item) => sum + item.amount, 0)
    const totalDeduction = currentMonthItems.reduce((sum, item) => sum + item.deduction, 0)
    const paidItems = currentMonthItems.filter((item) => item.status === 'paid').length
    const pendingItems = currentMonthItems.filter((item) => item.status === 'pending').length
    const failedItems = currentMonthItems.filter((item) => item.status === 'failed').length

    return {
      totalAmount,
      totalDeduction,
      paidItems,
      pendingItems,
      failedItems,
      totalItems: currentMonthItems.length,
    }
  }, [payrollItems])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedEmployee('')
    setSelectedMonth('')
    setStatusFilter('')
    setCurrentPage(1)
  }

  const getStatusBadge = (status: PayrollItem['status']) => {
    switch (status) {
      case 'paid':
        return <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 500 }}>지급완료</span>
      case 'pending':
        return <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 500 }}>대기중</span>
      case 'failed':
        return <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 500 }}>실패</span>
      default:
        return <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 500 }}>-</span>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(amount)
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
              <DollarSign style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>총 지급액</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {formatCurrency(stats.totalAmount)}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              이번 달 총 {stats.totalItems}명
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
              <TrendingUp style={{ color: '#3b82f6', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>공제액</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {formatCurrency(stats.totalDeduction)}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>세금 및 각종 공제</div>
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
              <Users style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>지급완료</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {stats.paidItems}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              지급률{' '}
              {stats.totalItems > 0 ? Math.round((stats.paidItems / stats.totalItems) * 100) : 0}%
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
              <AlertCircle style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
              <span style={{ fontSize: '14px', color: '#64748b' }}>대기중</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1e293b' }}>
              {stats.pendingItems}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              지급 실패 {stats.failedItems}건
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
                  지급월
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  <option value="">전체 기간</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const date = new Date()
                    date.setMonth(date.getMonth() - i)
                    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
                    return (
                      <option key={monthStr} value={monthStr}>
                        {monthStr}
                      </option>
                    )
                  })}
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
                  <option value="paid">지급완료</option>
                  <option value="pending">대기중</option>
                  <option value="failed">실패</option>
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
              급여 등록
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

        {/* Payroll Records Table */}
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
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      직원명
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      부서
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      지급월
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      지급액
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      공제액
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.data.map((item) => {
                    const employee = employees.find((emp) => emp.id === item.employeeId)
                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 13,
                            color: '#1e293b',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {employee?.name || 'Unknown'}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 13,
                            color: '#64748b',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.department}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 13,
                            color: '#64748b',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.month}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 13,
                            color: '#1e293b',
                            textAlign: 'right',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatCurrency(item.amount)}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 13,
                            color: '#64748b',
                            textAlign: 'right',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatCurrency(item.deduction)}
                        </td>
                        <td
                          style={{
                            padding: '12px 16px',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {getStatusBadge(item.status)}
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
                총 {filteredItems.length}건 중 {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, filteredItems.length)}건 표시
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
                  {currentPage} / {paginatedItems.totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(paginatedItems.totalPages, prev + 1))
                  }
                  disabled={currentPage === paginatedItems.totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: currentPage === paginatedItems.totalPages ? '#f9fafb' : 'white',
                    color: currentPage === paginatedItems.totalPages ? '#9ca3af' : '#374151',
                    cursor: currentPage === paginatedItems.totalPages ? 'not-allowed' : 'pointer',
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
