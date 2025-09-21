/**
 * Finance types
 */
export type ExpenseCategory =
  | 'office-supplies'
  | 'marketing'
  | 'travel'
  | 'utilities'
  | 'equipment'
  | 'software'
  | 'professional-services'
  | 'other'

export type IncomeCategory = 'modeling-fees' | 'commission' | 'licensing' | 'consulting' | 'other'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled'

export type PaymentMethod = 'credit-card' | 'bank-transfer' | 'cash'

export interface Expense {
  id: string
  date: string
  category: ExpenseCategory
  description: string
  vendor?: string
  amount: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  approvedBy?: string
  note?: string
}

export interface Income {
  id: string
  date: string
  category: IncomeCategory
  description: string
  client?: string
  amount: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  invoiceNumber?: string
  note?: string
}

export interface FinancialReport {
  id: string
  title: string
  period: string
  type: 'monthly' | 'quarterly' | 'yearly'
  status: 'draft' | 'finalized'
  createdAt: string
  income: number
  expenses: number
  netProfit: number
}

export interface PagedResponse<T> {
  data: T[]
  totalPages: number
  currentPage: number
  totalCount: number
}
