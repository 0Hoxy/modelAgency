/**
 * Dashboard Stats Page
 */
import { BarSpark } from '@organisms/dashboard/BarSpark'
import { MetricsTable } from '@organisms/dashboard/MetricsTable'
import { SidebarLayout } from '@templates/SidebarLayout'

export default function DashboardStats() {
  // 제품/트래픽 지표
  const productRows = [
    { metric: '일간 활성 사용자', value: 5421, change: '+8.4%' },
    { metric: '신규 등록 모델(7일)', value: 28, change: '+9.1%' },
    { metric: '페이지 평균 체류시간', value: '2m 34s', change: '+6s' },
    { metric: '이탈률', value: '38.2%', change: '-1.3pp' },
  ]
  // 비즈니스/운영 지표
  const businessRows = [
    { metric: '월간 매출(MRR)', value: '₩4.1M', change: '+4.5%' },
    { metric: '월간 지출', value: '₩12.4M', change: '-2.3%' },
    { metric: '미처리 문의', value: 7, change: '-3' },
    { metric: '평균 첫 응답 시간', value: '1.8h', change: '-0.3h' },
  ]

  const weeklyTraffic = [65, 40, 80, 55, 72, 48, 90]
  const funnelRelative = [100, 68, 34, 12] // 노출→상세→가입→결제 상대치

  return (
    <SidebarLayout>
      <MetricsTable rows={productRows} title="제품/트래픽 지표" />

      <section
        style={{
          marginTop: 16,
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 16,
          background: '#fff',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0' }}>주간 트래픽</h3>
        <BarSpark heights={weeklyTraffic} maxHeight={120} barWidth={22} gap={8} />
      </section>

      <MetricsTable rows={businessRows} title="비즈니스/운영 지표" />

      <section
        style={{
          marginTop: 16,
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: 16,
          background: '#fff',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0' }}>전환 퍼널(상대치)</h3>
        <BarSpark heights={funnelRelative} maxHeight={120} barWidth={32} gap={10} />
      </section>
    </SidebarLayout>
  )
}
