export type EmployeeStatus = 'active' | 'leave' | 'terminated'

export interface Employee {
  id: string
  name: string
  department: string
  title: string
  joinedAt: string // YYYY-MM-DD
  phone: string
  email: string
  status: EmployeeStatus
}

export interface Candidate {
  id: string
  name: string
  position: string
  department: string
  experienceYears: number
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'
  source: string
  owner?: string
  appliedAt: string // YYYY-MM-DD
  phone?: string
  email?: string
  resumeUrl?: string
  expectedSalary?: number
  note?: string
  jobPostingId?: string // 연결된 채용공고 ID
}

export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: ('full-time' | 'part-time' | 'contract' | 'intern')[]
  level: ('junior' | 'mid' | 'senior' | 'lead')[]
  status: 'draft' | 'active' | 'paused' | 'closed'
  description: string
  requirements: string[]
  benefits: string[]
  salaryMin?: number
  salaryMax?: number
  postedAt?: string
  closedAt?: string
  hiringManager?: string
}

export interface AttendanceRecord {
  id: string
  date: string // YYYY-MM-DD
  employeeId: string
  clockIn?: string // HH:mm
  clockOut?: string // HH:mm
  workHours?: number
  breakMinutes?: number
  note?: string
}

export interface PayrollItem {
  id: string
  month: string // YYYY-MM
  employeeId: string
  department: string
  amount: number
  deduction: number
  status: 'pending' | 'paid' | 'failed'
}

// 교육 관리 관련 타입 확장
export interface TrainingCourse {
  id: string
  title: string
  description: string
  category: 'technical' | 'soft-skills' | 'compliance' | 'leadership'
  duration: number // 시간
  maxParticipants?: number
  instructor: string
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  location: string
  cost?: number
  prerequisites?: string[]
  objectives: string[]
}

export interface TrainingEnrollment {
  id: string
  courseId: string
  employeeId: string
  employeeName: string
  department: string
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped'
  enrolledAt: string
  completedAt?: string
  score?: number
  feedback?: string
  certificateUrl?: string
}

// 복리후생 관련 타입 확장
export interface BenefitCategory {
  id: string
  name: string
  description: string
  budget: number
  usedAmount: number
  status: 'active' | 'inactive'
}

export interface BenefitRequest {
  id: string
  employeeId: string
  employeeName: string
  department: string
  categoryId: string
  categoryName: string
  amount: number
  description: string
  status: 'requested' | 'approved' | 'rejected' | 'processed'
  requestedAt: string
  processedAt?: string
  approvedBy?: string
  note?: string
  attachments?: string[]
}

// 성과평가 관련 타입
export interface PerformanceGoal {
  id: string
  employeeId: string
  title: string
  description: string
  category: 'work' | 'development' | 'behavior'
  targetValue?: string
  actualValue?: string
  weight: number // 가중치 (1-100)
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  progress: number // 진행률 (0-100)
}

export interface PerformanceReview {
  id: string
  employeeId: string
  employeeName: string
  department: string
  reviewerId: string
  reviewerName: string
  period: string // YYYY-Q1, YYYY-Q2, etc.
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled'
  overallRating: number // 1-5
  goals: PerformanceGoal[]
  strengths: string[]
  improvements: string[]
  feedback: string
  nextGoals: string[]
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface PerformanceFeedback {
  id: string
  reviewId: string
  fromEmployeeId: string
  fromEmployeeName: string
  toEmployeeId: string
  toEmployeeName: string
  category: 'peer' | 'subordinate' | 'self'
  rating: number // 1-5
  feedback: string
  submittedAt: string
}

export interface PagedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
