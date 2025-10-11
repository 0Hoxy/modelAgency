/**
 * Models - Overseas (해외모델)
 */
import { Pagination } from '@molecules/Pagination'
import { Popover } from '@molecules/Popover'
import { TextField } from '@molecules/TextField'
import { CreateGlobalModelModal } from '@organisms/models/CreateGlobalModelModal'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Filter as FilterIcon, Search as SearchIcon } from '@utils/icon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  createCameraTest,
  deleteGlobalModel,
  getGlobalModels,
  getModelPhysicalSize,
  type GlobalListItem,
  type GlobalSearchParams,
  type ModelPhysicalSize,
  type PaginatedResponse,
} from '../../api/models'
import { useFilterOptions } from '../../hooks/useFilterOptions'
// import { searchOverseasModels } from '../../api/search'
// import type { OverseasModelRow } from '../../types/models'
// import type { SearchResponse } from '../../types/search'
import type { OverseasFilters } from '../../types/search'
import { toLocalKrPhone } from '../../utils/phone'
import {
  getOverseasActiveFilterCount,
  isFilterDirty,
  overseasFiltersToQueryParams,
  resetOverseasFilters,
} from '../../utils/search'

export default function ModelsOverseas() {
  const [searchParams, setSearchParams] = useSearchParams()

  // 동적 필터 옵션
  const {
    nationalities,
    specialties,
    languages,
    addressCities,
    isLoading: optionsLoading,
    error: optionsError,
  } = useFilterOptions()

  // 주소 선택 상태 (임시 상태 - 팝오버에서만 사용)
  const [tempAddressSelectedCity, setTempAddressSelectedCity] = useState<string | null>(null)
  const [tempAddressSelectedDistrict, setTempAddressSelectedDistrict] = useState<string | null>(
    null,
  )
  const [tempAddressSelectedDong, setTempAddressSelectedDong] = useState<string | null>(null)

  // 시/도 선택 시 하위 항목들 초기화
  const handleCityChange = (cityValue: string | null) => {
    setTempAddressSelectedCity(cityValue)
    setTempAddressSelectedDistrict(null)
    setTempAddressSelectedDong(null)
  }

  // 구/군 선택 시 하위 항목 초기화
  const handleDistrictChange = (districtValue: string | null) => {
    setTempAddressSelectedDistrict(districtValue)
    setTempAddressSelectedDong(null)
  }

  // 주소 선택 초기화 함수
  const clearAddressSelection = () => {
    setTempAddressSelectedCity(null)
    setTempAddressSelectedDistrict(null)
    setTempAddressSelectedDong(null)
  }

  // 선택된 시/도에 따른 구/군 목록
  const districts = tempAddressSelectedCity
    ? addressCities.find((city) => city.value === tempAddressSelectedCity)?.districts || []
    : []

  // 선택된 구/군에 따른 동/면/읍 목록
  const dongs = tempAddressSelectedDistrict
    ? districts.find((district) => district.value === tempAddressSelectedDistrict)?.dongs || []
    : []

  // 통합 필터 상태 관리
  const [filters, setFilters] = useState<OverseasFilters>(() => ({
    query: searchParams.get('q') || '',
    name: searchParams.get('name') || '',
    gender: (searchParams.get('gender') as 'all' | 'male' | 'female') || 'all',
    nationality: searchParams.get('nationality') || '',
    specialty: searchParams.get('specialty') || '',
    languages: searchParams.get('languages') || '',
    address: searchParams.get('address') || '',
  }))

  // 필터 팝오버용 임시 필터 상태
  const [tempFilters, setTempFilters] = useState<OverseasFilters>(filters)

  // 필터 상태 계산
  const isDirty = useMemo(() => isFilterDirty(filters), [filters])
  const activeCount = useMemo(() => getOverseasActiveFilterCount(filters), [filters])
  const [isApplying, setIsApplying] = useState(false)

  // Popover layout is fixed-width/single-column

  const [recentChange, setRecentChange] = useState(false)
  const markChanged = () => {
    setRecentChange(true)
    window.setTimeout(() => setRecentChange(false), 1800)
  }

  // 필터 업데이트 (즉시 적용)
  const updateFilter = <K extends keyof OverseasFilters>(key: K, value: OverseasFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    markChanged()
  }

  // 필터 팝오버용 임시 필터 업데이트
  const updateTempFilter = <K extends keyof OverseasFilters>(key: K, value: OverseasFilters[K]) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }))
  }

  // 필터 초기화
  const reset = () => {
    setFilters(resetOverseasFilters())
    setTempFilters(resetOverseasFilters())
    // 주소 선택 상태도 초기화
    clearAddressSelection()
    markChanged()
  }

  // 필터 적용 (URL 동기화)
  const applyFilters = () => {
    // 임시 주소 선택을 실제 필터에 적용
    const updatedFilters = {
      ...tempFilters,
      address_city: tempAddressSelectedCity || '',
      address_district: tempAddressSelectedDistrict || '',
      address_street: tempAddressSelectedDong || '',
    }

    setFilters(updatedFilters)
    const params = overseasFiltersToQueryParams(updatedFilters)
    setSearchParams(params)
    setCurrentPage(1) // 첫 페이지로 리셋
    setIsApplying(true)
    setTimeout(() => setIsApplying(false), 1000)
  }

  // ---------------- Models list ----------------
  // const [overseasData, setOverseasData] = useState<SearchResponse<OverseasModelRow> | null>(null)
  const [globalList, setGlobalList] = useState<GlobalListItem[] | null>(null)
  const [globalPage, setGlobalPage] = useState<PaginatedResponse<GlobalListItem> | null>(null)

  // 카메라테스트 등록용 선택된 모델 ID
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 확장된 행과 모델 신체사이즈 정보
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null)
  const [modelPhysicalSizes, setModelPhysicalSizes] = useState<Record<string, ModelPhysicalSize>>(
    {},
  )
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 테이블 헤더 정의
  const headers = [
    '이름',
    '성별',
    '생년월일',
    '전화번호',
    '주소',
    '국적',
    '특기',
    '가능한외국어',
    '인스타그램',
    '유튜브',
    '카카오톡',
    '문신 위치',
    '문신 사이즈',
    '한국어 능력',
    '비고',
  ]

  // 검색 파라미터 구성 함수
  const buildSearchParams = useCallback(
    (page: number, pageSize: number): GlobalSearchParams => {
      const params: GlobalSearchParams = {
        page,
        page_size: pageSize,
      }

      // 필터가 있을 때만 파라미터에 추가
      if (filters.name?.trim()) {
        params.name = filters.name.trim()
      }

      if (filters.gender && filters.gender !== 'all') {
        // API 응답을 보면 gender는 대문자 enum 형식 (MALE, FEMALE, OTHER)
        params.gender =
          filters.gender === 'male' ? 'MALE' : filters.gender === 'female' ? 'FEMALE' : 'OTHER'
      }

      if (filters.nationality?.trim()) {
        params.nationality = filters.nationality.trim()
      }

      // 주소 필터 처리
      if (filters.address_city?.trim()) {
        params.address_city = filters.address_city.trim()
      }
      if (filters.address_district?.trim()) {
        params.address_district = filters.address_district.trim()
      }
      if (filters.address_street?.trim()) {
        params.address_street = filters.address_street.trim()
      }

      if (filters.specialty?.trim()) {
        params.special_abilities = filters.specialty.trim()
      }

      if (filters.languages?.trim()) {
        params.other_languages = filters.languages.trim()
      }

      // 해외모델 전용 필터들 (필요시 추가)
      // koreanLevel과 visaType 필터는 OverseasFilters 타입에 없으므로 주석 처리
      // if (filters.koreanLevel?.trim()) {
      //   params.korean_level = filters.koreanLevel.trim()
      // }

      // if (filters.visaType?.trim()) {
      //   params.visa_type = filters.visaType.trim()
      // }

      return params
    },
    [filters],
  )

  // 모델 클릭 시 상세 정보 로드
  const handleModelClick = async (modelId: string) => {
    setSelectedModelId(modelId)

    if (expandedModelId === modelId) {
      // 이미 확장된 모델을 클릭하면 축소
      setExpandedModelId(null)
      return
    }

    setExpandedModelId(modelId)

    // 이미 로드된 신체사이즈 정보가 있으면 재사용
    if (modelPhysicalSizes[modelId]) {
      return
    }

    // 로딩 상태 설정
    setLoadingDetails((prev) => ({ ...prev, [modelId]: true }))

    try {
      const physicalSize = await getModelPhysicalSize(modelId)
      setModelPhysicalSizes((prev) => ({ ...prev, [modelId]: physicalSize }))
    } catch (err) {
      console.error('모델 신체사이즈 정보 로드 실패:', err)
      setError('모델 신체사이즈 정보를 불러오는데 실패했습니다.')
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [modelId]: false }))
    }
  }

  // 모델 삭제
  const handleDeleteModel = async (modelId: string) => {
    if (!confirm('정말로 이 모델을 삭제하시겠습니까?')) {
      return
    }

    try {
      await deleteGlobalModel(modelId)
      // 목록 새로고침
      const response = await getGlobalModels(buildSearchParams(currentPage, pageSize))
      setGlobalList(response.data)
      setGlobalPage(response)
      setExpandedModelId(null)
      setSelectedModelId(null)
      // 신체사이즈 정보 캐시에서 제거
      setModelPhysicalSizes((prev) => {
        const newSizes = { ...prev }
        delete newSizes[modelId]
        return newSizes
      })
    } catch (err: unknown) {
      console.error('모델 삭제 실패:', err)

      const axiosError = err as { response?: { status?: number; data?: { detail?: unknown } } }
      console.error('에러 상세:', axiosError.response?.data)

      // 422 에러의 경우 더 자세한 메시지 표시
      if (axiosError.response?.status === 422) {
        const detail = axiosError.response?.data?.detail
        if (Array.isArray(detail) && detail.length > 0) {
          setError(`모델 삭제 실패: ${detail[0].msg || detail[0]}`)
        } else {
          setError('모델 삭제 실패: 서버에서 요청을 처리할 수 없습니다.')
        }
      } else {
        setError('모델 삭제에 실패했습니다.')
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // 실제 목록 로드
        const page = await getGlobalModels(buildSearchParams(currentPage, pageSize))
        setGlobalPage(page)
        setGlobalList(page.data)
        // 통합 검색은 추후 필요 시 재도입
      } catch (e) {
        console.error('해외모델 목록 로드 실패:', e)
        const err = e as { response?: { data?: { detail?: string } }; message?: string }
        setError(err?.response?.data?.detail || err?.message || 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage, pageSize, buildSearchParams])

  // Helpers for toggleable multi-select stored as comma-separated string
  const normalizeList = (value: string) =>
    value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)

  const isSelected = (value: string, token: string) => normalizeList(value).includes(token)

  const toggleToken = (value: string, token: string) => {
    const list = normalizeList(value)
    const exists = list.includes(token)
    const next = exists ? list.filter((t) => t !== token) : [...list, token]
    return next.join(', ')
  }

  // list renderer removed (reverted to pill buttons)

  // Search inputs for large option sets
  const [nationalityQ, setNationalityQ] = useState('')
  const [languageQ, setLanguageQ] = useState('')
  const [specialtyQ, setSpecialtyQ] = useState('')

  // Display helpers
  const formatGender = (g?: string | null) => {
    if (!g) return '-'
    const key = String(g).toUpperCase()
    if (key === 'MALE') return '남성'
    if (key === 'FEMALE') return '여성'
    if (key === 'OTHER' || key === 'OTHERS') return '기타'
    return g
  }
  const display = (v?: string | null) => {
    if (!v) return '-'
    const t = String(v).trim()
    return t ? t : '-'
  }

  // 카메라테스트 등록 핸들러
  const handleCameraTestRegister = async () => {
    if (!selectedModelId) {
      alert('카메라테스트에 등록할 모델을 선택해주세요.')
      return
    }

    try {
      await createCameraTest({ model_id: selectedModelId })
      alert('카메라테스트 등록이 완료되었습니다.')
      setSelectedModelId(null) // 선택 해제
    } catch (error: unknown) {
      console.error('카메라테스트 등록 실패:', error)
      const err = error as { response?: { data?: { detail?: string; message?: string } } }
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        '카메라테스트 등록에 실패했습니다.'
      alert(errorMsg)
    }
  }

  const renderPill = (current: string, setCurrent: (v: string) => void, token: string) => (
    <button
      key={token}
      type="button"
      onClick={() => setCurrent(toggleToken(current, token))}
      style={{
        padding: '4px 8px',
        borderRadius: 999,
        border: '1px solid #cbd5e1',
        background: isSelected(current, token) ? '#2563eb' : '#ffffff',
        color: isSelected(current, token) ? '#ffffff' : '#0f172a',
        fontSize: '11px',
      }}
    >
      {token}
    </button>
  )
  return (
    <SidebarLayout>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
        }}
      >
        {/* 좌측 액션 버튼들 */}
        <div style={{ display: 'flex', gap: 8 }}>
          <CreateGlobalModelModal
            onSuccess={() => {
              // 모델 등록 성공 시 목록 새로고침
              setCurrentPage(1)
              const fetchData = async () => {
                try {
                  setIsLoading(true)
                  const page = await getGlobalModels(buildSearchParams(1, pageSize))
                  setGlobalPage(page)
                  setGlobalList(page.data)
                } catch (e) {
                  console.error('목록 로드 실패:', e)
                } finally {
                  setIsLoading(false)
                }
              }
              fetchData()
            }}
          />
          <button
            type="button"
            className="iconBtn"
            style={{
              border: 'none',
              background: 'transparent',
              color: '#374151',
              borderRadius: 6,
              transition: 'color 160ms ease',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
            onClick={handleCameraTestRegister}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#111827'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#374151'
            }}
          >
            카메라테스트 등록
          </button>
          <button
            type="button"
            className="iconBtn"
            style={{
              border: 'none',
              background: 'transparent',
              color: '#374151',
              borderRadius: 6,
              transition: 'color 160ms ease',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
            onClick={() => console.log('주소록 저장 클릭')}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#111827'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#374151'
            }}
          >
            주소록 저장
          </button>
        </div>

        {/* 중앙 여백 */}
        <div style={{ flex: 1 }} />

        {/* 우측 검색 및 필터 */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <TextField
            id="q"
            placeholder="통합검색: 이름/주소/국적/특기/외국어/비자타입"
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            style={{ width: 320 }}
            aria-label="통합검색"
            leading={<SearchIcon size={14} />}
          />
          <Popover
            onOpenChange={(open) => {
              if (open) {
                // 필터 팝오버가 열릴 때 임시 필터를 현재 필터로 초기화
                setTempFilters(filters)
                // 주소 선택 상태도 현재 필터 값으로 초기화 (함수형 업데이트 사용)
                setTempAddressSelectedCity(() => filters.address_city || null)
                setTempAddressSelectedDistrict(() => filters.address_district || null)
                setTempAddressSelectedDong(() => filters.address_street || null)
              }
            }}
            trigger={
              <button
                type="button"
                className="iconBtn"
                style={{
                  border: '1px solid #cbd5e1',
                  background: recentChange ? '#f1f5f9' : '#fff',
                  transition: 'background 180ms ease',
                  padding: '5px 10px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <FilterIcon size={14} />
                  필터{activeCount > 0 ? `(${activeCount})` : ''}
                </span>
              </button>
            }
          >
            {(api) => (
              <div
                style={{
                  padding: 10,
                  width: 440,
                  minWidth: 440,
                  maxWidth: 440,
                  display: 'grid',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 10,
                  }}
                >
                  <div>
                    <TextField
                      id="name"
                      label="이름"
                      labelStyle={{ fontSize: 12, color: '#475569' }}
                      placeholder="예: 김하늘"
                      value={tempFilters.name}
                      onChange={(e) => updateTempFilter('name', e.target.value)}
                      style={{ maxWidth: '100%' }}
                      inputStyle={{
                        paddingTop: 6,
                        paddingRight: 10,
                        paddingBottom: 6,
                        paddingLeft: 10,
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 12,
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      주소
                      {(tempAddressSelectedCity ||
                        tempAddressSelectedDistrict ||
                        tempAddressSelectedDong) && (
                        <button
                          type="button"
                          onClick={clearAddressSelection}
                          style={{
                            padding: '2px 6px',
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            background: 'transparent',
                            color: '#64748b',
                            fontSize: 10,
                            cursor: 'pointer',
                          }}
                        >
                          초기화
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {/* 시/도 선택 */}
                      <div>
                        <select
                          value={tempAddressSelectedCity || ''}
                          onChange={(e) => handleCityChange(e.target.value || null)}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: 6,
                            border: '1px solid #cbd5e1',
                            fontSize: 12,
                            background: '#fff',
                          }}
                        >
                          <option value="">시/도 선택</option>
                          {optionsLoading ? (
                            <option disabled>로딩 중...</option>
                          ) : optionsError ? (
                            <option disabled>로딩 실패</option>
                          ) : (
                            addressCities.map((city) => (
                              <option key={city.value} value={city.value}>
                                {city.label}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* 구/군 선택 */}
                      <div>
                        <select
                          value={tempAddressSelectedDistrict || ''}
                          onChange={(e) => handleDistrictChange(e.target.value || null)}
                          disabled={!tempAddressSelectedCity}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: 6,
                            border: '1px solid #cbd5e1',
                            fontSize: 12,
                            background: tempAddressSelectedCity ? '#fff' : '#f8fafc',
                            color: tempAddressSelectedCity ? '#1e293b' : '#94a3b8',
                            cursor: tempAddressSelectedCity ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <option value="">구/군 선택</option>
                          {optionsLoading ? (
                            <option disabled>로딩 중...</option>
                          ) : optionsError ? (
                            <option disabled>로딩 실패</option>
                          ) : (
                            districts.map((district) => (
                              <option key={district.value} value={district.value}>
                                {district.label}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* 동/면/읍 선택 */}
                      <div>
                        <select
                          value={tempAddressSelectedDong || ''}
                          onChange={(e) => setTempAddressSelectedDong(e.target.value || null)}
                          disabled={!tempAddressSelectedDistrict}
                          style={{
                            width: '100%',
                            padding: '6px 8px',
                            borderRadius: 6,
                            border: '1px solid #cbd5e1',
                            fontSize: 12,
                            background: tempAddressSelectedDistrict ? '#fff' : '#f8fafc',
                            color: tempAddressSelectedDistrict ? '#1e293b' : '#94a3b8',
                            cursor: tempAddressSelectedDistrict ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <option value="">동/면/읍 선택</option>
                          {optionsLoading ? (
                            <option disabled>로딩 중...</option>
                          ) : optionsError ? (
                            <option disabled>로딩 실패</option>
                          ) : (
                            dongs.map((dong) => (
                              <option key={dong} value={dong}>
                                {dong}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      padding: 10,
                    }}
                  >
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>국적</div>
                    <div style={{ marginBottom: 6 }}>
                      <TextField
                        id="nationality-search"
                        placeholder="국적 검색"
                        value={nationalityQ}
                        onChange={(e) => setNationalityQ(e.target.value)}
                        aria-label="국적 검색"
                        inputStyle={{
                          paddingTop: 6,
                          paddingRight: 10,
                          paddingBottom: 6,
                          paddingLeft: 10,
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {optionsLoading ? (
                        <div style={{ fontSize: 12, color: '#64748b', padding: '4px 8px' }}>
                          로딩 중...
                        </div>
                      ) : optionsError ? (
                        <div style={{ fontSize: 12, color: '#ef4444', padding: '4px 8px' }}>
                          옵션 로드 실패
                        </div>
                      ) : (
                        nationalities
                          .filter((opt) =>
                            opt.label.toLowerCase().includes(nationalityQ.toLowerCase()),
                          )
                          .slice(0, 5)
                          .map((opt) =>
                            renderPill(
                              tempFilters.nationality || '',
                              (value) => updateTempFilter('nationality', value),
                              opt.label,
                            ),
                          )
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      padding: 10,
                    }}
                  >
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>특기</div>
                    <div style={{ marginBottom: 6 }}>
                      <TextField
                        id="specialty-search"
                        placeholder="특기 검색"
                        value={specialtyQ}
                        onChange={(e) => setSpecialtyQ(e.target.value)}
                        aria-label="특기 검색"
                        inputStyle={{
                          paddingTop: 6,
                          paddingRight: 10,
                          paddingBottom: 6,
                          paddingLeft: 10,
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {optionsLoading ? (
                        <div style={{ fontSize: 12, color: '#64748b', padding: '4px 8px' }}>
                          로딩 중...
                        </div>
                      ) : optionsError ? (
                        <div style={{ fontSize: 12, color: '#ef4444', padding: '4px 8px' }}>
                          옵션 로드 실패
                        </div>
                      ) : (
                        specialties
                          .filter((opt) =>
                            opt.label.toLowerCase().includes(specialtyQ.toLowerCase()),
                          )
                          .slice(0, 5)
                          .map((opt) =>
                            renderPill(
                              tempFilters.specialty || '',
                              (value) => updateTempFilter('specialty', value),
                              opt.label,
                            ),
                          )
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      padding: 10,
                    }}
                  >
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>
                      가능한 외국어
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      <TextField
                        id="language-search"
                        placeholder="외국어 검색"
                        value={languageQ}
                        onChange={(e) => setLanguageQ(e.target.value)}
                        aria-label="외국어 검색"
                        inputStyle={{
                          paddingTop: 6,
                          paddingRight: 10,
                          paddingBottom: 6,
                          paddingLeft: 10,
                          borderRadius: 6,
                          fontSize: 12,
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {optionsLoading ? (
                        <div style={{ fontSize: 12, color: '#64748b', padding: '4px 8px' }}>
                          로딩 중...
                        </div>
                      ) : optionsError ? (
                        <div style={{ fontSize: 12, color: '#ef4444', padding: '4px 8px' }}>
                          옵션 로드 실패
                        </div>
                      ) : (
                        languages
                          .filter((opt) =>
                            opt.label.toLowerCase().includes(languageQ.toLowerCase()),
                          )
                          .slice(0, 5)
                          .map((opt) =>
                            renderPill(
                              tempFilters.languages || '',
                              (value) => updateTempFilter('languages', value),
                              opt.label,
                            ),
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>성별</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {(
                      [
                        { key: 'all', label: '전체' },
                        { key: 'male', label: '남' },
                        { key: 'female', label: '여' },
                        { key: 'others', label: '기타' },
                      ] as const
                    ).map((g) => (
                      <button
                        key={g.key}
                        type="button"
                        aria-pressed={tempFilters.gender === g.key}
                        onClick={() => updateTempFilter('gender', g.key)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: '1px solid #cbd5e1',
                          background: tempFilters.gender === g.key ? '#2563eb' : '#ffffff',
                          color: tempFilters.gender === g.key ? '#ffffff' : '#0f172a',
                          fontSize: '11px',
                          boxShadow:
                            tempFilters.gender === g.key ? 'inset 0 0 0 1px #1d4ed8' : 'none',
                        }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>주소</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {/* 시/도 선택 */}
                    <div>
                      <select
                        value={tempAddressSelectedCity || ''}
                        onChange={(e) => handleCityChange(e.target.value || null)}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: 6,
                          border: '1px solid #cbd5e1',
                          fontSize: 12,
                          background: '#fff',
                        }}
                      >
                        <option value="">시/도 선택</option>
                        {optionsLoading ? (
                          <option disabled>로딩 중...</option>
                        ) : optionsError ? (
                          <option disabled>로딩 실패</option>
                        ) : (
                          addressCities.map((city) => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {/* 구/군 선택 */}
                    <div>
                      <select
                        value={tempAddressSelectedDistrict || ''}
                        onChange={(e) => handleDistrictChange(e.target.value || null)}
                        disabled={!tempAddressSelectedCity}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: 6,
                          border: '1px solid #cbd5e1',
                          fontSize: 12,
                          background: tempAddressSelectedCity ? '#fff' : '#f8fafc',
                          color: tempAddressSelectedCity ? '#1e293b' : '#94a3b8',
                          cursor: tempAddressSelectedCity ? 'pointer' : 'not-allowed',
                        }}
                      >
                        <option value="">구/군 선택</option>
                        {optionsLoading ? (
                          <option disabled>로딩 중...</option>
                        ) : optionsError ? (
                          <option disabled>로딩 실패</option>
                        ) : (
                          districts.map((district) => (
                            <option key={district.value} value={district.value}>
                              {district.label}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {/* 동/면/읍 선택 */}
                    <div>
                      <select
                        value={tempAddressSelectedDong || ''}
                        onChange={(e) => setTempAddressSelectedDong(e.target.value || null)}
                        disabled={!tempAddressSelectedDistrict}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: 6,
                          border: '1px solid #cbd5e1',
                          fontSize: 12,
                          background: tempAddressSelectedDistrict ? '#fff' : '#f8fafc',
                          color: tempAddressSelectedDistrict ? '#1e293b' : '#94a3b8',
                          cursor: tempAddressSelectedDistrict ? 'pointer' : 'not-allowed',
                        }}
                      >
                        <option value="">동/면/읍 선택</option>
                        {optionsLoading ? (
                          <option disabled>로딩 중...</option>
                        ) : optionsError ? (
                          <option disabled>로딩 실패</option>
                        ) : (
                          dongs.map((dong) => (
                            <option key={dong} value={dong}>
                              {dong}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {/* 주소 선택 초기화 */}
                    {(tempAddressSelectedCity ||
                      tempAddressSelectedDistrict ||
                      tempAddressSelectedDong) && (
                      <button
                        type="button"
                        onClick={clearAddressSelection}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          border: '1px solid #e2e8f0',
                          background: 'transparent',
                          color: '#64748b',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        주소 선택 초기화
                      </button>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    position: 'sticky',
                    bottom: 0,
                    borderTop: '1px solid #e2e8f0',
                    background: '#fff',
                    paddingTop: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 6,
                  }}
                >
                  <button
                    type="button"
                    onClick={reset}
                    disabled={!isDirty || isApplying}
                    className="iconBtn"
                    style={{
                      border: '1px solid #e2e8f0',
                      background: 'transparent',
                      color: '#64748b',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '500',
                      opacity: isDirty && !isApplying ? 1 : 0.5,
                      cursor: isDirty && !isApplying ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease',
                    }}
                    aria-label="모든 필터 초기화"
                  >
                    초기화
                  </button>
                  <button
                    type="button"
                    className="iconBtn"
                    style={{
                      border: '1px solid #2563eb',
                      background: '#2563eb',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '500',
                      cursor: isApplying ? 'not-allowed' : 'pointer',
                      opacity: isApplying ? 0.7 : 1,
                      transition: 'all 0.2s ease',
                    }}
                    disabled={isApplying}
                    onClick={async () => {
                      try {
                        setIsApplying(true)
                        applyFilters()
                        await Promise.resolve()
                        api.close()
                      } finally {
                        setIsApplying(false)
                      }
                    }}
                    aria-label="필터 적용"
                  >
                    {isApplying ? '적용 중…' : '적용'}
                  </button>
                </div>
              </div>
            )}
          </Popover>

          <button
            type="button"
            className="iconBtn"
            style={{
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#fff',
              fontSize: '11px',
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={applyFilters}
            aria-label="검색 실행"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <SearchIcon size={14} />
              검색
            </span>
          </button>
        </div>
      </div>

      {/* Chips row keeps below toolbar */}
      <div style={{ display: 'block', marginBottom: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {filters.query && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('query', '')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
              aria-label="통합검색 필터 제거"
            >
              통합: {filters.query} ×
            </button>
          )}
          {filters.name && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('name', '')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
            >
              이름: {filters.name} ×
            </button>
          )}
          {(filters.address_city || filters.address_district || filters.address_street) && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => {
                updateFilter('address_city', '')
                updateFilter('address_district', '')
                updateFilter('address_street', '')
              }}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
            >
              주소:{' '}
              {[filters.address_city, filters.address_district, filters.address_street]
                .filter(Boolean)
                .join(' ')}{' '}
              ×
            </button>
          )}
          {filters.nationality && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('nationality', '')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
            >
              국적: {filters.nationality} ×
            </button>
          )}
          {filters.specialty && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('specialty', '')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
            >
              특기: {filters.specialty} ×
            </button>
          )}
          {filters.languages && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('languages', '')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
            >
              외국어: {filters.languages} ×
            </button>
          )}
          {filters.gender !== 'all' && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('gender', 'all')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: '11px',
              }}
            >
              성별: {filters.gender === 'male' ? '남' : filters.gender === 'female' ? '여' : '기타'}{' '}
              ×
            </button>
          )}
          {isDirty && (
            <button
              type="button"
              className="iconBtn"
              onClick={reset}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                padding: '4px 8px',
                borderRadius: '999px',
                fontSize: '11px',
              }}
            >
              전체 해제
            </button>
          )}
        </div>
      </div>

      {/* Overseas models list */}
      <div style={{ marginTop: 12 }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            데이터를 불러오는 중...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#b91c1c' }}>
            데이터를 불러오지 못했습니다: {error}
          </div>
        ) : globalList && globalList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            <div style={{ fontSize: 16, marginBottom: 8 }}>검색 결과가 없습니다</div>
            <div style={{ fontSize: 14, color: '#94a3b8' }}>
              다른 검색어나 필터 조건을 시도해보세요
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', position: 'relative' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {headers.map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'center',
                        padding: '12px 16px',
                        borderBottom: '1px solid #e2e8f0',
                        whiteSpace: 'nowrap',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(globalList || []).map((r, idx) => (
                  <React.Fragment key={idx}>
                    <tr
                      onClick={() => handleModelClick(r.id)}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer',
                        background: selectedModelId === r.id ? '#dbeafe' : 'transparent',
                        transition: 'background 120ms ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedModelId !== r.id) {
                          e.currentTarget.style.background = '#f8fafc'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedModelId !== r.id) {
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#0f172a',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                        }}
                      >
                        {r.name}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                        }}
                      >
                        {formatGender(r.gender as unknown as string)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                        }}
                      >
                        {r.birth_date}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                        }}
                      >
                        {toLocalKrPhone(r.phone) || display(r.phone)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {[r.address_city, r.address_district, r.address_street]
                          .filter((p) => !!(p && String(p).trim()))
                          .map((p) => String(p).trim())
                          .join(' ') || '-'}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {display(r.nationality)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {display(
                          (r as unknown as { other_languages?: string | null }).other_languages,
                        )}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {'-'}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {display(r.instagram)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {display(r.youtube)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {display(
                          (r as unknown as { visa_type?: string | null }).visa_type ||
                            (r.visa_type as unknown as string),
                        )}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {modelPhysicalSizes[r.id]?.has_tattoo
                          ? modelPhysicalSizes[r.id].tattoo_location || '위치미상'
                          : '없음'}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {modelPhysicalSizes[r.id]?.has_tattoo
                          ? modelPhysicalSizes[r.id].tattoo_size || '-'
                          : '-'}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {modelPhysicalSizes[r.id]?.korean_level || '-'}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {'-'}
                      </td>
                    </tr>

                    {/* 확장된 행 - 신체사이즈 정보 */}
                    {expandedModelId === r.id && (
                      <tr key={`${idx}-detail`}>
                        <td colSpan={headers.length} style={{ padding: 0, background: '#f8fafc' }}>
                          <div style={{ padding: '20px' }}>
                            {loadingDetails[r.id] ? (
                              <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ fontSize: 14, color: '#64748b' }}>로딩 중...</div>
                              </div>
                            ) : modelPhysicalSizes[r.id] ? (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                }}
                              >
                                {/* 액션 아이콘 버튼 */}
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexShrink: 0,
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      // TODO: 수정 기능 구현
                                      alert('수정 기능은 추후 구현 예정입니다.')
                                    }}
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      background: 'transparent',
                                      color: '#6b7280',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f3f4f6'
                                      e.currentTarget.style.color = '#374151'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent'
                                      e.currentTarget.style.color = '#6b7280'
                                    }}
                                    title="수정"
                                  >
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteModel(r.id)
                                    }}
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      background: 'transparent',
                                      color: '#6b7280',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#fef2f2'
                                      e.currentTarget.style.color = '#dc2626'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent'
                                      e.currentTarget.style.color = '#6b7280'
                                    }}
                                    title="삭제"
                                  >
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="3,6 5,6 21,6"></polyline>
                                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                                      <line x1="10" y1="11" x2="10" y2="17"></line>
                                      <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                  </button>
                                </div>

                                {/* 신체사이즈 정보 - 한 줄로 표시 */}
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '24px',
                                    flex: 1,
                                    alignItems: 'center',
                                    fontSize: '13px',
                                    color: '#374151',
                                  }}
                                >
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                  >
                                    <span style={{ color: '#64748b', fontWeight: 500 }}>키:</span>
                                    <span style={{ fontWeight: 600 }}>
                                      {modelPhysicalSizes[r.id].height
                                        ? `${modelPhysicalSizes[r.id].height}cm`
                                        : '-'}
                                    </span>
                                  </div>
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                  >
                                    <span style={{ color: '#64748b', fontWeight: 500 }}>
                                      몸무게:
                                    </span>
                                    <span style={{ fontWeight: 600 }}>
                                      {modelPhysicalSizes[r.id].weight
                                        ? `${modelPhysicalSizes[r.id].weight}kg`
                                        : '-'}
                                    </span>
                                  </div>
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                  >
                                    <span style={{ color: '#64748b', fontWeight: 500 }}>상의:</span>
                                    <span style={{ fontWeight: 600 }}>
                                      {modelPhysicalSizes[r.id].top_size || '-'}
                                    </span>
                                  </div>
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                  >
                                    <span style={{ color: '#64748b', fontWeight: 500 }}>하의:</span>
                                    <span style={{ fontWeight: 600 }}>
                                      {modelPhysicalSizes[r.id].bottom_size || '-'}
                                    </span>
                                  </div>
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                  >
                                    <span style={{ color: '#64748b', fontWeight: 500 }}>신발:</span>
                                    <span style={{ fontWeight: 600 }}>
                                      {modelPhysicalSizes[r.id].shoes_size || '-'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ fontSize: 14, color: '#64748b' }}>
                                  상세 정보를 불러올 수 없습니다.
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination (API 기반) */}
      {globalPage && globalList && globalList.length > 0 && (
        <Pagination
          currentPage={globalPage.page}
          totalPages={globalPage.total_pages}
          pageSize={globalPage.page_size}
          totalItems={globalPage.total}
          onPageChange={(page) => {
            setCurrentPage(page)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
          showPageSizeSelector
        />
      )}
    </SidebarLayout>
  )
}
