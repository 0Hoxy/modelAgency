/**
 * Models - Overseas (해외모델)
 */
import { Pagination } from '@molecules/Pagination'
import { Popover } from '@molecules/Popover'
import { TextField } from '@molecules/TextField'
import { CreateGlobalModelModal } from '@organisms/models/CreateGlobalModelModal'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Filter as FilterIcon, Search as SearchIcon } from '@utils/icon'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  createCameraTest,
  getGlobalModels,
  type GlobalListItem,
  type PaginatedResponse,
} from '../../api/models'
// import { searchOverseasModels } from '../../api/search'
// import type { OverseasModelRow } from '../../types/models'
// import type { SearchResponse } from '../../types/search'
import type { OverseasFilters } from '../../types/search'
import { toLocalKrPhone } from '../../utils/phone'
import {
  ADDRESS_OPTIONS,
  getOverseasActiveFilterCount,
  isFilterDirty,
  LANGUAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  overseasFiltersToQueryParams,
  resetOverseasFilters,
  SPECIALTY_OPTIONS,
} from '../../utils/search'

export default function ModelsOverseas() {
  const [searchParams, setSearchParams] = useSearchParams()

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

  // 통합 검색어는 즉시 적용
  const updateFilter = <K extends keyof OverseasFilters>(key: K, value: OverseasFilters[K]) => {
    if (key === 'query') {
      setFilters((prev) => ({ ...prev, [key]: value }))
      markChanged()
    }
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
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedDong('')
    markChanged()
  }

  // 필터 적용 (URL 동기화)
  const applyFilters = () => {
    setFilters(tempFilters)
    const params = overseasFiltersToQueryParams(tempFilters)
    setSearchParams(params)
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
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // 실제 목록 로드
        const page = await getGlobalModels({ page: currentPage, page_size: pageSize })
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
  }, [currentPage, pageSize, filters])

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

  // 주소 선택 상태
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedDong, setSelectedDong] = useState('')

  useEffect(() => {
    if (!filters.address) {
      setSelectedCity('')
      setSelectedDistrict('')
      setSelectedDong('')
      return
    }
    const parts = filters.address.split(/\s+/).filter(Boolean)
    setSelectedCity(parts[0] || '')
    setSelectedDistrict(parts[1] || '')
    setSelectedDong(parts[2] || '')
  }, [filters.address])

  const renderPill = (current: string, setCurrent: (v: string) => void, token: string) => (
    <button
      key={token}
      type="button"
      onClick={() => setCurrent(toggleToken(current, token))}
      style={{
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid #cbd5e1',
        background: isSelected(current, token) ? '#2563eb' : '#ffffff',
        color: isSelected(current, token) ? '#ffffff' : '#0f172a',
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
          alignItems: 'center',
          gap: 12,
          marginBottom: 8,
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
                  const page = await getGlobalModels({ page: 1, page_size: pageSize })
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
              background: '#fff',
              color: '#374151',
              borderRadius: 6,
              transition: 'background 160ms ease, color 160ms ease',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
            onClick={handleCameraTestRegister}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9'
              e.currentTarget.style.color = '#111827'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
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
              background: '#fff',
              color: '#374151',
              borderRadius: 6,
              transition: 'background 160ms ease, color 160ms ease',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
            onClick={() => console.log('주소록 저장 클릭')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9'
              e.currentTarget.style.color = '#111827'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
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
                // 주소 선택 상태도 초기화
                const addressParts = filters.address?.split(' ') || []
                setSelectedCity(addressParts[0] || '')
                setSelectedDistrict(addressParts[1] || '')
                setSelectedDong(addressParts[2] || '')
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
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <FilterIcon size={16} />
                  필터{activeCount > 0 ? `(${activeCount})` : ''}
                </span>
              </button>
            }
          >
            {(api) => (
              <div
                style={{
                  padding: 12,
                  width: 440,
                  minWidth: 440,
                  maxWidth: 440,
                  display: 'grid',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 12,
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
                      inputStyle={{ padding: '6px 10px', borderRadius: 6, fontSize: 14 }}
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
                    <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>주소</div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div>
                        <select
                          value={selectedCity}
                          onChange={(e) => {
                            setSelectedCity(e.target.value)
                            setSelectedDistrict('')
                            setSelectedDong('')
                            const newAddress = e.target.value.trim()
                            updateTempFilter('address', newAddress)
                          }}
                          aria-label="시 선택"
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #cbd5e1',
                            borderRadius: 8,
                            background: '#fff',
                            fontSize: 14,
                            width: '100%',
                          }}
                        >
                          <option value="">시/도</option>
                          {ADDRESS_OPTIONS.map((opt) => (
                            <option key={opt.city} value={opt.city}>
                              {opt.city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => {
                            setSelectedDistrict(e.target.value)
                            setSelectedDong('')
                            const newAddress = `${selectedCity} ${e.target.value}`.trim()
                            updateTempFilter('address', newAddress)
                          }}
                          aria-label="구 선택"
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #cbd5e1',
                            borderRadius: 8,
                            background: '#fff',
                            fontSize: 14,
                            width: '100%',
                          }}
                          disabled={!selectedCity}
                        >
                          <option value="">구/군</option>
                          {ADDRESS_OPTIONS.find((opt) => opt.city === selectedCity)?.districts.map(
                            (opt) => (
                              <option key={opt.name} value={opt.name}>
                                {opt.name}
                              </option>
                            ),
                          )}
                        </select>
                      </div>
                      <div>
                        <select
                          value={selectedDong}
                          onChange={(e) => {
                            setSelectedDong(e.target.value)
                            const newAddress =
                              `${selectedCity} ${selectedDistrict} ${e.target.value}`.trim()
                            updateTempFilter('address', newAddress)
                          }}
                          aria-label="동 선택"
                          style={{
                            padding: '6px 10px',
                            border: '1px solid #cbd5e1',
                            borderRadius: 8,
                            background: '#fff',
                            fontSize: 14,
                            width: '100%',
                          }}
                          disabled={!selectedDistrict}
                        >
                          <option value="">동/면/읍</option>
                          {ADDRESS_OPTIONS.find((opt) => opt.city === selectedCity)
                            ?.districts.find((dist) => dist.name === selectedDistrict)
                            ?.dong?.map((dong) => (
                              <option key={dong} value={dong}>
                                {dong}
                              </option>
                            ))}
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
                        inputStyle={{ padding: '6px 10px', borderRadius: 6, fontSize: 14 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {NATIONALITY_OPTIONS.filter((opt) =>
                        opt.label.toLowerCase().includes(nationalityQ.toLowerCase()),
                      )
                        .slice(0, 5)
                        .map((opt) =>
                          renderPill(
                            tempFilters.nationality || '',
                            (value) => updateTempFilter('nationality', value),
                            opt.label,
                          ),
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
                        inputStyle={{ padding: '6px 10px', borderRadius: 6, fontSize: 14 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {SPECIALTY_OPTIONS.filter((opt) =>
                        opt.label.toLowerCase().includes(specialtyQ.toLowerCase()),
                      )
                        .slice(0, 5)
                        .map((opt) =>
                          renderPill(
                            tempFilters.specialty || '',
                            (value) => updateTempFilter('specialty', value),
                            opt.label,
                          ),
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
                        inputStyle={{ padding: '6px 10px', borderRadius: 6, fontSize: 14 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {LANGUAGE_OPTIONS.filter((opt) =>
                        opt.label.toLowerCase().includes(languageQ.toLowerCase()),
                      )
                        .slice(0, 5)
                        .map((opt) =>
                          renderPill(
                            tempFilters.languages || '',
                            (value) => updateTempFilter('languages', value),
                            opt.label,
                          ),
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
                      ] as const
                    ).map((g) => (
                      <button
                        key={g.key}
                        type="button"
                        aria-pressed={tempFilters.gender === g.key}
                        onClick={() => updateTempFilter('gender', g.key)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: '1px solid #cbd5e1',
                          background: tempFilters.gender === g.key ? '#2563eb' : '#ffffff',
                          color: tempFilters.gender === g.key ? '#ffffff' : '#0f172a',
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
                    position: 'sticky',
                    bottom: 0,
                    borderTop: '1px solid #e2e8f0',
                    background: '#fff',
                    paddingTop: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={reset}
                    disabled={!isDirty || isApplying}
                    className="iconBtn"
                    style={{
                      border: '1px solid #cbd5e1',
                      opacity: isDirty && !isApplying ? 1 : 0.5,
                    }}
                    aria-label="모든 필터 초기화"
                  >
                    초기화
                  </button>
                  <button
                    type="button"
                    className="iconBtn"
                    style={{ border: '1px solid #2563eb', background: '#2563eb', color: '#fff' }}
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
            style={{ border: '1px solid #2563eb', background: '#2563eb', color: '#fff' }}
            onClick={applyFilters}
            aria-label="검색 실행"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <SearchIcon size={16} />
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
              }}
            >
              이름: {filters.name} ×
            </button>
          )}
          {filters.address && (
            <button
              type="button"
              className="iconBtn"
              onClick={() => updateFilter('address', '')}
              style={{
                display: 'inline-block',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                padding: '4px 8px',
                borderRadius: 999,
              }}
            >
              주소: {filters.address} ×
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
              }}
            >
              성별: {filters.gender === 'male' ? '남' : '여'} ×
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
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {[
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
                    '비자타입',
                    '문신 위치',
                    '비고',
                  ].map((h) => (
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
                  <tr
                    key={idx}
                    onClick={() => setSelectedModelId(r.id)}
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
                      {'-'}
                    </td>
                  </tr>
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
