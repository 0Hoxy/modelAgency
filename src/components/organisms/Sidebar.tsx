/**
 * Sidebar: 좌측 내비게이션 오거니즘. 주요 섹션으로 이동하는 링크 제공.
 */
import { Popover } from '@molecules/Popover'
import { type AuthState, useAuthStore } from '@stores/authStore'
import {
  Bell,
  Check,
  Cog,
  LayoutDashboard,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Sun,
  User,
  Users,
  Wallet,
} from '@utils/icon'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const linkStyle: React.CSSProperties = {
  display: 'block',
  padding: '8px 10px',
  borderRadius: 8,
  color: '#0f172a',
  textDecoration: 'none',
  fontSize: 14,
}

export function Sidebar() {
  const { pathname } = useLocation()
  const [activeTheme, setActiveTheme] = useState<'system' | 'dark' | 'light'>('system')
  const currentUser = useAuthStore((state: AuthState) => state.user)
  const logout = useAuthStore((state: AuthState) => state.logout)

  // 사용자 이니셜 생성 (이름의 첫 글자)
  const getUserInitial = () => {
    if (!currentUser?.name) return 'U'
    return currentUser.name.charAt(0).toUpperCase()
  }

  const getSectionPrefix = (path: string) => {
    const parts = path.split('/').filter(Boolean)
    return parts.length > 0 ? `/${parts[0]}` : '/'
  }
  const item = (to: string, label: string, icon?: React.ReactNode) => (
    <Link
      key={to}
      to={to}
      style={{
        ...linkStyle,
        background:
          pathname === to ||
          pathname.startsWith(getSectionPrefix(to) + '/') ||
          pathname === getSectionPrefix(to)
            ? '#e2e8f0'
            : 'transparent',
        fontWeight:
          pathname === to ||
          pathname.startsWith(getSectionPrefix(to) + '/') ||
          pathname === getSectionPrefix(to)
            ? 600
            : 400,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {icon}
        <span>{label}</span>
      </span>
    </Link>
  )
  return (
    <aside
      style={{
        width: 260,
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: '100vh',
      }}
    >
      {/* 상단 영역: 회사명 + 메뉴 */}
      <div
        style={{
          display: 'grid',
          gap: 4,
          flex: 1,
          minHeight: 0,
          alignContent: 'start',
          margin: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <strong style={{ fontSize: 18 }}>ModelAgency</strong>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Popover
              trigger={
                <button
                  aria-label="테마"
                  title="테마"
                  className="iconBtn"
                  style={{ border: '1px solid #e2e8f0' }}
                >
                  <Monitor size={18} />
                </button>
              }
            >
              <div style={{ display: 'grid', gap: 6 }}>
                <button
                  type="button"
                  className="iconBtn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'flex-start',
                  }}
                  onClick={() => setActiveTheme('system')}
                >
                  <Monitor size={16} /> 시스템 {activeTheme === 'system' && <Check size={14} />}
                </button>
                <button
                  type="button"
                  className="iconBtn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'flex-start',
                  }}
                  onClick={() => setActiveTheme('dark')}
                >
                  <Moon size={16} /> 다크 {activeTheme === 'dark' && <Check size={14} />}
                </button>
                <button
                  type="button"
                  className="iconBtn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'flex-start',
                  }}
                  onClick={() => setActiveTheme('light')}
                >
                  <Sun size={16} /> 라이트 {activeTheme === 'light' && <Check size={14} />}
                </button>
              </div>
            </Popover>
            <button
              aria-label="알림"
              title="알림"
              className="iconBtn"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <Bell size={18} />
            </button>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e2e8f0', margin: '4px -1rem' }} />
        <nav
          style={{
            display: 'grid',
            gap: 4,
            alignContent: 'start',
            overflowY: 'auto',
            marginTop: 4,
          }}
        >
          {item('/dashboard/overview', '대시보드', <LayoutDashboard size={16} />)}
          {item('/models/domestic', '모델', <Users size={16} />)}
          {item('/hr/members', '인사', <User size={16} />)}
          {item('/finance/expenses', '회계', <Wallet size={16} />)}
          {item('/contact', '문의', <Mail size={16} />)}
          <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
          {item('/settings/users', '시스템 설정', <Cog size={16} />)}
        </nav>
      </div>

      {/* 하단: 사용자 영역 (클릭 시 드롭다운) */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          display: 'grid',
          gap: 8,
        }}
      >
        <div style={{ margin: '8px' }}>
          <Popover
            trigger={
              <button
                type="button"
                aria-label="사용자 메뉴"
                title="사용자 메뉴"
                className="iconBtn"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'flex-start',
                  border: 'none',
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {getUserInitial()}
                </span>
                <span style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.1 }}>
                    {currentUser?.name || '사용자'}
                  </div>
                  <div style={{ color: '#64748b', fontSize: 12, lineHeight: 1.1 }}>
                    {currentUser?.pid || 'user@example.com'}
                  </div>
                </span>
              </button>
            }
          >
            <div style={{ display: 'grid', gap: 6, minWidth: 180 }}>
              <Link
                to="/profile/settings"
                className="iconBtn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'flex-start',
                  border: 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  fontSize: 14,
                }}
              >
                <Cog size={16} /> 설정
              </Link>
              <button
                type="button"
                className="iconBtn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'flex-start',
                  border: 'none',
                  fontSize: 14,
                }}
                onClick={() => {
                  if (confirm('로그아웃 하시겠습니까?')) {
                    logout()
                    window.location.href = '/admin/login'
                  }
                }}
              >
                <LogOut size={16} /> 로그아웃
              </button>
            </div>
          </Popover>
        </div>
      </div>
    </aside>
  )
}
