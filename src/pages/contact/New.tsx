/**
 * Contact - New (새 문의)
 */
import { Badge } from '@atoms/Badge'
import { Pagination } from '@molecules/Pagination'
import { SidebarLayout } from '@templates/SidebarLayout'
import { useMemo, useState } from 'react'

import { formatDateTime, getContactStats, mockContacts, paginate } from '../../utils/contact'

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

export default function ContactNew() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  // Mock data - only unread contacts
  const allContacts = mockContacts(50)
  const unreadContacts = allContacts.filter((contact) => !contact.isRead)

  // Calculate stats for unread contacts
  const stats = useMemo(() => getContactStats(unreadContacts), [unreadContacts])

  // Paginate unread contacts
  const paginatedContacts = useMemo(() => {
    return paginate(unreadContacts, currentPage, pageSize)
  }, [unreadContacts, currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleMarkAsRead = (contactId: string) => {
    console.log('Marking contact as read:', contactId)
    // In a real app, this would update the contact's isRead status
  }

  const handleAssignTo = (contactId: string) => {
    console.log('Assigning contact:', contactId)
    // In a real app, this would assign the contact to a team member
  }

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, marginBottom: 4 }}>
              새 문의
            </h1>
            <p style={{ color: '#64748b', margin: 0 }}>
              읽지 않은 새로운 문의를 확인하고 처리합니다
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                background: '#fef2f2',
                color: '#dc2626',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'medium',
              }}
            >
              {stats.unread}건의 새 문의
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>
                  총 새 문의
                </p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#dc2626', margin: 0 }}>
                  {stats.unread}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  처리 대기중
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
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 8 }}>
                  긴급 문의
                </p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#ea580c', margin: 0 }}>
                  {unreadContacts.filter((c) => c.priority === 'urgent').length}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  우선 처리 필요
                </p>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#fff7ed',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20 }}>🚨</span>
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
                  높은 우선순위
                </p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#d97706', margin: 0 }}>
                  {unreadContacts.filter((c) => c.priority === 'high').length}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  빠른 응답 필요
                </p>
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
                <span style={{ fontSize: 20 }}>⭐</span>
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
                  파트너십 문의
                </p>
                <p style={{ fontSize: 24, fontWeight: 'bold', color: '#2563eb', margin: 0 }}>
                  {unreadContacts.filter((c) => c.category === 'partnership').length}
                </p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0, marginTop: 4 }}>
                  비즈니스 기회
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
                <span style={{ fontSize: 20 }}>🤝</span>
              </div>
            </div>
          </div>
        </div>

        {/* New Contacts Table */}
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
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    문의자
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    제목
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    카테고리
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    우선순위
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    상태
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    생성일
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 'medium',
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.data.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
                      새로운 문의가 없습니다
                    </td>
                  </tr>
                ) : (
                  paginatedContacts.data.map((contact) => (
                    <tr key={contact.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 12 }}>
                        <div>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 'medium',
                              margin: 0,
                              marginBottom: 4,
                            }}
                          >
                            {contact.name}
                            <span style={{ marginLeft: 8, fontSize: 12, color: '#dc2626' }}>●</span>
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
                      <td style={{ padding: 12 }}>
                        <div>
                          <p
                            style={{
                              fontSize: 14,
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
                      <td style={{ padding: 12 }}>
                        <Badge color="primary">
                          {categoryLabels[contact.category] || contact.category}
                        </Badge>
                      </td>
                      <td style={{ padding: 12 }}>
                        <Badge className={priorityColors[contact.priority]}>
                          {priorityLabels[contact.priority] || contact.priority}
                        </Badge>
                      </td>
                      <td style={{ padding: 12 }}>
                        <Badge className={statusColors[contact.status]}>
                          {statusLabels[contact.status] || contact.status}
                        </Badge>
                      </td>
                      <td style={{ padding: 12 }}>
                        <p style={{ fontSize: 14, margin: 0 }}>
                          {formatDateTime(contact.createdAt)}
                        </p>
                      </td>
                      <td style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            onClick={() => handleMarkAsRead(contact.id)}
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
                            읽음
                          </button>
                          <button
                            onClick={() => handleAssignTo(contact.id)}
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
                            담당지정
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
