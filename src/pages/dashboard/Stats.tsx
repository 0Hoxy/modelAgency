/**
 * Dashboard Stats Page - 모델 등록 통계
 */
import { type DashboardResponse, getDashboardData } from '@api/dashboard'
import { BarSpark } from '@organisms/dashboard/BarSpark'
import { SidebarLayout } from '@templates/SidebarLayout'
import { AlertTriangle, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardStats() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d'>('30d')
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
      } catch (err) {
        console.error('Dashboard API Error:', err)
        setError('통계 데이터를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  // 데이터 또는 기본값 사용
  const weeklyData = dashboardData?.weekly_stats.daily_registrations || []
  const monthlyData = dashboardData?.monthly_stats.daily_registrations || []

  // 차트 데이터 준비
  const chartData = selectedPeriod === '7d' ? weeklyData : monthlyData
  const chartHeights = chartData.length > 0 ? chartData.map((d) => d.count) : [0, 0, 0, 0, 0, 0, 0]

  // 통계 요약
  const totalRegistrations = chartData.reduce((sum, d) => sum + d.count, 0)
  const avgDaily = chartData.length > 0 ? Math.round(totalRegistrations / chartData.length) : 0
  const maxDaily = chartData.length > 0 ? Math.max(...chartData.map((d) => d.count)) : 0

  // 데이터 존재 여부
  const hasData = totalRegistrations > 0

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

        {/* Period Selector */}
        <section
          style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            padding: 16,
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 'medium' }}>분석 기간</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['7d', '30d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: selectedPeriod === period ? '#3b82f6' : 'white',
                  color: selectedPeriod === period ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedPeriod === period ? 'medium' : 'normal',
                }}
              >
                {period === '7d' ? '최근 7일' : '최근 30일'}
              </button>
            ))}
          </div>
        </section>

        {/* 통계 요약 카드 */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <Users size={16} color="#2563eb" />
              <span style={{ fontSize: '14px', fontWeight: 'medium', color: '#374151' }}>
                총 등록
              </span>
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '4px',
              }}
            >
              {totalRegistrations}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {selectedPeriod === '7d' ? '최근 7일' : '최근 30일'}
            </div>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <TrendingUp size={16} color="#16a34a" />
              <span style={{ fontSize: '14px', fontWeight: 'medium', color: '#374151' }}>
                일평균
              </span>
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '4px',
              }}
            >
              {avgDaily}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>하루 평균 등록 수</div>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <TrendingUp size={16} color="#d97706" />
              <span style={{ fontSize: '14px', fontWeight: 'medium', color: '#374151' }}>최대</span>
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '4px',
              }}
            >
              {maxDaily}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>하루 최대 등록 수</div>
          </div>
        </section>

        {/* Chart Section */}
        <section
          style={{
            background: 'white',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            padding: 16,
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>일별 모델 등록 추이</h3>

          {hasData ? (
            <>
              <BarSpark heights={chartHeights} maxHeight={120} barWidth={22} gap={8} />
              <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>
                {selectedPeriod === '7d' ? '최근 7일간의 등록 추이' : '최근 30일간의 등록 추이'}
              </div>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>📊</div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: 8,
                }}
              >
                등록된 모델이 없습니다
              </div>
              <div style={{ fontSize: 14, color: '#9ca3af' }}>
                {selectedPeriod === '7d'
                  ? '최근 7일간 등록된 모델이 없습니다'
                  : '최근 30일간 등록된 모델이 없습니다'}
              </div>
            </div>
          )}
        </section>

        {/* 날짜별 상세 데이터 - 데이터가 있을 때만 표시 */}
        {hasData && chartData.length > 0 && (
          <section
            style={{
              background: 'white',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              padding: 16,
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 'medium' }}>
              날짜별 상세 데이터
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                      }}
                    >
                      날짜
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                      }}
                    >
                      등록 수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData
                    .filter((data) => data.count > 0) // 0이 아닌 데이터만 표시
                    .map((data, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: '1px solid #f3f4f6',
                        }}
                      >
                        <td style={{ padding: '12px 16px', fontSize: 13 }}>{data.date}</td>
                        <td
                          style={{
                            padding: '12px 16px',
                            fontSize: 13,
                            textAlign: 'right',
                            fontWeight: 600,
                          }}
                        >
                          {data.count}명
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </SidebarLayout>
  )
}
