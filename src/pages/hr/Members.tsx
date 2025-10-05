/**
 * HR Members Page - Skeleton UI
 */
import { SidebarLayout } from '@templates/SidebarLayout'
import { useEffect, useMemo, useState } from 'react'

// no React namespace needed
import type { Employee, EmployeeStatus } from '../../types/hr'
import { mockEmployees, paginate } from '../../utils/hr'

export default function HrMembers() {
  const [all, setAll] = useState<Employee[]>([])
  const [q, setQ] = useState('')
  const [dept, setDept] = useState('')
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 15

  // 선택된 구성원 상태 (우측 패널 표시 기준)
  const [selected, setSelected] = useState<Employee | null>(null)
  const [form, setForm] = useState<Partial<Employee>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  // 권한(예: 관리자/담당자/열람)
  type UserRole = 'admin' | 'manager' | 'viewer'
  const currentUserRole: UserRole = 'admin'
  const isFieldLocked = (field: keyof Employee, role: UserRole = currentUserRole) => {
    // 예시 정책: viewer는 전부 잠금, manager는 상태/입사일만 잠금, admin은 모두 편집 가능
    if (role === 'viewer') return true
    if (role === 'manager') return field === 'status' || field === 'joinedAt'
    return false
  }

  type ChangeLog = {
    id: string
    at: string
    user: string
    field: keyof Employee
    from?: string
    to?: string
  }
  type Attachment = { id: string; name: string; size: number }
  const [history, setHistory] = useState<ChangeLog[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])

  useEffect(() => {
    setAll(mockEmployees(120))
  }, [])

  const filtered = useMemo(() => {
    let rows = all
    if (q) rows = rows.filter((r) => r.name.includes(q) || r.email.includes(q))
    if (dept) rows = rows.filter((r) => r.department === dept)
    if (title) rows = rows.filter((r) => r.title === title)
    if (status) rows = rows.filter((r) => r.status === (status as EmployeeStatus))
    return rows
  }, [all, q, dept, title, status])

  const { data, total, totalPages } = useMemo(
    () => paginate(filtered, page, pageSize),
    [filtered, page],
  )

  const openDrawer = (row: Employee) => {
    setSelected(row)
    setForm({ ...row })
    // 예시 변경 이력/첨부 로드 (목데이터)
    setHistory([
      {
        id: 'h1',
        at: '2025-09-01 10:20',
        user: '관리자',
        field: 'title',
        from: '사원',
        to: '대리',
      },
      {
        id: 'h2',
        at: '2025-06-10 09:12',
        user: '김인사',
        field: 'department',
        from: '영업',
        to: '마케팅',
      },
    ])
    setAttachments([
      { id: 'a1', name: '근로계약서.pdf', size: 234_567 },
      { id: 'a2', name: '보안서약서.pdf', size: 123_456 },
    ])
  }

  const closeDrawer = () => {
    setSelected(null)
    setForm({})
  }

  const updateField = <K extends keyof Employee>(key: K, value: Employee[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = async () => {
    if (!selected) return
    setIsSaving(true)
    // 낙관적 업데이트
    setAll((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...(r as Employee), ...(form as Employee) } : r)),
    )
    // 변경 이력 적재 (간단 비교)
    Object.keys(form).forEach((k) => {
      const key = k as keyof Employee
      const fromVal = selected[key] as unknown
      const toVal = form[key] as unknown
      if (fromVal !== toVal) {
        setHistory((h) => [
          {
            id: `h${Date.now()}${Math.random()}`,
            at: new Date().toISOString().replace('T', ' ').slice(0, 16),
            user: '나',
            field: key,
            from: String(fromVal ?? ''),
            to: String(toVal ?? ''),
          },
          ...h,
        ])
      }
    })
    // API 저장 자리 (try/catch)
    await new Promise((r) => setTimeout(r, 500))
    setIsSaving(false)
    closeDrawer()
  }

  const onUpload = (files: FileList | null) => {
    if (!files) return
    const items: Attachment[] = Array.from(files).map((f) => ({
      id: `up_${Date.now()}_${f.name}`,
      name: f.name,
      size: f.size,
    }))
    setAttachments((prev) => [...items, ...prev])
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <SidebarLayout>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="iconBtn" disabled>
              신규 등록
            </button>
            <button type="button" className="iconBtn" disabled>
              일괄 업로드
            </button>
            <button type="button" className="iconBtn" disabled>
              내보내기
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 12,
            alignItems: 'stretch',
            height: 'calc(100vh - 200px)',
            maxHeight: '800px',
          }}
        >
          <div style={{ display: 'grid', gap: 12, gridTemplateRows: 'auto 1fr auto' }}>
            {/* Filters */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: 8,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: 8,
              }}
            >
              <input
                aria-label="이름/이메일"
                placeholder="이름/이메일 검색"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setPage(1)
                }}
                style={{ padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 6 }}
              />
              <select
                aria-label="부서"
                value={dept}
                onChange={(e) => {
                  setDept(e.target.value)
                  setPage(1)
                }}
                style={{ padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 6 }}
              >
                <option value="">부서 전체</option>
                {['기획', '영업', '마케팅', '캐스팅', '인사', '재무', 'IT', '디자인'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                aria-label="직급"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  setPage(1)
                }}
                style={{ padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 6 }}
              >
                <option value="">직급 전체</option>
                {['사원', '대리', '과장', '팀장', '부장', '이사', '상무', '전무'].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                aria-label="상태"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  setPage(1)
                }}
                style={{ padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 6 }}
              >
                <option value="">상태 전체</option>
                <option value="active">재직</option>
                <option value="leave">휴직</option>
                <option value="terminated">퇴사</option>
              </select>
            </div>

            {/* Members table */}
            <div
              style={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['이름', '부서', '직급', '입사일', '상태', '연락처'].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '12px 16px',
                          borderBottom: '1px solid #e2e8f0',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#374151',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((r) => (
                    <tr
                      key={r.id}
                      style={{ borderBottom: '1px solid #eef2f7', cursor: 'pointer' }}
                      onClick={() => openDrawer(r)}
                    >
                      <td style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                        {r.name}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                        {r.department}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                        {r.title}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                        {r.joinedAt}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                        {r.status === 'active' ? '재직' : r.status === 'leave' ? '휴직' : '퇴사'}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, whiteSpace: 'nowrap' }}>
                        {r.phone}
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        style={{ padding: 24, color: '#64748b', textAlign: 'center' }}
                      >
                        검색 결과가 없습니다
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'center' }}
            >
              <span style={{ fontSize: 12, color: '#64748b' }}>총 {total}명</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  className="iconBtn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  style={{ border: '1px solid #e2e8f0', background: '#fff' }}
                >
                  이전
                </button>
                <span style={{ fontSize: 12, color: '#475569', alignSelf: 'center' }}>
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  className="iconBtn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  style={{ border: '1px solid #e2e8f0', background: '#fff' }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>

          {/* Right detail/editor panel */}
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
                  👥
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>구성원 선택</div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>
                    좌측 목록에서 구성원을 선택하면
                    <br />
                    상세정보를 확인하고 편집할 수 있습니다
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
                    <div style={{ fontWeight: 600 }}>구성원 편집</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      {selected?.name} · {selected?.department} · {selected?.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={closeDrawer}
                    style={{ border: '1px solid #e2e8f0', background: '#fff' }}
                  >
                    닫기
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    overflow: 'auto',
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  {/* 기본 정보 폼 */}
                  <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 13, color: '#475569' }}>기본정보</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <input
                        placeholder="이름"
                        value={form.name ?? ''}
                        onChange={(e) => updateField('name', e.target.value)}
                        disabled={isFieldLocked('name')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                        }}
                      />
                      <input
                        placeholder="이메일"
                        value={form.email ?? ''}
                        onChange={(e) => updateField('email', e.target.value)}
                        disabled={isFieldLocked('email')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                        }}
                      />
                      <select
                        value={form.department ?? ''}
                        onChange={(e) => updateField('department', e.target.value)}
                        disabled={isFieldLocked('department')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                        }}
                      >
                        {['기획', '영업', '마케팅', '캐스팅', '인사', '재무', 'IT', '디자인'].map(
                          (d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ),
                        )}
                      </select>
                      <select
                        value={form.title ?? ''}
                        onChange={(e) => updateField('title', e.target.value)}
                        disabled={isFieldLocked('title')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                        }}
                      >
                        {['사원', '대리', '과장', '팀장', '부장', '이사', '상무', '전무'].map(
                          (t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ),
                        )}
                      </select>
                      <input
                        placeholder="입사일"
                        value={form.joinedAt ?? ''}
                        onChange={(e) => updateField('joinedAt', e.target.value)}
                        disabled={isFieldLocked('joinedAt')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                        }}
                      />
                      <select
                        value={form.status ?? 'active'}
                        onChange={(e) => updateField('status', e.target.value as EmployeeStatus)}
                        disabled={isFieldLocked('status')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                        }}
                      >
                        <option value="active">재직</option>
                        <option value="leave">휴직</option>
                        <option value="terminated">퇴사</option>
                      </select>
                      <input
                        placeholder="전화번호"
                        value={form.phone ?? ''}
                        onChange={(e) => updateField('phone', e.target.value)}
                        disabled={isFieldLocked('phone')}
                        style={{
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                          gridColumn: '1 / span 2',
                        }}
                      />
                    </div>
                  </section>

                  {/* 파일 첨부 */}
                  <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 13, color: '#475569' }}>파일 첨부</div>
                    <label
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsDragOver(true)
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsDragOver(false)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsDragOver(false)
                        const files = e.dataTransfer?.files
                        onUpload(files)
                      }}
                      style={{
                        border: `1px dashed ${isDragOver ? '#2563eb' : '#cbd5e1'}`,
                        borderRadius: 10,
                        padding: 14,
                        display: 'grid',
                        placeItems: 'center',
                        color: isDragOver ? '#2563eb' : '#64748b',
                        cursor: 'pointer',
                        background: isDragOver ? '#eff6ff' : '#f8fafc',
                        transition: 'all 120ms ease',
                      }}
                    >
                      <input
                        type="file"
                        multiple
                        onChange={(e) => onUpload(e.target.files)}
                        style={{ display: 'none' }}
                      />
                      여기로 드래그하거나 클릭하여 파일 추가
                    </label>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {attachments.map((f) => (
                        <div
                          key={f.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            alignItems: 'center',
                            gap: 10,
                            border: '1px solid #e2e8f0',
                            borderRadius: 10,
                            padding: '10px 12px',
                            background: '#ffffff',
                          }}
                        >
                          <div style={{ display: 'grid', gap: 2 }}>
                            <span style={{ fontSize: 14 }}>{f.name}</span>
                            <span style={{ color: '#94a3b8', fontSize: 12 }}>
                              {Math.round(f.size / 1024)} KB
                            </span>
                          </div>
                          <button
                            type="button"
                            className="iconBtn"
                            onClick={() => removeAttachment(f.id)}
                            style={{
                              border: '1px solid #e2e8f0',
                              background: '#fff',
                              padding: '6px 10px',
                            }}
                            aria-label={`${f.name} 삭제`}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      {attachments.length === 0 && (
                        <div style={{ color: '#94a3b8', fontSize: 13 }}>첨부된 파일이 없습니다</div>
                      )}
                    </div>
                  </section>

                  {/* 변경 이력 */}
                  <section style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontSize: 13, color: '#475569' }}>변경 이력</div>
                    <div
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        maxHeight: 120,
                        overflow: 'auto',
                      }}
                    >
                      {history.map((h) => (
                        <div
                          key={h.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 1fr',
                            gap: 8,
                            padding: '6px 8px',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          <div style={{ color: '#64748b', fontSize: 12 }}>{h.at}</div>
                          <div style={{ fontSize: 13 }}>
                            <b>{h.user}</b> 님이{' '}
                            <code
                              style={{ background: '#f8fafc', padding: '0 4px', borderRadius: 4 }}
                            >
                              {h.field}
                            </code>{' '}
                            변경: {h.from ?? '-'} → {h.to ?? '-'}
                          </div>
                        </div>
                      ))}
                      {history.length === 0 && (
                        <div style={{ padding: 8, color: '#94a3b8', fontSize: 13 }}>
                          변경 이력이 없습니다
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={save}
                    disabled={isSaving}
                    style={{ background: '#2563eb', border: '1px solid #2563eb', color: '#fff' }}
                  >
                    {isSaving ? '저장 중...' : '저장'}
                  </button>
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={closeDrawer}
                    style={{ background: '#fff', border: '1px solid #e2e8f0' }}
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
