/**
 * Models - Camera Test (카메라테스트)
 */
import 'react-datepicker/dist/react-datepicker.css'

import { SidebarLayout } from '@templates/SidebarLayout'
import { Search as SearchIcon } from '@utils/icon'
import { ko } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

// 한국어 로케일 등록
registerLocale('ko', ko)

import type { CameraTestModel, CameraTestStatus } from '../../types/camera-test'
import {
  filterByTestDate,
  generateMockCameraTestData,
  searchModels,
  updateCameraTestStatus,
} from '../../utils/camera-test'

export default function CameraTest() {
  const [allModels, setAllModels] = useState<CameraTestModel[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // 오늘 날짜를 기본값으로 설정
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)

    // Mock 데이터 로드
    const mockData = generateMockCameraTestData()
    setAllModels(mockData)
    setIsLoading(false)
  }, [])

  // 필터링된 모델 목록
  const filteredModels = useMemo(() => {
    let filtered = allModels

    // 날짜별 필터링
    if (selectedDate) {
      filtered = filterByTestDate(filtered, selectedDate)
    }

    // 검색 필터링
    if (searchTerm) {
      filtered = searchModels(filtered, searchTerm)
    }

    return filtered
  }, [allModels, selectedDate, searchTerm])

  // 상태 변경 핸들러
  const handleStatusChange = (id: string, newStatus: CameraTestStatus) => {
    setAllModels((prev) => updateCameraTestStatus(prev, id, newStatus))
  }

  // 상태별 개수 계산
  const statusCounts = useMemo(() => {
    const counts = { 대기중: 0, 테스트: 0, 완료: 0 }
    filteredModels.forEach((model) => {
      counts[model.status]++
    })
    return counts
  }, [filteredModels])

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
            </div>

            {/* 날짜 선택 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label htmlFor="testDate" style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                테스트 일자:
              </label>
              <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date: Date | null) => {
                  if (date) {
                    setSelectedDate(date.toISOString().split('T')[0])
                  }
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜 선택"
                locale="ko"
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      ←
                    </button>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>
                      {date.getFullYear()}년 {date.getMonth() + 1}월
                    </span>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      →
                    </button>
                  </div>
                )}
                customInput={
                  <input
                    style={{
                      padding: '4px 11px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#ffffff',
                      width: '160px',
                      height: '32px',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                      cursor: 'pointer',
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      lineHeight: '1.5715',
                      boxShadow: 'none',
                    }}
                  />
                }
                popperClassName="custom-datepicker-popper"
                calendarClassName="custom-datepicker-calendar"
                popperPlacement="bottom-start"
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
            {filteredModels.length === 0 ? (
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
              filteredModels.map((model) => (
                <tr key={model.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#0f172a' }}>
                    {model.name}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.birth}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.nationality}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.height}cm
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.agency}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748b' }}>
                    {model.visaType}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={model.status}
                      onChange={(e) =>
                        handleStatusChange(model.id, e.target.value as CameraTestStatus)
                      }
                      style={{
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 500,
                        ...getStatusBadgeStyle(model.status),
                      }}
                    >
                      <option value="대기중">대기중</option>
                      <option value="테스트">테스트</option>
                      <option value="완료">완료</option>
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
        총 {filteredModels.length}명의 모델이 {selectedDate}에 카메라테스트 예정입니다.
      </div>
    </SidebarLayout>
  )
}
