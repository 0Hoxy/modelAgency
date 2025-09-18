/**
 * Hr: 인사 관련 페이지 메뉴
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { Link } from 'react-router-dom'

export default function Hr() {
  const hrMenus = [
    { label: '구성원 관리', to: '/hr/members', description: '직원 정보 및 조직 관리' },
    { label: '채용 관리', to: '/hr/recruit', description: '채용 공고 및 지원자 관리' },
    { label: '성과 평가', to: '/hr/performance', description: '직원 성과 평가 및 목표 관리' },
    { label: '근태 관리', to: '/hr/attendance', description: '출퇴근 및 근무시간 관리' },
    { label: '급여 관리', to: '/hr/payroll', description: '급여 계산 및 지급 관리' },
    { label: '교육 관리', to: '/hr/training', description: '교육 과정 및 수강 현황 관리' },
    { label: '복리후생', to: '/hr/benefits', description: '복리후생 예산 및 신청 관리' },
  ]

  return (
    <SidebarLayout>
      <div style={{ padding: '24px', height: '100vh' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>인사 관리</h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            직원 관리 및 HR 업무를 통합적으로 처리합니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {hrMenus.map((menu) => (
            <Link
              key={menu.to}
              to={menu.to}
              style={{
                display: 'block',
                padding: '24px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#111827',
                }}
              >
                {menu.label}
              </h3>
              <p
                style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {menu.description}
              </p>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: '40px',
            padding: '24px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#374151' }}>
            HR 시스템 주요 기능
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '14px', color: '#6b7280' }}>• 직원 정보 통합 관리</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>• 채용 프로세스 자동화</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>• 성과 평가 시스템</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>• 근태 및 급여 관리</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>• 교육 과정 운영</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>• 복리후생 예산 관리</div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
