import type { DomesticModelRow, OverseasModelRow } from '../types/models'
import { del, post, put } from '../utils/http'
import { generateMockDomestic, generateMockOverseas } from '../utils/models'

export interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  filters?: Record<string, string>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Queries
export const getDomesticModels = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<DomesticModelRow>> => {
  // 일단 목 데이터만 사용 (API 서버 없음)
  console.log('국내모델 목 데이터 생성 중...')
  const mockData = await generateMockDomestic(params)
  console.log('목 데이터 생성 완료:', mockData)
  return mockData
}

export const getOverseasModels = async (
  params?: PaginationParams,
): Promise<PaginatedResponse<OverseasModelRow>> => {
  // 일단 목 데이터만 사용 (API 서버 없음)
  console.log('해외모델 목 데이터 생성 중...')
  const mockData = await generateMockOverseas(params)
  console.log('목 데이터 생성 완료:', mockData)
  return mockData
}

// Mutations (examples)
export const createDomesticModel = async (payload: Partial<DomesticModelRow>) => {
  return post<DomesticModelRow>('/models/domestic', payload)
}

export const updateDomesticModel = async (
  id: string | number,
  payload: Partial<DomesticModelRow>,
) => {
  return put<DomesticModelRow>(`/models/domestic/${id}`, payload)
}

export const deleteDomesticModel = async (id: string | number) => {
  return del<{ success: boolean }>(`/models/domestic/${id}`)
}
