import {
  DollarSign,
  Download,
  Filter,
  Gift,
  Plus,
  Search,
  TrendingUp,
  Upload,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover } from '../../components/molecules/Popover'
import { TextField } from '../../components/molecules/TextField'
import { SidebarLayout } from '../../components/templates/SidebarLayout'
import { mockBenefitCategories, mockBenefitRequests } from '../../utils/hr'

export default function HrBenefits() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState<'requests' | 'categories'>('requests')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')

  // Mock data
  const categories = useMemo(() => mockBenefitCategories(), [])
  const requests = useMemo(() => mockBenefitRequests(), [])

  // Summary statistics
  const summaryStats = useMemo(() => {
    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
    const totalUsed = categories.reduce((sum, cat) => sum + cat.usedAmount, 0)
    const totalRequests = requests.length
    const pendingRequests = requests.filter((r) => r.status === 'requested').length

    return {
      totalBudget,
      totalUsed,
      totalRequests,
      pendingRequests,
      utilizationRate: totalBudget > 0 ? (totalUsed / totalBudget) * 100 : 0,
    }
  }, [categories, requests])

  return (
    <SidebarLayout>
      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <DollarSign size={20} style={{ color: '#3b82f6' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>총 예산</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
            {summaryStats.totalBudget.toLocaleString()}원
          </div>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <TrendingUp size={20} style={{ color: '#10b981' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>사용액</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
            {summaryStats.totalUsed.toLocaleString()}원
          </div>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Users size={20} style={{ color: '#f59e0b' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>총 신청</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
            {summaryStats.totalRequests}건
          </div>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Gift size={20} style={{ color: '#ef4444' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>대기중</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
            {summaryStats.pendingRequests}건
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <button
          onClick={() => setSelectedTab('requests')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            borderBottom:
              selectedTab === 'requests' ? '2px solid #3b82f6' : '2px solid transparent',
            color: selectedTab === 'requests' ? '#3b82f6' : '#6b7280',
            fontWeight: selectedTab === 'requests' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          신청 관리
        </button>
        <button
          onClick={() => setSelectedTab('categories')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            borderBottom:
              selectedTab === 'categories' ? '2px solid #3b82f6' : '2px solid transparent',
            color: selectedTab === 'categories' ? '#3b82f6' : '#6b7280',
            fontWeight: selectedTab === 'categories' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          예산 관리
        </button>
      </div>

      {/* Filters and Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <TextField
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leading={<Search size={16} />}
            style={{ width: '300px' }}
          />

          <Popover
            trigger={
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                <Filter size={14} />
                필터
              </button>
            }
          >
            <div style={{ padding: '16px', minWidth: '200px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  상태
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                  }}
                >
                  <option value="">전체</option>
                  <option value="requested">신청</option>
                  <option value="approved">승인</option>
                  <option value="rejected">거부</option>
                  <option value="processed">처리완료</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  카테고리
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                  }}
                >
                  <option value="">전체</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Popover>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              border: 'none',
              background: 'transparent',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <Plus size={16} />
            신청 등록
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              border: 'none',
              background: 'transparent',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <Upload size={16} />
            일괄 업로드
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              border: 'none',
              background: 'transparent',
              color: '#374151',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            <Download size={16} />
            내보내기
          </button>
        </div>
      </div>

      {/* Content - 간단한 버전 */}
      <div
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          flex: 1,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <Gift size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>복리후생 관리</h3>
          <p>복리후생 신청 및 예산 관리 기능이 구현됩니다.</p>
        </div>
      </div>
    </SidebarLayout>
  )
}
