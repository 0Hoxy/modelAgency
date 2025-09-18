/**
 * SidebarLayout: 좌측 사이드바와 콘텐츠 영역을 제공하는 템플릿.
 */
import { Header } from '@organisms/Header'
import { Sidebar } from '@organisms/Sidebar'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type SidebarLayoutProps = { children: ReactNode }

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { pathname } = useLocation()

  const inSection = (prefix: string) => pathname === prefix || pathname.startsWith(prefix + '/')

  const menus = inSection('/dashboard')
    ? [
        { label: '개요', to: '/dashboard/overview' },
        { label: '통계', to: '/dashboard/stats' },
      ]
    : inSection('/models')
      ? [
          { label: '국내모델', to: '/models/domestic' },
          { label: '해외모델', to: '/models/overseas' },
          { label: '카메라테스트', to: '/models/camera-test' },
        ]
      : inSection('/hr')
        ? [
            { label: '구성원', to: '/hr/members' },
            { label: '채용', to: '/hr/recruit' },
            { label: '근태', to: '/hr/attendance' },
            { label: '급여', to: '/hr/payroll' },
            { label: '교육', to: '/hr/training' },
            { label: '복리후생', to: '/hr/benefits' },
            { label: '성과평가', to: '/hr/performance' },
          ]
        : inSection('/finance')
          ? [
              { label: '지출', to: '/finance/expenses' },
              { label: '수익', to: '/finance/income' },
              { label: '리포트', to: '/finance/reports' },
            ]
          : inSection('/contact')
            ? [
                { label: '문의 목록', to: '/contact' },
                { label: '새 문의', to: '/contact/new' },
              ]
            : undefined

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <Header menus={menus} />
        <main style={{ padding: '12px 16px', width: '100%' }}>{children}</main>
      </div>
    </div>
  )
}
