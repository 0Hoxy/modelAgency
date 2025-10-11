import { BookOpen, Download, Filter, Plus, Search, Upload, Users } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover } from '../../components/molecules/Popover'
import { TextField } from '../../components/molecules/TextField'
import { SidebarLayout } from '../../components/templates/SidebarLayout'
import type { TrainingCourse, TrainingEnrollment } from '../../types/hr'
import { mockTrainingCourses, mockTrainingEnrollments, paginate } from '../../utils/hr'

export default function HrTraining() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState<'courses' | 'enrollments'>('courses')
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null)
  const [selectedEnrollment, setSelectedEnrollment] = useState<TrainingEnrollment | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(15)

  // Mock data
  const courses = useMemo(() => mockTrainingCourses(), [])
  const enrollments = useMemo(() => mockTrainingEnrollments(), [])

  // Filter data
  const filteredCourses = useMemo(() => {
    let filtered = courses

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((course) => course.status === statusFilter)
    }

    if (categoryFilter) {
      filtered = filtered.filter((course) => course.category === categoryFilter)
    }

    return filtered
  }, [courses, searchQuery, statusFilter, categoryFilter])

  const filteredEnrollments = useMemo(() => {
    let filtered = enrollments

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (enrollment) =>
          enrollment.employeeName.toLowerCase().includes(query) ||
          enrollment.department.toLowerCase().includes(query),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((enrollment) => enrollment.status === statusFilter)
    }

    return filtered
  }, [enrollments, searchQuery, statusFilter])

  const paginatedCourses = useMemo(
    () => paginate(filteredCourses, currentPage, pageSize),
    [filteredCourses, currentPage, pageSize],
  )

  const paginatedEnrollments = useMemo(
    () => paginate(filteredEnrollments, currentPage, pageSize),
    [filteredEnrollments, currentPage, pageSize],
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'enrolled':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'dropped':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-purple-100 text-purple-800'
      case 'leadership':
        return 'bg-indigo-100 text-indigo-800'
      case 'compliance':
        return 'bg-red-100 text-red-800'
      case 'soft-skills':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '진행중'
      case 'completed':
        return '완료'
      case 'cancelled':
        return '취소'
      case 'draft':
        return '초안'
      case 'enrolled':
        return '수강신청'
      case 'in_progress':
        return '수강중'
      case 'dropped':
        return '중도포기'
      default:
        return status
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'technical':
        return '기술교육'
      case 'leadership':
        return '리더십'
      case 'compliance':
        return '준수교육'
      case 'soft-skills':
        return '소프트스킬'
      default:
        return category
    }
  }

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
            onClick={() => setSelectedTab('courses')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom:
                selectedTab === 'courses' ? '2px solid #3b82f6' : '2px solid transparent',
              color: selectedTab === 'courses' ? '#3b82f6' : '#6b7280',
              fontWeight: selectedTab === 'courses' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            교육 과정
          </button>
          <button
            onClick={() => setSelectedTab('enrollments')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom:
                selectedTab === 'enrollments' ? '2px solid #3b82f6' : '2px solid transparent',
              color: selectedTab === 'enrollments' ? '#3b82f6' : '#6b7280',
              fontWeight: selectedTab === 'enrollments' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            수강 현황
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
                      fontSize: '12px',
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
                    {selectedTab === 'courses' ? (
                      <>
                        <option value="draft">초안</option>
                        <option value="active">진행중</option>
                        <option value="completed">완료</option>
                        <option value="cancelled">취소</option>
                      </>
                    ) : (
                      <>
                        <option value="enrolled">수강신청</option>
                        <option value="in_progress">수강중</option>
                        <option value="completed">완료</option>
                        <option value="dropped">중도포기</option>
                      </>
                    )}
                  </select>
                </div>

                {selectedTab === 'courses' && (
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
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
                      <option value="technical">기술교육</option>
                      <option value="leadership">리더십</option>
                      <option value="compliance">준수교육</option>
                      <option value="soft-skills">소프트스킬</option>
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
                padding: '6px 12px',
                border: 'none',
                background: 'transparent',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              <Plus size={16} />
              {selectedTab === 'courses' ? '교육과정 등록' : '수강신청'}
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
                fontSize: '12px',
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
                fontSize: '12px',
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
                {selectedTab === 'courses' ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                      gap: '16px',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    <div>교육과정명</div>
                    <div style={{ textAlign: 'center' }}>카테고리</div>
                    <div style={{ textAlign: 'center' }}>강사</div>
                    <div style={{ textAlign: 'center' }}>기간</div>
                    <div style={{ textAlign: 'center' }}>상태</div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                      gap: '16px',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    <div>이름</div>
                    <div style={{ textAlign: 'center' }}>부서</div>
                    <div style={{ textAlign: 'center' }}>교육과정</div>
                    <div style={{ textAlign: 'center' }}>신청일</div>
                    <div style={{ textAlign: 'center' }}>상태</div>
                    <div style={{ textAlign: 'center' }}>점수</div>
                  </div>
                )}
              </div>

              {/* Table Body */}
              <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ minWidth: '800px' }}>
                    {selectedTab === 'courses'
                      ? paginatedCourses.data.map((course) => (
                          <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            style={{
                              padding: '16px',
                              borderBottom: '1px solid #f3f4f6',
                              cursor: 'pointer',
                              display: 'grid',
                              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                              gap: '16px',
                              alignItems: 'center',
                              background: selectedCourse?.id === course.id ? '#eff6ff' : 'white',
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
                                {course.title}
                              </div>
                              <div
                                style={{
                                  fontSize: 12,
                                  color: '#6b7280',
                                }}
                              >
                                {course.description}
                              </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <span
                                className={getCategoryColor(course.category)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: 12,
                                  fontWeight: 500,
                                }}
                              >
                                {getCategoryText(course.category)}
                              </span>
                            </div>
                            <div
                              style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                            >
                              {course.instructor}
                            </div>
                            <div
                              style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                            >
                              {course.startDate} ~ {course.endDate}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <span
                                className={getStatusColor(course.status)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: 12,
                                  fontWeight: 500,
                                }}
                              >
                                {getStatusText(course.status)}
                              </span>
                            </div>
                          </div>
                        ))
                      : paginatedEnrollments.data.map((enrollment) => {
                          const course = courses.find((c) => c.id === enrollment.courseId)
                          return (
                            <div
                              key={enrollment.id}
                              onClick={() => setSelectedEnrollment(enrollment)}
                              style={{
                                padding: '16px',
                                borderBottom: '1px solid #f3f4f6',
                                cursor: 'pointer',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                                gap: '16px',
                                alignItems: 'center',
                                background:
                                  selectedEnrollment?.id === enrollment.id ? '#eff6ff' : 'white',
                              }}
                            >
                              <div style={{ fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap' }}>
                                {enrollment.employeeName}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {enrollment.department}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {course?.title || 'N/A'}
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {enrollment.enrolledAt}
                              </div>
                              <div style={{ textAlign: 'center' }}>
                                <span
                                  className={getStatusColor(enrollment.status)}
                                  style={{
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: 12,
                                    fontWeight: 500,
                                  }}
                                >
                                  {getStatusText(enrollment.status)}
                                </span>
                              </div>
                              <div
                                style={{ textAlign: 'center', fontSize: 13, whiteSpace: 'nowrap' }}
                              >
                                {enrollment.score ? `${enrollment.score}점` : '-'}
                              </div>
                            </div>
                          )
                        })}
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

                  <span style={{ padding: '8px 16px', fontSize: '12px' }}>
                    {currentPage} /{' '}
                    {selectedTab === 'courses'
                      ? paginatedCourses.totalPages
                      : paginatedEnrollments.totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={
                      currentPage >=
                      (selectedTab === 'courses'
                        ? paginatedCourses.totalPages
                        : paginatedEnrollments.totalPages)
                    }
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      background: 'white',
                      cursor:
                        currentPage >=
                        (selectedTab === 'courses'
                          ? paginatedCourses.totalPages
                          : paginatedEnrollments.totalPages)
                          ? 'not-allowed'
                          : 'pointer',
                      opacity:
                        currentPage >=
                        (selectedTab === 'courses'
                          ? paginatedCourses.totalPages
                          : paginatedEnrollments.totalPages)
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
              {selectedTab === 'courses' ? (
                selectedCourse ? (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                      {selectedCourse.title}
                    </h3>

                    <div style={{ marginBottom: '16px' }}>
                      <h4
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        기본 정보
                      </h4>
                      <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>설명:</strong> {selectedCourse.description}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>카테고리:</strong> {getCategoryText(selectedCourse.category)}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>강사:</strong> {selectedCourse.instructor}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>기간:</strong> {selectedCourse.duration}시간
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>정원:</strong> {selectedCourse.maxParticipants}명
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>장소:</strong> {selectedCourse.location}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                          <strong>비용:</strong>{' '}
                          {selectedCourse.cost
                            ? `${selectedCourse.cost.toLocaleString()}원`
                            : '무료'}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h4
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        사전 요구사항
                      </h4>
                      <div style={{ fontSize: '12px' }}>
                        {selectedCourse.prerequisites?.map((prereq, index) => (
                          <div
                            key={index}
                            style={{
                              padding: '4px 8px',
                              background: '#f3f4f6',
                              borderRadius: '4px',
                              marginBottom: '4px',
                              display: 'inline-block',
                              marginRight: '8px',
                            }}
                          >
                            {prereq}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          marginBottom: '8px',
                          color: '#374151',
                        }}
                      >
                        학습 목표
                      </h4>
                      <div style={{ fontSize: '12px' }}>
                        {selectedCourse.objectives.map((objective, index) => (
                          <div key={index} style={{ marginBottom: '4px' }}>
                            • {objective}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                    <BookOpen size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <p>교육과정을 선택하세요</p>
                  </div>
                )
              ) : selectedEnrollment ? (
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
                    수강 정보
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <h4
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        marginBottom: '8px',
                        color: '#374151',
                      }}
                    >
                      수강자 정보
                    </h4>
                    <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>이름:</strong> {selectedEnrollment.employeeName}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>부서:</strong> {selectedEnrollment.department}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>신청일:</strong> {selectedEnrollment.enrolledAt}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>완료일:</strong> {selectedEnrollment.completedAt || '-'}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>점수:</strong>{' '}
                        {selectedEnrollment.score ? `${selectedEnrollment.score}점` : '-'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        marginBottom: '8px',
                        color: '#374151',
                      }}
                    >
                      피드백
                    </h4>
                    <div
                      style={{
                        fontSize: '12px',
                        padding: '12px',
                        background: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      {selectedEnrollment.feedback || '피드백이 없습니다.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                  <Users size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>수강 정보를 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
