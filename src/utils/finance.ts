/**
 * Finance utilities
 */
import type { Expense, FinancialReport, Income, PagedResponse } from '../types/finance'

// Mock data generators
export function mockExpenses(count: number = 50): Expense[] {
  const categories: Expense['category'][] = [
    'office-supplies',
    'marketing',
    'travel',
    'utilities',
    'equipment',
    'software',
    'professional-services',
    'other',
  ]
  const statuses: Expense['status'][] = ['pending', 'paid', 'failed', 'cancelled']
  const methods: Expense['paymentMethod'][] = ['credit-card', 'bank-transfer', 'cash']

  const vendors = [
    '스타오피스',
    '마케팅플러스',
    '출장센터',
    '전기공사',
    '컴퓨터월드',
    '소프트웨어센터',
  ]
  const descriptions = [
    '사무용품 구매',
    '온라인 광고비',
    '출장 교통비',
    '전기요금',
    '컴퓨터 장비',
    '소프트웨어 라이센스',
    '법무 서비스',
    '기타 비용',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `expense-${i + 1}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    category: categories[Math.floor(Math.random() * categories.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    vendor: Math.random() > 0.3 ? vendors[Math.floor(Math.random() * vendors.length)] : undefined,
    amount: Math.floor(Math.random() * 1000000) + 10000,
    paymentMethod: methods[Math.floor(Math.random() * methods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    approvedBy: Math.random() > 0.5 ? `승인자${Math.floor(Math.random() * 3) + 1}` : undefined,
    note: Math.random() > 0.7 ? '추가 설명이 필요한 항목입니다.' : undefined,
  }))
}

export function mockIncome(count: number = 30): Income[] {
  const categories: Income['category'][] = [
    'modeling-fees',
    'commission',
    'licensing',
    'consulting',
    'other',
  ]
  const statuses: Income['status'][] = ['pending', 'paid', 'failed', 'cancelled']
  const methods: Income['paymentMethod'][] = ['credit-card', 'bank-transfer', 'cash']

  const clients = ['브랜드A', '광고회사B', '패션잡지C', '화장품D', '의류E']
  const descriptions = [
    '모델링 수수료',
    '에이전시 수수료',
    '라이센스 수익',
    '컨설팅 비용',
    '기타 수익',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `income-${i + 1}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    category: categories[Math.floor(Math.random() * categories.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    client: Math.random() > 0.2 ? clients[Math.floor(Math.random() * clients.length)] : undefined,
    amount: Math.floor(Math.random() * 5000000) + 50000,
    paymentMethod: methods[Math.floor(Math.random() * methods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    invoiceNumber: Math.random() > 0.3 ? `INV-${String(i + 1).padStart(4, '0')}` : undefined,
    note: Math.random() > 0.8 ? '특별 계약 조건이 있는 항목입니다.' : undefined,
  }))
}

export function generateFinancialReports(count: number = 10): FinancialReport[] {
  const reportTypes: FinancialReport['type'][] = ['monthly', 'quarterly', 'yearly']

  const reportStatuses: FinancialReport['status'][] = ['draft', 'finalized']

  const reportNames = [
    '월별 재무 요약',
    '분기별 성과 리포트',
    '연간 종합 리포트',
    '손익계산서',
    '현금흐름 분석',
    '대차대조표',
  ]

  return Array.from({ length: count }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const incomeAmount = Math.floor(Math.random() * 10000000) + 1000000
    const expensesAmount = Math.floor(Math.random() * 5000000) + 500000

    const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)]
    const reportStatus = reportStatuses[Math.floor(Math.random() * reportStatuses.length)]
    const reportName = reportNames[Math.floor(Math.random() * reportNames.length)]

    return {
      id: `report-${i + 1}`,
      title: reportName,
      period: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      type: reportType,
      status: reportStatus,
      createdAt: date.toISOString(),
      income: incomeAmount,
      expenses: expensesAmount,
      netProfit: incomeAmount - expensesAmount,
    }
  })
}

// Utility functions
export function paginate<T>(data: T[], page: number, pageSize: number): PagedResponse<T> {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const totalPages = Math.ceil(data.length / pageSize)

  return {
    data: data.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    totalCount: data.length,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

export function calculateTotals<T extends { amount: number }>(items: T[]) {
  return {
    total: items.reduce((sum, item) => sum + item.amount, 0),
    count: items.length,
  }
}

export function filterByDateRange<T extends { date: string }>(
  items: T[],
  startDate: string,
  endDate: string,
): T[] {
  if (!startDate && !endDate) return items

  return items.filter((item) => {
    const itemDate = new Date(item.date)
    const start = startDate ? new Date(startDate) : new Date('1900-01-01')
    const end = endDate ? new Date(endDate) : new Date('2100-12-31')

    return itemDate >= start && itemDate <= end
  })
}

export function getCategoryTotals<T extends { category: string; amount: number }>(
  items: T[],
): Record<string, number> {
  return items.reduce(
    (totals, item) => {
      totals[item.category] = (totals[item.category] || 0) + item.amount
      return totals
    },
    {} as Record<string, number>,
  )
}
