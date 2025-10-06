/**
 * 계정 관리 페이지 - User Account Management
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { Check, Search, UserCheck, UserX, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface User {
  id: string
  name: string
  email: string
  role: string
  requestDate: string
  approvedDate?: string
  status: 'pending' | 'active' | 'inactive'
}

// 임시 데이터
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: '김관리',
    email: 'kim@example.com',
    role: '관리자',
    requestDate: '2025-01-15',
    status: 'pending',
  },
  {
    id: '2',
    name: '이담당',
    email: 'lee@example.com',
    role: '관리자',
    requestDate: '2025-01-14',
    approvedDate: '2025-01-14',
    status: 'active',
  },
  {
    id: '3',
    name: '박매니저',
    email: 'park@example.com',
    role: '매니저',
    requestDate: '2025-01-10',
    approvedDate: '2025-01-11',
    status: 'active',
  },
  {
    id: '4',
    name: '최직원',
    email: 'choi@example.com',
    role: '직원',
    requestDate: '2025-01-05',
    approvedDate: '2025-01-06',
    status: 'inactive',
  },
]

type TabType = 'pending' | 'active' | 'inactive'

export default function SettingsUsers() {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [users] = useState<User[]>(MOCK_USERS)

  const filteredUsers = users.filter(
    (user) =>
      user.status === activeTab &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleApprove = (userId: string) => {
    if (confirm('이 계정을 승인하시겠습니까?')) {
      // TODO: API 호출
      alert(`계정이 승인되었습니다. (ID: ${userId})`)
    }
  }

  const handleReject = (userId: string) => {
    if (confirm('이 계정 요청을 거부하시겠습니까?')) {
      // TODO: API 호출
      alert(`계정 요청이 거부되었습니다. (ID: ${userId})`)
    }
  }

  const handleToggleActive = (userId: string, currentStatus: string) => {
    const action = currentStatus === 'active' ? '비활성화' : '활성화'
    if (confirm(`이 계정을 ${action}하시겠습니까?`)) {
      // TODO: API 호출
      alert(`계정이 ${action}되었습니다. (ID: ${userId})`)
    }
  }

  const tabs = [
    {
      id: 'pending' as TabType,
      label: '승인 대기',
      count: users.filter((u) => u.status === 'pending').length,
    },
    {
      id: 'active' as TabType,
      label: '활성 계정',
      count: users.filter((u) => u.status === 'active').length,
    },
    {
      id: 'inactive' as TabType,
      label: '비활성 계정',
      count: users.filter((u) => u.status === 'inactive').length,
    },
  ]

  const settingsMenus = [
    { path: '/settings/users', label: '계정 관리' },
    { path: '/settings/permissions', label: '권한 관리' },
    { path: '/settings/general', label: '시스템 설정' },
  ]

  return (
    <SidebarLayout>
      <nav
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          paddingBottom: '0px',
        }}
      >
        {settingsMenus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className="header__link"
            data-active={pathname === menu.path ? 'true' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {menu.label}
          </Link>
        ))}
      </nav>

      {/* 통계 카드 */}
      <div
        style={{
          marginTop: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            padding: '20px',
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#92400e', fontWeight: 600, marginBottom: '4px' }}>
            승인 대기
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#92400e' }}>
            {users.filter((u) => u.status === 'pending').length}
          </div>
        </div>
        <div
          style={{
            padding: '20px',
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#065f46', fontWeight: 600, marginBottom: '4px' }}>
            활성 계정
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#065f46' }}>
            {users.filter((u) => u.status === 'active').length}
          </div>
        </div>
        <div
          style={{
            padding: '20px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#991b1b', fontWeight: 600, marginBottom: '4px' }}>
            비활성 계정
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#991b1b' }}>
            {users.filter((u) => u.status === 'inactive').length}
          </div>
        </div>
      </div>

      {/* 검색 바 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search
            size={20}
            color="#71717a"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 44px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      </div>

      {/* 탭 */}
      <div
        style={{
          borderBottom: '2px solid #f3f4f6',
          marginBottom: '24px',
          display: 'flex',
          gap: '8px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 600,
              color: activeTab === tab.id ? '#3b82f6' : '#71717a',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {tab.label}
            <span
              style={{
                padding: '2px 8px',
                background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : '#f3f4f6',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                color: activeTab === tab.id ? '#3b82f6' : '#71717a',
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '800px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                  }}
                >
                  이름
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                  }}
                >
                  이메일
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                  }}
                >
                  역할
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                  }}
                >
                  요청일
                </th>
                {activeTab !== 'pending' && (
                  <th
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                    }}
                  >
                    승인일
                  </th>
                )}
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#374151',
                  }}
                >
                  작업
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === 'pending' ? 5 : 6}
                    style={{
                      padding: '60px 16px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#9ca3af',
                    }}
                  >
                    {searchQuery ? '검색 결과가 없습니다' : '등록된 계정이 없습니다'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#111827',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: 13,
                        color: '#6b7280',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {user.email}
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          background: '#eff6ff',
                          color: '#1e40af',
                          borderRadius: '12px',
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontSize: 13,
                        color: '#6b7280',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {user.requestDate}
                    </td>
                    {activeTab !== 'pending' && (
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#6b7280',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {user.approvedDate || '-'}
                      </td>
                    )}
                    <td style={{ padding: '12px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              style={{
                                padding: '6px 12px',
                                background: '#10b981',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#059669'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#10b981'
                              }}
                            >
                              <Check size={14} />
                              승인
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              style={{
                                padding: '6px 12px',
                                background: '#ef4444',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#dc2626'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#ef4444'
                              }}
                            >
                              <X size={14} />
                              거부
                            </button>
                          </>
                        )}
                        {activeTab === 'active' && (
                          <button
                            onClick={() => handleToggleActive(user.id, 'active')}
                            style={{
                              padding: '6px 12px',
                              background: '#f59e0b',
                              border: 'none',
                              borderRadius: '6px',
                              color: 'white',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#d97706'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#f59e0b'
                            }}
                          >
                            <UserX size={14} />
                            비활성화
                          </button>
                        )}
                        {activeTab === 'inactive' && (
                          <button
                            onClick={() => handleToggleActive(user.id, 'inactive')}
                            style={{
                              padding: '6px 12px',
                              background: '#3b82f6',
                              border: 'none',
                              borderRadius: '6px',
                              color: 'white',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#2563eb'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#3b82f6'
                            }}
                          >
                            <UserCheck size={14} />
                            활성화
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  )
}
