/**
 * 통합 검색 및 필터 타입 정의
 */

// 공통 필터 타입
export type CommonFilters = {
  query?: string // 통합 검색어
  name?: string // 이름
  gender?: 'all' | 'male' | 'female' // 성별
  nationality?: string // 국적 (쉼표로 구분된 다중 선택)
  specialty?: string // 특기 (쉼표로 구분된 다중 선택)
  languages?: string // 가능한 언어 (쉼표로 구분된 다중 선택)
}

// 국내모델 전용 필터
export type DomesticFilters = CommonFilters & {
  address?: string // 주소 (쉼표로 구분된 다중 선택)
  agency?: string // 소속사
  manager?: string // 담당자
}

// 해외모델 전용 필터
export type OverseasFilters = CommonFilters & {
  address?: string // 주소 (쉼표로 구분된 다중 선택)
}

// 통합 검색 파라미터
export type SearchParams = {
  page: number
  pageSize: number
  search?: string
  filters?: Record<string, string>
}

// 통합 검색 응답
export type SearchResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 필터 옵션 타입
export type FilterOption = {
  label: string
  value: string
}

// 주소 선택 옵션
export type AddressOption = {
  city: string
  districts: {
    name: string
    dong?: string[]
  }[]
}

// 필터 상태 타입
export type FilterState = {
  isDirty: boolean
  activeCount: number
  recentChange: boolean
}

// 검색 히스토리 타입
export type SearchHistory = {
  id: string
  query: string
  filters: Record<string, string>
  timestamp: number
  resultCount: number
}
