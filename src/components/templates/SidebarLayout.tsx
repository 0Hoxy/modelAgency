/**
 * SidebarLayout: 좌측 사이드바와 콘텐츠 영역을 제공하는 템플릿.
 */
import { Sidebar } from '@organisms/Sidebar'
import type { ReactNode } from 'react'

type SidebarLayoutProps = { children: ReactNode }

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 16, maxWidth: 1200, margin: '0 auto' }}>{children}</main>
    </div>
  )
}
