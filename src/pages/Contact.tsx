/**
 * Contact (문의 목록)
 */
import { Badge } from '@atoms/Badge'
import { Pagination } from '@molecules/Pagination'
import { Popover } from '@molecules/Popover'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Filter } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { Contact } from '../types/contact'
import {
  filterContacts,
  formatDateTime,
  getContactStats,
  mockContacts,
  paginate,
} from '../utils/contact'

const categoryLabels: Record<string, string> = {
  'general-inquiry': '일반 문의',
  partnership: '파트너십',
  'modeling-request': '모델 요청',
  complaint: '불만 접수',
  suggestion: '건의사항',
  other: '기타',
}

const priorityLabels: Record<string, string> = {
  low: '낮음',
  medium: '보통',
  high: '높음',
  urgent: '긴급',
}

const statusLabels: Record<string, string> = {
  new: '신규',
  'in-progress': '진행중',
  resolved: '해결됨',
  closed: '종료',
}

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
}

export default function Contact() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  // Mock data
  const allContacts = mockContacts(50)

  // Calculate stats
  const stats = useMemo(() => getContactStats(allContacts), [allContacts])

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return filterContacts(allContacts, {
      search: searchTerm,
      category: selectedCategory,
      priority: selectedPriority,
      status: selectedStatus,
      isRead: showUnreadOnly ? false : undefined,
    })
  }, [allContacts, searchTerm, selectedCategory, selectedPriority, selectedStatus, showUnreadOnly])

  // Paginate filtered contacts
  const paginatedContacts = useMemo(() => {
    return paginate(filteredContacts, currentPage, pageSize)
  }, [filteredContacts, currentPage, pageSize])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategory) count++
    if (selectedPriority) count++
    if (selectedStatus) count++
    if (showUnreadOnly) count++
    return count
  }, [selectedCategory, selectedPriority, selectedStatus, showUnreadOnly])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>전체</p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#374151', margin: 0 }}>
                  {stats.total}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  총 문의 건수
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#f8fafc',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>📋</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>신규</p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
                  {stats.new}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  처리 대기중
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#eff6ff',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>🆕</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>진행중</p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#d97706', margin: 0 }}>
                  {stats.inProgress}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>처리 중</p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fef3c7',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>⏳</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>해결됨</p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
                  {stats.resolved}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  완료된 문의
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#f0fdf4',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>✅</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>
                  읽지 않음
                </p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#dc2626', margin: 0 }}>
                  {stats.unread}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  미확인 문의
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fef2f2',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>🔴</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="이름, 이메일, 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              />
            </div>
            <Popover
              trigger={
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Filter size={16} />
                  필터
                  {activeFiltersCount > 0 && (
                    <span
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        fontSize: 12,
                        borderRadius: 10,
                        padding: '2px 6px',
                      }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              }
            >
              {({ close }) => (
                <div style={{ padding: 16, minWidth: 300 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 'medium', margin: 0, marginBottom: 16 }}>
                    필터 옵션
                  </h3>

                  <div style={{ display: 'grid', gap: 16 }}>
                    <div>
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 'medium',
                          marginBottom: 8,
                          display: 'block',
                        }}
                      >
                        카테고리
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">전체</option>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 'medium',
                          marginBottom: 8,
                          display: 'block',
                        }}
                      >
                        우선순위
                      </label>
                      <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">전체</option>
                        {Object.entries(priorityLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 'medium',
                          marginBottom: 8,
                          display: 'block',
                        }}
                      >
                        상태
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">전체</option>
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="checkbox"
                          checked={showUnreadOnly}
                          onChange={(e) => setShowUnreadOnly(e.target.checked)}
                        />
                        <span style={{ fontSize: 14 }}>읽지 않은 문의만 보기</span>
                      </label>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      justifyContent: 'flex-end',
                      marginTop: 16,
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory('')
                        setSelectedPriority('')
                        setSelectedStatus('')
                        setShowUnreadOnly(false)
                        close()
                      }}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        background: 'white',
                        color: '#374151',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      초기화
                    </button>
                    <button
                      onClick={close}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#3b82f6',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      적용
                    </button>
                  </div>
                </div>
              )}
            </Popover>
          </div>
        </div>

        {/* Contacts Table */}
        <div
          style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    문의자
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    제목
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    카테고리
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    우선순위
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    상태
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    담당자
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    생성일
                  </th>
                  <th
                    style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.data.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
                      문의 내역이 없습니다
                    </td>
                  </tr>
                ) : (
                  paginatedContacts.data.map((contact) => (
                    <tr key={contact.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div>
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: 'medium',
                              margin: 0,
                              marginBottom: 4,
                            }}
                          >
                            {contact.name}
                            {!contact.isRead && (
                              <span style={{ marginLeft: 8, fontSize: 11, color: '#dc2626' }}>
                                ●
                              </span>
                            )}
                          </p>
                          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
                            {contact.email}
                          </p>
                          {contact.company && (
                            <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 2 }}>
                              {contact.company}
                            </p>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div>
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: 'medium',
                              margin: 0,
                              marginBottom: 4,
                            }}
                          >
                            {contact.title}
                          </p>
                          <p
                            style={{
                              fontSize: 12,
                              color: '#64748b',
                              margin: 0,
                              maxWidth: 200,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {contact.message}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <Badge color="primary">
                          {categoryLabels[contact.category] || contact.category}
                        </Badge>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <Badge className={priorityColors[contact.priority]}>
                          {priorityLabels[contact.priority] || contact.priority}
                        </Badge>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <Badge className={statusColors[contact.status]}>
                          {statusLabels[contact.status] || contact.status}
                        </Badge>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <p style={{ fontSize: 13, margin: 0 }}>{contact.assignedTo || '-'}</p>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <p style={{ fontSize: 13, margin: 0 }}>
                          {formatDateTime(contact.createdAt)}
                        </p>
                      </td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              background: 'white',
                              color: '#374151',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                          >
                            보기
                          </button>
                          <button
                            style={{
                              padding: '4px 8px',
                              border: 'none',
                              borderRadius: '4px',
                              background: '#3b82f6',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                          >
                            답변
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {paginatedContacts.totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={paginatedContacts.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}
