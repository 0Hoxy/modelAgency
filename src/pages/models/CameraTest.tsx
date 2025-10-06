/**
 * Models - Camera Test (카메라테스트)
 */
import { getCameraTestList, updateCameraTestStatus } from '@api/models'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Search as SearchIcon } from '@utils/icon'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'

import type { CameraTestStatus } from '../../types/camera-test'

type Row = {
  id: string
  name: string
  birth_date: string
  nationality?: string | null
  height?: number | null
  agency_name?: string | null
  visa_type?: string | null
  status?: string | null
}

export default function CameraTest() {
  const [rows, setRows] = useState<Row[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 오늘 날짜를 기본값으로 설정
  useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const target_date = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined
        const list = await getCameraTestList({ target_date })

        type CameraTestIncoming = {
          id?: string | null
          model_id?: string | null
          name?: string | null
          model_name?: string | null
          full_name?: string | null
          birth_date?: string | null
          birth?: string | null
          date_of_birth?: string | null
          dob?: string | null
          nationality?: string | null
          nationality_name?: string | null
          height?: number | null
          height_cm?: number | null
          agency_name?: string | null
          agency?: string | null
          agencyName?: string | null
          visa_type?: string | null
          visaType?: string | null
          visa?: string | null
          status?: string | null
          model?: {
            id?: string | null
            name?: string | null
            birth_date?: string | null
            birth?: string | null
            date_of_birth?: string | null
            nationality?: string | null
            height?: number | null
            agency_name?: string | null
            agency?: string | null
            visa_type?: string | null
            visa?: string | null
          } | null
        }

        if (import.meta.env.DEV) {
          console.debug('CameraTest raw sample:', Array.isArray(list) ? list.slice(0, 3) : list)
        }

        const pick = <T,>(...vals: Array<T | null | undefined>): T | null => {
          for (const v of vals) {
            if (v !== undefined && v !== null && String(v).length > 0) return v as T
          }
          return null
        }

        // 백엔드 상태를 프론트엔드 상태로 변환
        const backendToFrontendStatus = (backendStatus: string | null | undefined): string => {
          const statusMap: Record<string, string> = {
            PENDING: '대기중',
            CONFIRMED: '테스트',
            COMPLETED: '완료',
            CANCELLED: '취소',
          }
          return backendStatus ? statusMap[backendStatus] || '대기중' : '대기중'
        }

        const mapped: Row[] = (list as CameraTestIncoming[]).map((m) => {
          const nested = m.model ?? null
          // model_id (UUID)를 우선 사용 - API 호출에 필요
          const id = pick<string>(m.model_id, nested?.id) ?? ''

          if (import.meta.env.DEV && !id) {
            console.warn('⚠️ model_id not found:', {
              m_id: m.id,
              model_id: m.model_id,
              nested_id: nested?.id,
            })
          }

          const name = pick<string>(m.name, m.model_name, m.full_name, nested?.name) ?? ''
          const birth =
            pick<string>(
              m.birth_date,
              m.birth,
              m.date_of_birth,
              m.dob,
              nested?.birth_date,
              nested?.birth,
              nested?.date_of_birth,
            ) ?? ''
          const nationality = pick<string>(m.nationality, m.nationality_name, nested?.nationality)
          const height = pick<number>(m.height, m.height_cm, nested?.height)
          const agencyName = pick<string>(
            m.agency_name,
            m.agency,
            m.agencyName,
            nested?.agency_name,
            nested?.agency,
          )
          const visaType = pick<string>(
            m.visa_type,
            m.visaType,
            m.visa,
            nested?.visa_type,
            nested?.visa,
          )
          const rawStatus = pick<string>(m.status)
          const status = backendToFrontendStatus(rawStatus)

          return {
            id,
            name,
            birth_date: birth,
            nationality,
            height: (height as number | null) ?? null,
            agency_name: agencyName,
            visa_type: visaType,
            status,
          }
        })
        setRows(mapped)
      } catch (e: unknown) {
        setError('카메라테스트 목록을 불러오지 못했습니다.')
        console.error('CameraTest API Error:', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchList()
  }, [selectedDate])

  // 필터링된 모델 목록
  const filteredRows = useMemo(() => {
    let filtered = rows
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((m) =>
        [m.name, m.nationality ?? '', m.agency_name ?? '', m.visa_type ?? '']
          .join('\n')
          .toLowerCase()
          .includes(term),
      )
    }
    return filtered
  }, [rows, searchTerm])

  // 프론트엔드 상태를 백엔드 상태로 변환
  const frontendToBackendStatus = (frontendStatus: CameraTestStatus): string => {
    const statusMap: Record<CameraTestStatus, string> = {
      대기중: 'PENDING',
      테스트: 'CONFIRMED',
      완료: 'COMPLETED',
      취소: 'CANCELLED',
    }
    return statusMap[frontendStatus] || 'PENDING'
  }

  // 상태 변경 핸들러
  const handleStatusChange = async (id: string, newStatus: CameraTestStatus) => {
    const prev = rows.find((r) => r.id === id)?.status as CameraTestStatus | undefined
    // 낙관적 업데이트
    setRows((prevRows) => prevRows.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
    try {
      const backendStatus = frontendToBackendStatus(newStatus)
      await updateCameraTestStatus({ id, status: backendStatus })
      console.log('✅ 상태 변경 성공:', { id, newStatus, backendStatus })
    } catch (error: unknown) {
      console.error('❌ 상태 변경 실패:', error)
      const err = error as { response?: { data?: { detail?: string; message?: string } } }
      const errorMsg =
        err.response?.data?.detail || err.response?.data?.message || '상태 변경에 실패했습니다.'
      alert(errorMsg)
      // 롤백
      setRows((prevRows) =>
        prevRows.map((r) => (r.id === id ? { ...r, status: prev ?? '대기중' } : r)),
      )
    }
  }

  // 상태별 개수 계산
  const statusCounts = useMemo(() => {
    type Status = CameraTestStatus
    const counts: Record<Status, number> = { 대기중: 0, 테스트: 0, 완료: 0, 취소: 0 }
    filteredRows.forEach((m) => {
      const s = (m.status ?? '대기중') as Status
      counts[s] += 1
    })
    return counts
  }, [filteredRows])

  // 상태 배지 스타일
  const getStatusBadgeStyle = (status: CameraTestStatus) => {
    switch (status) {
      case '대기중':
        return {
          background: '#fef3c7',
          color: '#92400e',
          border: '1px solid #fbbf24',
        }
      case '테스트':
        return {
          background: '#dbeafe',
          color: '#1e40af',
          border: '1px solid #3b82f6',
        }
      case '완료':
        return {
          background: '#d1fae5',
          color: '#065f46',
          border: '1px solid #10b981',
        }
      case '취소':
        return {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #ef4444',
        }
      default:
        return {
          background: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
        }
    }
  }

  if (isLoading) {
    return (
      <SidebarLayout>
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          카메라테스트 데이터를 불러오는 중...
        </div>
      </SidebarLayout>
    )
  }

  if (error) {
    return (
      <SidebarLayout>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>{error}</div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout>
      {/* 헤더 섹션 */}
      <div style={{ marginBottom: 24 }}>
        {/* 필터 및 검색 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          {/* 검색 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SearchIcon size={16} color="#64748b" />
            <input
              type="text"
              placeholder="이름, 국적, 소속사, 비자타입으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14,
                width: 280,
                background: '#fff',
              }}
            />
          </div>

          {/* 우측 섹션: 상태 요약 + 날짜 선택 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 상태별 요약 */}
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                대기중: {statusCounts.대기중}명
              </span>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                테스트: {statusCounts.테스트}명
              </span>
              <span style={{ fontSize: 12, color: '#64748b' }}>완료: {statusCounts.완료}명</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>취소: {statusCounts.취소}명</span>
            </div>

            {/* 날짜 선택 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label htmlFor="testDate" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                테스트 일자:
              </label>
              <input
                type="date"
                value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  setSelectedDate(e.target.value ? new Date(e.target.value) : undefined)
                }
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  width: '160px',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모델 목록 테이블 */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                이름
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                생년월일
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                국적
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                키
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                소속사
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                비자타입
              </th>
              <th
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: 14,
                  }}
                >
                  선택한 날짜에 테스트 예정인 모델이 없습니다.
                </td>
              </tr>
            ) : (
              filteredRows.map((model) => (
                <tr key={model.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#0f172a' }}>
                    {model.name}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.birth_date}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.nationality || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.height ? `${model.height}cm` : '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.agency_name || '-'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.visa_type || '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={(model.status as CameraTestStatus) || '대기중'}
                      onChange={(e) =>
                        handleStatusChange(model.id, e.target.value as CameraTestStatus)
                      }
                      style={{
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 500,
                        ...getStatusBadgeStyle(
                          ((model.status as CameraTestStatus) || '대기중') as CameraTestStatus,
                        ),
                      }}
                    >
                      <option value="대기중">대기중</option>
                      <option value="테스트">테스트</option>
                      <option value="완료">완료</option>
                      <option value="취소">취소</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 결과 요약 */}
      <div
        style={{
          marginTop: 16,
          padding: '12px 16px',
          background: '#f8fafc',
          borderRadius: 6,
          fontSize: 14,
          color: '#64748b',
        }}
      >
        총 {filteredRows.length}명의 모델이{' '}
        {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '선택된 날짜'}에 카메라테스트
        예정입니다.
      </div>
    </SidebarLayout>
  )
}
