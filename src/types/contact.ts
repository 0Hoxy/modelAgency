/**
 * Contact types
 */

export type ContactCategory =
  | 'general-inquiry'
  | 'partnership'
  | 'modeling-request'
  | 'complaint'
  | 'suggestion'
  | 'other'

export type ContactPriority = 'low' | 'medium' | 'high' | 'urgent'

export type ContactStatus = 'new' | 'in-progress' | 'resolved' | 'closed'

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  title: string
  message: string
  category: ContactCategory
  priority: ContactPriority
  status: ContactStatus
  assignedTo?: string
  createdAt: string
  updatedAt: string
  isRead: boolean
  tags?: string[]
}

export interface PagedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
