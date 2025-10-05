/**
 * Finance - Expenses (지출 관리)
 */
import { Badge } from '@atoms/Badge'
import { Pagination } from '@molecules/Pagination'
import { Popover } from '@molecules/Popover'
import { TextField } from '@molecules/TextField'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Search as SearchIconUtil } from '@utils/icon'
import { Download, Filter, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { Expense } from '../../types/finance'
import {
  calculateTotals,
  filterByDateRange,
  formatCurrency,
  formatDate,
  mockExpenses,
  paginate,
} from '../../utils/finance'

const categoryLabels: Record<string, string> = {
  'office-supplies': '사무용품',
  marketing: '마케팅',
  travel: '출장비',
  utilities: '공과금',
  equipment: '장비',
  software: '소프트웨어',
  'professional-services': '전문서비스',
  other: '기타',
}

const statusLabels: Record<string, string> = {
  pending: '대기중',
  paid: '지급완료',
  failed: '실패',
  cancelled: '취소됨',
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
}

const paymentMethodLabels: Record<string, string> = {
  'credit-card': '신용카드',
  'bank-transfer': '계좌이체',
  cash: '현금',
}

export default function FinanceExpenses() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(15)

  // Mock data
  const expenses = useMemo(() => mockExpenses(), [])

  // Filter data
  const filteredExpenses = useMemo(() => {
    let filtered = expenses

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (expense: Expense) =>
          expense.description.toLowerCase().includes(query) ||
          expense.vendor?.toLowerCase().includes(query) ||
          expense.note?.toLowerCase().includes(query),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((expense: Expense) => expense.category === selectedCategory)
    }

    if (selectedStatus) {
      filtered = filtered.filter((expense: Expense) => expense.status === selectedStatus)
    }

    filtered = filterByDateRange(filtered, startDate, endDate)

    return filtered
  }, [expenses, searchQuery, selectedCategory, selectedStatus, startDate, endDate])

  // Pagination
  const paginatedData = useMemo(
    () => paginate(filteredExpenses, currentPage, pageSize),
    [filteredExpenses, currentPage, pageSize],
  )

  // Calculate totals
  const totals = useMemo(() => calculateTotals(filteredExpenses), [filteredExpenses])

  // Current month expenses
  const currentMonthExpenses = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    return expenses.filter((expense) => expense.date.startsWith(currentMonth))
  }, [expenses])

  // Pending expenses
  const pendingExpenses = useMemo(() => {
    return expenses.filter((expense) => expense.status === 'pending')
  }, [expenses])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleExport = () => {
    console.log('Exporting expenses...')
  }

  const activeFiltersCount = [selectedCategory, selectedStatus, startDate, endDate].filter(
    Boolean,
  ).length

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Download size={16} />
              내보내기
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Plus size={16} />
              지출 등록
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  총 지출
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#dc2626',
                    margin: 0,
                  }}
                >
                  {formatCurrency(totals.total)}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  {totals.count}건의 지출
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fef2f2',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>📊</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  이번 달 지출
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#ea580c',
                    margin: 0,
                  }}
                >
                  {formatCurrency(
                    currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0),
                  )}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  현재 월 기준
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fff7ed',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>📅</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  미결제
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#d97706',
                    margin: 0,
                  }}
                >
                  {formatCurrency(
                    pendingExpenses.reduce((sum, expense) => sum + expense.amount, 0),
                  )}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  결제 대기중
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fef3c7',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          style={{
            background: 'white',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <TextField
                placeholder="설명, 업체명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leading={<SearchIconUtil />}
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
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Filter size={16} />
                  필터
                  {activeFiltersCount > 0 && (
                    <span
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        fontSize: 12,
                        borderRadius: 10,
                        padding: '2px 6px',
                      }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              }
            >
              {({ close }) => (
                <div style={{ display: 'grid', gap: 16, minWidth: 300 }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 'medium',
                        marginBottom: 8,
                      }}
                    >
                      카테고리
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                      }}
                    >
                      <option value="">전체</option>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 'medium',
                        marginBottom: 8,
                      }}
                    >
                      상태
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                      }}
                    >
                      <option value="">전체</option>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 'medium',
                        marginBottom: 8,
                      }}
                    >
                      시작일
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 'medium',
                        marginBottom: 8,
                      }}
                    >
                      종료일
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory('')
                        setSelectedStatus('')
                        setStartDate('')
                        setEndDate('')
                        close()
                      }}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        background: 'white',
                        color: '#374151',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      초기화
                    </button>
                    <button
                      onClick={close}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#3b82f6',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      적용
                    </button>
                  </div>
                </div>
              )}
            </Popover>
          </div>
        </div>

        {/* Expenses Table */}
        <div
          style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    날짜
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    카테고리
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    설명
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    업체
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'right',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    금액
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    결제방법
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    상태
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    승인자
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.data.map((expense) => (
                  <tr key={expense.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {formatDate(expense.date)}
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {categoryLabels[expense.category]}
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      <div>
                        <div style={{ fontWeight: 'medium' }}>{expense.description}</div>
                        {expense.note && (
                          <div
                            style={{
                              fontSize: 12,
                              color: '#64748b',
                              marginTop: 2,
                            }}
                          >
                            {expense.note}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {expense.vendor || '-'}
                    </td>
                    <td
                      style={{
                        padding: '8px 10px',
                        fontSize: 13,
                        textAlign: 'right',
                        fontWeight: 'medium',
                        color: '#dc2626',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatCurrency(expense.amount)}
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {paymentMethodLabels[expense.paymentMethod]}
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      <Badge className={statusColors[expense.status]}>
                        {statusLabels[expense.status]}
                      </Badge>
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      {expense.approvedBy || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginatedData.totalPages > 1 && (
            <div
              style={{
                padding: 16,
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 14, color: '#64748b' }}>
                총 {paginatedData.totalCount}건 중 {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, paginatedData.totalCount)}건 표시
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={paginatedData.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}
