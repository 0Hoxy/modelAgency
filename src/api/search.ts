/**
 * 통합 검색 및 필터 API 함수
 */

import type { DomesticModelRow, OverseasModelRow } from '../types/models'
import type { SearchParams, SearchResponse } from '../types/search'
import type { DomesticFilters, OverseasFilters } from '../types/search'
import { get, post } from '../utils/http'
import { generateMockDomestic, generateMockOverseas } from '../utils/models'

// API 응답 타입 정의
interface ApiResponse<T> {
  data?: T
  total?: number
  page?: number
  pageSize?: number
  totalPages?: number
}

interface AllModelsApiResponse {
  data?: {
    domestic?: DomesticModelRow[]
    overseas?: OverseasModelRow[]
  }
  total?: {
    domestic?: number
    overseas?: number
  }
  page?: number
  pageSize?: number
  totalPages?: {
    domestic?: number
    overseas?: number
  }
}
import { getDomesticActiveFilterCount, getOverseasActiveFilterCount } from '../utils/search'

// ==================== 통합 검색 API ====================

/**
 * 국내모델 통합 검색
 */
export const searchDomesticModels = async (
  params: SearchParams,
  filters: DomesticFilters,
): Promise<SearchResponse<DomesticModelRow>> => {
  try {
    // 실제 API 호출 시도
    const response = await post('/api/models/domestic/search', {
      ...params,
      filters: {
        ...filters,
        // 필터 개수 정보 추가
        activeCount: getDomesticActiveFilterCount(filters),
      },
    })

    const res = response as ApiResponse<DomesticModelRow[]>
    return {
      data: res.data || [],
      total: res.total || 0,
      page: res.page || params.page,
      pageSize: res.pageSize || params.pageSize,
      totalPages: res.totalPages || 0,
    }
  } catch (error) {
    console.warn('국내모델 검색 API 실패, 모의 데이터 사용:', error)

    // API 실패 시 모의 데이터 생성 및 필터링
    return await generateMockDomesticSearch(params, filters)
  }
}

/**
 * 해외모델 통합 검색
 */
export const searchOverseasModels = async (
  params: SearchParams,
  filters: OverseasFilters,
): Promise<SearchResponse<OverseasModelRow>> => {
  try {
    // 실제 API 호출 시도
    const response = await post('/api/models/overseas/search', {
      ...params,
      filters: {
        ...filters,
        // 필터 개수 정보 추가
        activeCount: getOverseasActiveFilterCount(filters),
      },
    })

    const res = response as ApiResponse<OverseasModelRow[]>
    return {
      data: res.data || [],
      total: res.total || 0,
      page: res.page || params.page,
      pageSize: res.pageSize || params.pageSize,
      totalPages: res.totalPages || 0,
    }
  } catch (error) {
    console.warn('해외모델 검색 API 실패, 모의 데이터 사용:', error)

    // API 실패 시 모의 데이터 생성 및 필터링
    return await generateMockOverseasSearch(params, filters)
  }
}

/**
 * 통합 검색 (국내 + 해외)
 */
export const searchAllModels = async (
  params: SearchParams,
  domesticFilters: DomesticFilters,
  overseasFilters: OverseasFilters,
): Promise<{
  domestic: SearchResponse<DomesticModelRow>
  overseas: SearchResponse<OverseasModelRow>
}> => {
  try {
    // 실제 API 호출 시도
    const response = await post('/api/models/search/all', {
      ...params,
      filters: {
        domestic: domesticFilters,
        overseas: overseasFilters,
      },
    })

    return {
      domestic: {
        data: (response as AllModelsApiResponse).data?.domestic || [],
        total: (response as AllModelsApiResponse).total?.domestic || 0,
        page: (response as AllModelsApiResponse).page || params.page,
        pageSize: (response as AllModelsApiResponse).pageSize || params.pageSize,
        totalPages: (response as AllModelsApiResponse).totalPages?.domestic || 0,
      },
      overseas: {
        data: (response as AllModelsApiResponse).data?.overseas || [],
        total: (response as AllModelsApiResponse).total?.overseas || 0,
        page: (response as AllModelsApiResponse).page || params.page,
        pageSize: (response as AllModelsApiResponse).pageSize || params.pageSize,
        totalPages: (response as AllModelsApiResponse).totalPages?.overseas || 0,
      },
    }
  } catch (error) {
    console.warn('통합 검색 API 실패, 모의 데이터 사용:', error)

    // API 실패 시 모의 데이터 생성
    const [domestic, overseas] = await Promise.all([
      await generateMockDomesticSearch(params, domesticFilters),
      await generateMockOverseasSearch(params, overseasFilters),
    ])

    return { domestic, overseas }
  }
}

// ==================== 필터 옵션 API ====================

/**
 * 국적 옵션 조회
 */
export const getNationalityOptions = async (): Promise<Array<{ label: string; value: string }>> => {
  try {
    const response = await get('/api/options/nationalities')
    return (response as ApiResponse<Array<{ label: string; value: string }>>).data || []
  } catch (error) {
    console.warn('국적 옵션 API 실패, 기본값 사용:', error)
    return [
      { label: '한국', value: '한국' },
      { label: '일본', value: '일본' },
      { label: '중국', value: '중국' },
      { label: '미국', value: '미국' },
      { label: '영국', value: '영국' },
      { label: '독일', value: '독일' },
      { label: '프랑스', value: '프랑스' },
      { label: '기타', value: '기타' },
    ]
  }
}

