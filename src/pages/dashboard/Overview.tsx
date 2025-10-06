/**
 * Dashboard Overview Page - 모델 중심 대시보드
 */
import { type DashboardResponse, type DashboardSummary, getDashboardData } from '@api/dashboard'
import { KpiCard } from '@organisms/dashboard/KpiCard'
import { SidebarLayout } from '@templates/SidebarLayout'
import { AlertTriangle, Camera, MapPin, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardOverview() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API 데이터 로드
  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getDashboardData()
        setDashboardData(data)
      } catch (err: unknown) {
        console.error('Dashboard API Error:', err)

        // 상세 에러 정보
        const error = err as {
          response?: { status?: number; data?: { detail?: string } }
          message?: string
        }
        const errorDetail = error?.response?.data?.detail || error?.message || '알 수 없는 오류'
        const errorStatus = error?.response?.status || 'Unknown'

        console.error('Error Details:', {
          status: errorStatus,
          detail: errorDetail,
          fullError: error?.response?.data,
        })

        setError(
          `대시보드 데이터를 불러오는데 실패했습니다.\n\nStatus: ${errorStatus}\nDetail: ${errorDetail}`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  // 데이터 또는 기본값 사용
  const summary: DashboardSummary = dashboardData?.summary || {
    today_registrations: 0,
    today_incomplete_camera_tests: 0,
    incomplete_addresses: 0,
  }

  const kpis = [
    {
      label: '금일 등록',
      value: summary.today_registrations,
      icon: <Users size={16} />,
      accentColor: '#2563eb',
      description: '오늘 등록된 모델 수',
    },
    {
      label: '카메라테스트 미완료',
      value: summary.today_incomplete_camera_tests,
      icon: <Camera size={16} />,
      accentColor: '#d97706',
      description: '금일 테스트 대기 중',
    },
    {
      label: '주소록 미완료',
      value: summary.incomplete_addresses,
      icon: <MapPin size={16} />,
      accentColor: '#ef4444',
      description: '주소 정보 미입력',
    },
  ]

  // 최근 활동 (weekly_stats 기반)
  const recentActivities = dashboardData?.weekly_stats.daily_registrations
    .filter((stat) => stat.count > 0) // 0이 아닌 데이터만 표시
    .slice(-5)
    .reverse()
    .map((stat) => ({
      when: new Date(stat.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      text: `${stat.count}명의 모델이 등록되었습니다.`,
    }))

  const hasRecentActivity = recentActivities && recentActivities.length > 0

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* 로딩 또는 에러 상태 */}
        {isLoading && (
          <div
            style={{
              background: '#dbeafe',
              border: '1px solid #60a5fa',
              borderRadius: 8,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <AlertTriangle size={20} color="#1e40af" />
            <div>
              <div style={{ fontWeight: 600, color: '#1e40af' }}>데이터를 불러오는 중...</div>
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              background: '#fee2e2',
              border: '1px solid #ef4444',
              borderRadius: 8,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <AlertTriangle size={20} color="#991b1b" />
            <div>
              <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: 4 }}>
                데이터 로드 실패
              </div>
              <div style={{ fontSize: 14, color: '#7f1d1d' }}>{error}</div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
          }}
        >
          {kpis.map((k) => (
            <KpiCard
              key={k.label}
              label={k.label}
              value={k.value}
              icon={k.icon}
              accentColor={k.accentColor}
              description={k.description}
            />
          ))}
        </section>

        {/* 최근 활동 */}
        <section
          style={{
            background: 'white',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            padding: 16,
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 'medium' }}>최근 활동</h3>

          {hasRecentActivity ? (
            <div style={{ display: 'grid', gap: 12 }}>
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 12,
                    background: '#f9fafb',
                    borderRadius: 6,
                  }}
                >
                  <span style={{ fontSize: 14, color: '#374151' }}>{activity.text}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>{activity.when}</span>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                }}
              >
                📭
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: 8,
                }}
              >
                최근 활동 내역이 없습니다
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#9ca3af',
                }}
              >
                아직 등록된 모델이 없습니다
              </div>
            </div>
          )}
        </section>

        {/* 빠른 작업 */}
        <section
          style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            padding: 16,
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 'medium' }}>빠른 작업</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            <button
              onClick={() => (window.location.href = '/models/domestic')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
              }}
            >
              <Users size={16} />
              국내 모델 관리
            </button>

            <button
              onClick={() => (window.location.href = '/models/overseas')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
              }}
            >
              <Users size={16} />
              해외 모델 관리
            </button>

            <button
              onClick={() => (window.location.href = '/models/camera-test')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
              }}
            >
              <Camera size={16} />
              카메라 테스트
            </button>
          </div>
        </section>
      </div>
    </SidebarLayout>
  )
}
