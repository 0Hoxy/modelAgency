/**
 * MainLayout: 공통 헤더와 메인 컨테이너를 제공하는 템플릿.
 */
import { Header } from '@organisms/Header'
import type { ReactNode } from 'react'

type MainLayoutProps = { children: ReactNode }

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '16px' }}>{children}</main>
    </div>
  )
}
