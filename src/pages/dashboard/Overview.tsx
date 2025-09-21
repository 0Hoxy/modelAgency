/**
 * Dashboard Overview Page - 재구성된 대시보드
 */
import { ActivityFeed } from '@organisms/dashboard/ActivityFeed'
import { BarSpark } from '@organisms/dashboard/BarSpark'
import { KpiCard } from '@organisms/dashboard/KpiCard'
import { SidebarLayout } from '@templates/SidebarLayout'
import { Cog, Mail, User, Users, Wallet } from '@utils/icon'
import { useMemo } from 'react'

import { getContactStats, mockContacts } from '../../utils/contact'
import { calculateTotals, formatCurrency, mockExpenses, mockIncome } from '../../utils/finance'

export default function DashboardOverview() {
  // Mock data from our new pages
  const contacts = mockContacts(50)
  const expenses = mockExpenses(50)
  const income = mockIncome(30)

  // Calculate real metrics
  const contactStats = useMemo(() => getContactStats(contacts), [contacts])

  const financialMetrics = useMemo(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Filter current month data
    const currentMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
    })

    const currentMonthIncome = income.filter((incomeItem) => {
      const incomeDate = new Date(incomeItem.date)
      return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear
    })

    const totalExpenses = calculateTotals(currentMonthExpenses).total
    const totalIncome = calculateTotals(currentMonthIncome).total
    const netProfit = totalIncome - totalExpenses

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      expenseCount: currentMonthExpenses.length,
      incomeCount: currentMonthIncome.length,
    }
  }, [expenses, income])

  // Calculate urgent contacts
  const urgentContacts = contacts.filter((c) => c.priority === 'urgent' && !c.isRead).length
  const partnershipContacts = contacts.filter(
    (c) => c.category === 'partnership' && !c.isRead,
  ).length

  const kpis = [
    // 문의 관리 (새로 추가된 페이지)
    {
      label: '새 문의',
      value: contactStats.unread,
      delta: urgentContacts > 0 ? `긴급 ${urgentContacts}건` : undefined,
      icon: <Mail size={16} />,
      accentColor: urgentContacts > 0 ? '#ef4444' : '#3b82f6',
      description: '읽지 않은 문의',
    },
    {
      label: '진행중 문의',
      value: contactStats.inProgress,
      delta: '+2',
      icon: <Cog size={16} />,
      accentColor: '#d97706',
      description: '처리 중인 문의',
    },
    {
      label: '파트너십 기회',
      value: partnershipContacts,
      delta: partnershipContacts > 0 ? '비즈니스 기회' : undefined,
      icon: <Users size={16} />,
      accentColor: '#2563eb',
      description: '새로운 파트너십 문의',
    },

    // 회계 관리 (새로 추가된 페이지)
    {
      label: '이번 달 수익',
      value: formatCurrency(financialMetrics.totalIncome),
      delta: financialMetrics.incomeCount > 0 ? `${financialMetrics.incomeCount}건` : undefined,
      icon: <Users size={16} />,
      accentColor: '#16a34a',
      description: '현재 월 기준',
    },
    {
      label: '이번 달 지출',
      value: formatCurrency(financialMetrics.totalExpenses),
      delta: financialMetrics.expenseCount > 0 ? `${financialMetrics.expenseCount}건` : undefined,
      icon: <Users size={16} />,
      accentColor: '#dc2626',
      description: '현재 월 기준',
    },
    {
      label: '순이익',
      value: formatCurrency(financialMetrics.netProfit),
      delta: financialMetrics.netProfit >= 0 ? '흑자' : '적자',
      icon: <Wallet size={16} />,
      accentColor: financialMetrics.netProfit >= 0 ? '#16a34a' : '#dc2626',
      description: '수익 - 지출',
    },

    // 모델 관리 (기존)
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

    // 인사 관리 (기존)
    {
      label: '재직 인원',
      value: 32,
      delta: '+1',
      icon: <User size={16} />,
      accentColor: '#16a34a',
      description: '정규 24 / 계약 6 / 외주 2',
    },
    {
      label: '평가 진행률',
      value: '68%',
      icon: <Cog size={16} />,
      accentColor: '#10b981',
      description: '제출 68% / 확정 42%',
    },

    // 알림 및 경고
    {
      label: '긴급 처리 필요',
      value: urgentContacts,
      delta: urgentContacts > 0 ? '즉시 처리' : '정상',
      icon: <Cog size={16} />,
      accentColor: urgentContacts > 0 ? '#ef4444' : '#16a34a',
      description: '긴급 우선순위 문의',
    },
  ]

  // 실제 활동 데이터 기반 활동 피드
  const activities = useMemo(() => {
    const recentActivities: Array<{ when: string; text: string }> = []

    // 최근 문의 활동
    const recentContacts = contacts
      .filter((c) => !c.isRead)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)

    recentContacts.forEach((contact) => {
      const timeAgo = getTimeAgo(contact.createdAt)
      recentActivities.push({
        when: timeAgo,
        text: `새 문의: ${contact.name}님의 "${contact.title}"`,
      })
    })

    // 최근 수익 활동
    const recentIncome = income
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2)

    recentIncome.forEach((incomeItem) => {
      const timeAgo = getTimeAgo(incomeItem.date)
      recentActivities.push({
        when: timeAgo,
        text: `수익 등록: ${formatCurrency(incomeItem.amount)} - ${incomeItem.description}`,
      })
    })

    return recentActivities.slice(0, 5)
  }, [contacts, income])

  // 시간 계산 함수
  function getTimeAgo(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return '방금 전'
    if (diffInHours < 24) return `${diffInHours}시간 전`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}일 전`
    return `${Math.floor(diffInDays / 7)}주 전`
  }

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 16 }}>
        {/* Header */}
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, marginBottom: 4 }}>대시보드</h1>
          <p style={{ color: '#64748b', margin: 0 }}>전체 시스템 현황을 한눈에 확인하세요</p>
        </div>

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
              delta={k.delta}
              icon={k.icon}
              accentColor={k.accentColor}
              description={k.description}
            />
          ))}
        </section>

        {/* Charts and Activity Section */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 16,
          }}
        >
          <ActivityFeed items={activities} />

          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 16,
              background: '#fff',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0' }}>월별 수익/지출 추이</h3>
            <BarSpark heights={[48, 72, 60, 96, 80, 64, 100]} />
            <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>
              최근 7일간의 수익/지출 패턴
            </div>
          </div>
        </section>

        {/* Quick Actions */}
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
              <Mail size={16} />새 문의 확인
              {contactStats.unread > 0 && (
                <span
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    fontSize: 12,
                    borderRadius: 10,
                    padding: '2px 6px',
                    marginLeft: 'auto',
                  }}
                >
                  {contactStats.unread}
                </span>
              )}
            </button>

            <button
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
              <Wallet size={16} />
              지출 등록
            </button>

            <button
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
              수익 등록
            </button>

            <button
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
              <Cog size={16} />
              리포트 생성
            </button>
          </div>
        </section>
      </div>
    </SidebarLayout>
  )
}
