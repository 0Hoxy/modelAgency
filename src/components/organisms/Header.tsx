/**
 * Header: 사이트 상단 네비게이션 오거니즘. 주요 페이지 링크 제공.
 */
import { Link, useLocation } from 'react-router-dom'

type HeaderMenuItem = { label: string; to?: string }
type HeaderProps = { menus?: HeaderMenuItem[] }

export function Header({ menus }: HeaderProps) {
  const { pathname } = useLocation()
  return (
    <header className="header" style={{ borderBottom: 'none', boxShadow: 'none' }}>
      <div className="header__inner" style={{ gridTemplateColumns: '1fr' }}>
        <nav
          className="header__nav"
          style={{ justifyContent: 'flex-start', display: 'flex', gap: 16 }}
        >
          {(menus && menus.length > 0
            ? menus
            : [
                { label: '대시보드', to: '/dashboard/overview' },
                { label: '모델', to: '/models/list' },
                { label: '인사', to: '/hr/members' },
                { label: '회계', to: '/finance/expenses' },
              ]
          ).map((m) => (
            <Link
              key={m.label}
              className="header__link"
              to={m.to ?? '#'}
              aria-current={m.to && pathname === m.to ? 'page' : undefined}
              data-active={m.to && pathname === m.to ? 'true' : undefined}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
