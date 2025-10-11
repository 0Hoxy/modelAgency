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
        padding: '12px 16px',
        background: '#ffffff',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Page size selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>페이지당</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              border: '1px solid #d1d5db',
              borderRadius: 4,
              fontSize: 12,
              background: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>개</span>
        </div>
      )}

      {/* Pagination info */}
      {totalItems && (
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
          총{' '}
          <span style={{ color: '#1f2937', fontWeight: 600 }}>{totalItems.toLocaleString()}</span>개
          중{' '}
          <span style={{ color: '#1f2937', fontWeight: 600 }}>
            {((currentPage - 1) * pageSize + 1).toLocaleString()}-
            {Math.min(currentPage * pageSize, totalItems).toLocaleString()}
          </span>
          개
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
            padding: '6px 10px',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            background: currentPage === 1 ? '#f8fafc' : '#ffffff',
            color: currentPage === 1 ? '#94a3b8' : '#374151',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.borderColor = '#cbd5e1'
              e.currentTarget.style.background = '#f8fafc'
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.borderColor = '#e2e8f0'
              e.currentTarget.style.background = '#ffffff'
            }
          }}
        >
          <ChevronLeft size={14} />
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
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              background: page === currentPage ? '#2563eb' : '#ffffff',
              color: page === currentPage ? '#ffffff' : '#374151',
              cursor: 'pointer',
              minWidth: 32,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: page === currentPage ? 600 : 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.borderColor = '#cbd5e1'
                e.currentTarget.style.background = '#f8fafc'
              }
            }}
            onMouseLeave={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.borderColor = '#e2e8f0'
                e.currentTarget.style.background = '#ffffff'
              }
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
            padding: '6px 10px',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            background: currentPage === totalPages ? '#f8fafc' : '#ffffff',
            color: currentPage === totalPages ? '#94a3b8' : '#374151',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.borderColor = '#cbd5e1'
              e.currentTarget.style.background = '#f8fafc'
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.borderColor = '#e2e8f0'
              e.currentTarget.style.background = '#ffffff'
            }
          }}
        >
          다음
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
