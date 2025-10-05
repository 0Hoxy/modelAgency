import {
  BarChart3,
  Download,
  Filter,
  Plus,
  Search,
  Star,
  Target,
  Upload,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover } from '../../components/molecules/Popover'
import { TextField } from '../../components/molecules/TextField'
import { SidebarLayout } from '../../components/templates/SidebarLayout'
import type { PerformanceFeedback, PerformanceGoal, PerformanceReview } from '../../types/hr'
import {
  mockPerformanceFeedbacks,
  mockPerformanceGoals,
  mockPerformanceReviews,
  paginate,
} from '../../utils/hr'

export default function HrPerformance() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState<'reviews' | 'goals' | 'feedbacks'>('reviews')
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<PerformanceGoal | null>(null)
  const [selectedFeedback, setSelectedFeedback] = useState<PerformanceFeedback | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [periodFilter, setPeriodFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(15)

  // Mock data
  const goals = useMemo(() => mockPerformanceGoals(), [])
  const reviews = useMemo(() => mockPerformanceReviews(), [])
  const feedbacks = useMemo(() => mockPerformanceFeedbacks(), [])

  // Filter data
  const filteredReviews = useMemo(() => {
    let filtered = reviews

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (review) =>
          review.employeeName.toLowerCase().includes(query) ||
          review.department.toLowerCase().includes(query) ||
          review.reviewerName.toLowerCase().includes(query),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((review) => review.status === statusFilter)
    }

    if (periodFilter) {
      filtered = filtered.filter((review) => review.period === periodFilter)
    }

    return filtered
  }, [reviews, searchQuery, statusFilter, periodFilter])

  const filteredGoals = useMemo(() => {
    let filtered = goals

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (goal) =>
          goal.title.toLowerCase().includes(query) ||
          goal.description.toLowerCase().includes(query),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((goal) => goal.status === statusFilter)
    }

    return filtered
  }, [goals, searchQuery, statusFilter])

  const filteredFeedbacks = useMemo(() => {
    let filtered = feedbacks

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (feedback) =>
          feedback.fromEmployeeName.toLowerCase().includes(query) ||
          feedback.toEmployeeName.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [feedbacks, searchQuery])

  const paginatedReviews = useMemo(
    () => paginate(filteredReviews, currentPage, pageSize),
    [filteredReviews, currentPage, pageSize],
  )

  const paginatedGoals = useMemo(
    () => paginate(filteredGoals, currentPage, pageSize),
    [filteredGoals, currentPage, pageSize],
  )

  const paginatedFeedbacks = useMemo(
    () => paginate(filteredFeedbacks, currentPage, pageSize),
    [filteredFeedbacks, currentPage, pageSize],
  )

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return '초안'
      case 'in_progress':
        return '진행중'
      case 'completed':
        return '완료'
      case 'cancelled':
        return '취소'
      case 'active':
        return '활성'
      default:
        return status
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'work':
        return '업무'
      case 'development':
        return '개발'
      case 'behavior':
        return '행동'
      default:
        return category
    }
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        style={{
          color: i < rating ? '#fbbf24' : '#d1d5db',
          fill: i < rating ? '#fbbf24' : 'none',
        }}
      />
    ))
  }

  // Summary statistics
  const summaryStats = useMemo(() => {
    const totalReviews = reviews.length
    const completedReviews = reviews.filter((r) => r.status === 'completed').length
    const averageRating =
      reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length : 0
    const totalGoals = goals.length

    return {
      totalReviews,
      completedReviews,
      averageRating,
      totalGoals,
      completionRate: totalReviews > 0 ? (completedReviews / totalReviews) * 100 : 0,
    }
  }, [reviews, goals])

  return (
    <SidebarLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px',
            flexShrink: 0,
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
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <BarChart3 size={20} style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>총 평가</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
              {summaryStats.totalReviews}건
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
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Target size={20} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>완료율</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
              {summaryStats.completionRate.toFixed(1)}%
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
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Star size={20} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>평균 점수</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
              {summaryStats.averageRating.toFixed(1)}점
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
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}
            >
              <Users size={20} style={{ color: '#8b5cf6' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>총 목표</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
              {summaryStats.totalGoals}개
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
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSelectedTab('reviews')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom:
                selectedTab === 'reviews' ? '2px solid #3b82f6' : '2px solid transparent',
              color: selectedTab === 'reviews' ? '#3b82f6' : '#6b7280',
              fontWeight: selectedTab === 'reviews' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            성과 평가
          </button>
          <button
            onClick={() => setSelectedTab('goals')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom: selectedTab === 'goals' ? '2px solid #3b82f6' : '2px solid transparent',
              color: selectedTab === 'goals' ? '#3b82f6' : '#6b7280',
              fontWeight: selectedTab === 'goals' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            목표 관리
          </button>
          <button
            onClick={() => setSelectedTab('feedbacks')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom:
                selectedTab === 'feedbacks' ? '2px solid #3b82f6' : '2px solid transparent',
              color: selectedTab === 'feedbacks' ? '#3b82f6' : '#6b7280',
              fontWeight: selectedTab === 'feedbacks' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            360도 피드백
          </button>
        </div>

        {/* Filters and Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexShrink: 0,
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
                    gap: '8px',
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Filter size={16} />
                  필터
                </button>
              }
            >
              <div style={{ padding: '16px', minWidth: '200px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
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
                    {selectedTab === 'reviews' ? (
                      <>
                        <option value="draft">초안</option>
                        <option value="in_progress">진행중</option>
                        <option value="completed">완료</option>
                        <option value="cancelled">취소</option>
                      </>
                    ) : (
                      <>
                        <option value="draft">초안</option>
                        <option value="active">활성</option>
                        <option value="completed">완료</option>
                        <option value="cancelled">취소</option>
                      </>
                    )}
                  </select>
                </div>

                {selectedTab === 'reviews' && (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 500,
                        marginBottom: '8px',
                      }}
                    >
                      평가 기간
                    </label>
                    <select
                      value={periodFilter}
                      onChange={(e) => setPeriodFilter(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                      }}
                    >
                      <option value="">전체</option>
                      <option value="2023-Q4">2023년 4분기</option>
                      <option value="2024-Q1">2024년 1분기</option>
                      <option value="2024-Q2">2024년 2분기</option>
                      <option value="2024-Q3">2024년 3분기</option>
                      <option value="2024-Q4">2024년 4분기</option>
                    </select>
                  </div>
                )}
              </div>
            </Popover>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Plus size={16} />
              {selectedTab === 'reviews'
                ? '평가 생성'
                : selectedTab === 'goals'
                  ? '목표 설정'
                  : '피드백 요청'}
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
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
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Download size={16} />
              내보내기
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
              }}
            >
              {/* Table Header */}
              <div
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #e5e7eb',
                  background: '#f9fafb',
                }}
              >
                {selectedTab === 'reviews' ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                      gap: '16px',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    <div>직원명</div>
                    <div style={{ textAlign: 'center' }}>부서</div>
                    <div style={{ textAlign: 'center' }}>평가자</div>
                    <div style={{ textAlign: 'center' }}>기간</div>
                    <div style={{ textAlign: 'center' }}>평점</div>
                  </div>
                ) : selectedTab === 'goals' ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                      gap: '16px',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    <div>목표명</div>
                    <div style={{ textAlign: 'center' }}>카테고리</div>
                    <div style={{ textAlign: 'center' }}>목표값</div>
                    <div style={{ textAlign: 'center' }}>실제값</div>
                    <div style={{ textAlign: 'center' }}>진행률</div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                      gap: '16px',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    <div>피드백 제공자</div>
                    <div style={{ textAlign: 'center' }}>피드백 대상자</div>
                    <div style={{ textAlign: 'center' }}>카테고리</div>
                    <div style={{ textAlign: 'center' }}>평점</div>
                    <div style={{ textAlign: 'center' }}>제출일</div>
                  </div>
                )}
              </div>

              {/* Table Body */}
              <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ minWidth: '800px' }}>
                    {selectedTab === 'reviews'
                      ? paginatedReviews.data.map((review) => (
                          <div
                            key={review.id}
                            onClick={() => setSelectedReview(review)}
                            style={{
                              padding: '16px',
                              borderBottom: '1px solid #f3f4f6',
                              cursor: 'pointer',
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                              gap: '16px',
                              alignItems: 'center',
                              background: selectedReview?.id === review.id ? '#eff6ff' : 'white',
                            }}
                          >
                            <div style={{ fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap' }}>
                              {review.employeeName}
                            </div>
                            <div
                              style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                            >
                              {review.department}
                            </div>
                            <div
                              style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                            >
                              {review.reviewerName}
                            </div>
                            <div
                              style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                            >
                              {review.period}
                            </div>
                            <div
                              style={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              {getRatingStars(review.overallRating)}
                            </div>
                          </div>
                        ))
                      : selectedTab === 'goals'
                        ? paginatedGoals.data.map((goal) => (
                            <div
                              key={goal.id}
                              onClick={() => setSelectedGoal(goal)}
                              style={{
                                padding: '16px',
                                borderBottom: '1px solid #f3f4f6',
                                cursor: 'pointer',
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                                gap: '16px',
                                alignItems: 'center',
                                background: selectedGoal?.id === goal.id ? '#eff6ff' : 'white',
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontWeight: 500,
                                    marginBottom: '4px',
                                    fontSize: 13,
                                  }}
                                >
                                  {goal.title}
                                </div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: '#6b7280',
                                  }}
                                >
                                  {goal.description}
                                </div>
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {getCategoryText(goal.category)}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {goal.targetValue}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {goal.actualValue}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {goal.progress}%
                              </div>
                            </div>
                          ))
                        : paginatedFeedbacks.data.map((feedback) => (
                            <div
                              key={feedback.id}
                              onClick={() => setSelectedFeedback(feedback)}
                              style={{
                                padding: '16px',
                                borderBottom: '1px solid #f3f4f6',
                                cursor: 'pointer',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                gap: '16px',
                                alignItems: 'center',
                                background:
                                  selectedFeedback?.id === feedback.id ? '#eff6ff' : 'white',
                              }}
                            >
                              <div style={{ fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap' }}>
                                {feedback.fromEmployeeName}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {feedback.toEmployeeName}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {feedback.category === 'peer'
                                  ? '동료'
                                  : feedback.category === 'subordinate'
                                    ? '부하직원'
                                    : '자기평가'}
                              </div>
                              <div
                                style={{
                                  textAlign: 'center',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                {getRatingStars(feedback.rating)}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {feedback.submittedAt}
                              </div>
                            </div>
                          ))}
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div
                style={{
                  padding: '16px',
                  borderTop: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      background: 'white',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      opacity: currentPage === 1 ? 0.5 : 1,
                    }}
                  >
                    이전
                  </button>

                  <span style={{ padding: '8px 16px', fontSize: '14px' }}>
                    {currentPage} /{' '}
                    {selectedTab === 'reviews'
                      ? paginatedReviews.totalPages
                      : selectedTab === 'goals'
                        ? paginatedGoals.totalPages
                        : paginatedFeedbacks.totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={
                      currentPage >=
                      (selectedTab === 'reviews'
                        ? paginatedReviews.totalPages
                        : selectedTab === 'goals'
                          ? paginatedGoals.totalPages
                          : paginatedFeedbacks.totalPages)
                    }
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      background: 'white',
                      cursor:
                        currentPage >=
                        (selectedTab === 'reviews'
                          ? paginatedReviews.totalPages
                          : selectedTab === 'goals'
                            ? paginatedGoals.totalPages
                            : paginatedFeedbacks.totalPages)
                          ? 'not-allowed'
                          : 'pointer',
                      opacity:
                        currentPage >=
                        (selectedTab === 'reviews'
                          ? paginatedReviews.totalPages
                          : selectedTab === 'goals'
                            ? paginatedGoals.totalPages
                            : paginatedFeedbacks.totalPages)
                          ? 0.5
                          : 1,
                    }}
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Card */}
          <div style={{ width: '400px', minWidth: '400px' }}>
            <div
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '24px',
                height: 'fit-content',
              }}
            >
              {selectedTab === 'reviews' ? (
                selectedReview ? (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                      성과 평가 상세
                    </h3>

                    <div style={{ marginBottom: '16px' }}>
                      <h4
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        기본 정보
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>직원:</strong> {selectedReview.employeeName}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>부서:</strong> {selectedReview.department}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>평가자:</strong> {selectedReview.reviewerName}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>평가 기간:</strong> {selectedReview.period}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>평점:</strong> {selectedReview.overallRating}/5
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>상태:</strong>{' '}
                          <span
                            className={getStatusColor(selectedReview.status)}
                            style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '12px',
                            }}
                          >
                            {getStatusText(selectedReview.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h4
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        강점
                      </h4>
                      <div style={{ fontSize: '14px' }}>
                        {selectedReview.strengths.map((strength: string, index: number) => (
                          <div key={index} style={{ marginBottom: '4px' }}>
                            • {strength}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        개선사항
                      </h4>
                      <div style={{ fontSize: '14px' }}>
                        {selectedReview.improvements.map((improvement: string, index: number) => (
                          <div key={index} style={{ marginBottom: '4px' }}>
                            • {improvement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                    <BarChart3 size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <p>성과 평가를 선택하세요</p>
                  </div>
                )
              ) : selectedTab === 'goals' ? (
                selectedGoal ? (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                      목표 상세
                    </h3>

                    <div style={{ marginBottom: '16px' }}>
                      <h4
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        기본 정보
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>목표명:</strong> {selectedGoal.title}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>설명:</strong> {selectedGoal.description}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>카테고리:</strong> {getCategoryText(selectedGoal.category)}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>목표값:</strong> {selectedGoal.targetValue}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>실제값:</strong> {selectedGoal.actualValue}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>가중치:</strong> {selectedGoal.weight}%
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>진행률:</strong> {selectedGoal.progress}%
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>기간:</strong> {selectedGoal.startDate} ~ {selectedGoal.endDate}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        진행률
                      </h4>
                      <div
                        style={{
                          width: '100%',
                          height: '8px',
                          background: '#e5e7eb',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${selectedGoal.progress}%`,
                            height: '100%',
                            background:
                              selectedGoal.progress > 80
                                ? '#10b981'
                                : selectedGoal.progress > 60
                                  ? '#f59e0b'
                                  : '#3b82f6',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                    <Target size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <p>목표를 선택하세요</p>
                  </div>
                )
              ) : selectedFeedback ? (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                    피드백 상세
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        marginBottom: '8px',
                        color: '#374151',
                      }}
                    >
                      기본 정보
                    </h4>
                    <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>피드백 제공자:</strong> {selectedFeedback.fromEmployeeName}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>피드백 대상자:</strong> {selectedFeedback.toEmployeeName}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>카테고리:</strong>{' '}
                        {selectedFeedback.category === 'peer'
                          ? '동료'
                          : selectedFeedback.category === 'subordinate'
                            ? '부하직원'
                            : '자기평가'}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>평점:</strong> {selectedFeedback.rating}/5
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>제출일:</strong> {selectedFeedback.submittedAt}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        marginBottom: '8px',
                        color: '#374151',
                      }}
                    >
                      피드백 내용
                    </h4>
                    <div
                      style={{
                        fontSize: '14px',
                        padding: '12px',
                        background: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      {selectedFeedback.feedback}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                  <Users size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>피드백을 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
