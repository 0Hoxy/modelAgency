/**
 * Finance - Reports (회계 리포트)
 */
import { Badge } from '@atoms/Badge'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Download, FileText } from 'lucide-react'
import { useMemo } from 'react'

import {
  calculateTotals,
  formatCurrency,
  formatDate,
  mockExpenses,
  mockIncome,
  generateFinancialReports,
} from '../../utils/finance'

const reportTypeLabels: Record<string, string> = {
  'monthly-summary': '월별 요약',
  'quarterly-report': '분기 리포트',
  'annual-report': '연간 리포트',
  'profit-loss': '손익계산서',
  'cash-flow': '현금흐름표',
  'balance-sheet': '대차대조표',
}

const reportStatusLabels: Record<string, string> = {
  generating: '생성중',
  completed: '완료',
  failed: '실패',
  expired: '만료',
}

const reportStatusColors: Record<string, string> = {
  generating: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800',
}

export default function FinanceReports() {
  // const [selectedPeriod, setSelectedPeriod] = useState('current-month')
  // const [selectedReportType, setSelectedReportType] = useState('')

  // Mock data
  const expenses = mockExpenses(50)
  const income = mockIncome(30)
  const reports = generateFinancialReports(10)

  // Calculate financial metrics
  const financialMetrics = useMemo(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Filter current month data
    const currentMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })

    const currentMonthIncome = income.filter((incomeItem) => {
      const incomeDate = new Date(incomeItem.date)
      return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear
    })

    const totalExpenses = calculateTotals(currentMonthExpenses).total
    const totalIncome = calculateTotals(currentMonthIncome).total
    const netProfit = totalIncome - totalExpenses

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      expenseCount: currentMonthExpenses.length,
      incomeCount: currentMonthIncome.length,
    }
  }, [expenses, income])

  const handleExport = () => {
    console.log('Exporting financial data...')
  }

  const handleGenerateReport = () => {
    console.log('Generating new report...')
  }

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                margin: 0,
                marginBottom: 4,
              }}
            >
              회계 리포트
            </h1>
            <p style={{ color: '#64748b', margin: 0 }}>재무 현황을 분석하고 리포트를 생성합니다</p>
          </div>
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
              onClick={handleGenerateReport}
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
              <FileText size={16} />
              리포트 생성
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
                  총 수익
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#16a34a',
                    margin: 0,
                  }}
                >
                  {formatCurrency(financialMetrics.totalIncome)}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  {financialMetrics.incomeCount}건의 수익
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#f0fdf4',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>📈</span>
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
                  {formatCurrency(financialMetrics.totalExpenses)}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  {financialMetrics.expenseCount}건의 지출
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
                <span style={{ fontSize: 20 }}>📉</span>
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
                  순이익
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: financialMetrics.netProfit >= 0 ? '#16a34a' : '#dc2626',
                    margin: 0,
                  }}
                >
                  {formatCurrency(financialMetrics.netProfit)}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: '#64748b',
                    margin: 0,
                    marginTop: 4,
                  }}
                >
                  수익 - 지출
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: financialMetrics.netProfit >= 0 ? '#f0fdf4' : '#fef2f2',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
            <h3
              style={{
                fontSize: 16,
                fontWeight: 'medium',
                margin: 0,
                marginBottom: 16,
              }}
            >
              월별 수익/지출 추이
            </h3>
            <div
              style={{
                height: 200,
                background: '#f8fafc',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
              }}
            >
              차트 영역
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
            <h3
              style={{
                fontSize: 16,
                fontWeight: 'medium',
                margin: 0,
                marginBottom: 16,
              }}
            >
              카테고리별 분석
            </h3>
            <div
              style={{
                height: 200,
                background: '#f8fafc',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
              }}
            >
              원형 차트 영역
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div
          style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: 16, borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 'medium', margin: 0 }}>생성된 리포트</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    리포트명
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    기간
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    타입
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    상태
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    생성일
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: 40,
                        textAlign: 'center',
                        color: '#64748b',
                      }}
                    >
                      생성된 리포트가 없습니다
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 12 }}>
                        <div>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 'medium',
                              margin: 0,
                              marginBottom: 4,
                            }}
                          >
                            {report.title}
                          </p>
                          <p
                            style={{
                              fontSize: 12,
                              color: '#64748b',
                              margin: 0,
                            }}
                          >
                            {report.period} - {report.type}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: 12 }}>
                        <p style={{ fontSize: 14, margin: 0 }}>{formatDate(report.createdAt)}</p>
                      </td>
                      <td style={{ padding: 12 }}>
                        <Badge color="primary">
                          {reportTypeLabels[report.type] || report.type}
                        </Badge>
                      </td>
                      <td style={{ padding: 12 }}>
                        <Badge className={reportStatusColors[report.status]}>
                          {reportStatusLabels[report.status] || report.status}
                        </Badge>
                      </td>
                      <td style={{ padding: 12 }}>
                        <p style={{ fontSize: 14, margin: 0 }}>{formatDate(report.createdAt)}</p>
                      </td>
                      <td style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              background: 'white',
                              color: '#374151',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                          >
                            보기
                          </button>
                          <button
                            style={{
                              padding: '4px 8px',
                              border: 'none',
                              borderRadius: '4px',
                              background: '#3b82f6',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                          >
                            다운로드
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