/**
 * 특기 옵션 조회
 */
export const getSpecialtyOptions = async (): Promise<Array<{ label: string; value: string }>> => {
  try {
    const response = await get('/api/options/specialties')
    return (response as ApiResponse<Array<{ label: string; value: string }>>).data || []
  } catch (error) {
    console.warn('특기 옵션 API 실패, 기본값 사용:', error)
    return [
      { label: '패션', value: '패션' },
      { label: '뷰티', value: '뷰티' },
      { label: '커머셜', value: '커머셜' },
      { label: '에디토리얼', value: '에디토리얼' },
      { label: '런웨이', value: '런웨이' },
      { label: '기타', value: '기타' },
    ]
  }
}

/**
 * 언어 옵션 조회
 */
export const getLanguageOptions = async (): Promise<Array<{ label: string; value: string }>> => {
  try {
    const response = await get('/api/options/languages')
    return (response as ApiResponse<Array<{ label: string; value: string }>>).data || []
  } catch (error) {
    console.warn('언어 옵션 API 실패, 기본값 사용:', error)
    return [
      { label: '한국어', value: '한국어' },
      { label: '영어', value: '영어' },
      { label: '일본어', value: '일본어' },
      { label: '중국어', value: '중국어' },
      { label: '스페인어', value: '스페인어' },
      { label: '프랑스어', value: '프랑스어' },
      { label: '기타', value: '기타' },
    ]
  }
}

/**
 * 주소 옵션 조회
 */
export const getAddressOptions = async (): Promise<
  Array<{ city: string; districts: string[] }>
> => {
  try {
    const response = await get('/api/options/addresses')
    return (response as ApiResponse<Array<{ city: string; districts: string[] }>>).data || []
  } catch (error) {
    console.warn('주소 옵션 API 실패, 기본값 사용:', error)
    return [
      {
        city: '서울특별시',
        districts: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구'],
      },
      {
        city: '부산광역시',
        districts: ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구'],
      },
    ]
  }
}

/**
 * 비자 타입 옵션 조회
 */
export const getVisaOptions = async (): Promise<Array<{ label: string; value: string }>> => {
  try {
    const response = await get('/api/options/visas')
    return (response as ApiResponse<Array<{ label: string; value: string }>>).data || []
  } catch (error) {
    console.warn('비자 타입 옵션 API 실패, 기본값 사용:', error)
    return [
      { label: 'E-1', value: 'E-1' },
      { label: 'E-2', value: 'E-2' },
      { label: 'E-3', value: 'E-3' },
      { label: 'E-4', value: 'E-4' },
      { label: 'E-5', value: 'E-5' },
      { label: 'F-1', value: 'F-1' },
      { label: 'F-2', value: 'F-2' },
      { label: 'F-3', value: 'F-3' },
      { label: 'F-4', value: 'F-4' },
      { label: 'F-5', value: 'F-5' },
      { label: '관광', value: '관광' },
      { label: '단기방문', value: '단기방문' },
      { label: '무비자', value: '무비자' },
      { label: '기타', value: '기타' },
    ]
  }
}

// ==================== 검색 히스토리 API ====================

/**
 * 검색 히스토리 저장
 */
export const saveSearchHistory = async (
  query: string,
  filters: DomesticFilters | OverseasFilters,
  resultCount: number,
): Promise<void> => {
  try {
    await post('/api/search/history', {
      query,
      filters,
      resultCount,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.warn('검색 히스토리 저장 실패:', error)
  }
}

/**
 * 검색 히스토리 조회
 */
export const getSearchHistory = async (
  limit: number = 10,
): Promise<
  Array<{
    id: string
    query: string
    filters: Record<string, string>
    timestamp: number
    resultCount: number
  }>
> => {
  try {
    const response = await get(`/api/search/history?limit=${limit}`)
    return (
      (
        response as ApiResponse<
          Array<{
            id: string
            query: string
            filters: Record<string, string>
            timestamp: number
            resultCount: number
          }>
        >
      ).data || []
    )
  } catch (error) {
    console.warn('검색 히스토리 조회 실패:', error)
    return []
  }
}

// ==================== 모의 데이터 생성 함수 ====================

/**
 * 국내모델 모의 검색 데이터 생성
 */
const generateMockDomesticSearch = async (
  params: SearchParams,
  filters: DomesticFilters,
): Promise<SearchResponse<DomesticModelRow>> => {
  // 기존 모의 데이터 생성 로직 사용
  const result = await generateMockDomestic({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    filters,
  })

  return result
}

/**
 * 해외모델 모의 검색 데이터 생성
 */
const generateMockOverseasSearch = async (
  params: SearchParams,
  filters: OverseasFilters,
): Promise<SearchResponse<OverseasModelRow>> => {
  // 기존 모의 데이터 생성 로직 사용
  const result = await generateMockOverseas({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    filters,
  })

  return result
}
