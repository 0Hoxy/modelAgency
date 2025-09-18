import { useEffect, useMemo, useState } from 'react'

import { TextField } from '../../components/molecules/TextField'
import { SidebarLayout } from '../../components/templates/SidebarLayout'
import type { Candidate, JobPosting } from '../../types/hr'
import { mockCandidates, mockJobPostings, paginate } from '../../utils/hr'

export default function HrRecruit() {
  const [activeTab, setActiveTab] = useState<'candidates' | 'jobs'>('candidates')
  const [jobPostings] = useState<JobPosting[]>(mockJobPostings(12))
  const [candidates] = useState<Candidate[]>(mockCandidates(50, jobPostings))

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [department, setDepartment] = useState('')
  const [stage, setStage] = useState('')
  const [status, setStatus] = useState('')
  const [selectedJobPosting, setSelectedJobPosting] = useState('')

  // Pagination
  const [page, setPage] = useState(1)
  const pageSize = 15

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'appliedAt' | 'stage'>('appliedAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Selected candidate for detail view
  const [selected, setSelected] = useState<Candidate | null>(null)

  // Inline dropdown for stage change
  const [showStageDropdown, setShowStageDropdown] = useState(false)
  const [stageDropdownPosition, setStageDropdownPosition] = useState({ x: 0, y: 0 })

  // Memo modal
  const [showMemoModal, setShowMemoModal] = useState(false)
  const [newMemo, setNewMemo] = useState('')

  // Job posting management
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [showJobEditModal, setShowJobEditModal] = useState(false)
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null)

  // Filter and sort candidates
  const filteredCandidates = useMemo(() => {
    const filtered = candidates.filter((candidate) => {
      const matchesSearch =
        !searchQuery ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.department.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment = !department || candidate.department === department
      const matchesStage = !stage || candidate.stage === stage
      const matchesJobPosting = !selectedJobPosting || candidate.jobPostingId === selectedJobPosting

      return matchesSearch && matchesDepartment && matchesStage && matchesJobPosting
    })

    // Sort candidates
    return filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'appliedAt':
          aValue = new Date(a.appliedAt).getTime()
          bValue = new Date(b.appliedAt).getTime()
          break
        case 'stage': {
          const stageOrder = {
            applied: 1,
            screening: 2,
            interview: 3,
            offer: 4,
            hired: 5,
            rejected: 6,
          }
          aValue = stageOrder[a.stage]
          bValue = stageOrder[b.stage]
          break
        }
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [candidates, searchQuery, department, stage, selectedJobPosting, sortField, sortDirection])

  // Filter job postings
  const filteredJobs = useMemo(() => {
    return jobPostings.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment = !department || job.department === department
      const matchesStatus = !status || job.status === status

      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [jobPostings, searchQuery, department, status])

  const paginatedCandidates = useMemo(
    () => paginate(filteredCandidates, page, pageSize),
    [filteredCandidates, page, pageSize],
  )

  const paginatedJobs = useMemo(
    () => paginate(filteredJobs, page, pageSize),
    [filteredJobs, page, pageSize],
  )

  const getStageColor = (stage: Candidate['stage']) => {
    const colors = {
      applied: '#3b82f6',
      screening: '#f59e0b',
      interview: '#8b5cf6',
      offer: '#10b981',
      hired: '#059669',
      rejected: '#ef4444',
    }
    return colors[stage] || '#6b7280'
  }

  const getStageLabel = (stage: Candidate['stage']) => {
    const labels = {
      applied: '지원',
      screening: '서류심사',
      interview: '면접',
      offer: '제안',
      hired: '채용',
      rejected: '불합격',
    }
    return labels[stage] || stage
  }

  const getStatusColor = (status: JobPosting['status']) => {
    const colors = {
      draft: '#6b7280',
      active: '#10b981',
      paused: '#f59e0b',
      closed: '#ef4444',
    }
    return colors[status] || '#6b7280'
  }

  const getStatusLabel = (status: JobPosting['status']) => {
    const labels = {
      draft: '임시저장',
      active: '진행중',
      paused: '일시정지',
      closed: '마감',
    }
    return labels[status] || status
  }

  const departments = ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀', '재무팀']
  const stages: Candidate['stage'][] = [
    'applied',
    'screening',
    'interview',
    'offer',
    'hired',
    'rejected',
  ]
  const statuses: JobPosting['status'][] = ['draft', 'active', 'paused', 'closed']

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, department, stage, status])

  // Helper functions
  const selectCandidate = (candidate: Candidate) => {
    setSelected(candidate)
  }

  const closeDetail = () => {
    setSelected(null)
  }

  const openStageDropdown = (event: React.MouseEvent, candidate?: Candidate) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setStageDropdownPosition({
      x: rect.left,
      y: rect.bottom + 4,
    })
    if (candidate && candidate !== selected) {
      setSelected(candidate)
    }
    setShowStageDropdown(true)
  }

  const closeStageDropdown = () => {
    setShowStageDropdown(false)
  }

  const updateCandidateStage = (newStage: Candidate['stage']) => {
    if (selected && newStage !== selected.stage) {
      // 실제 구현에서는 API 호출
      const updatedCandidate = { ...selected, stage: newStage }
      setSelected(updatedCandidate)

      // TODO: candidates 배열도 업데이트 (실제로는 API 응답으로 처리)
      // const updatedCandidates = candidates.map((c) => (c.id === selected.id ? updatedCandidate : c))

      closeStageDropdown()
    }
  }

  // Memo functions
  const openMemoModal = () => {
    setNewMemo(selected?.note || '')
    setShowMemoModal(true)
  }

  const closeMemoModal = () => {
    setShowMemoModal(false)
    setNewMemo('')
  }

  const saveMemo = () => {
    if (selected && newMemo.trim()) {
      // 실제 구현에서는 API 호출
      const updatedCandidate = { ...selected, note: newMemo.trim() }
      setSelected(updatedCandidate)

      // TODO: candidates 배열도 업데이트 (실제로는 API 응답으로 처리)
      // const updatedCandidates = candidates.map((c) => (c.id === selected.id ? updatedCandidate : c))

      closeMemoModal()
    }
  }

  const openResume = () => {
    if (selected?.resumeUrl) {
      // 실제 구현에서는 새 탭에서 이력서 열기
      window.open(selected.resumeUrl, '_blank')
    } else {
      alert('이력서가 등록되지 않았습니다.')
    }
  }

  // Job posting management functions
  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId],
    )
  }

  const selectAllJobs = () => {
    setSelectedJobs(filteredJobs.map((job) => job.id))
  }

  const clearJobSelection = () => {
    setSelectedJobs([])
  }

  const openJobEditModal = (job: JobPosting) => {
    setEditingJob(job)
    setShowJobEditModal(true)
  }

  const closeJobEditModal = () => {
    setEditingJob(null)
    setShowJobEditModal(false)
  }

  const bulkUpdateJobStatus = (newStatus: JobPosting['status']) => {
    // 실제 구현에서는 API 호출
    console.log(`Bulk updating ${selectedJobs.length} jobs to status: ${newStatus}`)
    // 여기서는 mock 데이터이므로 UI에서만 반영
    clearJobSelection()
  }

  const bulkDeleteJobs = () => {
    if (confirm(`선택된 ${selectedJobs.length}개의 채용공고를 삭제하시겠습니까?`)) {
      // 실제 구현에서는 API 호출
      console.log(`Bulk deleting jobs:`, selectedJobs)
      clearJobSelection()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showStageDropdown) {
        setShowStageDropdown(false)
      }
    }

    if (showStageDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showStageDropdown])

  return (
    <SidebarLayout>
      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => setActiveTab('candidates')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            borderBottom:
              activeTab === 'candidates' ? '2px solid #3b82f6' : '2px solid transparent',
            color: activeTab === 'candidates' ? '#3b82f6' : '#64748b',
            fontWeight: activeTab === 'candidates' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          지원자 관리 ({filteredCandidates.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'jobs' ? '2px solid #3b82f6' : '2px solid transparent',
            color: activeTab === 'jobs' ? '#3b82f6' : '#64748b',
            fontWeight: activeTab === 'jobs' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          채용공고 관리 ({filteredJobs.length})
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="이름, 포지션, 부서로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ minWidth: '250px' }}
          />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <option value="">전체 부서</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {activeTab === 'candidates' && (
            <>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >
                <option value="">전체 단계</option>
                {stages.map((stageValue) => (
                  <option key={stageValue} value={stageValue}>
                    {getStageLabel(stageValue)}
                  </option>
                ))}
              </select>

              <select
                value={selectedJobPosting}
                onChange={(e) => setSelectedJobPosting(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >
                <option value="">전체 채용공고</option>
                {jobPostings.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </>
          )}

          {activeTab === 'jobs' && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            >
              <option value="">전체 상태</option>
              {statuses.map((statusValue) => (
                <option key={statusValue} value={statusValue}>
                  {getStatusLabel(statusValue)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Job management bulk actions - only show in jobs tab */}
          {activeTab === 'jobs' && selectedJobs.length > 0 && (
            <>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0 8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {selectedJobs.length}개 선택됨
                </span>
              </div>
              <button
                onClick={() => bulkUpdateJobStatus('active')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #10b981',
                  background: '#10b981',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                활성화
              </button>
              <button
                onClick={() => bulkUpdateJobStatus('paused')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #f59e0b',
                  background: '#f59e0b',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                일시정지
              </button>
              <button
                onClick={() => bulkUpdateJobStatus('closed')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #ef4444',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                마감
              </button>
              <button
                onClick={bulkDeleteJobs}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #6b7280',
                  background: '#6b7280',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                삭제
              </button>
            </>
          )}

          {/* Tab-specific buttons */}
          {activeTab === 'candidates' ? (
            <>
              <button
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                지원자 등록
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                지원자 일괄 업로드
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                지원자 내보내기
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                채용공고 등록
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                채용공고 복사
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  color: '#374151',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                채용공고 내보내기
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'candidates' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '16px',
            alignItems: 'start',
            height: 'calc(100vh - 200px)',
            maxHeight: '800px',
          }}
        >
          {/* Left: Candidates list */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              borderRadius: 10,
              padding: 12,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflow: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => {
                        if (sortField === 'name') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                        } else {
                          setSortField('name')
                          setSortDirection('asc')
                        }
                      }}
                    >
                      이름 {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      포지션
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      부서
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      경력
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => {
                        if (sortField === 'stage') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                        } else {
                          setSortField('stage')
                          setSortDirection('asc')
                        }
                      }}
                    >
                      단계 {sortField === 'stage' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                      onClick={() => {
                        if (sortField === 'appliedAt') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                        } else {
                          setSortField('appliedAt')
                          setSortDirection('desc')
                        }
                      }}
                    >
                      지원일 {sortField === 'appliedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      채용공고
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      담당자
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCandidates.data.map((candidate) => (
                    <tr
                      key={candidate.id}
                      style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}
                      onClick={() => selectCandidate(candidate)}
                    >
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        <div style={{ fontWeight: 500 }}>{candidate.name}</div>
                        {candidate.email && (
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {candidate.email}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{candidate.position}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{candidate.department}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {candidate.experienceYears}년
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        <span
                          onClick={(e) => {
                            e.stopPropagation()
                            openStageDropdown(e, candidate)
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '2px 8px',
                            borderRadius: 999,
                            fontSize: '12px',
                            background: getStageColor(candidate.stage) + '20',
                            color: getStageColor(candidate.stage),
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: '1px solid transparent',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.border = `1px solid ${getStageColor(candidate.stage)}`
                            e.currentTarget.style.background = getStageColor(candidate.stage) + '30'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.border = '1px solid transparent'
                            e.currentTarget.style.background = getStageColor(candidate.stage) + '20'
                          }}
                        >
                          {getStageLabel(candidate.stage)}
                          <span style={{ fontSize: '8px' }}>▼</span>
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{candidate.appliedAt}</td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {candidate.jobPostingId
                          ? (() => {
                              const jobPosting = jobPostings.find(
                                (job) => job.id === candidate.jobPostingId,
                              )
                              return jobPosting ? (
                                <div>
                                  <div style={{ fontWeight: 500 }}>{jobPosting.title}</div>
                                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                                    {jobPosting.department}
                                  </div>
                                </div>
                              ) : (
                                '-'
                              )
                            })()
                          : '-'}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>
                        {candidate.owner || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginatedCandidates.data.length === 0 && (
              <div
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                검색 결과가 없습니다
              </div>
            )}

            {/* Pagination */}
            {paginatedCandidates.totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '16px',
                  borderTop: '1px solid #e2e8f0',
                  gap: '8px',
                }}
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    borderRadius: '6px',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    opacity: page === 1 ? 0.5 : 1,
                  }}
                >
                  이전
                </button>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {page} / {paginatedCandidates.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(paginatedCandidates.totalPages, p + 1))}
                  disabled={page === paginatedCandidates.totalPages}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    borderRadius: '6px',
                    cursor: page === paginatedCandidates.totalPages ? 'not-allowed' : 'pointer',
                    opacity: page === paginatedCandidates.totalPages ? 0.5 : 1,
                  }}
                >
                  다음
                </button>
              </div>
            )}
          </div>

          {/* Right: Candidate detail panel */}
          <div
            style={{
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              borderRadius: 10,
              padding: 12,
              height: '100%',
              minWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {!selected ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  gap: 16,
                  color: '#94a3b8',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: '#cbd5e1',
                  }}
                >
                  👤
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>지원자 선택</div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>
                    좌측 목록에서 지원자를 선택하면
                    <br />
                    상세정보를 확인하고 관리할 수 있습니다
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  gap: 10,
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'grid', gap: 2 }}>
                    <div style={{ fontWeight: 600 }}>지원자 관리</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      {selected.name} · {selected.position} · {selected.department}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeDetail}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    닫기
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    overflow: 'auto',
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  {/* Header Card - Key Info */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                          {selected.name}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px' }}>
                          {selected.position} · {selected.department}
                        </div>
                      </div>
                      <span
                        onClick={openStageDropdown}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 12px',
                          borderRadius: 999,
                          fontSize: '12px',
                          background: getStageColor(selected.stage) + '20',
                          color: getStageColor(selected.stage),
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: '1px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = `1px solid ${getStageColor(selected.stage)}`
                          e.currentTarget.style.background = getStageColor(selected.stage) + '30'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = '1px solid transparent'
                          e.currentTarget.style.background = getStageColor(selected.stage) + '20'
                        }}
                      >
                        {getStageLabel(selected.stage)}
                        <span style={{ fontSize: '10px' }}>▼</span>
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        fontSize: '14px',
                      }}
                    >
                      <div>
                        <span style={{ color: '#64748b' }}>경력:</span>
                        <span style={{ fontWeight: 500, marginLeft: '4px' }}>
                          {selected.experienceYears}년
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>지원일:</span>
                        <span style={{ fontWeight: 500, marginLeft: '4px' }}>
                          {selected.appliedAt}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '12px',
                        fontSize: '14px',
                        marginTop: '8px',
                      }}
                    >
                      <div>
                        <span style={{ color: '#64748b' }}>지원 공고:</span>
                        <span style={{ fontWeight: 500, marginLeft: '4px' }}>
                          {selected.jobPostingId
                            ? (() => {
                                const jobPosting = jobPostings.find(
                                  (job) => job.id === selected.jobPostingId,
                                )
                                return jobPosting
                                  ? `${jobPosting.title} (${jobPosting.department})`
                                  : '알 수 없음'
                              })()
                            : '연결된 공고 없음'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                      연락처 정보
                    </div>
                    <div
                      style={{
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px',
                      }}
                    >
                      <div style={{ display: 'grid', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', minWidth: '60px' }}>
                            이메일
                          </span>
                          <span style={{ fontSize: '14px', color: '#3b82f6' }}>
                            {selected.email || '-'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', minWidth: '60px' }}>
                            연락처
                          </span>
                          <span style={{ fontSize: '14px' }}>{selected.phone || '-'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', minWidth: '60px' }}>
                            지원경로
                          </span>
                          <span style={{ fontSize: '14px' }}>{selected.source}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Additional Details */}
                  <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>추가 정보</div>
                    <div
                      style={{
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '12px',
                      }}
                    >
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {selected.expectedSalary && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', minWidth: '60px' }}>
                              희망연봉
                            </span>
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>
                              {selected.expectedSalary.toLocaleString()}만원
                            </span>
                          </div>
                        )}
                        {selected.resumeUrl && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', minWidth: '60px' }}>
                              이력서
                            </span>
                            <a
                              href={`#${selected.resumeUrl}`}
                              style={{
                                fontSize: '14px',
                                color: '#3b82f6',
                                textDecoration: 'none',
                                fontWeight: 500,
                              }}
                            >
                              {selected.resumeUrl}
                            </a>
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span
                            style={{
                              fontSize: '12px',
                              color: '#64748b',
                              minWidth: '60px',
                              marginTop: '2px',
                            }}
                          >
                            담당자
                          </span>
                          <span style={{ fontSize: '14px' }}>{selected.owner || '-'}</span>
                        </div>
                        {selected.note && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span
                              style={{
                                fontSize: '12px',
                                color: '#64748b',
                                minWidth: '60px',
                                marginTop: '2px',
                              }}
                            >
                              메모
                            </span>
                            <span style={{ fontSize: '14px', color: '#374151', lineHeight: '1.4' }}>
                              {selected.note}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 16 }}>
                    <button
                      onClick={openMemoModal}
                      style={{
                        padding: '10px 16px',
                        border: '1px solid #e2e8f0',
                        background: '#fff',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        flex: 1,
                        fontWeight: 500,
                      }}
                    >
                      메모 추가
                    </button>
                    <button
                      onClick={openResume}
                      disabled={!selected?.resumeUrl}
                      style={{
                        padding: '10px 16px',
                        border: '1px solid #e2e8f0',
                        background: selected?.resumeUrl ? '#fff' : '#f8fafc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: selected?.resumeUrl ? 'pointer' : 'not-allowed',
                        flex: 1,
                        fontWeight: 500,
                        color: selected?.resumeUrl ? '#374151' : '#9ca3af',
                      }}
                    >
                      이력서 보기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            height: 'calc(100vh - 200px)',
            maxHeight: '800px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflow: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 600,
                      width: '40px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedJobs.length === filteredJobs.length && filteredJobs.length > 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          selectAllJobs()
                        } else {
                          clearJobSelection()
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    제목
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    부서
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    유형
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    레벨
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    상태
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    지원자 수
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    등록일
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    담당자
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                      width: '120px',
                    }}
                  >
                    액션
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobs.data.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => toggleJobSelection(job.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <div style={{ fontWeight: 500 }}>{job.title}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{job.location}</div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                      {job.department}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          justifyContent: 'center',
                        }}
                      >
                        {job.type.map((type) => {
                          const typeLabels = {
                            'full-time': '정규직',
                            'part-time': '파트타임',
                            contract: '계약직',
                            intern: '인턴',
                          }
                          const typeColors = {
                            'full-time': '#10b981',
                            'part-time': '#f59e0b',
                            contract: '#3b82f6',
                            intern: '#8b5cf6',
                          }
                          return (
                            <span
                              key={type}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 500,
                                background: typeColors[type] + '15',
                                color: typeColors[type],
                                border: `1px solid ${typeColors[type]}30`,
                              }}
                            >
                              {typeLabels[type]}
                            </span>
                          )
                        })}
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          justifyContent: 'center',
                        }}
                      >
                        {job.level.map((level) => {
                          const levelLabels = {
                            junior: '주니어',
                            mid: '미드',
                            senior: '시니어',
                            lead: '리드',
                          }
                          const levelColors = {
                            junior: '#06b6d4',
                            mid: '#8b5cf6',
                            senior: '#f59e0b',
                            lead: '#ef4444',
                          }
                          return (
                            <span
                              key={level}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 500,
                                background: levelColors[level] + '15',
                                color: levelColors[level],
                                border: `1px solid ${levelColors[level]}30`,
                              }}
                            >
                              {levelLabels[level]}
                            </span>
                          )
                        })}
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          borderRadius: 999,
                          fontSize: '12px',
                          background: getStatusColor(job.status) + '20',
                          color: getStatusColor(job.status),
                          fontWeight: 500,
                        }}
                      >
                        {getStatusLabel(job.status)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#3b82f6',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {candidates.filter((candidate) => candidate.jobPostingId === job.id).length}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{job.postedAt || '-'}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      {job.hiringManager || '-'}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                      <button
                        onClick={() => openJobEditModal(job)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #e2e8f0',
                          background: '#fff',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          color: '#374151',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f8fafc'
                          e.currentTarget.style.borderColor = '#cbd5e1'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff'
                          e.currentTarget.style.borderColor = '#e2e8f0'
                        }}
                      >
                        편집
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedJobs.data.length === 0 && (
              <div
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                검색 결과가 없습니다
              </div>
            )}
          </div>

          {paginatedJobs.totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                borderTop: '1px solid #e2e8f0',
                gap: '8px',
                background: '#fff',
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  borderRadius: '6px',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  opacity: page === 1 ? 0.5 : 1,
                }}
              >
                이전
              </button>
              <span style={{ fontSize: '14px', color: '#64748b' }}>
                {page} / {paginatedJobs.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(paginatedJobs.totalPages, p + 1))}
                disabled={page === paginatedJobs.totalPages}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  borderRadius: '6px',
                  cursor: page === paginatedJobs.totalPages ? 'not-allowed' : 'pointer',
                  opacity: page === paginatedJobs.totalPages ? 0.5 : 1,
                }}
              >
                다음
              </button>
            </div>
          )}
        </div>
      )}

      {/* Inline Stage Change Dropdown */}
      {showStageDropdown && (
        <div
          style={{
            position: 'fixed',
            top: stageDropdownPosition.y,
            left: stageDropdownPosition.x,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 1000,
            minWidth: '180px',
            overflow: 'hidden',
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div style={{ padding: '4px 0' }}>
            {stages.map((stageValue) => (
              <button
                key={stageValue}
                onClick={() => updateCandidateStage(stageValue)}
                disabled={stageValue === selected?.stage}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: 'none',
                  background: stageValue === selected?.stage ? '#f8fafc' : 'transparent',
                  color: stageValue === selected?.stage ? '#64748b' : '#374151',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: stageValue === selected?.stage ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (stageValue !== selected?.stage) {
                    e.currentTarget.style.background = '#f8fafc'
                  }
                }}
                onMouseLeave={(e) => {
                  if (stageValue !== selected?.stage) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getStageColor(stageValue),
                    flexShrink: 0,
                  }}
                />
                {getStageLabel(stageValue)}
                {stageValue === selected?.stage && (
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b' }}>
                    현재
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Memo Modal */}
      {showMemoModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={closeMemoModal}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '24px',
              minWidth: '500px',
              maxWidth: '600px',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                메모 추가/수정
              </h3>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#64748b' }}>
                {selected?.name}님에 대한 메모를 작성하세요.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '8px',
                  color: '#374151',
                }}
              >
                메모 내용
              </label>
              <textarea
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                placeholder="지원자에 대한 메모를 입력하세요..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: '#fff',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={closeMemoModal}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                취소
              </button>
              <button
                onClick={saveMemo}
                disabled={!newMemo.trim()}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #3b82f6',
                  background: '#3b82f6',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: newMemo.trim() ? 'pointer' : 'not-allowed',
                  opacity: newMemo.trim() ? 1 : 0.5,
                  fontWeight: 500,
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Edit Modal */}
      {showJobEditModal && editingJob && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={closeJobEditModal}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '24px',
              minWidth: '600px',
              maxWidth: '800px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                채용공고 편집
              </h3>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#64748b' }}>
                채용공고 정보를 수정하세요.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                    color: '#374151',
                  }}
                >
                  제목
                </label>
                <input
                  type="text"
                  defaultValue={editingJob?.title || ''}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    background: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: '#374151',
                    }}
                  >
                    부서
                  </label>
                  <select
                    defaultValue={editingJob?.department || ''}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="개발팀">개발팀</option>
                    <option value="디자인팀">디자인팀</option>
                    <option value="마케팅팀">마케팅팀</option>
                    <option value="영업팀">영업팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="재무팀">재무팀</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: '#374151',
                    }}
                  >
                    상태
                  </label>
                  <select
                    defaultValue={editingJob?.status || ''}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: '#fff',
                    }}
                  >
                    <option value="draft">임시저장</option>
                    <option value="active">활성</option>
                    <option value="paused">일시정지</option>
                    <option value="closed">마감</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '8px',
                    color: '#374151',
                  }}
                >
                  설명
                </label>
                <textarea
                  defaultValue={editingJob?.description || ''}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    background: '#fff',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: '#374151',
                    }}
                  >
                    유형
                  </label>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {[
                      { value: 'full-time', label: '정규직', color: '#10b981' },
                      { value: 'part-time', label: '파트타임', color: '#f59e0b' },
                      { value: 'contract', label: '계약직', color: '#3b82f6' },
                      { value: 'intern', label: '인턴', color: '#8b5cf6' },
                    ].map((option) => {
                      const isSelected =
                        editingJob?.type?.includes(option.value as JobPosting['type'][0]) || false
                      return (
                        <label
                          key={option.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            background: isSelected ? option.color + '10' : '#fff',
                            borderColor: isSelected ? option.color + '40' : '#e2e8f0',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = '#f8fafc'
                              e.currentTarget.style.borderColor = '#cbd5e1'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = '#fff'
                              e.currentTarget.style.borderColor = '#e2e8f0'
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            defaultChecked={isSelected}
                            style={{ cursor: 'pointer' }}
                          />
                          <span
                            style={{
                              color: isSelected ? option.color : '#374151',
                              fontWeight: isSelected ? 500 : 400,
                            }}
                          >
                            {option.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                      color: '#374151',
                    }}
                  >
                    레벨
                  </label>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {[
                      { value: 'junior', label: '주니어', color: '#06b6d4' },
                      { value: 'mid', label: '미드', color: '#8b5cf6' },
                      { value: 'senior', label: '시니어', color: '#f59e0b' },
                      { value: 'lead', label: '리드', color: '#ef4444' },
                    ].map((option) => {
                      const isSelected =
                        editingJob?.level?.includes(option.value as JobPosting['level'][0]) || false
                      return (
                        <label
                          key={option.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            background: isSelected ? option.color + '10' : '#fff',
                            borderColor: isSelected ? option.color + '40' : '#e2e8f0',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = '#f8fafc'
                              e.currentTarget.style.borderColor = '#cbd5e1'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = '#fff'
                              e.currentTarget.style.borderColor = '#e2e8f0'
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            defaultChecked={isSelected}
                            style={{ cursor: 'pointer' }}
                          />
                          <span
                            style={{
                              color: isSelected ? option.color : '#374151',
                              fontWeight: isSelected ? 500 : 400,
                            }}
                          >
                            {option.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <button
                onClick={closeJobEditModal}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  // 실제 구현에서는 API 호출
                  console.log('Job updated:', editingJob)
                  closeJobEditModal()
                }}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #3b82f6',
                  background: '#3b82f6',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  )
}
