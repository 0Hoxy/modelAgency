/**
 * Header: 사이트 상단 네비게이션 오거니즘. 주요 페이지 링크 제공.
 */
import { Heading } from '@atoms/Heading'

export function Header() {
  return (
    <header className="header">
      {/* 상단 바: 로고 좌측, 종 아이콘 우측 */}
      <div className="header__inner" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <Heading level={3} className="header__brand">
          ModelAgency
        </Heading>
        <div />
        <div className="header__actions">
          <button aria-label="알림" title="알림" className="iconBtn">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C10.343 2 9 3.343 9 5V5.337C6.718 6.165 5 8.39 5 10.875V15l-1.447 2.171C3.2 17.63 3.57 18 4.053 18H19.947c.483 0 .853-.37.5-.829L19 15v-4.125C19 8.39 17.282 6.165 15 5.337V5c0-1.657-1.343-3-3-3Z"
                stroke="#0f172a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 19c.5 1.2 1.7 2 3 2s2.5-.8 3-2"
                stroke="#0f172a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 하단 바: 중앙 네비게이터 */}
      <div className="header__inner" style={{ gridTemplateColumns: '1fr' }}>
        <nav className="header__nav" style={{ justifyContent: 'center' }}>
          <a className="header__link" href="#">
            모델
          </a>
          <a className="header__link" href="#">
            인사
          </a>
          <a className="header__link" href="#">
            회계
          </a>
        </nav>
      </div>
    </header>
  )
}
