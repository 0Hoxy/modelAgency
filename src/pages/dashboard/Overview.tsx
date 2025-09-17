/**
 * Dashboard Overview Page
 */
import { ActivityFeed } from '@organisms/dashboard/ActivityFeed'
import { BarSpark } from '@organisms/dashboard/BarSpark'
import { KpiCard } from '@organisms/dashboard/KpiCard'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Cog, Mail, User, Users, Wallet } from '@utils/icon'

export default function DashboardOverview() {
  const kpis = [
    // 모델
    {
      label: '총 등록 모델',
      value: 186,
      delta: '+4.2%',
      icon: <Users size={16} />,
      accentColor: '#2563eb',
      description: '비활성 12% 포함',
    },
    {
      label: '신규 등록(7일)',
      value: 28,
      delta: '+9.1%',
      icon: <Users size={16} />,
      accentColor: '#60a5fa',
      description: '주간 증가 추이',
    },
    {
      label: '공개/비공개 비율',
      value: '72% / 28%',
      icon: <Users size={16} />,
      accentColor: '#93c5fd',
      description: '접근 정책 현황',
    },

    // 인사
    {
      label: '재직 인원',
      value: 32,
      delta: '+1',
      icon: <User size={16} />,
      accentColor: '#16a34a',
      description: '정규 24 / 계약 6 / 외주 2',
    },
    {
      label: '입·퇴사(월)',
      value: '+2',
      icon: <User size={16} />,
      accentColor: '#22c55e',
      description: '입사 3 / 퇴사 1',
    },
    {
      label: '평가 진행률',
      value: '68%',
      icon: <Cog size={16} />,
      accentColor: '#10b981',
      description: '제출 68% / 확정 42%',
    },

    // 회계
    {
      label: '월간 지출',
      value: '₩12.4M',
      delta: '-2.3%',
      icon: <Wallet size={16} />,
      accentColor: '#f59e0b',
      description: '전월 대비',
    },
    {
      label: 'MRR / ARR',
      value: '₩4.1M / ₩49.2M',
      icon: <Wallet size={16} />,
      accentColor: '#fb923c',
      description: '정기 매출 지표',
    },
    {
      label: '현금 유동성',
      value: '7.2개월',
      icon: <Wallet size={16} />,
      accentColor: '#fbbf24',
      description: '예상 지출 커버',
    },

    // 문의
    {
      label: '미처리 티켓',
      value: 7,
      delta: '-3',
      icon: <Mail size={16} />,
      accentColor: '#ef4444',
      description: 'SLA 24h/48h 모니터링',
    },
    {
      label: '평균 첫 응답',
      value: '1.8h',
      icon: <Mail size={16} />,
      accentColor: '#f87171',
      description: '주간 평균, 목표 2h',
    },
    {
      label: '재오픈 비율',
      value: '3.1%',
      icon: <Mail size={16} />,
      accentColor: '#fca5a5',
      description: '품질 지표',
    },
  ]
  const activities = [
    { when: '방금 전', text: '새 모델 “A-2029”이 등록되었습니다.' },
    { when: '1시간 전', text: '사용자 김지원 님이 요금제를 변경했습니다.' },
    { when: '어제', text: '회계 리포트가 생성되었습니다.' },
  ]

  return (
    <SidebarLayout>
      <section
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}
      >
        {kpis.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            icon={k.icon}
            accentColor={k.accentColor}
            description={k.description}
          />
        ))}
      </section>

      <section style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <ActivityFeed items={activities} />

        <div
          style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#fff' }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>간단한 트래픽</h3>
          <BarSpark heights={[48, 72, 60, 96, 80, 64, 100]} />
        </div>
      </section>
    </SidebarLayout>
  )
}
