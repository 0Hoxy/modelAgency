/**
 * Pagination component for table/list pagination
 */
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize?: number
  totalItems?: number
  showPageSizeSelector?: boolean
  onPageSizeChange?: (size: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  totalItems,
  showPageSizeSelector = false,
  onPageSizeChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      // 총 페이지가 5개 이하면 모든 페이지 표시
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages = []
    let startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + 4)

    // 마지막 페이지에서 5개가 안 될 때 시작 페이지 조정
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
      }}
    >
      {/* Page size selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#64748b' }}>페이지당</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              border: '1px solid #cbd5e1',
              borderRadius: 4,
              fontSize: 14,
              background: '#fff',
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span style={{ fontSize: 14, color: '#64748b' }}>개</span>
        </div>
      )}

      {/* Pagination info */}
      {totalItems && (
        <div style={{ fontSize: 14, color: '#64748b' }}>
          총 {totalItems.toLocaleString()}개 중{' '}
          {((currentPage - 1) * pageSize + 1).toLocaleString()}-
          {Math.min(currentPage * pageSize, totalItems).toLocaleString()}개
        </div>
      )}

      {/* Pagination controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Previous button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '6px 8px',
            border: '1px solid #cbd5e1',
            borderRadius: 4,
            background: currentPage === 1 ? '#f8fafc' : '#fff',
            color: currentPage === 1 ? '#94a3b8' : '#0f172a',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <ChevronLeft size={16} />
          이전
        </button>

        {/* Page numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: 4,
              background: page === currentPage ? '#2563eb' : '#fff',
              color: page === currentPage ? '#fff' : '#0f172a',
              cursor: 'pointer',
              minWidth: 32,
              textAlign: 'center',
            }}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '6px 8px',
            border: '1px solid #cbd5e1',
            borderRadius: 4,
            background: currentPage === totalPages ? '#f8fafc' : '#fff',
            color: currentPage === totalPages ? '#94a3b8' : '#0f172a',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          다음
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
