/**
 * 필터 옵션 훅 - 메모이제이션된 동적 옵션 관리
 */

import { useCallback, useEffect, useState } from 'react'

import {
  type AddressCityOption,
  type FilterOption,
  type FilterOptionsResponse,
  getFilterOptions,
} from '../api/models'

// 전역 캐시를 위한 변수
let globalOptionsCache: FilterOptionsResponse | null = null
let globalCacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5분

export interface UseFilterOptionsReturn {
  nationalities: FilterOption[]
  specialties: FilterOption[]
  languages: FilterOption[]
  koreanLevels: FilterOption[]
  visaTypes: FilterOption[]
  addressCities: AddressCityOption[]
  metadata?: FilterOptionsResponse['metadata']
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useFilterOptions(): UseFilterOptionsReturn {
  const [options, setOptions] = useState<FilterOptionsResponse>({
    nationalities: [],
    specialties: [],
    languages: [],
    korean_levels: [],
    visa_types: [],
    address_cities: [],
    metadata: {
      last_updated: '',
      version: '',
      total_counts: {
        nationalities: 0,
        specialties: 0,
        languages: 0,
        korean_levels: 0,
        visa_types: 0,
        address_cities: 0,
      },
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOptions = useCallback(async () => {
    const now = Date.now()

    // 캐시된 데이터가 있고 유효한 경우 사용
    if (globalOptionsCache && now - globalCacheTimestamp < CACHE_DURATION) {
      setOptions(globalOptionsCache)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await getFilterOptions()

      // 전역 캐시 업데이트
      globalOptionsCache = response
      globalCacheTimestamp = now

      setOptions(response)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '필터 옵션을 불러오는데 실패했습니다.'
      setError(errorMessage)
      console.error('필터 옵션 로드 실패:', err)

      // 에러 발생 시 기본값 사용 (하드코딩된 옵션으로 폴백)
      const fallbackOptions: FilterOptionsResponse = {
        nationalities: [
          { label: '대한민국', value: '대한민국' },
          { label: '미국', value: '미국' },
          { label: '일본', value: '일본' },
          { label: '중국', value: '중국' },
          { label: '베트남', value: '베트남' },
          { label: '태국', value: '태국' },
          { label: '필리핀', value: '필리핀' },
          { label: '러시아', value: '러시아' },
          { label: '우즈베키스탄', value: '우즈베키스탄' },
          { label: '카자흐스탄', value: '카자흐스탄' },
        ],
        specialties: [
          { label: '댄스', value: '댄스' },
          { label: '보컬', value: '보컬' },
          { label: '연기', value: '연기' },
          { label: '모델', value: '모델' },
          { label: 'MC', value: 'MC' },
          { label: 'BJ', value: 'BJ' },
          { label: '인플루언서', value: '인플루언서' },
          { label: '뮤지컬', value: '뮤지컬' },
          { label: '광고', value: '광고' },
          { label: 'CF', value: 'CF' },
        ],
        languages: [
          { label: '한국어', value: '한국어' },
          { label: '영어', value: '영어' },
          { label: '일본어', value: '일본어' },
          { label: '중국어', value: '중국어' },
          { label: '스페인어', value: '스페인어' },
          { label: '프랑스어', value: '프랑스어' },
          { label: '독일어', value: '독일어' },
          { label: '이탈리아어', value: '이탈리아어' },
          { label: '러시아어', value: '러시아어' },
          { label: '포르투갈어', value: '포르투갈어' },
        ],
        korean_levels: [
          { label: '초급', value: 'BAD' },
          { label: '중급', value: 'NOT_BAD' },
          { label: '고급', value: 'GOOD' },
          { label: '원어민 수준', value: 'VERY_GOOD' },
        ],
        visa_types: [
          { label: 'E-1', value: 'E-1', description: '대학에서 강의하는 교수' },
          { label: 'E-2', value: 'E-2', description: '외국어 회화지도' },
          { label: 'E-3', value: 'E-3', description: '자연과학 분야 연구' },
          { label: 'E-4', value: 'E-4', description: '특정 분야 기술지도' },
          { label: 'E-5', value: 'E-5', description: '법무, 의료, 회계 등 전문직' },
          { label: 'E-6', value: 'E-6', description: '예술, 연예, 스포츠 활동' },
          { label: 'E-7', value: 'E-7', description: '특정 분야 종사' },
          { label: 'E-8', value: 'E-8', description: '연수생 취업' },
          { label: 'E-9', value: 'E-9', description: '비전문취업' },
          { label: 'F-1', value: 'F-1', description: '방문동거' },
        ],
        address_cities: [
          {
            label: '서울특별시',
            value: '서울특별시',
            districts: [
              {
                label: '강남구',
                value: '강남구',
                dongs: ['역삼동', '개포동', '청담동', '삼성동', '대치동', '논현동'],
              },
              {
                label: '강동구',
                value: '강동구',
                dongs: ['명일동', '고덕동', '상일동', '길동', '둔촌동', '암사동'],
              },
            ],
          },
          {
            label: '부산광역시',
            value: '부산광역시',
            districts: [
              {
                label: '강서구',
                value: '강서구',
                dongs: ['대저동', '명지동', '천성동', '가락동', '녹산동', '지사동'],
              },
              {
                label: '금정구',
                value: '금정구',
                dongs: ['구서동', '금성동', '금사동', '남산동', '노포동', '부곡동'],
              },
            ],
          },
        ],
        metadata: {
          last_updated: new Date().toISOString(),
          version: '1.0.0',
          total_counts: {
            nationalities: 10,
            specialties: 10,
            languages: 10,
            korean_levels: 4,
            visa_types: 10,
            address_cities: 2,
          },
        },
      }
      setOptions(fallbackOptions)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    // 캐시 무효화
    globalOptionsCache = null
    globalCacheTimestamp = 0
    await fetchOptions()
  }, [fetchOptions])

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions])

  return {
    nationalities: options.nationalities,
    specialties: options.specialties,
    languages: options.languages,
    koreanLevels: options.korean_levels,
    visaTypes: options.visa_types,
    addressCities: options.address_cities,
    metadata: options.metadata,
    isLoading,
    error,
    refetch,
  }
}
