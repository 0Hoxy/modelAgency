/**
 * Dashboard API
 */
import { get } from '@utils/http'

// API 응답 타입 정의
export interface DailyRegistration {
  date: string
  count: number
}

export interface DashboardSummary {
  today_registrations: number
  today_incomplete_camera_tests: number
  incomplete_addresses: number
}

export interface DashboardWeeklyStats {
  daily_registrations: DailyRegistration[]
}

export interface DashboardMonthlyStats {
  daily_registrations: DailyRegistration[]
}

export interface DashboardResponse {
  summary: DashboardSummary
  weekly_stats: DashboardWeeklyStats
  monthly_stats: DashboardMonthlyStats
}

/**
 * 대시보드 정보 조회
 * GET /admins/dashboard
 */
export async function getDashboardData(): Promise<DashboardResponse> {
  return get<DashboardResponse>('/admins/dashboard')
}
