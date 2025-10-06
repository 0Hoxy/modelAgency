/**
 * 시스템 설정 페이지 - General Settings
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { Cog } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function SettingsGeneral() {
  const { pathname } = useLocation()

  const settingsMenus = [
    { path: '/settings/users', label: '계정 관리' },
    { path: '/settings/permissions', label: '권한 관리' },
    { path: '/settings/general', label: '시스템 설정' },
  ]

  return (
    <SidebarLayout>
      {/* 설정 메뉴 탭 */}
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

      {/* 준비 중 메시지 */}
      <div
        style={{
          padding: '60px 40px',
          background: '#f9fafb',
          border: '2px dashed #e5e7eb',
          borderRadius: '16px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <Cog size={40} color="white" strokeWidth={2} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, marginBottom: '12px' }}>
          시스템 설정 페이지
        </h2>
        <p style={{ fontSize: '16px', color: '#71717a', margin: 0 }}>
          시스템 설정 기능이 곧 추가됩니다
        </p>
      </div>
    </SidebarLayout>
  )
}
