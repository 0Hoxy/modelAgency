/**
 * 통합 검색 및 필터 유틸리티 함수
 */

import type { DomesticModelRow, OverseasModelRow } from '../types/models'
import type { DomesticFilters, OverseasFilters } from '../types/search'

// ==================== 유틸리티 함수 ====================

/**
 * 필터 리스트 정규화
 */
export const normalizeList = (list: string): string[] => {
  if (!list) return []
  return list
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

/**
 * 선택 상태 확인
 */
export const isSelected = (current: string, token: string): boolean => {
  const list = normalizeList(current)
  return list.includes(token)
}

/**
 * 토큰 토글
 */
export const toggleToken = (current: string, token: string): string => {
  const list = normalizeList(current)
  const index = list.indexOf(token)
  if (index >= 0) {
    list.splice(index, 1)
  } else {
    list.push(token)
  }
  return list.join(', ')
}

// ==================== 필터 옵션 ====================

// 국적 옵션
export const NATIONALITY_OPTIONS = [
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
  { label: '기타', value: '기타' },
]

// 특기 옵션
export const SPECIALTY_OPTIONS = [
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
  { label: '드라마', value: '드라마' },
  { label: '영화', value: '영화' },
  { label: '음악비디오', value: '음악비디오' },
  { label: '웹드라마', value: '웹드라마' },
  { label: '예능', value: '예능' },
  { label: '뉴스', value: '뉴스' },
  { label: '다큐멘터리', value: '다큐멘터리' },
  { label: '기타', value: '기타' },
]

// 언어 옵션
export const LANGUAGE_OPTIONS = [
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
  { label: '아랍어', value: '아랍어' },
  { label: '힌디어', value: '힌디어' },
  { label: '태국어', value: '태국어' },
  { label: '베트남어', value: '베트남어' },
  { label: '기타', value: '기타' },
]

// 주소 옵션 (시/구/동)
export const ADDRESS_OPTIONS = [
  {
    city: '서울특별시',
    districts: [
      {
        name: '강남구',
        dong: [
          '역삼동',
          '개포동',
          '청담동',
          '삼성동',
          '대치동',
          '신사동',
          '논현동',
          '압구정동',
          '세곡동',
          '자곡동',
          '율현동',
          '도곡동',
          '수서동',
        ],
      },
      {
        name: '강동구',
        dong: [
          '명일동',
          '고덕동',
          '상일동',
          '길동',
          '둔촌동',
          '암사동',
          '성내동',
          '천호동',
          '성내동',
          '신명동',
          '암사동',
          '명일동',
          '고덕동',
        ],
      },
      {
        name: '강북구',
        dong: [
          '미아동',
          '번동',
          '수유동',
          '우이동',
          '삼양동',
          '송중동',
          '송천동',
          '삼각산동',
          '인수동',
          '번동',
          '미아동',
          '수유동',
          '우이동',
        ],
      },
      {
        name: '강서구',
        dong: [
          '등촌동',
          '화곡동',
          '가양동',
          '마곡동',
          '내발산동',
          '외발산동',
          '공항동',
          '방화동',
          '과해동',
          '오곡동',
          '오촌동',
          '신정동',
          '염창동',
        ],
      },
      {
        name: '관악구',
        dong: [
          '신림동',
          '서원동',
          '신사동',
          '삼성동',
          '미성동',
          '난곡동',
          '조원동',
          '대학동',
          '중앙동',
          '청룡동',
          '봉천동',
          '신림동',
          '서원동',
        ],
      },
      {
        name: '광진구',
        dong: [
          '구의동',
          '광장동',
          '자양동',
          '화양동',
          '군자동',
          '중곡동',
          '능동',
          '구의동',
          '광장동',
          '자양동',
          '화양동',
          '군자동',
          '중곡동',
        ],
      },
      {
        name: '구로구',
        dong: [
          '구로동',
          '가리봉동',
          '신도림동',
          '고척동',
          '개봉동',
          '오류동',
          '항동',
          '온수동',
          '천왕동',
          '궁동',
          '구로동',
          '가리봉동',
          '신도림동',
        ],
      },
      {
        name: '금천구',
        dong: [
          '가산동',
          '독산동',
          '시흥동',
          '금천동',
          '범일동',
          '가산동',
          '독산동',
          '시흥동',
          '금천동',
          '범일동',
          '가산동',
          '독산동',
          '시흥동',
        ],
      },
      {
        name: '노원구',
        dong: [
          '하계동',
          '중계동',
          '상계동',
          '월계동',
          '공릉동',
          '상계동',
          '중계동',
          '하계동',
          '월계동',
          '공릉동',
          '상계동',
          '중계동',
          '하계동',
        ],
      },
      {
        name: '도봉구',
        dong: [
          '쌍문동',
          '방학동',
          '창동',
          '도봉동',
          '쌍문동',
          '방학동',
          '창동',
          '도봉동',
          '쌍문동',
          '방학동',
          '창동',
          '도봉동',
          '쌍문동',
        ],
      },
      {
        name: '동대문구',
        dong: [
          '용신동',
          '제기동',
          '전농동',
          '답십리동',
          '장안동',
          '청량리동',
          '회기동',
          '휘경동',
          '이문동',
          '용신동',
          '제기동',
          '전농동',
          '답십리동',
        ],
      },
      {
        name: '동작구',
        dong: [
          '노량진동',
          '상도동',
          '상도1동',
          '본동',
          '흑석동',
          '사당동',
          '대방동',
          '신대방동',
          '노량진동',
          '상도동',
          '상도1동',
          '본동',
          '흑석동',
        ],
      },
      {
        name: '마포구',
        dong: [
          '공덕동',
          '아현동',
          '도화동',
          '용강동',
          '대흥동',
          '염리동',
          '신수동',
          '서강동',
          '서교동',
          '합정동',
          '망원동',
          '연남동',
          '성산동',
        ],
      },
      {
        name: '서대문구',
        dong: [
          '충현동',
          '천연동',
          '신촌동',
          '연희동',
          '홍제동',
          '홍은동',
          '북가좌동',
          '남가좌동',
          '충현동',
          '천연동',
          '신촌동',
          '연희동',
          '홍제동',
        ],
      },
      {
        name: '서초구',
        dong: [
          '방배동',
          '양재동',
          '내곡동',
          '신원동',
          '서초동',
          '잠원동',
          '반포동',
          '방배동',
          '양재동',
          '내곡동',
          '신원동',
          '서초동',
          '잠원동',
        ],
      },
      {
        name: '성동구',
        dong: [
          '왕십리동',
          '마장동',
          '사근동',
          '하왕십리동',
          '상왕십리동',
          '홍익동',
          '도선동',
          '금호동',
          '옥수동',
          '성수동',
          '송정동',
          '용답동',
          '왕십리동',
        ],
      },
      {
        name: '성북구',
        dong: [
          '성북동',
          '삼선동',
          '동선동',
          '돈암동',
          '안암동',
          '보문동',
          '정릉동',
          '길음동',
          '종암동',
          '석관동',
          '장위동',
          '석계동',
          '성북동',
        ],
      },
      {
        name: '송파구',
        dong: [
          '잠실동',
          '신천동',
          '마천동',
          '거여동',
          '문정동',
          '장지동',
          '방이동',
          '오금동',
          '석촌동',
          '삼전동',
          '가락동',
          '문정동',
          '장지동',
        ],
      },
      {
        name: '양천구',
        dong: [
          '목동',
          '신월동',
          '신정동',
          '염창동',
          '가양동',
          '등촌동',
          '화곡동',
          '방화동',
          '공항동',
          '과해동',
          '오곡동',
          '오촌동',
          '신정동',
        ],
      },
      {
        name: '영등포구',
        dong: [
          '여의도동',
          '당산동',
          '도림동',
          '문래동',
          '양평동',
          '신길동',
          '대림동',
          '신풍동',
          '여의도동',
          '당산동',
          '도림동',
          '문래동',
          '양평동',
        ],
      },
      {
        name: '용산구',
        dong: [
          '후암동',
          '용산동',
          '남영동',
          '동빙고동',
          '서빙고동',
          '한강로동',
          '이촌동',
          '이태원동',
          '한남동',
          '서계동',
          '청파동',
          '원효로동',
          '효창동',
        ],
      },
      {
        name: '은평구',
        dong: [
          '수색동',
          '녹번동',
          '불광동',
          '갈현동',
          '구산동',
          '대조동',
          '응암동',
          '역촌동',
          '신사동',
          '증산동',
          '신사동',
          '수색동',
          '녹번동',
        ],
      },
      {
        name: '종로구',
        dong: [
          '청운동',
          '신교동',
          '궁정동',
          '효자동',
          '창신동',
          '숭인동',
          '이화동',
          '혜화동',
          '명륜동',
          '와룡동',
          '무악동',
          '교남동',
          '평창동',
        ],
      },
      {
        name: '중구',
        dong: [
          '소공동',
          '회현동',
          '명동',
          '필동',
          '장충동',
          '광희동',
          '을지로동',
          '신당동',
          '다산동',
          '약수동',
          '청구동',
          '신당동',
          '다산동',
        ],
      },
      {
        name: '중랑구',
        dong: [
          '면목동',
          '상봉동',
          '중화동',
          '묵동',
          '망우동',
          '신내동',
          '상봉동',
          '중화동',
          '묵동',
          '망우동',
          '신내동',
          '면목동',
          '상봉동',
        ],
      },
    ],
  },
]

// 비자 타입 옵션
export const VISA_OPTIONS = [
  { label: 'E-1', value: 'E-1' },
  { label: 'E-2', value: 'E-2' },
  { label: 'E-3', value: 'E-3' },
  { label: 'E-4', value: 'E-4' },
  { label: 'E-5', value: 'E-5' },
  { label: 'E-6', value: 'E-6' },
  { label: 'E-7', value: 'E-7' },
  { label: 'E-8', value: 'E-8' },
  { label: 'E-9', value: 'E-9' },
  { label: 'F-1', value: 'F-1' },
  { label: 'F-2', value: 'F-2' },
  { label: 'F-3', value: 'F-3' },
  { label: 'F-4', value: 'F-4' },
  { label: 'F-5', value: 'F-5' },
  { label: 'F-6', value: 'F-6' },
  { label: 'D-1', value: 'D-1' },
  { label: 'D-2', value: 'D-2' },
  { label: 'D-3', value: 'D-3' },
  { label: 'D-4', value: 'D-4' },
  { label: 'D-5', value: 'D-5' },
  { label: 'D-6', value: 'D-6' },
  { label: 'D-7', value: 'D-7' },
  { label: 'D-8', value: 'D-8' },
  { label: 'D-9', value: 'D-9' },
  { label: 'D-10', value: 'D-10' },
  { label: '기타', value: '기타' },
]

// ==================== 필터 상태 관리 ====================

/**
 * 국내모델 활성 필터 개수
 */
export const getDomesticActiveFilterCount = (filters: DomesticFilters): number => {
  let count = 0
  if (filters.query) count++
  if (filters.name) count++
  if (filters.address_city || filters.address_district || filters.address_street) count++
  if (filters.nationality) count++
  if (filters.specialty) count++
  if (filters.languages) count++
  if (filters.agency) count++
  if (filters.manager) count++
  if (filters.gender !== 'all') count++
  return count
}

/**
 * 해외모델 활성 필터 개수
 */
export const getOverseasActiveFilterCount = (filters: OverseasFilters): number => {
  let count = 0
  if (filters.query) count++
  if (filters.name) count++
  if (filters.address_city || filters.address_district || filters.address_street) count++
  if (filters.nationality) count++
  if (filters.specialty) count++
  if (filters.languages) count++
  if (filters.gender !== 'all') count++
  return count
}

/**
 * 필터 변경 상태 확인
 */
export const isFilterDirty = (filters: DomesticFilters | OverseasFilters): boolean => {
  const count =
    'address' in filters
      ? getDomesticActiveFilterCount(filters)
      : getOverseasActiveFilterCount(filters)
  return count > 0
}

/**
 * 국내모델 필터 초기화
 */
export const resetDomesticFilters = (): DomesticFilters => ({
  query: '',
  name: '',
  address_city: '',
  address_district: '',
  address_street: '',
  nationality: '',
  specialty: '',
  languages: '',
  agency: '',
  manager: '',
  gender: 'all',
})

/**
 * 해외모델 필터 초기화
 */
export const resetOverseasFilters = (): OverseasFilters => ({
  query: '',
  name: '',
  address_city: '',
  address_district: '',
  address_street: '',
  nationality: '',
  specialty: '',
  languages: '',
  gender: 'all',
})

// ==================== 검색 및 필터링 ====================

/**
 * 모델 데이터 검색
 */
export const searchModels = <T extends DomesticModelRow | OverseasModelRow>(
  models: T[],
  searchTerm: string,
): T[] => {
  if (!searchTerm.trim()) return models

  const term = searchTerm.toLowerCase()
  return models.filter((row) => {
    const searchFields = [
      row.name,
      row.phone,
      row.nationality,
      row.specialty,
      row.languages,
      row.address,
    ]

    // 국내모델의 경우 추가 필드
    if ('agency' in row) {
      searchFields.push((row as DomesticModelRow).agency)
      searchFields.push((row as DomesticModelRow).manager)
      searchFields.push((row as DomesticModelRow).managerPhone)
    }

    return searchFields.some((field) => field && field.toLowerCase().includes(term))
  })
}

/**
 * 필터 적용
 */
export const applyFilters = <T extends DomesticModelRow | OverseasModelRow>(
  models: T[],
  filters: DomesticFilters | OverseasFilters,
): T[] => {
  let filtered = [...models]

  // 통합 검색어 필터 (모든 필드를 검색)
  if (filters.query) {
    filtered = searchModels(filtered, filters.query)
  }

  // 개별 필드 필터들 (통합 검색어와 관계없이 항상 적용)
  // 이름 필터
  if (filters.name) {
    const nameTerm = filters.name.toLowerCase()
    filtered = filtered.filter((row) => row.name.toLowerCase().includes(nameTerm))
  }

  // 주소 필터
  if (filters.address) {
    const addressTerm = filters.address.toLowerCase()
    filtered = filtered.filter((row) => row.address.toLowerCase().includes(addressTerm))
  }

  // 국적 필터
  if (filters.nationality) {
    filtered = filtered.filter((row) =>
      row.nationality.toLowerCase().includes(filters.nationality!.toLowerCase()),
    )
  }

  // 특기 필터
  if (filters.specialty) {
    filtered = filtered.filter((row) =>
      row.specialty.toLowerCase().includes(filters.specialty!.toLowerCase()),
    )
  }

  // 언어 필터
  if (filters.languages) {
    filtered = filtered.filter((row) =>
      row.languages.toLowerCase().includes(filters.languages!.toLowerCase()),
    )
  }

  // 성별 필터
  if (filters.gender !== 'all') {
    const genderMap = { male: '남', female: '여' } as const
    filtered = filtered.filter(
      (row) => row.gender === genderMap[filters.gender as 'male' | 'female'],
    )
  }

  // 국내모델 전용 필터
  if ('agency' in filters && filters.agency) {
    filtered = filtered.filter(
      (row) =>
        'agency' in row &&
        (row as DomesticModelRow).agency.toLowerCase().includes(filters.agency!.toLowerCase()),
    )
  }

  if ('manager' in filters && filters.manager) {
    filtered = filtered.filter(
      (row) =>
        'manager' in row &&
        (row as DomesticModelRow).manager.toLowerCase().includes(filters.manager!.toLowerCase()),
    )
  }

  return filtered
}

/**
 * 국내모델 필터 적용
 */
export const applyDomesticFilters = (
  models: DomesticModelRow[],
  filters: DomesticFilters,
): DomesticModelRow[] => {
  return applyFilters(models, filters)
}

/**
 * 해외모델 필터 적용
 */
export const applyOverseasFilters = (
  models: OverseasModelRow[],
  filters: OverseasFilters,
): OverseasModelRow[] => {
  return applyFilters(models, filters)
}

// ==================== URL 쿼리 파라미터 ====================

/**
 * 기본 필터를 URL 쿼리 파라미터로 변환
 */
export const filtersToQueryParams = (
  filters: DomesticFilters | OverseasFilters,
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.query) params.set('q', filters.query)
  if (filters.name) params.set('name', filters.name)
  if (filters.address) params.set('address', filters.address)
  if (filters.nationality) params.set('nationality', filters.nationality)
  if (filters.specialty) params.set('specialty', filters.specialty)
  if (filters.languages) params.set('languages', filters.languages)
  if (filters.gender !== 'all') params.set('gender', filters.gender || '')

  return params
}

/**
 * 국내모델 필터를 URL 쿼리 파라미터로 변환
 */
export const domesticFiltersToQueryParams = (filters: DomesticFilters): URLSearchParams => {
  const params = filtersToQueryParams(filters)

  if (filters.agency) params.set('agency', filters.agency)
  if (filters.manager) params.set('manager', filters.manager)

  return params
}

/**
 * 해외모델 필터를 URL 쿼리 파라미터로 변환
 */
export const overseasFiltersToQueryParams = (filters: OverseasFilters): URLSearchParams => {
  const params = filtersToQueryParams(filters)

  if (filters.address) params.set('address', filters.address)

  return params
}
