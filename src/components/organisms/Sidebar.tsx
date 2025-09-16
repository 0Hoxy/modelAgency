/**
 * Sidebar: 좌측 내비게이션 오거니즘. 주요 섹션으로 이동하는 링크 제공.
 */
import { Bell, Moon, Sun, Monitor, Check, Cog, LogOut, User } from '@utils/icon'
import { Popover } from '@molecules/Popover'
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
  const item = (to: string, label: string) => (
    <Link
      key={to}
      to={to}
      style={{
        ...linkStyle,
        background: pathname === to ? '#e2e8f0' : 'transparent',
        fontWeight: pathname === to ? 600 : 400,
      }}
    >
      {label}
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
          gap: 30,
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
                >
                  <Monitor size={16} /> 시스템 {false && <Check size={14} />}
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
                >
                  <Moon size={16} /> 다크 {false && <Check size={14} />}
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
                >
                  <Sun size={16} /> 라이트 {false && <Check size={14} />}
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
        <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
        <nav
          style={{
            display: 'grid',
            gap: 4,
            alignContent: 'start',
            overflowY: 'auto',
            marginTop: 8,
          }}
        >
          {item('/dashboard', '대시보드')}
          {item('/models', '모델')}
          {item('#', '인사')}
          {item('#', '회계')}
          {item('/contact', '문의')}
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
                    background: '#e2e8f0',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#475569',
                    fontSize: 12,
                  }}
                >
                  <User size={16} />
                </span>
                <span style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.1 }}>홍길동</div>
                  <div style={{ color: '#64748b', fontSize: 12, lineHeight: 1.1 }}>
                    manager@company.com
                  </div>
                </span>
              </button>
            }
          >
            <div style={{ display: 'grid', gap: 6, minWidth: 180 }}>
              <button
                type="button"
                className="iconBtn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'flex-start',
                  border: 'none',
                }}
              >
                <Cog size={16} /> 설정
              </button>
              <button
                type="button"
                className="iconBtn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'flex-start',
                  border: 'none',
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
